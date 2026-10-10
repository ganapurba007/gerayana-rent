<script setup>
import { useHead } from '@unhead/vue'
import { useTourFilters } from '../composables/useTourFilters'
import TourCard from '../components/tour/TourCard.vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import { Filter, ArrowUpDown, RotateCcw, MapPin, Compass } from 'lucide-vue-next'

useHead({
  title: 'Paket Wisata & Liburan - Gerayana Rental & Trip',
  meta: [
    { name: 'description', content: 'Jelajahi paket liburan impian Bromo, City Tour, dan Pantai Eksotis dengan harga terjangkau.' }
  ]
})

const {
  duration,
  minPrice,
  maxPrice,
  sortBy,
  filteredTours,
  updateUrlQuery,
  resetAllFilters
} = useTourFilters()
</script>

<template>
  <div class="py-8 bg-slate-50 min-h-[80vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Page Header -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">
            Destinasi Impian
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Paket Wisata & Liburan Populer
          </h1>
          <p class="text-slate-600 text-sm mt-1">
            Itinerary lengkap, driver profesional, dan pengalaman liburan tanpa repot.
          </p>
        </div>
      </div>

      <!-- Filters & Sorting Bar -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <!-- Duration Filters -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <span class="text-xs font-bold uppercase text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter class="w-3.5 h-3.5 text-brand-600" />
            <span>Durasi:</span>
          </span>

          <button
            type="button"
            @click="duration = 0; updateUrlQuery()"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus:outline-none shrink-0',
              duration === 0 ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            Semua Durasi
          </button>

          <button
            type="button"
            @click="duration = 1; updateUrlQuery()"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus:outline-none shrink-0',
              duration === 1 ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            1 Hari (Day Trip)
          </button>

          <button
            type="button"
            @click="duration = 2; updateUrlQuery()"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus:outline-none shrink-0',
              duration === 2 ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            2 Hari (2H1M)
          </button>

          <button
            type="button"
            @click="duration = 3; updateUrlQuery()"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus:outline-none shrink-0',
              duration === 3 ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            3 Hari (3H2M)
          </button>
        </div>

        <!-- Sort Selection -->
        <div class="flex items-center gap-2 self-start lg:self-auto shrink-0">
          <ArrowUpDown class="w-4 h-4 text-slate-400" />
          <span class="text-xs font-semibold text-slate-500">Urutkan:</span>
          <select
            :value="sortBy"
            @change="sortBy = $event.target.value; updateUrlQuery()"
            class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="terpopuler">Terpopuler</option>
            <option value="termurah">Termurah</option>
            <option value="termahal">Termahal</option>
          </select>
        </div>
      </div>

      <!-- Tours Grid (FR-5.1) -->
      <div v-if="filteredTours.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TourCard
          v-for="tour in filteredTours"
          :key="tour.id"
          :tour="tour"
        />
      </div>

      <!-- Empty State if no tour found -->
      <div v-else class="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
        <div class="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <Compass class="w-8 h-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Paket Wisata Tidak Ditemukan</h3>
        <p class="text-slate-600 text-sm leading-relaxed mb-6">
          Maaf, tidak ada paket wisata yang sesuai dengan filter durasi atau harga Anda.
        </p>
        <Button variant="outline" size="md" @click="resetAllFilters">
          <RotateCcw class="w-4 h-4" />
          <span>Reset Filter</span>
        </Button>
      </div>
    </div>
  </div>
</template>
