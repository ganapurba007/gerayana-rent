<script setup>
import { ref, watch, nextTick } from 'vue'
import { customerSchema } from '../../lib/schemas'
import Card from '../ui/Card.vue'
import Button from '../ui/Button.vue'
import { User, Phone, Mail, FileText, CheckSquare, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  customer: {
    type: Object,
    default: () => ({ name: '', whatsapp: '', email: '', notes: '' })
  },
  agreed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['next', 'back', 'updateCustomer'])

const form = ref({
  name: props.customer?.name || '',
  whatsapp: props.customer?.whatsapp || '',
  email: props.customer?.email || '',
  notes: props.customer?.notes || '',
  agreed: props.agreed || false
})

const errors = ref({})

// Emit changes to parent draft state
watch(form, (newVal) => {
  emit('updateCustomer', {
    customer: {
      name: newVal.name,
      whatsapp: newVal.whatsapp,
      email: newVal.email,
      notes: newVal.notes
    },
    agreed: newVal.agreed
  })
}, { deep: true })

function validateField(field) {
  const result = customerSchema.safeParse(form.value)
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
  const result = customerSchema.safeParse(form.value)
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

    // FR-6.3: Auto focus first error field
    if (firstErrorField) {
      nextTick(() => {
        const el = document.getElementById(`field-${firstErrorField}`)
        if (el) el.focus()
      })
    }
    return
  }

  errors.value = {}
  emit('next')
}
</script>

<template>
  <div class="space-y-6">
    <Card padding="normal">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900 mb-1">
            Data Diri Pemesan
          </h2>
          <p class="text-xs text-slate-500">
            Harap isi data dengan benar. Konfirmasi pesanan akan dikirimkan ke WhatsApp Anda.
          </p>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Full Name -->
          <div class="space-y-1">
            <label for="field-name" class="block font-bold text-slate-700 flex items-center gap-1.5">
              <User class="w-3.5 h-3.5 text-brand-600" />
              <span>Nama Lengkap *</span>
            </label>
            <input
              id="field-name"
              type="text"
              v-model="form.name"
              @blur="validateField('name')"
              placeholder="Contoh: Ahmad Subagyo"
              :class="[
                'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                errors.name ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-slate-200 focus:ring-brand-500'
              ]"
            />
            <p v-if="errors.name" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
              <AlertCircle class="w-3 h-3 shrink-0" />
              <span>{{ errors.name }}</span>
            </p>
          </div>

          <!-- WhatsApp Number -->
          <div class="space-y-1">
            <label for="field-whatsapp" class="block font-bold text-slate-700 flex items-center gap-1.5">
              <Phone class="w-3.5 h-3.5 text-brand-600" />
              <span>Nomor WhatsApp Active *</span>
            </label>
            <input
              id="field-whatsapp"
              type="tel"
              v-model="form.whatsapp"
              @blur="validateField('whatsapp')"
              placeholder="Contoh: 081234567890"
              :class="[
                'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                errors.whatsapp ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-slate-200 focus:ring-brand-500'
              ]"
            />
            <p v-if="errors.whatsapp" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
              <AlertCircle class="w-3 h-3 shrink-0" />
              <span>{{ errors.whatsapp }}</span>
            </p>
          </div>

          <!-- Email (Optional) -->
          <div class="space-y-1">
            <label for="field-email" class="block font-bold text-slate-700 flex items-center gap-1.5">
              <Mail class="w-3.5 h-3.5 text-brand-600" />
              <span>Email (Opsional)</span>
            </label>
            <input
              id="field-email"
              type="email"
              v-model="form.email"
              @blur="validateField('email')"
              placeholder="nama@email.com"
              :class="[
                'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                errors.email ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-slate-200 focus:ring-brand-500'
              ]"
            />
            <p v-if="errors.email" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
              <AlertCircle class="w-3 h-3 shrink-0" />
              <span>{{ errors.email }}</span>
            </p>
          </div>

          <!-- Notes (Optional max 300 char) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label for="field-notes" class="font-bold text-slate-700 flex items-center gap-1.5">
                <FileText class="w-3.5 h-3.5 text-brand-600" />
                <span>Catatan Tambahan (Opsional)</span>
              </label>
              <span class="text-[10px] text-slate-400 font-semibold">{{ form.notes.length }}/300</span>
            </div>
            <textarea
              id="field-notes"
              rows="3"
              v-model="form.notes"
              maxlength="300"
              @blur="validateField('notes')"
              placeholder="Misal: Mohon diantarkan helm ukuran L atau permintaan khusus lainnya..."
              :class="[
                'w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all',
                errors.notes ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-brand-500'
              ]"
            />
            <p v-if="errors.notes" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-0.5">
              <AlertCircle class="w-3 h-3 shrink-0" />
              <span>{{ errors.notes }}</span>
            </p>
          </div>

          <!-- Agreement Checkbox -->
          <div class="pt-2">
            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                id="field-agreed"
                type="checkbox"
                v-model="form.agreed"
                @change="validateField('agreed')"
                class="w-4 h-4 text-brand-600 focus:ring-brand-500 rounded mt-0.5 shrink-0"
              />
              <span class="text-xs text-slate-600 leading-snug">
                Saya menyetujui syarat & ketentuan sewa kendaraan serta menjamin data diri yang saya masukkan adalah sah dan benar. *
              </span>
            </label>
            <p v-if="errors.agreed" class="text-red-600 text-[11px] font-semibold flex items-center gap-1 pt-1">
              <AlertCircle class="w-3 h-3 shrink-0" />
              <span>{{ errors.agreed }}</span>
            </p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <Button type="button" variant="outline" size="md" @click="$emit('back')">
            <ArrowLeft class="w-4 h-4" />
            <span>Kembali</span>
          </Button>

          <Button type="submit" variant="primary" size="lg">
            <span>Lanjut ke Konfirmasi (Langkah 3)</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>
