<script setup>
import { ChevronRight, Home } from 'lucide-vue-next'

defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: 'Armada', to: '/armada' }, { label: 'Toyota Innova Zenix' }]
  }
})
</script>

<template>
  <nav class="bg-slate-100/70 border-b border-slate-200/60 py-3 text-xs sm:text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ol class="flex items-center flex-wrap gap-1.5 text-slate-600">
        <li>
          <router-link to="/" class="flex items-center gap-1 hover:text-brand-600 transition-colors">
            <Home class="w-3.5 h-3.5" />
            <span>Beranda</span>
          </router-link>
        </li>

        <template v-for="(item, index) in items" :key="index">
          <li class="flex items-center text-slate-400">
            <ChevronRight class="w-3.5 h-3.5 shrink-0" />
          </li>
          <li>
            <router-link
              v-if="item.to && index < items.length - 1"
              :to="item.to"
              class="hover:text-brand-600 transition-colors"
            >
              {{ item.label }}
            </router-link>
            <span v-else class="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs inline-block align-bottom">
              {{ item.label }}
            </span>
          </li>
        </template>
      </ol>
    </div>
  </nav>
</template>
