<script setup>
import categoriesData from '../../data/categories.json'
import vehiclesData from '../../data/vehicles.json'
import Card from '../ui/Card.vue'
import { Car, Users, Shield, CarFront, Crown, Bike, Flame, Sparkles, ArrowRight } from 'lucide-vue-next'

const iconMap = {
  Car,
  Users,
  Shield,
  CarFront,
  Crown,
  Bike,
  Flame,
  Sparkles
}

function getAvailableCount(catId) {
  return vehiclesData.filter(v => v.category === catId).length
}
</script>

<template>
  <section class="py-16 bg-white border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
          Kategori Kebutuhan
        </span>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pilih Kategori Kendaraan
        </h2>
        <p class="text-slate-600 text-sm sm:text-base mt-3">
          Temukan kendaraan yang paling pas dengan gaya perjalanan dan jumlah rombongan Anda.
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <router-link
          v-for="cat in categoriesData"
          :key="cat.id"
          :to="`/armada?type=${cat.type}&kategori=${cat.id}`"
          class="group focus:outline-none"
        >
          <Card hoverable padding="sm" class="flex flex-col items-center text-center p-5 h-full">
            <div class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
              <component :is="iconMap[cat.icon] || Car" class="w-6 h-6" />
            </div>

            <h3 class="text-base font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1">
              {{ cat.name }}
            </h3>

            <span class="text-xs text-slate-500 font-medium mb-3">
              {{ getAvailableCount(cat.id) }} Unit Tersedia
            </span>

            <div class="mt-auto flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
              <span>Lihat Unit</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          </Card>
        </router-link>
      </div>
    </div>
  </section>
</template>
