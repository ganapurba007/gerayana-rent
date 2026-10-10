<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'brand',
    validator: (val) => ['brand', 'accent', 'success', 'warning', 'danger', 'neutral'].includes(val)
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md'].includes(val)
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'brand':
      return 'bg-brand-50 text-brand-700 border-brand-200'
    case 'accent':
      return 'bg-accent-50 text-accent-800 border-accent-200'
    case 'success':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'warning':
      return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'danger':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
})

const sizeClasses = computed(() => {
  return props.size === 'sm' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-2.5 py-1 text-xs font-bold'
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase',
      variantClasses,
      sizeClasses
    ]"
  >
    <slot />
  </span>
</template>
