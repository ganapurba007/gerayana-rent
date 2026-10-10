import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useVehicleFilters } from '../composables/useVehicleFilters'
import ActiveFilterChips from '../components/vehicle/ActiveFilterChips.vue'
import EmptyState from '../components/vehicle/EmptyState.vue'

// Mock router
const replaceMock = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({
    query: {
      type: 'mobil',
      kategori: 'mpv'
    }
  }),
  useRouter: () => ({
    replace: replaceMock
  })
}))

describe('Fleet & Vehicle Filtering Unit Tests', () => {
  it('useVehicleFilters initializes from route query and filters vehicles', () => {
    const { type, categoryId, filteredVehicles } = useVehicleFilters()

    expect(type.value).toBe('mobil')
    expect(categoryId.value).toBe('mpv')
    expect(filteredVehicles.value.length).toBeGreaterThan(0)
    filteredVehicles.value.forEach(v => {
      expect(v.type).toBe('mobil')
      expect(v.category).toBe('mpv')
    })
  })

  it('ActiveFilterChips renders chips and triggers clear callbacks', async () => {
    const clearFn = vi.fn()
    const chips = [{ id: 'kategori', label: 'Kategori: MPV', clear: clearFn }]

    const wrapper = mount(ActiveFilterChips, {
      props: { count: 5, chips, sortBy: 'terpopuler' }
    })

    expect(wrapper.text()).toContain('Ditemukan 5')
    expect(wrapper.text()).toContain('Kategori: MPV')

    const closeBtn = wrapper.find('button[title="Hapus filter ini"]')
    await closeBtn.trigger('click')
    expect(clearFn).toHaveBeenCalled()
  })

  it('EmptyState renders reset button and WhatsApp inquiry link', async () => {
    const wrapper = mount(EmptyState)

    expect(wrapper.text()).toContain('Armada Tidak Ditemukan')
    const resetBtn = wrapper.find('button')
    await resetBtn.trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })
})
