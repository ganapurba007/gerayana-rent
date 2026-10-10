<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}

function handleKeyDown(e) {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4"
        @click.self="handleClose"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="translate-y-full sm:translate-y-4 sm:scale-95 opacity-0"
          enter-to-class="translate-y-0 sm:scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in transform"
          leave-from-class="translate-y-0 sm:scale-100 opacity-100"
          leave-to-class="translate-y-full sm:translate-y-4 sm:scale-95 opacity-0"
        >
          <div
            v-if="isOpen"
            class="bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] sm:max-h-[85vh] w-full sm:max-w-lg flex flex-col overflow-hidden shadow-2xl"
          >
            <!-- Sheet Header -->
            <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 class="text-lg font-bold text-slate-800">{{ title }}</h3>
              <button
                type="button"
                @click="handleClose"
                class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
                aria-label="Tutup sheet"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Sheet Content -->
            <div class="p-6 overflow-y-auto flex-grow">
              <slot />
            </div>

            <!-- Sheet Footer Optional Slot -->
            <div v-if="$slots.footer" class="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
