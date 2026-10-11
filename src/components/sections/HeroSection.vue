<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import homeData from '../../data/home.json'
import SearchWidget from '../forms/SearchWidget.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const slides = homeData.heroSlides || []
const currentSlide = ref(0)
let timer = null
const isPaused = ref(false)

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

function goToSlide(idx) {
  currentSlide.value = idx
}

function startAutoplay() {
  // Respect prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mediaQuery.matches) return

  stopAutoplay()
  timer = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 5000)
}

function stopAutoplay() {
  if (timer) clearInterval(timer)
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section
    class="relative bg-slate-900 text-white min-h-[540px] sm:min-h-[580px] flex flex-col justify-between"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <!-- Background Images with Fade Transition (overflow hidden kept strictly inside background wrapper) -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        :class="[
          'absolute inset-0 transition-opacity duration-1000 ease-in-out',
          currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
        ]"
      >
        <img
          :src="slide.image"
          :alt="slide.headline"
          class="w-full h-full object-cover object-center"
          :loading="idx === 0 ? 'eager' : 'lazy'"
          :fetchpriority="idx === 0 ? 'high' : 'auto'"
          decoding="async"
          width="1920"
          height="800"
        />
        <!-- Gradient Overlays for Readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>
    </div>

    <!-- Hero Headline Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 w-full">
      <div class="max-w-2xl">
        <!-- Brand Eyebrow without badge pill style -->
        <div class="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400 mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-brand-400 inline-block"></span>
          <span>Gerayana Rental & Trip</span>
        </div>

        <Transition
          mode="out-in"
          enter-active-class="transition duration-500 ease-out transform"
          enter-from-class="translate-y-4 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-300 ease-in transform"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-4 opacity-0"
        >
          <div :key="currentSlide" class="space-y-4">
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {{ slides[currentSlide]?.headline }}
            </h1>
            <p class="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {{ slides[currentSlide]?.subheadline }}
            </p>
          </div>
        </Transition>
      </div>

      <!-- Slider Controls (Dots & Arrows) -->
      <div class="flex items-center gap-4 mt-8">
        <div class="flex items-center gap-2">
          <button
            v-for="(slide, idx) in slides"
            :key="`dot-${slide.id}`"
            type="button"
            @click="goToSlide(idx)"
            :class="[
              'h-2.5 rounded-full transition-all duration-300 focus:outline-none',
              currentSlide === idx ? 'w-8 bg-brand-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
            ]"
            :aria-label="`Slide ${idx + 1}`"
          />
        </div>

        <div class="flex items-center gap-2 ml-4">
          <button
            type="button"
            @click="prevSlide"
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors focus:outline-none"
            aria-label="Slide sebelumnya"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button
            type="button"
            @click="nextSlide"
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors focus:outline-none"
            aria-label="Slide berikutnya"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Embedded Search Widget floating over hero bottom boundary -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mb-20 sm:-mb-16">
      <SearchWidget />
    </div>
  </section>
</template>
