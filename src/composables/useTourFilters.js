import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import toursData from '../data/tours.json'

export function useTourFilters() {
  const route = useRoute()
  const router = useRouter()

  const duration = ref(route.query.durasi ? Number(route.query.durasi) : 0)
  const minPrice = ref(route.query.hargaMin ? Number(route.query.hargaMin) : 0)
  const maxPrice = ref(route.query.hargaMax ? Number(route.query.hargaMax) : 0)
  const sortBy = ref(route.query.urut || 'terpopuler')

  watch(() => route.query, (query) => {
    duration.value = query.durasi ? Number(query.durasi) : 0
    minPrice.value = query.hargaMin ? Number(query.hargaMin) : 0
    maxPrice.value = query.hargaMax ? Number(query.hargaMax) : 0
    sortBy.value = query.urut || 'terpopuler'
  })

  function updateUrlQuery(newQueryParams = {}) {
    const query = {
      ...route.query,
      durasi: duration.value > 0 ? duration.value : undefined,
      hargaMin: minPrice.value > 0 ? minPrice.value : undefined,
      hargaMax: maxPrice.value > 0 ? maxPrice.value : undefined,
      urut: sortBy.value !== 'terpopuler' ? sortBy.value : undefined,
      ...newQueryParams
    }

    Object.keys(query).forEach(key => {
      if (query[key] === undefined) delete query[key]
    })

    router.replace({ query })
  }

  function getStartingPrice(tour) {
    if (!tour.priceTiers || tour.priceTiers.length === 0) return 0
    return Math.min(...tour.priceTiers.map(t => t.pricePerPerson))
  }

  const filteredTours = computed(() => {
    return toursData.filter(tour => {
      // Duration filter
      if (duration.value > 0 && tour.durationDays !== duration.value) return false

      const startPrice = getStartingPrice(tour)

      // Min price filter
      if (minPrice.value > 0 && startPrice < minPrice.value) return false

      // Max price filter
      if (maxPrice.value > 0 && startPrice > maxPrice.value) return false

      return true
    }).sort((a, b) => {
      const priceA = getStartingPrice(a)
      const priceB = getStartingPrice(b)

      if (sortBy.value === 'termurah') return priceA - priceB
      if (sortBy.value === 'termahal') return priceB - priceA
      return (b.popularity || 0) - (a.popularity || 0)
    })
  })

  function resetAllFilters() {
    duration.value = 0
    minPrice.value = 0
    maxPrice.value = 0
    sortBy.value = 'terpopuler'
    updateUrlQuery()
  }

  return {
    duration,
    minPrice,
    maxPrice,
    sortBy,
    filteredTours,
    updateUrlQuery,
    resetAllFilters
  }
}
