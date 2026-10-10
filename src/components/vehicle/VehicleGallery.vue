<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  alt: {
    type: String,
    default: 'Gambar Kendaraan'
  }
})

const selectedIndex = ref(0)
</script>

<template>
  <div class="space-y-4">
    <!-- Main Large Image -->
    <div class="aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
      <img
        :src="images[selectedIndex] || images[0]"
        :alt="alt"
        class="w-full h-full object-cover transition-opacity duration-300"
      />
    </div>

    <!-- Thumbnail Selector -->
    <div v-if="images.length > 1" class="flex items-center gap-3 overflow-x-auto pb-2">
      <button
        v-for="(img, idx) in images"
        :key="idx"
        type="button"
        @click="selectedIndex = idx"
        :class="[
          'relative w-20 sm:w-24 aspect-16/10 rounded-xl overflow-hidden border-2 transition-all shrink-0 focus:outline-none',
          selectedIndex === idx ? 'border-brand-600 ring-2 ring-brand-500/30 scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
        ]"
      >
        <img :src="img" :alt="`${alt} thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>
