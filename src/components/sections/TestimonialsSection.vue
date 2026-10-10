<script setup>
import testimonialsData from '../../data/testimonials.json'
import Card from '../ui/Card.vue'
import { Quote, Star } from 'lucide-vue-next'
</script>

<template>
  <section class="py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
          Ulasan Pelanggan
        </span>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Apa Kata Pengguna Gerayana Rent?
        </h2>
        <p class="text-slate-600 text-sm sm:text-base mt-3">
          Pengalaman nyata dari pelanggan yang telah menyewa kendaraan dan menikmati paket wisata kami.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="item in testimonialsData"
          :key="item.id"
          class="flex flex-col justify-between relative"
        >
          <Quote class="w-10 h-10 text-brand-100 absolute top-4 right-4 pointer-events-none" />

          <!-- Rating Stars -->
          <div class="flex items-center gap-1 mb-4 text-amber-400">
            <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
          </div>

          <!-- Quote Text -->
          <p class="text-slate-700 text-sm leading-relaxed italic mb-6 relative z-10">
            "{{ item.quote }}"
          </p>

          <!-- Customer Info -->
          <div class="flex items-center gap-3.5 pt-4 border-t border-slate-100">
            <img
              :src="item.avatar"
              :alt="item.name"
              class="w-11 h-11 rounded-full object-cover border border-slate-200"
              loading="lazy"
            />
            <div>
              <h4 class="text-sm font-bold text-slate-900 leading-none">
                {{ item.name }}
              </h4>
              <span class="text-xs text-brand-600 font-semibold block mt-1">
                {{ item.service }}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
