<script setup>
import companyData from '../../data/company.json'
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp'
import Button from '../ui/Button.vue'
import { Phone, MessageCircle } from 'lucide-vue-next'

const waUrl = buildGeneralWhatsAppUrl(companyData.contact.whatsapp, 'Halo Gerayana Rent, saya mau konsultasi pemesanan kendaraan / paket wisata.')
</script>

<template>
  <section class="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white py-12 relative overflow-hidden">
    <!-- Subtle Background Glow -->
    <div class="absolute -right-20 -top-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
      <div>
        <span class="text-xs font-bold uppercase tracking-widest text-accent-400 block mb-2">
          Butuh Bantuan Cepat?
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Pesan Langsung Lewat Telepon Atau WhatsApp
        </h2>
        <p class="text-slate-300 text-sm mt-2 max-w-xl">
          Tim customer service kami siap membantu Anda memilih kendaraan dan menyusun rute terbaik 24 jam sehari.
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 shrink-0">
        <a :href="`tel:${companyData.contact.phone}`">
          <Button variant="outline" size="lg" class="border-white/30 text-white hover:bg-white/10 hover:border-white">
            <Phone class="w-5 h-5" />
            <span>{{ companyData.contact.phone }}</span>
          </Button>
        </a>

        <a :href="waUrl" target="_blank" rel="noopener noreferrer">
          <Button variant="accent" size="lg" class="shadow-lg shadow-accent-500/30">
            <MessageCircle class="w-5 h-5 fill-current" />
            <span>Chat WhatsApp</span>
          </Button>
        </a>
      </div>
    </div>
  </section>
</template>
