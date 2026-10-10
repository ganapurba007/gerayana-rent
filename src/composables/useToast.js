import { ref } from 'vue'

const toasts = ref([])
let idCounter = 0

export function useToast() {
  function showToast({ message, type = 'info', duration = 4000 }) {
    const id = ++idCounter
    const toast = { id, message, type, duration }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast,
    success: (msg, duration) => showToast({ message: msg, type: 'success', duration }),
    error: (msg, duration) => showToast({ message: msg, type: 'error', duration }),
    info: (msg, duration) => showToast({ message: msg, type: 'info', duration })
  }
}
