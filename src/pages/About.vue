<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRental } from '../composables/useRental'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import { Car, ShieldCheck, HeartHandshake, Award, Clock, History, Target, Sparkles } from 'lucide-vue-next'

const { rental } = useRental()

useHead({
  title: computed(() => `Tentang Kami - ${rental.value.name}`),
  meta: [
    { name: 'description', content: computed(() => rental.value.about) }
  ]
})

const values = [
  {
    icon: ShieldCheck,
    title: 'Keamanan & Kenyamanan',
    description: 'Setiap unit kendaraan rutin diinspeksi secara menyeluruh sebelum dan sesudah digunakan.'
  },
  {
    icon: HeartHandshake,
    title: 'Harga Jujur & Transparan',
    description: 'Tanpa biaya tersembunyi. Semua harga sewa dan opsi layanan tertulis secara terbuka.'
  },
  {
    icon: Clock,
    title: 'Ketepatan Waktu',
    description: 'Layanan antar-jemput tepat waktu di bandara, stasiun, hotel, maupun lokasi pilihan Anda.'
  },
  {
    icon: Award,
    title: 'Layanan Profesional',
    description: 'Tim customer service dan driver ramah yang mengutamakan kepuasan perjalanan Anda.'
  }
]
</script>

<template>
  <div class="py-8 bg-slate-50 min-h-[85vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div class="max-w-2xl relative z-10 space-y-4">
          <Badge variant="accent">
            <Sparkles class="w-3 h-3 fill-current" />
            <span>Profil Perusahaan</span>
          </Badge>
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Mengenal Lebih Dekat {{ rental.name }}
          </h1>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            {{ rental.tagline }}
          </p>
        </div>
      </div>

      <!-- About & Vision Section (FR-7.1) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card padding="lg" class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Car class="w-6 h-6" />
          </div>
          <h2 class="text-2xl font-bold text-slate-900">Tentang Kami</h2>
          <p class="text-slate-600 text-sm leading-relaxed">
            {{ rental.about }}
          </p>
        </Card>

        <Card padding="lg" class="space-y-4 bg-brand-50/50 border-brand-100">
          <div class="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center">
            <Target class="w-6 h-6" />
          </div>
          <h2 class="text-2xl font-bold text-slate-900">Visi & Misi Layanan</h2>
          <p class="text-slate-700 text-sm leading-relaxed font-medium">
            {{ rental.vision }}
          </p>
        </Card>
      </div>

      <!-- Values Grid -->
      <div class="space-y-6">
        <div class="text-center max-w-xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">Prinsip Kami</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Nilai Utama Layanan</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card v-for="(val, idx) in values" :key="idx" hoverable padding="normal" class="space-y-3">
            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <component :is="val.icon" class="w-5 h-5" />
            </div>
            <h3 class="text-base font-bold text-slate-800">{{ val.title }}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">{{ val.description }}</p>
          </Card>
        </div>
      </div>

      <!-- Timeline History Section (FR-7.1) -->
      <div v-if="rental.history && rental.history.length > 0" class="space-y-8 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <History class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-2xl font-extrabold text-slate-900">Perjalanan Singkat Kami</h2>
            <span class="text-xs text-slate-500 font-medium">Jejak langkah perkembangan {{ rental.shortName || 'Gerayana' }} Rent dari waktu ke waktu</span>
          </div>
        </div>

        <div class="relative border-l-2 border-brand-200 ml-4 pl-6 space-y-8">
          <div
            v-for="(item, idx) in rental.history"
            :key="idx"
            class="relative group"
          >
            <!-- Timeline dot -->
            <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-white shadow-xs" />
            <div class="space-y-1">
              <span class="inline-block px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-extrabold rounded-md">
                Tahun {{ item.year }}
              </span>
              <h3 class="text-lg font-bold text-slate-800">{{ item.title }}</h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
