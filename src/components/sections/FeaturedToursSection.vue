<script setup>
import { computed } from 'vue'
import toursData from '../../data/tours.json'
import TourCard from '../tour/TourCard.vue'
import Button from '../ui/Button.vue'
import { ArrowRight } from 'lucide-vue-next'

const featuredTours = computed(() => {
  return toursData.filter(t => t.featured).slice(0, 3)
})
</script>

<template>
  <section class="py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Destinasi Pilihan
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Paket Wisata & Liburan Unggulan
          </h2>
        </div>

        <router-link to="/paket-wisata" class="shrink-0">
          <Button variant="outline" size="md">
            <span>Lihat Semua Paket</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </router-link>
      </div>

      <!-- Tour Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TourCard
          v-for="tour in featuredTours"
          :key="tour.id"
          :tour="tour"
        />
      </div>
    </div>
  </section>
</template>
