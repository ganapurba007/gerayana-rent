/**
 * Format number to Indonesian Rupiah (IDR)
 * e.g., 650000 -> "Rp 650.000"
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format ISO date string YYYY-MM-DD to Indonesian readable date
 * e.g., "2026-10-15" -> "15 Oktober 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString + 'T00:00:00')
  if (isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
