import { ref, watch } from 'vue'

export function useCountUp(targetValue, triggerRef, duration = 1500) {
  const currentCount = ref(0)
  let hasAnimated = false

  function startAnimation() {
    if (hasAnimated) return
    hasAnimated = true

    const start = 0
    const end = targetValue
    const startTime = performance.now()

    function updateCount(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      currentCount.value = Math.floor(start + (end - start) * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        currentCount.value = end
      }
    }

    requestAnimationFrame(updateCount)
  }

  if (triggerRef) {
    watch(triggerRef, (newVal) => {
      if (newVal) {
        startAnimation()
      }
    }, { immediate: true })
  }

  return { currentCount, startAnimation }
}
