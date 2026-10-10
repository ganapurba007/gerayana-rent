<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import faqsData from '../data/faqs.json'
import Accordion from '../components/ui/Accordion.vue'
import Card from '../components/ui/Card.vue'
import { Search, HelpCircle, FileText, CreditCard, MapPin, Compass } from 'lucide-vue-next'

useHead({
  title: 'Pertanyaan Umum (FAQ) - Gerayana Rental & Trip',
  meta: [
    { name: 'description', content: 'Temukan jawaban atas pertanyaan seputar syarat sewa, pembayaran, deposit, antar-jemput, dan paket wisata.' }
  ]
})

const searchQuery = ref('')
const selectedCategory = ref('Semua')

const categories = ['Semua', 'Syarat Sewa', 'Pembayaran & Deposit', 'Antar-Jemput', 'Paket Wisata']

const categoryIcons = {
  'Syarat Sewa': FileText,
  'Pembayaran & Deposit': CreditCard,
  'Antar-Jemput': MapPin,
  'Paket Wisata': Compass
}

// Filtered FAQs based on category tab & search query
const filteredFaqs = computed(() => {
  let list = faqsData

  if (selectedCategory.value !== 'Semua') {
    list = list.filter(item => item.category === selectedCategory.value)
  }

  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    )
  }

  return list
})

// Group filtered FAQs by category name
const groupedFaqs = computed(() => {
  const groups = {}
  filteredFaqs.value.forEach(item => {
    if (!groups[item.category]) {
      groups[item.category] = []
    }
    groups[item.category].push({
      id: item.id,
      title: item.question,
      content: item.answer
    })
  })
  return groups
})
</script>

<template>
  <div class="py-8 bg-slate-50 min-h-[85vh]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Title Header & Search Bar (FR-7.2) -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-center sm:text-left">
        <div class="max-w-xl">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">Pusat Bantuan</span>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan Yang Sering Diajukan (FAQ)
          </h1>
          <p class="text-slate-600 text-xs sm:text-sm mt-1">
            Temukan informasi lengkap mengenai aturan sewa, sistem deposit, dan jadwal tur.
          </p>
        </div>

        <!-- Live Search Input -->
        <div class="relative max-w-xl">
          <Search class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari pertanyaan (misal: deposit, syarat, driver)..."
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none shrink-0',
            selectedCategory === cat
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- FAQ Accordions Grouped by Category (FR-7.2) -->
      <div v-if="Object.keys(groupedFaqs).length > 0" class="space-y-8">
        <div
          v-for="(items, categoryName) in groupedFaqs"
          :key="categoryName"
          class="space-y-4"
        >
          <div class="flex items-center gap-2 text-slate-900 font-extrabold text-lg pt-2">
            <component :is="categoryIcons[categoryName] || HelpCircle" class="w-5 h-5 text-brand-600" />
            <span>{{ categoryName }}</span>
          </div>

          <Accordion
            :items="items"
          />
        </div>
      </div>

      <!-- Empty Search Result State -->
      <Card v-else padding="lg" class="text-center space-y-4 max-w-md mx-auto my-8">
        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <HelpCircle class="w-6 h-6" />
        </div>
        <h3 class="text-lg font-bold text-slate-800">Pertanyaan Tidak Ditemukan</h3>
        <p class="text-xs text-slate-600">
          Tidak ada hasil FAQ yang cocok dengan kata kunci "{{ searchQuery }}". Cobalah menggunakan kata kunci lain.
        </p>
      </Card>
    </div>
  </div>
</template>
