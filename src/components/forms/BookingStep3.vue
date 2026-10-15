<script setup>
import { computed } from 'vue'
import { useRental } from '../../composables/useRental'
import vehiclesData from '../../data/vehicles.json'
import toursData from '../../data/tours.json'
import locationsData from '../../data/locations.json'
import { calculateVehiclePrice, calculateTourPrice } from '../../lib/pricing'
import { buildBookingWhatsAppUrl } from '../../lib/whatsapp'
import { formatCurrency, formatDate } from '../../lib/format'
import { useToast } from '../../composables/useToast'
import { useBookingDraft } from '../../composables/useBookingDraft'
import Card from '../ui/Card.vue'
import Button from '../ui/Button.vue'
import { MessageCircle, Copy, ArrowLeft, CheckCircle2, Info, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({
  draft: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'finish'])
const { success } = useToast()
const { clearDraft } = useBookingDraft()
const { rental } = useRental()

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
      kind: 'armada',
      name: vehicle.name,
      companyName: rental.value.name,
      locationName: locationObj ? locationObj.name : props.draft.pickupLocationId,
      pricing
    }
  } else {
    const tour = toursData.find(t => t.slug === props.draft.itemSlug)
    if (!tour) return null
    const pricing = calculateTourPrice(tour, props.draft.pax)
    return {
      kind: 'paket',
      title: tour.title,
      companyName: rental.value.name,
      pricing
    }
  }
})

const waUrl = computed(() => {
  if (!itemDetails.value) return '#'
  return buildBookingWhatsAppUrl(
    rental.value.contact.whatsapp,
    props.draft,
    itemDetails.value,
    itemDetails.value.locationName
  )
})

function handleSendWhatsApp() {
  clearDraft()
  emit('finish')
  window.open(waUrl.value, '_blank')
}

function handleCopySummary() {
  let summaryText = `*RINGKASAN PESANAN - ${rental.value.name.toUpperCase()}*\n\n`
  if (props.draft.kind === 'armada') {
    summaryText += `Item: ${itemDetails.value?.name}\n`
    summaryText += `Tanggal: ${formatDate(props.draft.startDate)} s/d ${formatDate(props.draft.endDate)}\n`
    summaryText += `Lokasi: ${itemDetails.value?.locationName}\n`
    summaryText += `Driver: ${props.draft.withDriver ? 'Ya' : 'Lepas Kunci'}\n`
  } else {
    summaryText += `Paket: ${itemDetails.value?.title}\n`
    summaryText += `Tanggal Berangkat: ${formatDate(props.draft.startDate)}\n`
    summaryText += `Peserta: ${props.draft.pax} Orang\n`
  }
  summaryText += `Total Estimasi: ${formatCurrency(itemDetails.value?.pricing?.total)}\n\n`
  summaryText += `Pemesan: ${props.draft.customer?.name} (${props.draft.customer?.whatsapp})`

  navigator.clipboard.writeText(summaryText)
  success('Ringkasan pesanan berhasil disalin ke clipboard!')
}
</script>

<template>
  <div class="space-y-6">
    <Card padding="normal" class="space-y-6">
      <div class="border-b border-slate-100 pb-4">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-600">Langkah 3 dari 3</span>
        <h2 class="text-xl font-extrabold text-slate-900">
          Konfirmasi & Kirim Pesanan
        </h2>
      </div>

      <!-- Explanatory Notice (FR-6.4) -->
      <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
        <div class="flex items-center gap-1.5 font-bold text-amber-900">
          <Info class="w-4 h-4 shrink-0 text-amber-600" />
          <span>Informasi Penting Sebelum Mengirim</span>
        </div>
        <p>
          Pesanan Anda <strong>baru akan terkonfirmasi</strong> setelah dibalas dan disetujui oleh admin kami via WhatsApp. Tidak ada pembayaran online di situs ini.
        </p>
      </div>

      <!-- Final Review Summary -->
      <div class="space-y-4 text-xs">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
          <span class="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">Rincian Item Pilihan:</span>
          <div class="flex justify-between text-slate-800 font-semibold text-sm">
            <span>{{ itemDetails?.name || itemDetails?.title }}</span>
            <span class="text-brand-600 font-bold">{{ formatCurrency(itemDetails?.pricing?.total) }}</span>
          </div>

          <div v-if="draft.kind === 'armada'" class="text-slate-600 space-y-1 pt-2 border-t border-slate-200/60">
            <div>Jadwal: {{ formatDate(draft.startDate) }} s/d {{ formatDate(draft.endDate) }}</div>
            <div>Jam & Lokasi: {{ draft.pickupTime }} WIB @ {{ itemDetails?.locationName }}</div>
            <div>Layanan Driver: {{ draft.withDriver ? 'Termasuk Driver' : 'Lepas Kunci' }}</div>
          </div>

          <div v-else class="text-slate-600 space-y-1 pt-2 border-t border-slate-200/60">
            <div>Tanggal Berangkat: {{ formatDate(draft.startDate) }}</div>
            <div>Peserta: {{ draft.pax }} Orang</div>
          </div>
        </div>

        <!-- Customer Summary -->
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1 text-slate-700">
          <span class="font-bold text-slate-700 block uppercase tracking-wider text-[11px] mb-1">Data Pemesan:</span>
          <div>Nama: <strong>{{ draft.customer?.name }}</strong></div>
          <div>WhatsApp: <strong>{{ draft.customer?.whatsapp }}</strong></div>
          <div v-if="draft.customer?.email">Email: {{ draft.customer.email }}</div>
          <div v-if="draft.customer?.notes" class="italic pt-1 text-slate-500">Catatan: "{{ draft.customer.notes }}"</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <Button type="button" variant="outline" size="md" @click="$emit('back')">
          <ArrowLeft class="w-4 h-4" />
          <span>Kembali ke Data Pemesan</span>
        </Button>

        <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button type="button" variant="secondary" size="md" @click="handleCopySummary" class="w-full sm:w-auto">
            <Copy class="w-4 h-4" />
            <span>Salin Ringkasan</span>
          </Button>

          <a :href="waUrl" target="_blank" rel="noopener noreferrer" @click="handleSendWhatsApp" class="w-full sm:w-auto">
            <Button type="button" variant="accent" size="lg" block class="shadow-lg shadow-accent-500/30">
              <MessageCircle class="w-5 h-5 fill-current" />
              <span>Kirim via WhatsApp</span>
            </Button>
          </a>
        </div>
      </div>
    </Card>
  </div>
</template>
