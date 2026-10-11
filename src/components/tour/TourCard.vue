<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../ui/Card.vue'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import { formatCurrency } from '../../lib/format'
import { MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-vue-next'

const props = defineProps({
  tour: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const startingPrice = computed(() => {
  if (!props.tour.priceTiers || props.tour.priceTiers.length === 0) return 0
  return Math.min(...props.tour.priceTiers.map(t => t.pricePerPerson))
})

const durationText = computed(() => {
  if (props.tour.durationNights > 0) {
    return `${props.tour.durationDays}H${props.tour.durationNights}M`
  }
  return `${props.tour.durationDays} Hari`
})

function goToDetail() {
  router.push(`/paket-wisata/${props.tour.slug}`)
}
</script>

<template>
  <Card hoverable padding="none" class="flex flex-col h-full group">
    <!-- Image & Badges -->
    <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
      <img
        :src="tour.images[0]"
        :alt="tour.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width="480"
        height="300"
      />

      <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
        <Badge v-if="tour.featured" variant="accent">
          <Sparkles class="w-3 h-3 fill-current" />
          <span>Populer</span>
        </Badge>
        <Badge variant="brand">
          <Clock class="w-3 h-3" />
          <span>{{ durationText }}</span>
        </Badge>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <h3
        @click="goToDetail"
        class="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors cursor-pointer line-clamp-1 mb-2"
      >
        {{ tour.title }}
      </h3>

      <p class="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
        {{ tour.summary }}
      </p>

      <!-- Destinations -->
      <div class="mb-4 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100/80">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <MapPin class="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span>Destinasi Utama:</span>
        </div>
        <div class="flex flex-wrap gap-1 text-[11px] text-slate-600">
          <span
            v-for="(dest, idx) in tour.destinations"
            :key="idx"
            class="bg-white px-2 py-0.5 rounded-md border border-slate-200"
          >
            {{ dest }}
          </span>
        </div>
      </div>

      <!-- Footer Pricing & Button -->
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
        <div>
          <div class="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
            <Users class="w-3.5 h-3.5" />
            <span>{{ tour.minPax }}–{{ tour.maxPax }} Pax</span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-extrabold text-brand-600">
              {{ formatCurrency(startingPrice) }}
            </span>
            <span class="text-xs text-slate-500 font-medium">/orang</span>
          </div>
        </div>

        <Button variant="primary" size="sm" @click="goToDetail">
          <span>Detail Tour</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  </Card>
</template>
