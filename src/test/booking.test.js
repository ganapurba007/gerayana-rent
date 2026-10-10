import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingStep1 from '../components/forms/BookingStep1.vue'
import BookingStep2 from '../components/forms/BookingStep2.vue'
import BookingStep3 from '../components/forms/BookingStep3.vue'

// Mock router
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  }),
  useRoute: () => ({
    query: {}
  })
}))

describe('Booking 3-Step Wizard Unit Tests', () => {
  beforeEach(() => {
    sessionStorage.clear()
    pushMock.mockClear()
  })

  it('BookingStep1 renders empty draft callout when no item selected', () => {
    const wrapper = mount(BookingStep1, {
      props: { draft: null }
    })
    expect(wrapper.text()).toContain('Belum Ada Kendaraan')
  })

  it('BookingStep1 renders item details when draft has vehicle', () => {
    const draft = {
      kind: 'armada',
      itemSlug: 'toyota-innova-zenix-2023',
      startDate: '2026-10-15',
      endDate: '2026-10-17',
      pickupLocationId: 'bandara',
      pickupTime: '08:00',
      withDriver: false
    }

    const wrapper = mount(BookingStep1, {
      props: { draft }
    })

    expect(wrapper.text()).toContain('Toyota Innova Zenix')
    expect(wrapper.text()).toContain('Lanjut ke Data Pemesan')
  })

  it('BookingStep2 validates required fields and emits next when valid', async () => {
    const wrapper = mount(BookingStep2, {
      props: {
        customer: { name: 'Ahmad Subagyo', whatsapp: '081234567890', email: '', notes: '' },
        agreed: true
      }
    })

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.emitted('next')).toBeTruthy()
  })

  it('BookingStep2 shows error message when name is too short', async () => {
    const wrapper = mount(BookingStep2, {
      props: {
        customer: { name: 'Ah', whatsapp: '081234567890', email: '', notes: '' },
        agreed: true
      }
    })

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.text()).toContain('Nama wajib diisi (minimal 3 karakter)')
  })

  it('BookingStep3 renders WhatsApp link and copy button', () => {
    const draft = {
      kind: 'armada',
      itemSlug: 'toyota-innova-zenix-2023',
      startDate: '2026-10-15',
      endDate: '2026-10-17',
      pickupLocationId: 'bandara',
      pickupTime: '08:00',
      customer: { name: 'Budi', whatsapp: '081234567890' },
      agreed: true
    }

    const wrapper = mount(BookingStep3, {
      props: { draft }
    })

    expect(wrapper.text()).toContain('Konfirmasi & Kirim Pesanan')
    expect(wrapper.text()).toContain('Kirim via WhatsApp')
    expect(wrapper.text()).toContain('Salin Ringkasan')
  })
})
