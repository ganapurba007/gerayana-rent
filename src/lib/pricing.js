import { calculateDays } from './dates'

/**
 * Calculate pricing for vehicle booking
 */
export function calculateVehiclePrice(vehicle, { startDate, endDate, withDriver = false, selectedExtras = [] }) {
  if (!vehicle) return { days: 0, baseSubtotal: 0, driverSubtotal: 0, extrasSubtotal: 0, total: 0, lines: [] }

  const days = calculateDays(startDate, endDate)
  const baseSubtotal = vehicle.pricePerDay * days

  let driverSubtotal = 0
  if (withDriver && vehicle.driverPerDay) {
    driverSubtotal = vehicle.driverPerDay * days
  }

  let extrasSubtotal = 0
  const extrasLines = []

  if (vehicle.extras && selectedExtras.length > 0) {
    vehicle.extras.forEach(extra => {
      if (selectedExtras.includes(extra.id)) {
        const cost = extra.pricePerDay * days
        extrasSubtotal += cost
        extrasLines.push({ label: extra.label, amount: cost })
      }
    })
  }

  const total = baseSubtotal + driverSubtotal + extrasSubtotal

  const lines = [
    { label: `Sewa ${vehicle.name} (${days} hari @ Rp ${vehicle.pricePerDay.toLocaleString('id-ID')})`, amount: baseSubtotal }
  ]

  if (driverSubtotal > 0) {
    lines.push({ label: `Layanan Driver (${days} hari @ Rp ${vehicle.driverPerDay.toLocaleString('id-ID')})`, amount: driverSubtotal })
  }

  extrasLines.forEach(item => lines.push(item))

  return {
    days,
    baseSubtotal,
    driverSubtotal,
    extrasSubtotal,
    total,
    lines
  }
}

/**
 * Calculate pricing for tour package
 */
export function calculateTourPrice(tour, pax) {
  if (!tour || !pax || pax < tour.minPax) {
    return { pax: pax || 0, pricePerPerson: 0, total: 0, lines: [] }
  }

  const effectivePax = Math.min(pax, tour.maxPax)
  const matchingTier = tour.priceTiers.find(tier => effectivePax >= tier.minPax && effectivePax <= tier.maxPax)
  const pricePerPerson = matchingTier ? matchingTier.pricePerPerson : 0
  const total = pricePerPerson * effectivePax

  const lines = [
    { label: `Paket ${tour.title} (${effectivePax} orang @ Rp ${pricePerPerson.toLocaleString('id-ID')})`, amount: total }
  ]

  return {
    pax: effectivePax,
    pricePerPerson,
    total,
    lines
  }
}
