<script setup>
import homeData from '../../data/home.json'
import { useRental } from '../../composables/useRental'
import Card from '../ui/Card.vue'
import { Zap, MapPin, ShieldCheck } from 'lucide-vue-next'

const { rental } = useRental()
const benefits = homeData.benefits || []

const iconMap = {
  Zap,
  MapPin,
  ShieldCheck
}
</script>

<template>
  <section class="pt-32 sm:pt-36 pb-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
          Keunggulan Kami
        </span>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Kenapa Memilih {{ rental.shortName || 'Gerayana' }} Rent?
        </h2>
        <p class="text-slate-600 text-sm sm:text-base mt-3">
          Komitmen kami adalah memberikan kemudahan, keamanan, dan kenyamanan bertransaksi tanpa ribet.
        </p>
      </div>

      <!-- 3 Benefits Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="(item, idx) in benefits"
          :key="idx"
          hoverable
          class="flex flex-col items-start text-left group"
        >
          <div class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center mb-6 transition-colors shadow-sm">
            <component :is="iconMap[item.icon] || ShieldCheck" class="w-7 h-7" />
          </div>

          <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors">
            {{ item.title }}
          </h3>

          <p class="text-slate-600 text-sm leading-relaxed">
            {{ item.description }}
          </p>
        </Card>
      </div>
    </div>
  </section>
</template>
