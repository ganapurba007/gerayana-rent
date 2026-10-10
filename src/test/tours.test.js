import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useTourFilters } from '../composables/useTourFilters'
import TourPricePanel from '../components/tour/TourPricePanel.vue'

// Mock router
const replaceMock = vi.fn()
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({
    query: { durasi: '2' }
  }),
  useRouter: () => ({
    replace: replaceMock,
    push: pushMock
  })
}))

describe('Tours & Price Panel Unit Tests', () => {
  beforeEach(() => {
    sessionStorage.clear()
    replaceMock.mockClear()
    pushMock.mockClear()
  })

  it('useTourFilters initializes from route query and filters by duration', () => {
    const { duration, filteredTours } = useTourFilters()

    expect(duration.value).toBe(2)
    expect(filteredTours.value.length).toBeGreaterThan(0)
    filteredTours.value.forEach(t => {
      expect(t.durationDays).toBe(2)
    })
  })

  it('TourPricePanel calculates pricing based on pax tiers and saves draft', async () => {
    const tour = {
      slug: 'bromo-tour',
      title: 'Bromo Sunrise',
      minPax: 2,
      maxPax: 8,
      priceTiers: [
        { minPax: 2, maxPax: 4, pricePerPerson: 850000 },
        { minPax: 5, maxPax: 8, pricePerPerson: 650000 }
      ]
    }

    const wrapper = mount(TourPricePanel, {
      props: { tour, initialPax: 3 }
    })

    expect(wrapper.text()).toContain('850.000')
    expect(wrapper.text()).toContain('2.550.000') // 3 * 850k

    // Click book button
    const bookBtn = wrapper.find('button.shadow-md')
    await bookBtn.trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/pesan')
  })
})
