/**
 * Calculate duration in days between two ISO date strings (inclusive/day count)
 * e.g., "2026-10-15" to "2026-10-17" -> 2 days (or minimum 1 day if same date)
 */
export function calculateDays(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 1
  const start = new Date(startDateStr + 'T00:00:00')
  const end = new Date(endDateStr + 'T00:00:00')

  const diffTime = end.getTime() - start.getTime()
  if (diffTime < 0) return 0
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(1, diffDays)
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayString() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get tomorrow's date in YYYY-MM-DD format
 */
export function getTomorrowString() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get date string + N days in YYYY-MM-DD format
 */
export function addDaysString(baseDateStr, days) {
  const d = new Date(baseDateStr + 'T00:00:00')
  d.setDate(d.getDate() + days)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
