<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import locationsData from '../../data/locations.json'
import companyData from '../../data/company.json'
import { calculateVehiclePrice } from '../../lib/pricing'
import { isVehicleAvailable } from '../../lib/availability'
import { formatCurrency } from '../../lib/format'
import { getTodayString, getTomorrowString, addDaysString } from '../../lib/dates'
import { useBookingDraft } from '../../composables/useBookingDraft'
import Button from '../ui/Button.vue'
import { Calendar, MapPin, Clock, UserCheck, PlusCircle, AlertCircle, ArrowRight, ShieldAlert } from 'lucide-vue-next'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  initialStartDate: {
    type: String,
    default: ''
  },
  initialEndDate: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const { saveDraft } = useBookingDraft()

const today = getTodayString()
const defaultStart = props.initialStartDate || getTomorrowString()
const defaultEnd = props.initialEndDate || addDaysString(defaultStart, 1)

const startDate = ref(defaultStart)
const endDate = ref(defaultEnd)
const locationId = ref(locationsData.length > 0 ? locationsData[0].id : '')
const pickupTime = ref('08:00')
const withDriver = ref(false)
const selectedExtras = ref([])

// Operating hours slots per 30 minutes
const timeSlots = computed(() => {
  const open = companyData.operatingHours.openHour || 7
  const close = companyData.operatingHours.closeHour || 21
  const slots = []
  for (let h = open; h <= close; h++) {
    const hourStr = String(h).padStart(2, '0')
    slots.push(`${hourStr}:00`)
    if (h < close) slots.push(`${hourStr}:30`)
  }
  return slots
})

// Auto-adjust endDate if startDate > endDate
watch(startDate, (newStart) => {
  if (endDate.value < newStart) {
    endDate.value = addDaysString(newStart, 1)
  }
})

// Calculate Pricing
const pricing = computed(() => {
  return calculateVehiclePrice(props.vehicle, {
    startDate: startDate.value,
    endDate: endDate.value,
    withDriver: withDriver.value,
    selectedExtras: selectedExtras.value
  })
})

// Check Date Availability
const isAvailable = computed(() => {
  return isVehicleAvailable(props.vehicle.bookedRanges, startDate.value, endDate.value)
})

