<script setup>
import { ref, computed } from 'vue'
import vehiclesData from '../../data/vehicles.json'
import VehicleCard from '../vehicle/VehicleCard.vue'
import Button from '../ui/Button.vue'
import { Car, Bike, ArrowRight } from 'lucide-vue-next'

const activeTab = ref('mobil')

const featuredVehicles = computed(() => {
  return vehiclesData
    .filter(v => v.type === activeTab.value && v.featured)
    .slice(0, 6)
})
</script>

<template>
  <section class="py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header & Tabs -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Pilihan Populer
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Armada Unggulan Kami
          </h2>
        </div>

        <!-- Filter Tabs (Mobil / Motor) -->
        <div class="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            @click="activeTab = 'mobil'"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all focus:outline-none',
              activeTab === 'mobil'
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            <Car class="w-4 h-4" />
            <span>Mobil Unggulan</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'motor'"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all focus:outline-none',
              activeTab === 'motor'
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            <Bike class="w-4 h-4" />
            <span>Motor Unggulan</span>
          </button>
        </div>
      </div>

      <!-- Vehicle Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <VehicleCard
          v-for="vehicle in featuredVehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>

      <!-- Bottom Button -->
      <div class="text-center">
        <router-link :to="`/armada?type=${activeTab}`">
          <Button variant="outline" size="lg">
            <span>Lihat Semua Armada {{ activeTab === 'mobil' ? 'Mobil' : 'Motor' }}</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </router-link>
      </div>
    </div>
  </section>
</template>
