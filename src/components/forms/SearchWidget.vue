<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRental } from '../../composables/useRental'
import locationsData from '../../data/locations.json'
import { getTodayString, getTomorrowString, addDaysString } from '../../lib/dates'
import Button from '../ui/Button.vue'
import { Car, Bike, MapPin, Calendar, Search, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  initialType: {
    type: String,
    default: 'mobil'
  },
  initialLocation: {
    type: String,
    default: 'bandara'
  },
  initialStartDate: {
    type: String,
    default: ''
  },
  initialEndDate: {
    type: String,
    default: ''
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const { rentalLink } = useRental()

const type = ref(props.initialType || 'mobil')
const locationId = ref(props.initialLocation || (locationsData.length > 0 ? locationsData[0].id : ''))

const today = getTodayString()
const defaultStart = getTomorrowString()
const defaultEnd = addDaysString(defaultStart, 1)

const startDate = ref(props.initialStartDate || defaultStart)
const endDate = ref(props.initialEndDate || defaultEnd)
const errorMessage = ref('')

// Ensure endDate >= startDate when startDate changes
watch(startDate, (newStart) => {
  if (endDate.value < newStart) {
    endDate.value = addDaysString(newStart, 1)
  }
  validateDates()
})

watch(endDate, () => {
  validateDates()
})

function validateDates() {
  if (!startDate.value) {
    errorMessage.value = 'Tanggal ambil wajib diisi'
    return false
  }
  if (!endDate.value) {
    errorMessage.value = 'Tanggal kembali wajib diisi'
    return false
  }
  if (startDate.value < today) {
    errorMessage.value = 'Tanggal ambil tidak boleh di masa lalu'
    return false
  }
  if (endDate.value < startDate.value) {
    errorMessage.value = 'Tanggal kembali tidak boleh sebelum tanggal ambil'
    return false
  }
  errorMessage.value = ''
  return true
}

function handleSearch() {
  if (!validateDates()) return

  router.push({
    path: rentalLink('/armada'),
    query: {
      type: type.value,
      lokasi: locationId.value,
      ambil: startDate.value,
      kembali: endDate.value
    }
  })
}
</script>

<template>
  <div :class="['bg-white rounded-2xl shadow-2xl shadow-slate-900/15 border border-slate-200/90 p-5 sm:p-6 text-slate-800 ring-1 ring-slate-900/5', compact ? 'p-4 shadow-md' : '']">
    <!-- Type Selection Tabs (Mobil / Motor) -->
    <div class="flex items-center gap-2 mb-5 border-b border-slate-100 pb-4">
      <button
        type="button"
        @click="type = 'mobil'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none',
          type === 'mobil'
            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        ]"
      >
        <Car class="w-4 h-4 shrink-0" />
        <span>Sewa Mobil</span>
      </button>

      <button
        type="button"
        @click="type = 'motor'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all focus:outline-none',
          type === 'motor'
            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        ]"
      >
        <Bike class="w-4 h-4 shrink-0" />
        <span>Sewa Motor</span>
      </button>
    </div>

    <!-- Error Alert if any -->
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
      <AlertCircle class="w-4 h-4 shrink-0 text-red-500" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Search Form Controls Grid -->
    <form @submit.prevent="handleSearch" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <!-- Location Select -->
      <div class="space-y-1.5">
        <label for="search-location" class="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <MapPin class="w-3.5 h-3.5 text-brand-600" />
          <span>Lokasi Ambil</span>
        </label>
        <select
          id="search-location"
          v-model="locationId"
          class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all min-h-[44px]"
        >
          <option v-for="loc in locationsData" :key="loc.id" :value="loc.id">
            {{ loc.name }}
          </option>
        </select>
      </div>

      <!-- Start Date Input -->
      <div class="space-y-1.5">
        <label for="search-start-date" class="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Calendar class="w-3.5 h-3.5 text-brand-600" />
          <span>Tanggal Ambil</span>
        </label>
        <input
          id="search-start-date"
          type="date"
          v-model="startDate"
          :min="today"
          class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all min-h-[44px]"
        />
      </div>

      <!-- End Date Input -->
      <div class="space-y-1.5">
        <label for="search-end-date" class="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Calendar class="w-3.5 h-3.5 text-brand-600" />
          <span>Tanggal Kembali</span>
        </label>
        <input
          id="search-end-date"
          type="date"
          v-model="endDate"
          :min="startDate || today"
          class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all min-h-[44px]"
        />
      </div>

      <!-- Submit Button -->
      <div>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          block
          class="shadow-lg shadow-accent-500/20"
        >
          <Search class="w-4 h-4 shrink-0" />
          <span>Cari Kendaraan</span>
        </Button>
      </div>
    </form>
  </div>
</template>
