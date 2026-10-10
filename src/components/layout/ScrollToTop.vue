<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out transform"
    enter-from-class="translate-y-4 opacity-0 scale-90"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in transform"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="translate-y-4 opacity-0 scale-90"
  >
    <button
      v-if="isVisible"
      type="button"
      @click="scrollToTop"
      class="fixed bottom-20 sm:bottom-6 left-5 sm:left-6 z-30 p-3.5 rounded-full bg-slate-800/90 hover:bg-slate-900 text-white shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <ArrowUp class="w-5 h-5" />
    </button>
  </Transition>
</template>
