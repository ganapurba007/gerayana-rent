<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import vehiclesData from '../../data/vehicles.json'
import toursData from '../../data/tours.json'
import locationsData from '../../data/locations.json'
import { calculateVehiclePrice, calculateTourPrice } from '../../lib/pricing'
import { formatCurrency, formatDate } from '../../lib/format'
import Button from '../ui/Button.vue'
import Card from '../ui/Card.vue'
import { Car, Compass, Calendar, MapPin, Clock, ArrowRight, AlertCircle, UserCheck } from 'lucide-vue-next'

const props = defineProps({
  draft: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['next', 'updateDraft'])

const router = useRouter()

// Resolved Item details (vehicle or tour)
const itemDetails = computed(() => {
  if (!props.draft || !props.draft.itemSlug) return null

  if (props.draft.kind === 'armada') {
    const vehicle = vehiclesData.find(v => v.slug === props.draft.itemSlug)
    if (!vehicle) return null
    const locationObj = locationsData.find(l => l.id === props.draft.pickupLocationId)
    const pricing = calculateVehiclePrice(vehicle, {
      startDate: props.draft.startDate,
      endDate: props.draft.endDate,
      withDriver: props.draft.withDriver,
      selectedExtras: props.draft.extraIds || []
    })
    return {
      type: 'armada',
      name: vehicle.name,
      image: vehicle.images[0],
      locationName: locationObj ? locationObj.name : props.draft.pickupLocationId,
      pricing,
      vehicle
    }
  } else {
    const tour = toursData.find(t => t.slug === props.draft.itemSlug)
    if (!tour) return null
    const pricing = calculateTourPrice(tour, props.draft.pax)
    return {
      type: 'paket',
      title: tour.title,
      image: tour.images[0],
      pricing,
      tour
    }
  }
})
</script>

<template>
  <!-- Empty State if no item selected in draft (FR-6.2) -->
  <div v-if="!itemDetails" class="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
    <div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
      <AlertCircle class="w-8 h-8" />
    </div>

    <h3 class="text-xl font-bold text-slate-800">
      Belum Ada Kendaraan / Paket Dipiih
    </h3>

    <p class="text-slate-600 text-sm leading-relaxed">
      Silakan pilih armada kendaraan atau paket wisata terlebih dahulu untuk melanjutkan proses pemesanan.
    </p>

    <div class="flex flex-wrap gap-3 justify-center pt-2">
      <router-link to="/armada">
        <Button variant="primary" size="md">
          <Car class="w-4 h-4" />
          <span>Pilih Armada</span>
        </Button>
      </router-link>

      <router-link to="/paket-wisata">
        <Button variant="secondary" size="md">
          <Compass class="w-4 h-4" />
          <span>Pilih Paket Wisata</span>
        </Button>
      </router-link>
    </div>
  </div>

  <!-- Step 1 Order Summary & Review (FR-6.2) -->
  <div v-else class="space-y-6">
    <Card padding="normal" class="space-y-6">
      <!-- Item Info Header -->
      <div class="flex flex-col sm:flex-row items-start gap-4 pb-6 border-b border-slate-100">
        <img
          :src="itemDetails.image"
          :alt="itemDetails.name || itemDetails.title"
          class="w-full sm:w-32 aspect-16/10 rounded-xl object-cover border border-slate-200 shrink-0"
        />
        <div class="space-y-1">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-600">
            {{ itemDetails.type === 'armada' ? 'Sewa Kendaraan' : 'Paket Wisata' }}
          </span>
          <h2 class="text-xl font-extrabold text-slate-900">
            {{ itemDetails.name || itemDetails.title }}
          </h2>
          <p v-if="itemDetails.type === 'armada'" class="text-xs text-slate-500 font-medium">
            {{ itemDetails.vehicle.brand }} (Tahun {{ itemDetails.vehicle.year }}) — {{ itemDetails.vehicle.transmission }}
          </p>
          <p v-else class="text-xs text-slate-500 font-medium">
            {{ itemDetails.tour.durationDays }} Hari — Batas {{ itemDetails.tour.minPax }}–{{ itemDetails.tour.maxPax }} Pax
          </p>
        </div>
      </div>

      <!-- Schedule & Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div v-if="itemDetails.type === 'armada'" class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
          <span class="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">Jadwal Sewa Armada:</span>
          <div class="flex items-center gap-2 text-slate-800 font-medium">
            <Calendar class="w-4 h-4 text-brand-600 shrink-0" />
            <span>{{ formatDate(draft.startDate) }} s/d {{ formatDate(draft.endDate) }} ({{ itemDetails.pricing.days }} Hari)</span>
          </div>
          <div class="flex items-center gap-2 text-slate-800 font-medium">
            <Clock class="w-4 h-4 text-brand-600 shrink-0" />
            <span>Jam Penjemputan: {{ draft.pickupTime || '08:00' }} WIB</span>
          </div>
          <div class="flex items-center gap-2 text-slate-800 font-medium">
            <MapPin class="w-4 h-4 text-brand-600 shrink-0" />
            <span>Lokasi: {{ itemDetails.locationName }}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-800 font-medium pt-1">
            <UserCheck class="w-4 h-4 text-brand-600 shrink-0" />
            <span>{{ draft.withDriver ? 'Dengan Driver Professional' : 'Sewa Lepas Kunci' }}</span>
          </div>
        </div>

        <div v-else class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
          <span class="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">Jadwal Tour Wisata:</span>
          <div class="flex items-center gap-2 text-slate-800 font-medium">
            <Calendar class="w-4 h-4 text-brand-600 shrink-0" />
            <span>Tanggal Berangkat: {{ formatDate(draft.startDate) }}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-800 font-medium">
            <UserCheck class="w-4 h-4 text-brand-600 shrink-0" />
            <span>Jumlah Peserta: {{ draft.pax }} Orang</span>
          </div>
        </div>

        <!-- Price Breakdown Line -->
        <div class="bg-brand-50/60 p-4 rounded-xl border border-brand-100 space-y-2">
          <span class="font-bold text-brand-900 block uppercase tracking-wider text-[11px]">Rincian Estimasi:</span>
          <div v-for="(line, idx) in itemDetails.pricing.lines" :key="idx" class="flex justify-between text-slate-700">
            <span>{{ line.label }}</span>
            <span class="font-semibold">{{ formatCurrency(line.amount) }}</span>
          </div>
          <div class="pt-2 border-t border-brand-200/60 flex justify-between font-extrabold text-sm text-brand-900">
            <span>Total Estimasi</span>
            <span class="text-base text-brand-600">{{ formatCurrency(itemDetails.pricing.total) }}</span>
          </div>
        </div>
      </div>
    </Card>

    <!-- Action Button -->
    <div class="flex justify-end">
      <Button variant="primary" size="lg" @click="$emit('next')">
        <span>Lanjut ke Data Pemesan (Langkah 2)</span>
        <ArrowRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
