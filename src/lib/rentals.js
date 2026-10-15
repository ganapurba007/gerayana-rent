/**
 * rentals.js — Pure functions for rental profile resolution and multi-tenant mockup fallback.
 */
import baseCompanyData from '../data/company.json'
import rentalsRegistry from '../data/rentals.json'

/**
 * Convert slug string to Title Case words (e.g. "surya-rental" -> "Surya Rental")
 *
 * @param {string} slug
 * @returns {string}
 */
export function slugToTitle(slug) {
  if (!slug || typeof slug !== 'string') return ''
  return slug
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Get the list of all registered rental presets.
 *
 * @returns {Array<{ slug: string, name: string, shortName: string, subName: string, logo: string, brandColor: string }>}
 */
export function getRegisteredRentals() {
  const list = []
  const rentals = rentalsRegistry?.rentals || {}

  for (const [slug, item] of Object.entries(rentals)) {
    list.push({
      slug,
      name: item.name || slugToTitle(slug),
      shortName: item.shortName || slugToTitle(slug).split(' ')[0] || 'RENTAL',
      subName: item.subName || 'Rental & Trip',
      logo: item.logo || '/images/logos/gerayana.svg',
      brandColor: item.colors?.brand || '#14b8a6',
      accentColor: item.colors?.accent || '#f59e0b'
    })
  }

  return list
}

/**
 * Retrieve and construct a complete rental profile by slug.
 * If the slug is not found in rentals.json but is a non-empty string,
 * it dynamically synthesizes a realistic rental profile so any input slug works!
 *
 * @param {string} [slug]
 * @returns {object} Full merged rental object
 */
export function getRentalBySlug(slug) {
  const defaultSlug = rentalsRegistry?.default || 'gerayana'
  const cleanSlug = slug && typeof slug === 'string' ? slug.trim().toLowerCase() : ''
  const targetSlug = cleanSlug || defaultSlug

  const registered = rentalsRegistry?.rentals?.[targetSlug]

  // Clone base company data
  const merged = JSON.parse(JSON.stringify(baseCompanyData))

  // 1. If found in registry
  if (registered) {
    merged.slug = targetSlug
    if (registered.name) merged.name = registered.name
    merged.shortName = registered.shortName || slugToTitle(targetSlug).split(' ')[0]
    merged.subName = registered.subName || 'Rental & Trip'
    if (registered.tagline) merged.tagline = registered.tagline
    if (registered.about) merged.about = registered.about
    if (registered.vision) merged.vision = registered.vision
    merged.logo = registered.logo || '/images/logos/gerayana.svg'
    merged.colors = {
      brand: registered.colors?.brand || '#14b8a6',
      accent: registered.colors?.accent || '#f59e0b'
    }
    if (registered.contact) {
      merged.contact = {
        ...merged.contact,
        ...registered.contact
      }
    }
    return merged
  }

  // 2. If it's the default slug or cleanSlug is empty
  if (!cleanSlug || targetSlug === defaultSlug) {
    return {
      ...merged,
      slug: defaultSlug,
      shortName: 'GERAYANA',
      subName: 'Rental & Trip',
      logo: '/images/logos/gerayana.svg',
      colors: {
        brand: '#14b8a6',
        accent: '#f59e0b'
      }
    }
  }

  // 3. Dynamic synthesis for arbitrary client mockup slug (e.g. "surya-rental")
  const title = slugToTitle(cleanSlug)
  const words = title.split(' ')
  const shortName = words[0].toUpperCase()
  const subName = words.slice(1).join(' ') || 'Rental & Trip'

  return {
    ...merged,
    slug: cleanSlug,
    name: title,
    shortName,
    subName,
    tagline: `Solusi Sewa Mobil, Motor & Liburan Terbaik — ${title}`,
    about: `${title} menyediakan armada kendaraan roda dua dan roda empat serta paket wisata terbaik. Kami berkomitmen memberikan pengalaman perjalanan yang aman, nyaman, dan transparan.`,
    logo: null, // Will display stylized badge in UI
    colors: {
      brand: '#0d9488', // Elegant teal fallback
      accent: '#f59e0b'
    }
  }
}
