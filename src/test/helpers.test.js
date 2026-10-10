import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate } from '../lib/format'
import { calculateDays, addDaysString } from '../lib/dates'
import { isVehicleAvailable } from '../lib/availability'
import { calculateVehiclePrice, calculateTourPrice } from '../lib/pricing'
import { buildBookingWhatsAppUrl, buildGeneralWhatsAppUrl } from '../lib/whatsapp'
import { customerSchema, vehicleBookingSchema } from '../lib/schemas'

describe('Helper Pure Functions Unit Tests', () => {
  it('formatCurrency formats numbers correctly', () => {
    expect(formatCurrency(650000)).toMatch(/Rp.*650\.000/)
    expect(formatCurrency(0)).toMatch(/Rp.*0/)
    expect(formatCurrency(null)).toBe('Rp 0')
  })

  it('formatDate formats ISO dates to Indonesian strings', () => {
    expect(formatDate('2026-10-15')).toBe('15 Oktober 2026')
    expect(formatDate('')).toBe('')
  })

  it('calculateDays calculates inclusive day counts', () => {
    expect(calculateDays('2026-10-15', '2026-10-15')).toBe(1)
    expect(calculateDays('2026-10-15', '2026-10-17')).toBe(2)
  })

  it('addDaysString adds days to ISO date', () => {
    expect(addDaysString('2026-10-15', 3)).toBe('2026-10-18')
  })

  it('isVehicleAvailable detects booked range conflicts', () => {
    const bookedRanges = [{ from: '2026-10-15', to: '2026-10-18' }]
    expect(isVehicleAvailable(bookedRanges, '2026-10-10', '2026-10-12')).toBe(true)
    expect(isVehicleAvailable(bookedRanges, '2026-10-14', '2026-10-16')).toBe(false)
    expect(isVehicleAvailable(bookedRanges, '2026-10-18', '2026-10-20')).toBe(false)
    expect(isVehicleAvailable(bookedRanges, '2026-10-19', '2026-10-22')).toBe(true)
  })

  it('calculateVehiclePrice computes totals with driver and extras', () => {
    const vehicle = {
      name: 'Test Car',
      pricePerDay: 500000,
      driverPerDay: 150000,
      extras: [{ id: 'roof-rack', label: 'Roof Rack', pricePerDay: 50000 }]
    }

    const price = calculateVehiclePrice(vehicle, {
      startDate: '2026-10-15',
      endDate: '2026-10-17',
      withDriver: true,
      selectedExtras: ['roof-rack']
    })

    expect(price.days).toBe(2)
    expect(price.baseSubtotal).toBe(1000000)
    expect(price.driverSubtotal).toBe(300000)
    expect(price.extrasSubtotal).toBe(100000)
    expect(price.total).toBe(1400000)
  })

  it('calculateTourPrice computes price according to pax tiers', () => {
    const tour = {
      title: 'Bromo Trip',
      minPax: 2,
      maxPax: 8,
      priceTiers: [
        { minPax: 2, maxPax: 4, pricePerPerson: 800000 },
        { minPax: 5, maxPax: 8, pricePerPerson: 600000 }
      ]
    }

    const priceFor3 = calculateTourPrice(tour, 3)
    expect(priceFor3.pricePerPerson).toBe(800000)
    expect(priceFor3.total).toBe(2400000)

    const priceFor6 = calculateTourPrice(tour, 6)
    expect(priceFor6.pricePerPerson).toBe(600000)
    expect(priceFor6.total).toBe(3600000)
  })

  it('buildBookingWhatsAppUrl generates valid wa.me URL', () => {
    const draft = {
      kind: 'armada',
      startDate: '2026-10-15',
      endDate: '2026-10-17',
      pickupTime: '09:00',
      pickupLocationId: 'bandara',
      withDriver: false,
      customer: { name: 'Ahmad', whatsapp: '081234567890' }
    }
    const itemDetails = { name: 'Toyota Avanza', companyName: 'Gerayana Rent' }
    const url = buildBookingWhatsAppUrl('6281234567890', draft, itemDetails, 'Bandara Utama')

    expect(url).toContain('https://wa.me/6281234567890')
    expect(url).toContain(encodeURIComponent('Toyota Avanza'))
    expect(url).toContain(encodeURIComponent('Ahmad'))
  })

  it('customerSchema validates phone number and name', () => {
    const valid = customerSchema.safeParse({
      name: 'Budi Santoso',
      whatsapp: '081234567890',
      agreed: true
    })
    expect(valid.success).toBe(true)

    const invalidName = customerSchema.safeParse({
      name: 'Bu',
      whatsapp: '081234567890',
      agreed: true
    })
    expect(invalidName.success).toBe(false)
  })
})
