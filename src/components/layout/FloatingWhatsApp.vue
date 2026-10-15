<script setup>
import { computed } from 'vue'
import { useRental } from '../../composables/useRental'
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp'
import { MessageCircle } from 'lucide-vue-next'

const { rental } = useRental()

const waUrl = computed(() => {
  const msg = `Halo ${rental.value.name}, saya mau bertanya mengenai sewa kendaraan / paket wisata.`
  return buildGeneralWhatsAppUrl(rental.value.contact.whatsapp, msg)
})
</script>

<template>
  <a
    :href="waUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-30 group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
    aria-label="Tanya via WhatsApp"
    title="Tanya Admin via WhatsApp"
  >
    <MessageCircle class="w-6 h-6 shrink-0 fill-current" />
    <span class="hidden sm:inline-block font-bold text-sm tracking-wide">
      Tanya Via WA
    </span>
  </a>
</template>
