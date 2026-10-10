<script setup>
import { useToast } from '../../composables/useToast'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info
}

const colorMap = {
  success: 'bg-emerald-800 text-white border-emerald-700 shadow-emerald-900/20',
  error: 'bg-red-800 text-white border-red-700 shadow-red-900/20',
  info: 'bg-slate-800 text-white border-slate-700 shadow-slate-900/20'
}
</script>

<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-lg text-sm font-medium',
          colorMap[toast.type] || colorMap.info
        ]"
      >
        <div class="flex items-center gap-3">
          <component :is="iconMap[toast.type] || Info" class="w-5 h-5 shrink-0" />
          <span>{{ toast.message }}</span>
        </div>
        <button
          type="button"
          @click="removeToast(toast.id)"
          class="p-1 rounded-lg hover:bg-white/20 transition-colors ml-3 focus:outline-none"
          aria-label="Tutup notifikasi"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
