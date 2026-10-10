import { ref } from 'vue'

const DRAFT_STORAGE_KEY = 'gerayana_booking_draft'

export function useBookingDraft() {
  function getDraft() {
    try {
      const data = sessionStorage.getItem(DRAFT_STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  function saveDraft(draftObj) {
    try {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftObj))
    } catch (e) {
      console.error('Failed to save booking draft to sessionStorage', e)
    }
  }

  function clearDraft() {
    try {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch (e) {
      console.error('Failed to clear booking draft', e)
    }
  }

  return {
    getDraft,
    saveDraft,
    clearDraft
  }
}
