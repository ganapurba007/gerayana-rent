<script setup>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useVehicleFilters } from '../composables/useVehicleFilters'
import SearchWidget from '../components/forms/SearchWidget.vue'
import VehicleFilterPanel from '../components/vehicle/VehicleFilterPanel.vue'
import ActiveFilterChips from '../components/vehicle/ActiveFilterChips.vue'
import VehicleCard from '../components/vehicle/VehicleCard.vue'
import EmptyState from '../components/vehicle/EmptyState.vue'
import BottomSheet from '../components/ui/BottomSheet.vue'
import Button from '../components/ui/Button.vue'
import { Filter, SlidersHorizontal, Car, Bike } from 'lucide-vue-next'

useHead({
  title: 'Daftar Armada Mobil & Motor - Gerayana Rental & Trip',
  meta: [
    { name: 'description', content: 'Temukan pilihan sewa mobil dan motor prima dengan harga transparan dan ketersediaan terjamin.' }
  ]
})

const {
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
} = useVehicleFilters()

const isMobileFilterOpen = ref(false)

function handleUpdateFilters(newFilters) {
  if (newFilters.categoryId !== undefined) categoryId.value = newFilters.categoryId
  if (newFilters.transmission !== undefined) transmission.value = newFilters.transmission
  if (newFilters.minSeats !== undefined) minSeats.value = newFilters.minSeats
  if (newFilters.minPrice !== undefined) minPrice.value = newFilters.minPrice
  if (newFilters.maxPrice !== undefined) maxPrice.value = newFilters.maxPrice

  updateUrlQuery()
}

function handleSwitchType(newType) {
  type.value = newType
  categoryId.value = ''
  updateUrlQuery()
}
</script>

<template>
  <div class="py-8 bg-slate-50 min-h-[80vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Page Header & Type Toggle Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Armada {{ type === 'mobil' ? 'Mobil' : 'Motor' }}
          </h1>
          <p class="text-slate-600 text-sm mt-1">
            Armada bersih, terawat, dan siap mengantar perjalanan Anda.
          </p>
        </div>

        <!-- Main Type Toggle Buttons -->
        <div class="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl shrink-0">
          <button
            type="button"
            @click="handleSwitchType('mobil')"
            :class="[
              'flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all focus:outline-none',
              type === 'mobil'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            <Car class="w-4 h-4" />
            <span>Mobil</span>
          </button>

          <button
            type="button"
            @click="handleSwitchType('motor')"
            :class="[
              'flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all focus:outline-none',
              type === 'motor'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            <Bike class="w-4 h-4" />
            <span>Motor</span>
          </button>
        </div>
      </div>

      <!-- FR-3.2: Top Search Summary & Editable Criteria -->
      <SearchWidget
        compact
        :initial-type="type"
        :initial-location="locationId"
        :initial-start-date="startDate"
        :initial-end-date="endDate"
      />

      <!-- Main Fleet Listing Content Layout (Sidebar + Cards) -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Desktop Sidebar Filter (FR-3.3) -->
        <aside class="hidden lg:block lg:col-span-1">
          <VehicleFilterPanel
            :type="type"
            :category-id="categoryId"
            :transmission="transmission"
            :min-seats="minSeats"
            :min-price="minPrice"
            :max-price="maxPrice"
            @update:filters="handleUpdateFilters"
            @reset="resetAllFilters"
            @apply="updateUrlQuery()"
          />
        </aside>

        <!-- Mobile Filter Button Trigger (FR-3.3) -->
        <div class="lg:hidden flex justify-end">
          <Button
            variant="outline"
            size="md"
            @click="isMobileFilterOpen = true"
            class="w-full sm:w-auto"
          >
            <SlidersHorizontal class="w-4 h-4" />
            <span>Filter & Urutkan</span>
          </Button>
        </div>

        <!-- Right Side: Active Chips & Vehicles Grid -->
        <main class="lg:col-span-3">
          <!-- Active Chips & Sort Bar (FR-3.4) -->
          <ActiveFilterChips
            :count="filteredVehicles.length"
            :chips="activeFilterChips"
            :sort-by="sortBy"
            @update:sort-by="sortBy = $event; updateUrlQuery()"
            @clear-all="resetAllFilters"
          />

          <!-- Vehicles Grid (FR-3.5 & FR-3.6) -->
          <div
            v-if="filteredVehicles.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <VehicleCard
              v-for="vehicle in filteredVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
              :start-date="startDate"
              :end-date="endDate"
            />
          </div>

          <!-- Empty State (FR-3.7) -->
          <EmptyState
            v-else
            @reset="resetAllFilters"
          />
        </main>
      </div>
    </div>

    <!-- Mobile BottomSheet Filter (FR-3.3) -->
    <BottomSheet
      :is-open="isMobileFilterOpen"
      title="Filter Armada"
      @close="isMobileFilterOpen = false"
    >
      <VehicleFilterPanel
        :type="type"
        :category-id="categoryId"
        :transmission="transmission"
        :min-seats="minSeats"
        :min-price="minPrice"
        :max-price="maxPrice"
        @update:filters="handleUpdateFilters"
        @reset="resetAllFilters"
        @apply="updateUrlQuery(); isMobileFilterOpen = false"
      />
    </BottomSheet>
  </div>
</template>
