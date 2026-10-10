<script setup>
import { computed } from 'vue'
import categoriesData from '../../data/categories.json'
import Button from '../ui/Button.vue'
import { Filter, RotateCcw } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    default: 'mobil'
  },
  categoryId: {
    type: String,
    default: ''
  },
  transmission: {
    type: String,
    default: ''
  },
  minSeats: {
    type: Number,
    default: 0
  },
  minPrice: {
    type: Number,
    default: 0
  },
  maxPrice: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:filters', 'reset', 'apply'])

// Available categories for current type
const availableCategories = computed(() => {
  return categoriesData.filter(c => c.type === props.type)
})

function updateFilter(key, val) {
  emit('update:filters', { [key]: val })
}

function handleReset() {
  emit('reset')
}

function handleApply() {
  emit('apply')
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6">
    <div class="flex items-center justify-between pb-3 border-b border-slate-100">
      <div class="flex items-center gap-2 text-slate-800 font-bold text-base">
        <Filter class="w-4 h-4 text-brand-600" />
        <span>Filter Armada</span>
      </div>
      <button
        type="button"
        @click="handleReset"
        class="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>

    <!-- Category Filter -->
    <div class="space-y-2">
      <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
        Kategori {{ type === 'mobil' ? 'Mobil' : 'Motor' }}
      </label>
      <div class="space-y-1.5">
        <label
          class="flex items-center gap-2.5 p-2 rounded-xl text-sm font-medium hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <input
            type="radio"
            name="cat-filter"
            value=""
            :checked="!categoryId"
            @change="updateFilter('categoryId', '')"
            class="text-brand-600 focus:ring-brand-500 rounded-full"
          />
          <span class="text-slate-700">Semua Kategori</span>
        </label>

        <label
          v-for="cat in availableCategories"
          :key="cat.id"
          class="flex items-center gap-2.5 p-2 rounded-xl text-sm font-medium hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <input
            type="radio"
            name="cat-filter"
            :value="cat.id"
            :checked="categoryId === cat.id"
            @change="updateFilter('categoryId', cat.id)"
            class="text-brand-600 focus:ring-brand-500 rounded-full"
          />
          <span class="text-slate-700">{{ cat.name }}</span>
        </label>
      </div>
    </div>

    <!-- Transmission Filter -->
    <div class="space-y-2 pt-3 border-t border-slate-100">
      <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
        Transmisi
      </label>
      <div class="grid grid-cols-3 gap-2">
        <button
          type="button"
          @click="updateFilter('transmission', '')"
          :class="[
            'py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center focus:outline-none',
            !transmission
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ]"
        >
          Semua
        </button>
        <button
          type="button"
          @click="updateFilter('transmission', 'Otomatis')"
          :class="[
            'py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center focus:outline-none',
            transmission === 'Otomatis'
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ]"
        >
          Matik
        </button>
        <button
          type="button"
          @click="updateFilter('transmission', 'Manual')"
          :class="[
            'py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center focus:outline-none',
            transmission === 'Manual'
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ]"
        >
          Manual
        </button>
      </div>
    </div>

    <!-- Minimum Seats Filter (For Mobil) -->
    <div v-if="type === 'mobil'" class="space-y-2 pt-3 border-t border-slate-100">
      <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
        Kapasitas Penumpang
      </label>
      <div class="grid grid-cols-3 gap-2">
        <button
          type="button"
          @click="updateFilter('minSeats', 0)"
          :class="[
            'py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center focus:outline-none',
            minSeats === 0
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ]"
        >
          Semua
        </button>
        <button
          type="button"
          @click="updateFilter('minSeats', 5)"
          :class="[
            'py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center focus:outline-none',
            minSeats === 5
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ]"
        >
          ≥ 5 Kursi
        </button>
        <button
          type="button"
          @click="updateFilter('minSeats', 7)"
          :class="[
            'py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center focus:outline-none',
            minSeats === 7
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-xs'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          ]"
        >
          ≥ 7 Kursi
        </button>
      </div>
    </div>

    <!-- Price Range Filter -->
    <div class="space-y-2 pt-3 border-t border-slate-100">
      <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
        Rentang Harga (per Hari)
      </label>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <span class="text-[11px] text-slate-400 font-medium block mb-1">Min (Rp)</span>
          <input
            type="number"
            step="50000"
            min="0"
            :value="minPrice || ''"
            @input="updateFilter('minPrice', Number($event.target.value))"
            placeholder="0"
            class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <span class="text-[11px] text-slate-400 font-medium block mb-1">Max (Rp)</span>
          <input
            type="number"
            step="50000"
            min="0"
            :value="maxPrice || ''"
            @input="updateFilter('maxPrice', Number($event.target.value))"
            placeholder="Maks"
            class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>
    </div>

    <!-- Apply Filter Button for Mobile -->
    <div class="pt-2">
      <Button variant="primary" size="md" block @click="handleApply">
        <span>Terapkan Filter</span>
      </Button>
    </div>
  </div>
</template>
