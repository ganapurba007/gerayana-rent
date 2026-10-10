<script setup>
import { X, ArrowUpDown } from 'lucide-vue-next'

defineProps({
  count: {
    type: Number,
    default: 0
  },
  chips: {
    type: Array,
    default: () => []
  },
  sortBy: {
    type: String,
    default: 'terpopuler'
  }
})

const emit = defineEmits(['update:sortBy', 'clearAll'])
</script>

<template>
  <div class="space-y-4 mb-6">
    <!-- Top Bar: Result Count & Sort Selector -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h2 class="text-base sm:text-lg font-bold text-slate-800">
          Hasil Pencarian Armada
        </h2>
        <span class="text-xs text-slate-500 font-medium">
          Ditemukan <strong class="text-brand-600 font-bold">{{ count }}</strong> unit kendaraan siap sewa
        </span>
      </div>

      <!-- Sort Selection -->
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <ArrowUpDown class="w-4 h-4 text-slate-400 shrink-0" />
        <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">Urutkan:</span>
        <select
          :value="sortBy"
          @change="emit('update:sortBy', $event.target.value)"
          class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="terpopuler">Terpopuler</option>
          <option value="termurah">Termurah</option>
          <option value="termahal">Termahal</option>
        </select>
      </div>
    </div>

    <!-- Active Chips Bar -->
    <div v-if="chips && chips.length > 0" class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-semibold text-slate-400">Filter Aktif:</span>
      <div
        v-for="chip in chips"
        :key="chip.id"
        class="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold rounded-full shadow-2xs"
      >
        <span>{{ chip.label }}</span>
        <button
          type="button"
          @click="chip.clear"
          class="p-0.5 hover:bg-brand-200/60 rounded-full transition-colors focus:outline-none"
          title="Hapus filter ini"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        type="button"
        @click="emit('clearAll')"
        class="text-xs font-bold text-red-600 hover:text-red-700 underline ml-2 transition-colors"
      >
        Hapus Semua
      </button>
    </div>
  </div>
</template>
