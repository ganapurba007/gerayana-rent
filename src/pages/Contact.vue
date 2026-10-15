<script setup>
import { ref, computed, nextTick } from 'vue'
import { useHead } from '@unhead/vue'
import { useRental } from '../composables/useRental'
import { contactFormSchema } from '../lib/schemas'
import { useToast } from '../composables/useToast'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-vue-next'

const { rental } = useRental()

useHead({
  title: computed(() => `Kontak Kami - ${rental.value.name}`),
  meta: [
    { name: 'description', content: computed(() => `Hubungi tim ${rental.value.name} untuk konsultasi sewa kendaraan dan pemesanan paket wisata.`) }
  ]
})

const { success } = useToast()

const form = ref({
  name: '',
  whatsapp: '',
  message: '',
  websiteHp: '' // Honeypot field
})

const errors = ref({})
const isLoading = ref(false)

function validateField(field) {
  const result = contactFormSchema.safeParse(form.value)
  if (!result.success) {
    const fieldError = result.error.format()[field]
    if (fieldError && fieldError._errors.length > 0) {
      errors.value[field] = fieldError._errors[0]
    } else {
      delete errors.value[field]
    }
  } else {
    delete errors.value[field]
  }
}

function handleSubmit() {
  // Honeypot bot protection check
  if (form.value.websiteHp) {
    return
  }

  const result = contactFormSchema.safeParse(form.value)
  if (!result.success) {
    const formatted = result.error.format()
    const newErrors = {}
    let firstErrorField = null

    Object.keys(formatted).forEach(key => {
      if (key !== '_errors' && formatted[key]._errors.length > 0) {
        newErrors[key] = formatted[key]._errors[0]
        if (!firstErrorField) firstErrorField = key
      }
    })

    errors.value = newErrors

    if (firstErrorField) {
      nextTick(() => {
        const el = document.getElementById(`contact-${firstErrorField}`)
        if (el) el.focus()
      })
    }
    return
  }

  errors.value = {}
  isLoading.value = true

  // Simulated Submission
  setTimeout(() => {
    isLoading.value = false
    success('Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi WhatsApp Anda.')
    form.value = { name: '', whatsapp: '', message: '', websiteHp: '' }
  }, 1200)
}
</script>

<template>
  <div class="py-8 bg-slate-50 min-h-[85vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Title Header -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div class="max-w-xl">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">Hubungi Kami</span>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Konsultasi & Layanan Informasi
          </h1>
          <p class="text-slate-600 text-xs sm:text-sm mt-1">
            Silakan hubungi kami melalui telepon, WhatsApp, email, atau isi form pesan di bawah.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Left Column: Contact Cards & Map Placeholder (1 Col) -->
        <div class="space-y-6 lg:col-span-1">
          <Card padding="normal" class="space-y-4">
            <h2 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Informasi Kontak
            </h2>

            <div class="space-y-4 text-xs text-slate-600">
              <div class="flex items-start gap-3">
                <MapPin class="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong class="text-slate-800 block">Alamat Garasi & Kantor:</strong>
                  <span>{{ rental.contact.address }}</span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <Phone class="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <strong class="text-slate-800 block">Telepon / WhatsApp:</strong>
                  <a :href="`tel:${rental.contact.phone}`" class="hover:text-brand-600 transition-colors">
                    {{ rental.contact.phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <Mail class="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <strong class="text-slate-800 block">Email Resmi:</strong>
                  <a :href="`mailto:${rental.contact.email}`" class="hover:text-brand-600 transition-colors">
                    {{ rental.contact.email }}
                  </a>
                </div>
              </div>

              <div v-if="rental.operatingHours" class="flex items-start gap-3 pt-2 border-t border-slate-100">
                <Clock class="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                <div>
                  <strong class="text-slate-800 block">Jam Operasional:</strong>
                  <span>{{ rental.operatingHours.label }}</span>
                </div>
              </div>
            </div>
          </Card>

          <!-- Location Map -->
          <Card padding="none" class="overflow-hidden">
            <div v-if="rental.contact?.mapEmbedUrl" class="aspect-4/3 w-full relative">
              <iframe
                :src="rental.contact.mapEmbedUrl"
                class="w-full h-full border-0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kantor"
              ></iframe>
            </div>
            <div v-else class="aspect-4/3 bg-slate-200 relative flex flex-col items-center justify-center p-6 text-center">
              <MapPin class="w-10 h-10 text-brand-600 mb-2 animate-bounce" />
              <span class="font-bold text-slate-800 text-sm">Peta Lokasi Kantor</span>
              <span class="text-xs text-slate-500 mt-1 max-w-xs">{{ rental.contact.address }}</span>
            </div>
          </Card>
        </div>

        <!-- Right Column: Contact Form (2 Cols) (FR-7.3) -->
        <div class="lg:col-span-2">
          <Card padding="normal" class="space-y-6">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 mb-1">
                Kirim Pesan Umum
              </h2>
              <p class="text-xs text-slate-500">
                Punya pertanyaan seputar ketersediaan armada, konsultasi tour, atau kerjasama? Tuliskan pesan Anda di bawah.
              </p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
              <!-- Honeypot Field (Hidden from real users) -->
              <input
                type="text"
                v-model="form.websiteHp"
                class="hidden"
                tabindex="-1"
                autocomplete="off"
              />

              <!-- Name -->
              <div class="space-y-1">
                <label for="contact-name" class="block font-bold text-slate-700">Nama Lengkap *</label>
                <input
                  id="contact-name"
                  type="text"
                  v-model="form.name"
                  @blur="validateField('name')"
                  placeholder="Contoh: Budi Santoso"
                  :class="[
                    'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-500'
                  ]"
                />
                <p v-if="errors.name" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
                  <AlertCircle class="w-3 h-3 shrink-0" />
                  <span>{{ errors.name }}</span>
                </p>
              </div>

              <!-- WhatsApp -->
              <div class="space-y-1">
                <label for="contact-whatsapp" class="block font-bold text-slate-700">Nomor WhatsApp *</label>
                <input
                  id="contact-whatsapp"
                  type="tel"
                  v-model="form.whatsapp"
                  @blur="validateField('whatsapp')"
                  placeholder="Contoh: 081234567890"
                  :class="[
                    'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                    errors.whatsapp ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-500'
                  ]"
                />
                <p v-if="errors.whatsapp" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
                  <AlertCircle class="w-3 h-3 shrink-0" />
                  <span>{{ errors.whatsapp }}</span>
                </p>
              </div>

              <!-- Message (20 - 500 chars) -->
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <label for="contact-message" class="font-bold text-slate-700">Isi Pesan (20-500 Karakter) *</label>
                  <span class="text-[10px] text-slate-400 font-semibold">{{ form.message.length }}/500</span>
                </div>
                <textarea
                  id="contact-message"
                  rows="5"
                  v-model="form.message"
                  maxlength="500"
                  @blur="validateField('message')"
                  placeholder="Tuliskan pertanyaan atau informasi sewa yang Anda butuhkan..."
                  :class="[
                    'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-500'
                  ]"
                />
                <p v-if="errors.message" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
                  <AlertCircle class="w-3 h-3 shrink-0" />
                  <span>{{ errors.message }}</span>
                </p>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  block
                  :loading="isLoading"
                >
                  <Send class="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
