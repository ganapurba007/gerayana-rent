import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import vehiclesData from '../data/vehicles.json'
import categoriesData from '../data/categories.json'
import { isVehicleAvailable } from '../lib/availability'

export function useVehicleFilters() {
  const route = useRoute()
  const router = useRouter()

  // State initialized from route query params
  const type = ref(route.query.type || 'mobil')
  const locationId = ref(route.query.lokasi || '')
  const startDate = ref(route.query.ambil || '')
  const endDate = ref(route.query.kembali || '')
  const categoryId = ref(route.query.kategori || '')
  const transmission = ref(route.query.transmisi || '')
  const minSeats = ref(route.query.kursi ? Number(route.query.kursi) : 0)
  const minPrice = ref(route.query.hargaMin ? Number(route.query.hargaMin) : 0)
  const maxPrice = ref(route.query.hargaMax ? Number(route.query.hargaMax) : 0)
  const sortBy = ref(route.query.urut || 'terpopuler')

  // Sync state when URL query params change (e.g., browser back/forward or link click)
  watch(() => route.query, (query) => {
    type.value = query.type || 'mobil'
    locationId.value = query.lokasi || ''
    startDate.value = query.ambil || ''
    endDate.value = query.kembali || ''
    categoryId.value = query.kategori || ''
    transmission.value = query.transmisi || ''
    minSeats.value = query.kursi ? Number(query.kursi) : 0
    minPrice.value = query.hargaMin ? Number(query.hargaMin) : 0
    maxPrice.value = query.hargaMax ? Number(query.hargaMax) : 0
    sortBy.value = query.urut || 'terpopuler'
  })

  // Function to push current filter state to URL query string without reloading page
  function updateUrlQuery(newQueryParams = {}) {
    const query = {
      ...route.query,
      type: type.value !== 'mobil' ? type.value : undefined,
      lokasi: locationId.value || undefined,
      ambil: startDate.value || undefined,
      kembali: endDate.value || undefined,
      kategori: categoryId.value || undefined,
      transmisi: transmission.value || undefined,
      kursi: minSeats.value > 0 ? minSeats.value : undefined,
      hargaMin: minPrice.value > 0 ? minPrice.value : undefined,
      hargaMax: maxPrice.value > 0 ? maxPrice.value : undefined,
      urut: sortBy.value !== 'terpopuler' ? sortBy.value : undefined,
      ...newQueryParams
    }

    // Clean undefined values
    Object.keys(query).forEach(key => {
      if (query[key] === undefined) delete query[key]
    })

    router.replace({ query })
  }

  // Filtered & Sorted Vehicles List
  const filteredVehicles = computed(() => {
    return vehiclesData.filter(v => {
      // 1. Type filter (mobil vs motor)
      if (type.value && v.type !== type.value) return false

      // 2. Category filter
      if (categoryId.value && v.category !== categoryId.value) return false

      // 3. Transmission filter
      if (transmission.value && v.transmission !== transmission.value) return false

      // 4. Minimum Seats filter
      if (minSeats.value > 0 && v.seats < minSeats.value) return false

      // 5. Price Min filter
      if (minPrice.value > 0 && v.pricePerDay < minPrice.value) return false

      // 6. Price Max filter
      if (maxPrice.value > 0 && v.pricePerDay > maxPrice.value) return false

      return true
    }).sort((a, b) => {
      // FR-3.6: Put unavailable vehicles at the very end when dates are selected
      const availA = isVehicleAvailable(a.bookedRanges, startDate.value, endDate.value)
      const availB = isVehicleAvailable(b.bookedRanges, startDate.value, endDate.value)

      if (availA && !availB) return -1
      if (!availA && availB) return 1

      // Sort by selected criteria
      if (sortBy.value === 'termurah') {
        return a.pricePerDay - b.pricePerDay
      }
      if (sortBy.value === 'termahal') {
        return b.pricePerDay - a.pricePerDay
      }
      // Default: terpopuler (popularity desc)
      return (b.popularity || 0) - (a.popularity || 0)
    })
  })

  // Active filters list for chips UI
  const activeFilterChips = computed(() => {
    const chips = []

    if (categoryId.value) {
      const catObj = categoriesData.find(c => c.id === categoryId.value)
      chips.push({
        id: 'kategori',
        label: `Kategori: ${catObj ? catObj.name : categoryId.value}`,
        clear: () => { categoryId.value = ''; updateUrlQuery() }
      })
    }

    if (transmission.value) {
      chips.push({
        id: 'transmisi',
        label: `Transmisi: ${transmission.value}`,
        clear: () => { transmission.value = ''; updateUrlQuery() }
      })
    }

    if (minSeats.value > 0) {
      chips.push({
        id: 'kursi',
        label: `Min. ${minSeats.value} Penumpang`,
        clear: () => { minSeats.value = 0; updateUrlQuery() }
      })
    }

    if (minPrice.value > 0 || maxPrice.value > 0) {
      let priceLabel = 'Harga: '
      if (minPrice.value > 0 && maxPrice.value > 0) {
        priceLabel += `Rp ${(minPrice.value/1000).toFixed(0)}rb - Rp ${(maxPrice.value/1000).toFixed(0)}rb`
      } else if (minPrice.value > 0) {
        priceLabel += `>= Rp ${(minPrice.value/1000).toFixed(0)}rb`
      } else {
        priceLabel += `<= Rp ${(maxPrice.value/1000).toFixed(0)}rb`
      }

      chips.push({
        id: 'harga',
        label: priceLabel,
        clear: () => { minPrice.value = 0; maxPrice.value = 0; updateUrlQuery() }
      })
    }

    return chips
  })

  function resetAllFilters() {
    categoryId.value = ''
    transmission.value = ''
    minSeats.value = 0
    minPrice.value = 0
    maxPrice.value = 0
    sortBy.value = 'terpopuler'
    updateUrlQuery()
  }

  return {
    type,
    locationId,
    startDate,
    endDate,
    categoryId,
    transmission,
    minSeats,
    minPrice,
    maxPrice,
    sortBy,
    filteredVehicles,
    activeFilterChips,
    updateUrlQuery,
    resetAllFilters
  }
}
