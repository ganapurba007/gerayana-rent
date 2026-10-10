<script setup>
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'outline', 'ghost', 'accent', 'danger'].includes(val)
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-sm focus:ring-brand-500'
    case 'secondary':
      return 'bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white shadow-sm focus:ring-slate-700'
    case 'outline':
      return 'border border-slate-300 hover:border-brand-500 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 focus:ring-brand-500'
    case 'ghost':
      return 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-400'
    case 'accent':
      return 'bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-slate-900 font-bold shadow-sm focus:ring-accent-400'
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm focus:ring-red-500'
    default:
      return 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs rounded-lg min-h-[36px]'
    case 'lg':
      return 'px-6 py-3.5 text-base font-semibold rounded-xl min-h-[50px]'
    case 'md':
    default:
      return 'px-4 py-2.5 text-sm font-medium rounded-lg min-h-[44px]'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none',
      variantClasses,
      sizeClasses,
      block ? 'w-full' : ''
    ]"
  >
    <Loader2 v-if="loading" class="w-4 h-4 animate-spin shrink-0" />
    <slot />
  </button>
</template>
