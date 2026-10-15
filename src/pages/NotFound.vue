<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRental } from '../composables/useRental'

const { rental, rentalLink } = useRental()

useHead({
  title: computed(() => `Halaman Tidak Ditemukan - ${rental.value.name}`),
  meta: [{ name: 'description', content: 'Halaman yang Anda cari tidak ditemukan.' }]
})
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl font-extrabold text-brand-600 mb-2">404</h1>
    <h2 class="text-2xl font-bold text-slate-800 mb-4">Halaman Tidak Ditemukan</h2>
    <p class="text-slate-600 mb-6 max-w-md">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
    <div class="flex flex-wrap gap-4 justify-center">
      <router-link :to="rentalLink('/')" class="px-5 py-2.5 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition">
        Kembali ke Beranda
      </router-link>
      <router-link :to="rentalLink('/armada')" class="px-5 py-2.5 bg-slate-200 text-slate-800 font-medium rounded-lg hover:bg-slate-300 transition">
        Lihat Armada
      </router-link>
    </div>
  </div>
</template>
