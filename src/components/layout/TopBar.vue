<script setup>
import companyData from '../../data/company.json'
import { Phone, Mail, Clock } from 'lucide-vue-next'
</script>

<template>
  <div class="hidden md:block bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Left side: Contact info -->
      <div class="flex items-center gap-6">
        <a
          :href="`tel:${companyData.contact.phone}`"
          class="flex items-center gap-1.5 hover:text-white transition-colors"
          title="Telepon Kami"
        >
          <Phone class="w-3.5 h-3.5 text-brand-400 shrink-0" />
          <span>{{ companyData.contact.phone }}</span>
        </a>
        <a
          :href="`mailto:${companyData.contact.email}`"
          class="flex items-center gap-1.5 hover:text-white transition-colors"
          title="Kirim Email"
        >
          <Mail class="w-3.5 h-3.5 text-brand-400 shrink-0" />
          <span>{{ companyData.contact.email }}</span>
        </a>
      </div>

      <!-- Right side: Operating Hours -->
      <div class="flex items-center gap-1.5 text-slate-400">
        <Clock class="w-3.5 h-3.5 text-accent-400 shrink-0" />
        <span>{{ companyData.operatingHours.label }}</span>
      </div>
    </div>
  </div>
</template>
