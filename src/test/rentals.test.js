import { describe, it, expect } from 'vitest'
import { slugToTitle, getRegisteredRentals, getRentalBySlug } from '../lib/rentals'

describe('Rentals Helper Unit Tests', () => {
  it('slugToTitle converts kebab-case to Title Case words', () => {
    expect(slugToTitle('surya-rental')).toBe('Surya Rental')
    expect(slugToTitle('bali_trans_dewata')).toBe('Bali Trans Dewata')
    expect(slugToTitle('')).toBe('')
  })

  it('getRegisteredRentals returns array containing default and presets', () => {
    const list = getRegisteredRentals()
    expect(list.length).toBeGreaterThanOrEqual(2)
    const slugs = list.map(r => r.slug)
    expect(slugs).toContain('gerayana')
    expect(slugs).toContain('surya-rental')
  })

  it('getRentalBySlug returns registered profile with custom colors and logo', () => {
    const surya = getRentalBySlug('surya-rental')
    expect(surya.name).toBe('Surya Rental & Tour')
    expect(surya.shortName).toBe('SURYA')
    expect(surya.logo).toBe('/images/logos/surya-rental.svg')
    expect(surya.colors.brand).toBe('#ea580c')
    expect(surya.contact.whatsapp).toBe('6282198765432')
  })

  it('getRentalBySlug safely falls back to default on empty or undefined slug', () => {
    const defaultProfile = getRentalBySlug()
    expect(defaultProfile.slug).toBe('gerayana')
    expect(defaultProfile.name).toBe('Gerayana Rental & Trip')
  })

  it('getRentalBySlug synthesizes realistic profile for ad-hoc unregistered slug', () => {
    const custom = getRentalBySlug('nusantara-trip')
    expect(custom.slug).toBe('nusantara-trip')
    expect(custom.name).toBe('Nusantara Trip')
    expect(custom.shortName).toBe('NUSANTARA')
    expect(custom.colors.brand).toBeDefined()
  })
})
