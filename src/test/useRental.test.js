import { describe, it, expect, beforeEach } from 'vitest'
import { useRental } from '../composables/useRental'

describe('useRental Composable Unit Tests', () => {
  beforeEach(() => {
    const { setRental } = useRental()
    setRental('gerayana')
  })

  it('initializes with default gerayana rental', () => {
    const { currentSlug, rental, isDefaultRental } = useRental()
    expect(currentSlug.value).toBe('gerayana')
    expect(rental.value.name).toBe('Gerayana Rental & Trip')
    expect(isDefaultRental.value).toBe(true)
  })

  it('switches to surya-rental and updates CSS variables in DOM', () => {
    const { setRental, currentSlug, rental, isDefaultRental } = useRental()
    setRental('surya-rental')

    expect(currentSlug.value).toBe('surya-rental')
    expect(rental.value.name).toBe('Surya Rental & Tour')
    expect(rental.value.shortName).toBe('SURYA')
    expect(isDefaultRental.value).toBe(false)

    // Check DOM property set on document.documentElement
    const brand500 = document.documentElement.style.getPropertyValue('--color-brand-500')
    expect(brand500).toBe('234 88 12') // #ea580c RGB
  })

  it('rentalLink prefixes paths correctly for mockup client', () => {
    const { setRental, rentalLink } = useRental()

    // Default: no prefix
    setRental('gerayana')
    expect(rentalLink('/')).toBe('/')
    expect(rentalLink('/armada')).toBe('/armada')
    expect(rentalLink('/armada?type=motor')).toBe('/armada?type=motor')

    // Custom client: prefixed
    setRental('surya-rental')
    expect(rentalLink('/')).toBe('/surya-rental')
    expect(rentalLink('/armada')).toBe('/surya-rental/armada')
    expect(rentalLink('/armada?type=motor')).toBe('/surya-rental/armada?type=motor')
  })
})
