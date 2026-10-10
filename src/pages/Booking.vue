<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useBookingDraft } from '../composables/useBookingDraft'
import BookingStep1 from '../components/forms/BookingStep1.vue'
import BookingStep2 from '../components/forms/BookingStep2.vue'
import BookingStep3 from '../components/forms/BookingStep3.vue'
import { Check, ShoppingBag, UserCheck, Send } from 'lucide-vue-next'

useHead({
  title: 'Pemesanan 3 Langkah - Gerayana Rental & Trip',
  meta: [
    { name: 'description', content: 'Lengkapi data pemesanan Anda dan konfirmasi via WhatsApp secara aman dan praktis.' }
  ]
})

const { getDraft, saveDraft } = useBookingDraft()

const currentStep = ref(1)

const draft = ref({
  kind: 'armada',
  itemSlug: '',
  startDate: '',
  endDate: '',
  pickupLocationId: '',
  pickupTime: '08:00',
  withDriver: false,
  extraIds: [],
  pax: 2,
  customer: { name: '', whatsapp: '', email: '', notes: '' },
  agreed: false
})

onMounted(() => {
  const loadedDraft = getDraft()
  if (loadedDraft) {
    draft.value = {
      ...draft.value,
      ...loadedDraft,
      customer: { ...draft.value.customer, ...(loadedDraft.customer || {}) }
    }
  }
})

function updateCustomerData({ customer, agreed }) {
  draft.value.customer = customer
  draft.value.agreed = agreed
  saveDraft(draft.value)
}

function handleStepNext() {
  if (currentStep.value < 3) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleStepBack() {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const steps = [
  { id: 1, label: 'Ringkasan Pesanan', icon: ShoppingBag },
  { id: 2, label: 'Data Pemesan', icon: UserCheck },
  { id: 3, label: 'Konfirmasi & Kirim', icon: Send }
]
</script>

<template>
  <div class="py-8 bg-slate-50 min-h-[85vh]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Title Header -->
      <div class="text-center max-w-xl mx-auto space-y-2">
        <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Form Pemesanan
        </h1>
        <p class="text-slate-600 text-xs sm:text-sm">
          Selesaikan 3 langkah praktis di bawah untuk mengirim pesanan Anda langsung ke WhatsApp Admin.
        </p>
      </div>

      <!-- 3-Step Wizard Progress Bar (FR-6.1) -->
      <div class="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div class="flex items-center justify-between relative">
          <!-- Connector Line -->
          <div class="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-200 z-0" />
          <div
            class="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-500 z-0"
            :style="{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }"
          />

          <!-- Steps Items -->
          <div
            v-for="step in steps"
            :key="step.id"
            class="relative z-10 flex flex-col items-center group cursor-pointer"
            @click="step.id < currentStep ? currentStep = step.id : null"
          >
            <div
              :class="[
                'w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm',
                step.id < currentStep
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : step.id === currentStep
                  ? 'bg-brand-600 text-white shadow-brand-600/30 scale-110 ring-4 ring-brand-100'
                  : 'bg-white text-slate-400 border-2 border-slate-200'
              ]"
            >
              <Check v-if="step.id < currentStep" class="w-5 h-5 stroke-[3]" />
              <component v-else :is="step.icon" class="w-5 h-5" />
            </div>

            <span
              :class="[
                'text-[11px] sm:text-xs font-bold mt-2 transition-colors text-center hidden sm:block',
                step.id === currentStep ? 'text-brand-600' : 'text-slate-500'
              ]"
            >
              {{ step.label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Wizard Steps Components -->
      <div>
        <BookingStep1
          v-if="currentStep === 1"
          :draft="draft"
          @next="handleStepNext"
        />

        <BookingStep2
          v-else-if="currentStep === 2"
          :customer="draft.customer"
          :agreed="draft.agreed"
          @update-customer="updateCustomerData"
          @next="handleStepNext"
          @back="handleStepBack"
        />

        <BookingStep3
          v-else-if="currentStep === 3"
          :draft="draft"
          @back="handleStepBack"
          @finish="currentStep = 1"
        />
      </div>
    </div>
  </div>
</template>
