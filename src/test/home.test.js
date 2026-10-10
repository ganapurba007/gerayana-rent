import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchWidget from '../components/forms/SearchWidget.vue'
import VehicleCard from '../components/vehicle/VehicleCard.vue'
import TourCard from '../components/tour/TourCard.vue'

// Mock vue-router
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  }),
  useRoute: () => ({
    path: '/',
    query: {}
  })
}))

describe('Homepage & Search Widget Component Tests', () => {
  it('SearchWidget submits correct query parameters to /armada', async () => {
    const wrapper = mount(SearchWidget)

    // Select type 'motor'
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') // motor tab

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/armada',
        query: expect.objectContaining({
          type: 'motor'
        })
      })
    )
  })

  it('VehicleCard renders vehicle data and handles availability', () => {
    const vehicle = {
      id: 1,
      slug: 'innova-zenix',
      type: 'mobil',
      name: 'Toyota Innova Zenix',
      brand: 'Toyota',
      category: 'mpv',
      year: 2023,
      seats: 7,
      transmission: 'Otomatis',
      fuel: 'Bensin',
      luggage: '3 Koper',
      pricePerDay: 650000,
      images: ['https://example.com/image.jpg'],
      featured: true,
      bookedRanges: [{ from: '2026-10-15', to: '2026-10-18' }]
    }

    const wrapper = mount(VehicleCard, {
      props: { vehicle }
    })

    expect(wrapper.text()).toContain('Toyota Innova Zenix')
    expect(wrapper.text()).toContain('650.000')

    // Test unavailable date range
    const unavailableWrapper = mount(VehicleCard, {
      props: {
        vehicle,
        startDate: '2026-10-16',
        endDate: '2026-10-17'
      }
    })

    expect(unavailableWrapper.text()).toContain('Tidak Tersedia di Tanggal Ini')
  })

  it('TourCard renders starting price and duration', () => {
    const tour = {
      id: 1,
      slug: 'bromo-tour',
      title: 'Bromo Sunrise Tour',
      destinations: ['Kawah Bromo', 'Penanjakan'],
      durationDays: 2,
      durationNights: 1,
      summary: 'Ringkasan tour bromo',
      minPax: 2,
      maxPax: 8,
      priceTiers: [
        { minPax: 2, maxPax: 4, pricePerPerson: 850000 },
        { minPax: 5, maxPax: 8, pricePerPerson: 650000 }
      ],
      images: ['https://example.com/bromo.jpg'],
      featured: true
    }

    const wrapper = mount(TourCard, {
      props: { tour }
    })

    expect(wrapper.text()).toContain('Bromo Sunrise Tour')
    expect(wrapper.text()).toContain('650.000')
    expect(wrapper.text()).toContain('2H1M')
  })
})
