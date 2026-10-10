import { describe, it, expect } from 'vitest'
import companyData from '../data/company.json'
import homeData from '../data/home.json'
import categoriesData from '../data/categories.json'
import vehiclesData from '../data/vehicles.json'
import toursData from '../data/tours.json'
import locationsData from '../data/locations.json'
import testimonialsData from '../data/testimonials.json'
import faqsData from '../data/faqs.json'

describe('Data Integrity & Schema Validation', () => {
  it('company.json has all required fields and valid WhatsApp number', () => {
    expect(companyData.name).toBe('Gerayana Rental & Trip')
    expect(companyData.contact.whatsapp).toMatch(/^62[0-9]+$/)
    expect(companyData.operatingHours.openHour).toBeLessThan(companyData.operatingHours.closeHour)
  })

  it('home.json has correct structure and slide counts', () => {
    expect(homeData.heroSlides.length).toBeGreaterThanOrEqual(2)
    expect(homeData.benefits.length).toBe(3)
    expect(homeData.aboutPoints.length).toBe(4)
    expect(homeData.stats.length).toBe(3)
  })

  it('categories.json IDs are unique and types are valid', () => {
    const ids = categoriesData.map(c => c.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
    categoriesData.forEach(cat => {
      expect(['mobil', 'motor']).includes(cat.type)
    })
  })

  it('vehicles.json has valid FKs, unique slugs, and correct types', () => {
    const validCategoryIds = new Set(categoriesData.map(c => c.id))
    const categoryTypeMap = new Map(categoriesData.map(c => [c.id, c.type]))
    const slugs = new Set()

    expect(vehiclesData.length).toBeGreaterThanOrEqual(14) // 8 cars + 6 bikes

    vehiclesData.forEach(vehicle => {
      expect(slugs.has(vehicle.slug)).toBe(false)
      slugs.add(vehicle.slug)

      expect(['mobil', 'motor']).includes(vehicle.type)
      expect(validCategoryIds.has(vehicle.category)).toBe(true)
      expect(categoryTypeMap.get(vehicle.category)).toBe(vehicle.type)

      expect(vehicle.pricePerDay).toBeGreaterThan(0)
      expect(Array.isArray(vehicle.images)).toBe(true)
      expect(vehicle.images.length).toBeGreaterThan(0)

      if (vehicle.bookedRanges) {
        vehicle.bookedRanges.forEach(range => {
          expect(range.from).toMatch(/^\d{4}-\d{2}-\d{2}$/)
          expect(range.to).toMatch(/^\d{4}-\d{2}-\d{2}$/)
          expect(range.from <= range.to).toBe(true)
        })
      }
    })
  })

  it('tours.json has unique slugs and non-overlapping price tiers', () => {
    const slugs = new Set()

    expect(toursData.length).toBeGreaterThanOrEqual(5)

    toursData.forEach(tour => {
      expect(slugs.has(tour.slug)).toBe(false)
      slugs.add(tour.slug)

      expect(tour.minPax).toBeGreaterThan(0)
      expect(tour.maxPax).toBeGreaterThanOrEqual(tour.minPax)

      // Validate price tiers continuity
      let currentPax = tour.minPax
      tour.priceTiers.forEach(tier => {
        expect(tier.minPax).toBe(currentPax)
        expect(tier.maxPax).toBeGreaterThanOrEqual(tier.minPax)
        expect(tier.pricePerPerson).toBeGreaterThan(0)
        currentPax = tier.maxPax + 1
      })
      expect(currentPax - 1).toBe(tour.maxPax)
    })
  })

  it('locations.json has valid unique IDs', () => {
    const ids = locationsData.map(l => l.id)
    expect(ids.length).toBe(new Set(ids).size)
  })

  it('testimonials.json and faqs.json are populated', () => {
    expect(testimonialsData.length).toBeGreaterThanOrEqual(4)
    expect(faqsData.length).toBeGreaterThanOrEqual(12)
  })
})
