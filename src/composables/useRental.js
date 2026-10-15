import { ref, computed } from 'vue'
import { getRentalBySlug, getRegisteredRentals } from '../lib/rentals'
import {
  generateColorShades,
  shadesToCssVariables,
  applyCssVariablesToElement
} from '../lib/theme'

// Shared reactive state across components
const currentSlug = ref('gerayana')

export function useRental() {
  const rental = computed(() => getRentalBySlug(currentSlug.value))
  const availableRentals = computed(() => getRegisteredRentals())
  const isDefaultRental = computed(() => currentSlug.value === 'gerayana')

  /**
   * Set active rental by slug and dynamically inject CSS palette variables into the DOM.
   *
   * @param {string} slug
   */
  function setRental(slug) {
    const resolved = getRentalBySlug(slug)
    currentSlug.value = resolved.slug

    // Apply CSS Variables in browser
    if (typeof document !== 'undefined') {
      const brandShades = generateColorShades(resolved.colors.brand)
      const brandVars = shadesToCssVariables(brandShades, 'brand')

      const accentShades = generateColorShades(resolved.colors.accent)
      const accentVars = shadesToCssVariables(accentShades, 'accent')

      applyCssVariablesToElement({
        ...brandVars,
        ...accentVars
      })

      // Update document title if present
      if (document.title && !document.title.includes(resolved.name)) {
        document.title = `${resolved.name} — ${resolved.tagline || 'Sewa Mobil & Motor'}`
      }
    }
  }

  /**
   * Helper to generate context-aware navigation links.
   * For non-default rentals, prefixes the path with /:slug (e.g. /surya-rental/armada).
   *
   * @param {string} to
   * @returns {string}
   */
  function rentalLink(to) {
    if (!to || typeof to !== 'string') return '/'
    if (currentSlug.value === 'gerayana') return to

    // Preserve query parameters if present
    const [pathPart, queryPart] = to.split('?')
    const cleanPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`
    const baseWithSlug = cleanPath === '/' ? `/${currentSlug.value}` : `/${currentSlug.value}${cleanPath}`

    return queryPart ? `${baseWithSlug}?${queryPart}` : baseWithSlug
  }

  return {
    currentSlug,
    rental,
    availableRentals,
    isDefaultRental,
    setRental,
    rentalLink
  }
}
