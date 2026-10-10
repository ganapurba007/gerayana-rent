<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // [{ id, title, content }]
  },
  multiple: {
    type: Boolean,
    default: false
  },
  defaultOpenId: {
    type: [Number, String],
    default: null
  }
})

const activeIds = ref(
  props.defaultOpenId !== null ? [props.defaultOpenId] : props.items.length > 0 ? [props.items[0].id] : []
)

function toggleItem(id) {
  if (props.multiple) {
    if (activeIds.value.includes(id)) {
      activeIds.value = activeIds.value.filter(i => i !== id)
    } else {
      activeIds.value.push(id)
    }
  } else {
    if (activeIds.value.includes(id)) {
      activeIds.value = []
    } else {
      activeIds.value = [id]
    }
  }
}

function isOpen(id) {
  return activeIds.value.includes(id)
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="item in items"
      :key="item.id"
      class="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
    >
      <button
        type="button"
        :id="`accordion-header-${item.id}`"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="`accordion-content-${item.id}`"
        @click="toggleItem(item.id)"
        class="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-slate-800 hover:text-brand-600 focus:outline-none focus:bg-slate-50 transition-colors"
      >
        <span>{{ item.title || item.question }}</span>
        <ChevronDown
          :class="[
            'w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-2',
            isOpen(item.id) ? 'rotate-180 text-brand-600' : ''
          ]"
        />
      </button>

      <div
        v-show="isOpen(item.id)"
        :id="`accordion-content-${item.id}`"
        :aria-labelledby="`accordion-header-${item.id}`"
        class="px-5 pb-5 pt-1 text-slate-600 border-t border-slate-100 text-sm leading-relaxed"
      >
        <slot :name="`item-${item.id}`" :item="item">
          {{ item.content || item.answer }}
        </slot>
      </div>
    </div>
  </div>
</template>
