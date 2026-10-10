<script setup>
defineProps({
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'normal',
    validator: (val) => ['none', 'sm', 'normal', 'lg'].includes(val)
  }
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  normal: 'p-6',
  lg: 'p-8'
}
</script>

<template>
  <div
    :class="[
      'bg-white rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 overflow-hidden',
      hoverable ? 'hover:shadow-lg hover:-translate-y-1 hover:border-brand-200' : '',
      paddingClasses[padding] || 'p-6'
    ]"
  >
    <slot />
  </div>
</template>
