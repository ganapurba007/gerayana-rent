/**
 * Check if a date range [startDate, endDate] conflicts with any bookedRanges [{ from, to }]
 * All dates are ISO YYYY-MM-DD strings. Range comparison is inclusive.
 */
export function isVehicleAvailable(bookedRanges, startDateStr, endDateStr) {
  if (!bookedRanges || bookedRanges.length === 0) return true
  if (!startDateStr || !endDateStr) return true

  const reqStart = startDateStr
  const reqEnd = endDateStr

  return !bookedRanges.some(range => {
    // Overlap condition: reqStart <= range.to && reqEnd >= range.from
    return reqStart <= range.to && reqEnd >= range.from
  })
}
