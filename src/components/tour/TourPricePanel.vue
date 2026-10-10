<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { calculateTourPrice } from '../../lib/pricing'
import { formatCurrency } from '../../lib/format'
import { getTodayString, getTomorrowString } from '../../lib/dates'
import { useBookingDraft } from '../../composables/useBookingDraft'
import Button from '../ui/Button.vue'
import { Calendar, Users, ArrowRight, Info } from 'lucide-vue-next'

const props = defineProps({
  tour: {
    type: Object,
    required: true
  },
  initialStartDate: {
    type: String,
    default: ''
  },
  initialPax: {
    type: Number,
    default: 0
  }
})

const router = useRouter()
const { saveDraft } = useBookingDraft()

const today = getTodayString()
const defaultStart = props.initialStartDate || getTomorrowString()

const startDate = ref(defaultStart)
const pax = ref(props.initialPax && props.initialPax >= props.tour.minPax ? props.initialPax : props.tour.minPax)

// Pricing calculation
const pricing = computed(() => {
  return calculateTourPrice(props.tour, pax.value)
})

function handleBookNow() {
  const draft = {
    kind: 'paket',
    itemSlug: props.tour.slug,
    startDate: startDate.value,
    pax: pax.value,
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
        <span class="text-xs font-semibold text-slate-400 block mb-0.5">Harga Per Orang</span>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-extrabold text-brand-600">
            {{ formatCurrency(pricing.pricePerPerson) }}
          </span>
          <span class="text-xs text-slate-500 font-medium">/orang</span>
        </div>
      </div>
      <div class="text-right">
        <span class="text-[11px] text-slate-400 block mb-0.5">Batas Peserta</span>
        <span class="text-xs font-bold text-slate-700">{{ tour.minPax }} - {{ tour.maxPax }} Pax</span>
      </div>
    </div>

    <!-- Date & Pax Selection Form -->
    <div class="space-y-4 text-xs">
      <!-- Departure Date Input -->
      <div>
        <label for="tour-start-date" class="block font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
          <Calendar class="w-3.5 h-3.5 text-brand-600" />
          <span>Tanggal Berangkat</span>
        </label>
        <input
          id="tour-start-date"
          type="date"
          v-model="startDate"
          :min="today"
          class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <!-- Pax Counter Input -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <label for="tour-pax" class="font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Users class="w-3.5 h-3.5 text-brand-600" />
            <span>Jumlah Peserta</span>
          </label>
          <span class="text-[11px] text-slate-400">Min. {{ tour.minPax }} — Maks. {{ tour.maxPax }}</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="pax = Math.max(tour.minPax, pax - 1)"
            :disabled="pax <= tour.minPax"
            class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none transition-colors"
          >
            -
          </button>
          <input
            id="tour-pax"
            type="number"
            :min="tour.minPax"
            :max="tour.maxPax"
            v-model.number="pax"
            class="w-full text-center px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="button"
            @click="pax = Math.min(tour.maxPax, pax + 1)"
            :disabled="pax >= tour.maxPax"
            class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Tier Explanation Table -->
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
      <div class="font-bold text-slate-700 flex items-center gap-1 mb-1">
        <Info class="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <span>Skema Harga Per Orang (Sesuai Jumlah Peserta)</span>
      </div>
      <div v-for="(tier, idx) in tour.priceTiers" :key="idx" class="flex justify-between text-slate-600">
        <span>{{ tier.minPax }}–{{ tier.maxPax }} Peserta</span>
        <span class="font-semibold text-slate-800">{{ formatCurrency(tier.pricePerPerson) }}/pax</span>
      </div>
    </div>

    <!-- Pricing Estimation Breakdown Lines -->
    <div class="pt-4 border-t border-slate-100 space-y-2 bg-slate-50/70 p-4 rounded-xl">
      <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
        Rincian Estimasi
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
      @click="handleBookNow"
      class="shadow-md shadow-brand-600/20"
    >
      <span>Pesan Paket Wisata</span>
      <ArrowRight class="w-4 h-4" />
    </Button>

    <!-- Mobile Sticky Fixed Bottom Bar (FR-5.4) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-40 flex items-center justify-between gap-4">
      <div>
        <span class="text-[10px] text-slate-400 font-semibold block leading-none">Total Estimasi ({{ pax }} Pax)</span>
        <span class="text-lg font-extrabold text-brand-600 block">{{ formatCurrency(pricing.total) }}</span>
      </div>

      <Button
        variant="primary"
        size="md"
        @click="handleBookNow"
        class="shrink-0 shadow-md"
      >
        <span>Pesan Paket</span>
        <ArrowRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
