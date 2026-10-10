<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import vehiclesData from '../data/vehicles.json'
import VehicleGallery from '../components/vehicle/VehicleGallery.vue'
import VehiclePricePanel from '../components/vehicle/VehiclePricePanel.vue'
import VehicleCard from '../components/vehicle/VehicleCard.vue'
import NotFound from './NotFound.vue'
import Badge from '../components/ui/Badge.vue'
import Card from '../components/ui/Card.vue'
import {
  Users, Gauge, Fuel, Briefcase, Zap, CheckCircle2, XCircle, ShieldCheck, FileText, Info
} from 'lucide-vue-next'

const route = useRoute()
const slug = computed(() => route.params.slug)

// Find matching vehicle
const vehicle = computed(() => {
  return vehiclesData.find(v => v.slug === slug.value)
})

// Similar vehicles (max 3, same category or type)
const similarVehicles = computed(() => {
  if (!vehicle.value) return []
  return vehiclesData
    .filter(v => v.id !== vehicle.value.id && v.category === vehicle.value.category)
    .slice(0, 3)
})

// SEO Head setup
useHead({
  title: computed(() => vehicle.value ? `Sewa ${vehicle.value.name} - Gerayana Rental & Trip` : 'Kendaraan Tidak Ditemukan'),
  meta: [
    { name: 'description', content: computed(() => vehicle.value?.description || '') }
  ]
})
</script>

<template>
  <!-- 404 Fallback if vehicle slug not found (FR-4.7) -->
  <NotFound v-if="!vehicle" />

  <!-- Vehicle Detail Content -->
  <div v-else class="py-8 bg-slate-50 min-h-[85vh] pb-24 lg:pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Top Title Header -->
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <Badge variant="brand">{{ vehicle.brand }}</Badge>
            <Badge variant="neutral">Tahun {{ vehicle.year }}</Badge>            <Badge v-if="vehicle.featured" variant="accent">
              <Zap class="w-3 h-3 fill-current" />
              <span>Unggulan</span>
            </Badge>
          </div>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {{ vehicle.name }}
          </h1>
        </div>
      </div>

      <!-- Main Two-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Left Column: Gallery & Details (2 Cols) -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Gallery (FR-4.1) -->
          <VehicleGallery :images="vehicle.images" :alt="vehicle.name" />

          <!-- Description -->
          <Card padding="normal" class="space-y-3">
            <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Info class="w-5 h-5 text-brand-600" />
              <span>Deskripsi Kendaraan</span>
            </h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              {{ vehicle.description }}
            </p>
          </Card>

          <!-- Specifications Grid -->
          <Card padding="normal" class="space-y-4">
            <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Spesifikasi Utama
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <Users class="w-5 h-5 text-brand-600" />
                <span class="text-slate-400 block font-medium">Kapasitas</span>
                <span class="text-slate-800 font-bold block text-sm">{{ vehicle.seats }} Penumpang</span>
              </div>

              <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <Gauge class="w-5 h-5 text-brand-600" />
                <span class="text-slate-400 block font-medium">Transmisi</span>
                <span class="text-slate-800 font-bold block text-sm">{{ vehicle.transmission }}</span>
              </div>

              <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <Fuel class="w-5 h-5 text-brand-600" />
                <span class="text-slate-400 block font-medium">Bahan Bakar</span>
                <span class="text-slate-800 font-bold block text-sm">{{ vehicle.fuel }}</span>
              </div>

              <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <Briefcase class="w-5 h-5 text-brand-600" />
                <span class="text-slate-400 block font-medium">{{ vehicle.type === 'mobil' ? 'Bagasi' : 'Kapasitas Mesin' }}</span>
                <span class="text-slate-800 font-bold block text-sm">
                  {{ vehicle.type === 'mobil' ? (vehicle.luggage || '2 Koper') : `${vehicle.engineCc} cc` }}
                </span>
              </div>
            </div>

            <!-- Features Chips -->
            <div class="pt-3 border-t border-slate-100 space-y-2">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Fitur & Fasilitas:</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(feat, idx) in vehicle.features"
                  :key="idx"
                  class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200"
                >
                  ✓ {{ feat }}
                </span>
              </div>
            </div>
          </Card>

          <!-- Includes & Excludes (FR-4.3) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Includes -->
            <Card padding="normal" class="space-y-3 border-emerald-100">
              <h3 class="text-base font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Sudah Termasuk</span>
              </h3>
              <ul class="space-y-2 text-xs text-slate-600">
                <li v-for="(inc, idx) in vehicle.includes" :key="idx" class="flex items-start gap-2">
                  <span class="text-emerald-500 font-bold">✓</span>
                  <span>{{ inc }}</span>
                </li>
              </ul>
            </Card>

            <!-- Excludes -->
            <Card padding="normal" class="space-y-3 border-red-100">
              <h3 class="text-base font-bold text-red-800 flex items-center gap-2">
                <XCircle class="w-5 h-5 text-red-500 shrink-0" />
                <span>Belum Termasuk</span>
              </h3>
              <ul class="space-y-2 text-xs text-slate-600">
                <li v-for="(exc, idx) in vehicle.excludes" :key="idx" class="flex items-start gap-2">
                  <span class="text-red-400 font-bold">✗</span>
                  <span>{{ exc }}</span>
                </li>
              </ul>
            </Card>
          </div>

          <!-- Rental Terms & Documents Summary (FR-4.3) -->
          <Card padding="normal" class="space-y-4 bg-gradient-to-r from-slate-900 to-brand-950 text-white border-0">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <FileText class="w-5 h-5 text-accent-400" />
              <span>Syarat & Ketentuan Sewa Ringkas</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div class="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span class="font-bold text-white block mb-1">1. Identitas Resmi</span>
                <span>Foto KTP asli & SIM A/C aktif berlaku.</span>
              </div>

              <div class="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span class="font-bold text-white block mb-1">2. Verifikasi Wisatawan</span>
                <span>Bukti menginap di hotel/tiket pesawat bagi luar kota.</span>
              </div>

              <div class="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span class="font-bold text-white block mb-1">3. Jaminan Deposit</span>
                <span>Deposit (dummy) dikembalikan 1x24j pasca sewa.</span>
              </div>
            </div>
          </Card>
        </div>

        <!-- Right Column: Interactive Price & Booking Panel (1 Col) -->
        <div class="lg:col-span-1">
          <VehiclePricePanel
            :vehicle="vehicle"
            :initial-start-date="route.query.ambil"
            :initial-end-date="route.query.kembali"
          />
        </div>
      </div>

      <!-- Section Similar Vehicles (FR-4.6) -->
      <div v-if="similarVehicles.length > 0" class="pt-8 border-t border-slate-200">
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
          Armada Serupa Pilihan Lainnya
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <VehicleCard
            v-for="sim in similarVehicles"
            :key="sim.id"
            :vehicle="sim"
          />
        </div>
      </div>
    </div>
  </div>
</template>
