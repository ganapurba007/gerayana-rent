<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../ui/Card.vue'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import { formatCurrency } from '../../lib/format'
import { isVehicleAvailable } from '../../lib/availability'
import { Users, Gauge, Fuel, Briefcase, Zap, Calendar, ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  startDate: {
    type: String,
    default: ''
  },
  endDate: {
    type: String,
    default: ''
  }
})

const router = useRouter()

const isAvailable = computed(() => {
  if (!props.startDate || !props.endDate) return true
  return isVehicleAvailable(props.vehicle.bookedRanges, props.startDate, props.endDate)
})

function goToDetail() {
  router.push(`/armada/${props.vehicle.slug}`)
}

function handleBookNow() {
  if (!isAvailable.value) return
  router.push({
    path: `/armada/${props.vehicle.slug}`,
    query: {
      ambil: props.startDate || undefined,
      kembali: props.endDate || undefined
    }
  })
}
</script>

<template>
  <Card hoverable padding="none" class="flex flex-col h-full group border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
    <!-- Image & Badges Container -->
    <div class="relative aspect-16/10 overflow-hidden bg-slate-50 border-b border-slate-100">
      <img
        :src="vehicle.images[0]"
        :alt="vehicle.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Badges top left -->
      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
        <span
          v-if="vehicle.featured"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500 text-white text-[11px] font-bold rounded-full shadow-xs"
        >
          <Zap class="w-3 h-3 fill-current" />
          <span>Unggulan</span>
        </span>
        <span
          class="inline-flex items-center px-2 py-0.5 bg-white/90 backdrop-blur-xs text-slate-700 text-[11px] font-semibold rounded-full shadow-xs border border-slate-200/60"
        >
          {{ vehicle.year }}
        </span>
      </div>

      <!-- Type Badge top right -->
      <div class="absolute top-3 right-3 z-10">
        <span class="px-2.5 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium rounded-full capitalize">
          {{ vehicle.type }}
        </span>
      </div>

      <!-- Date Availability Warning Overlay if unavailable -->
      <div
        v-if="!isAvailable"
        class="absolute inset-0 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 text-center z-20"
      >
        <div class="bg-red-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
          <Calendar class="w-4 h-4 shrink-0" />
          <span>Tidak Tersedia di Tanggal Ini</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <!-- Title & Category (fixed height for alignment) -->
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-brand-600 block mb-1">
          {{ vehicle.brand }}
        </span>
        <h3
          @click="goToDetail"
          class="text-base font-bold text-slate-800 group-hover:text-brand-600 transition-colors cursor-pointer line-clamp-2 min-h-[3rem] leading-snug"
          :title="vehicle.name"
        >
          {{ vehicle.name }}
        </h3>
      </div>

      <!-- Specifications Grid with clean soft panel -->
      <div class="bg-slate-50/90 rounded-xl p-3 border border-slate-100 my-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div class="flex items-center gap-1.5 truncate">
          <Users class="w-4 h-4 text-slate-400 shrink-0" />
          <span class="truncate font-medium">{{ vehicle.seats }} Kursi</span>
        </div>

        <div class="flex items-center gap-1.5 truncate">
          <Gauge class="w-4 h-4 text-slate-400 shrink-0" />
          <span class="truncate font-medium">{{ vehicle.transmission }}</span>
        </div>

        <div class="flex items-center gap-1.5 truncate">
          <Fuel class="w-4 h-4 text-slate-400 shrink-0" />
          <span class="truncate font-medium">{{ vehicle.fuel }}</span>
        </div>

        <div class="flex items-center gap-1.5 truncate">
          <Briefcase class="w-4 h-4 text-slate-400 shrink-0" />
          <span class="truncate font-medium">{{ vehicle.type === 'mobil' ? (vehicle.luggage || '2 Koper') : `${vehicle.engineCc} cc` }}</span>
        </div>
      </div>

      <!-- Pricing & Actions at bottom -->
      <div class="mt-auto pt-3 border-t border-slate-100">
        <!-- Price Display -->
        <div class="flex items-baseline justify-between mb-3">
          <span class="text-[11px] text-slate-400 font-medium">Harga Sewa</span>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-black text-brand-600 tracking-tight">
              {{ formatCurrency(vehicle.pricePerDay) }}
            </span>
            <span class="text-xs text-slate-500 font-medium">/hari</span>
          </div>
        </div>

        <!-- Action Buttons 50/50 Grid -->
        <div class="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            @click="goToDetail"
            class="w-full font-semibold"
            title="Lihat Detail"
          >
            <span>Detail</span>
          </Button>
          <Button
            :variant="isAvailable ? 'primary' : 'secondary'"
            size="sm"
            :disabled="!isAvailable"
            @click="handleBookNow"
            class="w-full font-bold"
            title="Pesan Sekarang"
          >
            <span>Pesan</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>
