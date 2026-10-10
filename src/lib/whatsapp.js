import { formatDate, formatCurrency } from './format'

/**
 * Build WhatsApp click URL for vehicle or tour booking
 */
export function buildBookingWhatsAppUrl(companyWhatsapp, draft, itemDetails, locationName = '') {
  let message = `Halo ${itemDetails?.companyName || 'Gerayana Rental & Trip'}, saya ingin memesan:\n\n`

  if (draft.kind === 'armada') {
    message += `🚗 *UNIT:* ${itemDetails?.name}\n`
    message += `📅 *TANGGAL:* ${formatDate(draft.startDate)} s/d ${formatDate(draft.endDate)}\n`
    message += `⏰ *JAM AMBIL:* ${draft.pickupTime || '08:00'} WIB\n`
    message += `📍 *LOKASI AMBIL:* ${locationName || draft.pickupLocationId}\n`
    message += `👤 *DRIVER:* ${draft.withDriver ? 'Ya (Termasuk Driver)' : 'Lepas Kunci'}\n`
  } else {
    message += `🌴 *PAKET WISATA:* ${itemDetails?.title}\n`
    message += `📅 *TANGGAL BERANGKAT:* ${formatDate(draft.startDate)}\n`
    message += `👥 *JUMLAH PESERTA:* ${draft.pax} Orang\n`
  }

  if (itemDetails?.pricing?.total) {
    message += `💰 *TOTAL ESTIMASI:* ${formatCurrency(itemDetails.pricing.total)}\n`
  }

  message += `\n*DATA PEMESAN:*\n`
  message += `- Nama: ${draft.customer?.name}\n`
  message += `- WhatsApp: ${draft.customer?.whatsapp}\n`
  if (draft.customer?.email) {
    message += `- Email: ${draft.customer.email}\n`
  }
  if (draft.customer?.notes) {
    message += `- Catatan: ${draft.customer.notes}\n`
  }

  message += `\nMohon informasi ketersediaan & langkah konfirmasi selanjutnya. Terima kasih!`

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${companyWhatsapp}?text=${encodedMessage}`
}

/**
 * Build general WhatsApp inquiry URL
 */
export function buildGeneralWhatsAppUrl(companyWhatsapp, customText = '') {
  const message = customText || 'Halo Gerayana Rental & Trip, saya mau bertanya mengenai sewa kendaraan / paket wisata.'
  return `https://wa.me/${companyWhatsapp}?text=${encodeURIComponent(message)}`
}
