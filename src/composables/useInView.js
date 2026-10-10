import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(targetRef, options = { threshold: 0.2 }) {
  const isInView = ref(false)
  let observer = null

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isInView.value = true
        // Once visible, stop observing so animation triggers once
        if (observer && targetRef.value) {
          observer.unobserve(targetRef.value)
        }
      }
    }, options)

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
    }
  })

  return { isInView }
}
