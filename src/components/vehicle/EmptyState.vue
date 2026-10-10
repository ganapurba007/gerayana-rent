<script setup>
import companyData from '../../data/company.json'
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp'
import Button from '../ui/Button.vue'
import { Car, RotateCcw, MessageCircle } from 'lucide-vue-next'

defineEmits(['reset'])

const waUrl = buildGeneralWhatsAppUrl(
  companyData.contact.whatsapp,
  'Halo Gerayana Rent, saya mencari kendaraan yang tidak ada di hasil filter website.'
)
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
    <div class="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
      <Car class="w-8 h-8" />
    </div>

    <h3 class="text-xl font-bold text-slate-800 mb-2">
      Armada Tidak Ditemukan
    </h3>

    <p class="text-slate-600 text-sm leading-relaxed mb-6">
      Maaf, tidak ada armada yang sesuai dengan kriteria filter Anda. Cobalah melonggarkan filter atau mereset kriteria pencarian.
    </p>

    <div class="flex flex-wrap gap-3 justify-center">
      <Button variant="outline" size="md" @click="$emit('reset')">
        <RotateCcw class="w-4 h-4" />
        <span>Reset Filter</span>
      </Button>

      <a :href="waUrl" target="_blank" rel="noopener noreferrer">
        <Button variant="accent" size="md">
          <MessageCircle class="w-4 h-4 fill-current" />
          <span>Tanya via WhatsApp</span>
        </Button>
      </a>
    </div>
  </div>
</template>
