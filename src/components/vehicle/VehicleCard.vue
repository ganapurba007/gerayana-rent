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
  <Card hoverable padding="none" class="flex flex-col h-full group">
    <!-- Image & Badges Container -->
    <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
      <img
        :src="vehicle.images[0]"
        :alt="vehicle.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Badges top left -->
      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
        <Badge v-if="vehicle.featured" variant="accent">
          <Zap class="w-3 h-3 fill-current" />
          <span>Unggulan</span>
        </Badge>
        <Badge variant="neutral">
          <span>{{ vehicle.year }}</span>
        </Badge>
      </div>

      <!-- Type Badge top right -->
      <div class="absolute top-3 right-3 z-10">
        <span class="px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold rounded-full capitalize">
          {{ vehicle.type }}
        </span>
      </div>

      <!-- Date Availability Warning Overlay if unavailable -->
      <div
        v-if="!isAvailable"
        class="absolute inset-0 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 text-center z-20"
      >
        <div class="bg-red-500/90 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
          <Calendar class="w-4 h-4 shrink-0" />
          <span>Tidak Tersedia di Tanggal Ini</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <!-- Title & Category -->
      <div class="mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-brand-600 block mb-1">
          {{ vehicle.brand }}
        </span>
        <h3
          @click="goToDetail"
          class="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors cursor-pointer line-clamp-1"
        >
          {{ vehicle.name }}
        </h3>
      </div>

      <!-- Specifications Grid -->
      <div class="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-100 text-xs text-slate-600 my-auto">
        <div class="flex items-center gap-2">
          <Users class="w-4 h-4 text-slate-400 shrink-0" />
          <span>{{ vehicle.seats }} Kursi</span>
        </div>

        <div class="flex items-center gap-2">
          <Gauge class="w-4 h-4 text-slate-400 shrink-0" />
          <span>{{ vehicle.transmission }}</span>
        </div>

        <div class="flex items-center gap-2">
          <Fuel class="w-4 h-4 text-slate-400 shrink-0" />
          <span>{{ vehicle.fuel }}</span>
        </div>

        <div class="flex items-center gap-2 truncate">
          <Briefcase class="w-4 h-4 text-slate-400 shrink-0" />
          <span class="truncate">{{ vehicle.type === 'mobil' ? (vehicle.luggage || '2 Koper') : `${vehicle.engineCc} cc` }}</span>
        </div>
      </div>

      <!-- Pricing & Actions -->
      <div class="pt-4 flex items-center justify-between gap-3 mt-3">
        <div>
          <span class="text-[11px] text-slate-400 font-medium block leading-none mb-1">Mulai Dari</span>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-extrabold text-brand-600">
              {{ formatCurrency(vehicle.pricePerDay) }}
            </span>
            <span class="text-xs text-slate-500 font-medium">/hari</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            @click="goToDetail"
            title="Lihat Detail"
          >
            <span>Detail</span>
          </Button>
          <Button
            :variant="isAvailable ? 'primary' : 'secondary'"
            size="sm"
            :disabled="!isAvailable"
            @click="handleBookNow"
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
