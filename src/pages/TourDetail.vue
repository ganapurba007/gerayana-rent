<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import toursData from '../data/tours.json'
import TourPricePanel from '../components/tour/TourPricePanel.vue'
import TourCard from '../components/tour/TourCard.vue'
import NotFound from './NotFound.vue'
import Accordion from '../components/ui/Accordion.vue'
import Badge from '../components/ui/Badge.vue'
import Card from '../components/ui/Card.vue'
import {
  Clock, MapPin, Users, CheckCircle2, XCircle, Calendar, Sparkles, Navigation, Info
} from 'lucide-vue-next'

const route = useRoute()
const slug = computed(() => route.params.slug)

// Find tour by slug
const tour = computed(() => {
  return toursData.find(t => t.slug === slug.value)
})

// Other tours (max 3)
const otherTours = computed(() => {
  if (!tour.value) return []
  return toursData.filter(t => t.id !== tour.value.id).slice(0, 3)
})

// Formatted duration
const durationText = computed(() => {
  if (!tour.value) return ''
  if (tour.value.durationNights > 0) {
    return `${tour.value.durationDays} Hari ${tour.value.durationNights} Malam`
  }
  return `${tour.value.durationDays} Hari (Full Day)`
})

// Itinerary Accordion Items
const itineraryItems = computed(() => {
  if (!tour.value || !tour.value.itinerary) return []
  return tour.value.itinerary.map(item => ({
    id: `day-${item.day}`,
    title: `Hari ${item.day}: ${item.title}`,
    activities: item.activities
  }))
})

useHead({
  title: computed(() => tour.value ? `Paket ${tour.value.title} - Gerayana Rental & Trip` : 'Paket Tidak Ditemukan'),
  meta: [
    { name: 'description', content: computed(() => tour.value?.description || '') }
  ]
})
</script>

<template>
  <!-- 404 Fallback if slug not found (FR-5.5) -->
  <NotFound v-if="!tour" />

  <!-- Tour Detail Content -->
  <div v-else class="py-8 bg-slate-50 min-h-[85vh] pb-24 lg:pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Title Header -->
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <Badge variant="brand">
              <Clock class="w-3 h-3" />
              <span>{{ durationText }}</span>
            </Badge>
            <Badge v-if="tour.featured" variant="accent">
              <Sparkles class="w-3 h-3 fill-current" />
              <span>Paket Populer</span>
            </Badge>
          </div>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {{ tour.title }}
          </h1>
        </div>
      </div>

      <!-- Main Two-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Left Column: Media & Itinerary (2 Cols) -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Main Hero Image -->
          <div class="aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
            <img
              :src="tour.images[0]"
              :alt="tour.title"
              class="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="800"
              height="500"
            />
          </div>

          <!-- Destinations List -->
          <Card padding="normal" class="space-y-3">
            <h2 class="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <MapPin class="w-4 h-4 text-brand-600" />
              <span>Destinasi Wisata Yang Dikunjungi:</span>
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(dest, idx) in tour.destinations"
                :key="idx"
                class="bg-brand-50 text-brand-700 font-bold px-3 py-1.5 rounded-xl border border-brand-200 text-xs"
              >
                📍 {{ dest }}
              </span>
            </div>
          </Card>

          <!-- Description & Summary -->
          <Card padding="normal" class="space-y-3">
            <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Info class="w-5 h-5 text-brand-600" />
              <span>Ringkasan Paket</span>
            </h2>
            <p class="text-slate-700 text-sm font-semibold leading-relaxed">
              {{ tour.summary }}
            </p>
            <p class="text-slate-600 text-sm leading-relaxed">
              {{ tour.description }}
            </p>
          </Card>

          <!-- Daily Itinerary Accordion (FR-5.2) -->
          <div class="space-y-4">
            <h2 class="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar class="w-5 h-5 text-brand-600" />
              <span>Itinerary Perjalanan Per Hari</span>
            </h2>

            <Accordion
              :items="itineraryItems"
              default-open-id="day-1"
            >
              <template v-for="item in itineraryItems" :key="item.id" #[`item-${item.id}`]>
                <ul class="space-y-2.5 pt-1">
                  <li
                    v-for="(act, idx) in item.activities"
                    :key="idx"
                    class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <span class="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-2" />
                    <span>{{ act }}</span>
                  </li>
                </ul>
              </template>
            </Accordion>
          </div>

          <!-- Meeting Point / Titik Kumpul (FR-5.2) -->
          <Card padding="normal" class="space-y-3 bg-brand-900 text-white border-0">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <Navigation class="w-5 h-5 text-accent-400" />
              <span>Titik Kumpul (Meeting Point)</span>
            </h3>
            <p class="text-slate-300 text-sm font-medium">
              {{ tour.meetingPoint }} (Bisa disesuaikan dengan permintaan rombongan).
            </p>
          </Card>

          <!-- Includes & Excludes (FR-5.2) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Includes -->
            <Card padding="normal" class="space-y-3 border-emerald-100">
              <h3 class="text-base font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Sudah Termasuk</span>
              </h3>
              <ul class="space-y-2 text-xs text-slate-600">
                <li v-for="(inc, idx) in tour.includes" :key="idx" class="flex items-start gap-2">
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
                <li v-for="(exc, idx) in tour.excludes" :key="idx" class="flex items-start gap-2">
                  <span class="text-red-400 font-bold">✗</span>
                  <span>{{ exc }}</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        <!-- Right Column: Interactive Price & Booking Panel (1 Col) -->
        <div class="lg:col-span-1">
          <TourPricePanel
            :tour="tour"
            :initial-start-date="route.query.berangkat"
            :initial-pax="Number(route.query.pax) || undefined"
          />
        </div>
      </div>

      <!-- Section Other Tours (FR-5.5) -->
      <div v-if="otherTours.length > 0" class="pt-8 border-t border-slate-200">
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
          Paket Wisata Lainnya
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TourCard
            v-for="ot in otherTours"
            :key="ot.id"
            :tour="ot"
          />
        </div>
      </div>
    </div>
  </div>
</template>
