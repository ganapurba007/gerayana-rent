import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useBookingDraft } from '../composables/useBookingDraft'
import VehicleGallery from '../components/vehicle/VehicleGallery.vue'
import VehiclePricePanel from '../components/vehicle/VehiclePricePanel.vue'

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

describe('Vehicle Detail & Price Panel Unit Tests', () => {
  beforeEach(() => {
    sessionStorage.clear()
    pushMock.mockClear()
  })

  it('useBookingDraft saves, retrieves, and clears sessionStorage draft', () => {
    const { getDraft, saveDraft, clearDraft } = useBookingDraft()

    expect(getDraft()).toBeNull()

    const draft = { kind: 'armada', itemSlug: 'innova-zenix', total: 1300000 }
    saveDraft(draft)

    expect(getDraft()).toEqual(draft)

    clearDraft()
    expect(getDraft()).toBeNull()
  })

  it('VehicleGallery updates main image when thumbnail clicked', async () => {
    const images = ['https://example.com/1.jpg', 'https://example.com/2.jpg']
    const wrapper = mount(VehicleGallery, {
      props: { images, alt: 'Test Car' }
    })

    const mainImg = wrapper.find('img')
    expect(mainImg.attributes('src')).toBe(images[0])

    const thumbnails = wrapper.findAll('button')
    await thumbnails[1].trigger('click')

    expect(wrapper.find('img').attributes('src')).toBe(images[1])
  })

  it('VehiclePricePanel calculates totals and detects bookedRanges conflict', () => {
    const vehicle = {
      slug: 'innova-zenix',
      name: 'Toyota Innova Zenix',
      pricePerDay: 500000,
      driverPerDay: 150000,
      extras: [{ id: 'roof-rack', label: 'Roof Rack', pricePerDay: 50000 }],
      bookedRanges: [{ from: '2026-10-15', to: '2026-10-18' }]
    }

    const wrapper = mount(VehiclePricePanel, {
      props: {
        vehicle,
        initialStartDate: '2026-10-16',
        initialEndDate: '2026-10-17'
      }
    })

    expect(wrapper.text()).toContain('Kendaraan Tidak Tersedia')
    expect(wrapper.find('button[disabled]').exists()).toBe(true)
  })
})