function handleBookNow() {
  if (!isAvailable.value) return

  const draft = {
    kind: 'armada',
    itemSlug: props.vehicle.slug,
    startDate: startDate.value,
    endDate: endDate.value,
    pickupLocationId: locationId.value,
    pickupTime: pickupTime.value,
    withDriver: withDriver.value,
    extraIds: selectedExtras.value,
    customer: { name: '', whatsapp: '', email: '', notes: '' },
    agreed: false
  }

  saveDraft(draft)
  router.push('/pesan')
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-lg space-y-6 sticky top-24">
    <!-- Header Price Badge -->
    <div class="pb-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <span class="text-xs font-semibold text-slate-400 block mb-0.5">Harga Sewa Harian</span>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-extrabold text-brand-600">
            {{ formatCurrency(vehicle.pricePerDay) }}
          </span>
          <span class="text-xs text-slate-500 font-medium">/hari</span>
        </div>
      </div>
      <div v-if="vehicle.deposit" class="text-right">
        <span class="text-[11px] text-slate-400 block mb-0.5">Deposit (Dummy)</span>
        <span class="text-xs font-bold text-slate-700">{{ formatCurrency(vehicle.deposit) }}</span>
      </div>
    </div>

    <!-- Date Conflict Warning Alert (FR-4.4) -->
    <div
      v-if="!isAvailable"
      class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold space-y-1"
    >
      <div class="flex items-center gap-2 text-red-800 font-bold">
        <ShieldAlert class="w-4 h-4 shrink-0 text-red-600" />
        <span>Kendaraan Tidak Tersedia</span>
      </div>
      <p>
        Maaf, unit ini sudah dipesan pada rentang tanggal yang Anda pilih. Silakan pilih tanggal lain.
      </p>
    </div>

    <!-- Date & Location Selection Form -->
    <div class="space-y-4 text-xs">
      <!-- Dates Inputs Grid -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="detail-start-date" class="block font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Calendar class="w-3.5 h-3.5 text-brand-600" />
            <span>Tgl Ambil</span>
          </label>
          <input
            id="detail-start-date"
            type="date"
            v-model="startDate"
            :min="today"
            class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label for="detail-end-date" class="block font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Calendar class="w-3.5 h-3.5 text-brand-600" />
            <span>Tgl Kembali</span>
          </label>
          <input
            id="detail-end-date"
            type="date"
            v-model="endDate"
            :min="startDate || today"
            class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <!-- Location & Time Grid -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="detail-location" class="block font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <MapPin class="w-3.5 h-3.5 text-brand-600" />
            <span>Lokasi Ambil</span>
          </label>
          <select
            id="detail-location"
            v-model="locationId"
            class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 truncate"
          >
            <option v-for="loc in locationsData" :key="loc.id" :value="loc.id">
              {{ loc.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="detail-time" class="block font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Clock class="w-3.5 h-3.5 text-brand-600" />
            <span>Jam Ambil</span>
          </label>
          <select
            id="detail-time"
            v-model="pickupTime"
            class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option v-for="time in timeSlots" :key="time" :value="time">
              {{ time }} WIB
            </option>
          </select>
        </div>
      </div>

      <!-- Driver Option (If available for vehicle) -->
      <div v-if="vehicle.driverPerDay" class="pt-2 border-t border-slate-100">
        <label class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100 transition-colors">
          <div class="flex items-center gap-2">
            <UserCheck class="w-4 h-4 text-brand-600" />
            <div>
              <span class="font-bold text-slate-800 block text-xs">Tambah Driver Professional</span>
              <span class="text-[11px] text-slate-500">+ {{ formatCurrency(vehicle.driverPerDay) }}/hari</span>
            </div>
          </div>
          <input
            type="checkbox"
            v-model="withDriver"
            class="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
          />
        </label>
      </div>

      <!-- Extras Options (If available) -->
      <div v-if="vehicle.extras && vehicle.extras.length > 0" class="space-y-2 pt-2 border-t border-slate-100">
        <span class="block font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <PlusCircle class="w-3.5 h-3.5 text-brand-600" />
          <span>Opsi Layanan Tambahan</span>
        </span>
        <div class="space-y-1.5">
          <label
            v-for="extra in vehicle.extras"
            :key="extra.id"
            class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100 transition-colors text-xs"
          >
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                :value="extra.id"
                v-model="selectedExtras"
                class="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded"
              />
              <span class="font-medium text-slate-800">{{ extra.label }}</span>
            </div>
            <span class="font-semibold text-slate-600">+ {{ formatCurrency(extra.pricePerDay) }}/hari</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Pricing Estimation Breakdown Lines -->
    <div class="pt-4 border-t border-slate-100 space-y-2 bg-slate-50/70 p-4 rounded-xl">
      <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
        Rincian Estimasi ({{ pricing.days }} Hari)
      </span>
      <div v-for="(line, idx) in pricing.lines" :key="idx" class="flex items-center justify-between text-xs text-slate-600">
        <span class="truncate pr-2">{{ line.label }}</span>
        <span class="font-semibold text-slate-800 whitespace-nowrap">{{ formatCurrency(line.amount) }}</span>
      </div>

      <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-slate-900">
        <span>Total Estimasi</span>
        <span class="text-base font-extrabold text-brand-600">{{ formatCurrency(pricing.total) }}</span>
      </div>
      <span class="block text-[10px] text-slate-400 text-right italic">*Harga bersifat estimasi</span>
    </div>

    <!-- Book Now Button (Desktop) -->
    <Button
      variant="primary"
      size="lg"
      block
      :disabled="!isAvailable"
      @click="handleBookNow"
      class="shadow-md shadow-brand-600/20"
    >
      <span>Pesan Sekarang</span>
      <ArrowRight class="w-4 h-4" />
    </Button>

    <!-- Mobile Sticky Fixed Bottom Bar (FR-4.5) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-40 flex items-center justify-between gap-4">
      <div>
        <span class="text-[10px] text-slate-400 font-semibold block leading-none">Total Estimasi ({{ pricing.days }} Hari)</span>
        <span class="text-lg font-extrabold text-brand-600 block">{{ formatCurrency(pricing.total) }}</span>
      </div>

      <Button
        variant="primary"
        size="md"
        :disabled="!isAvailable"
        @click="handleBookNow"
        class="shrink-0 shadow-md"
      >
        <span>Pesan Sekarang</span>
        <ArrowRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
