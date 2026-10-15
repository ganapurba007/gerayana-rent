import { createRouter, createWebHistory } from 'vue-router'
import { useRental } from '../composables/useRental'

const basePageRoutes = [
  { path: '', nameSuffix: 'home', component: () => import('../pages/Home.vue') },
  { path: 'armada', nameSuffix: 'fleet', component: () => import('../pages/Fleet.vue') },
  { path: 'armada/:slug', nameSuffix: 'vehicle-detail', component: () => import('../pages/VehicleDetail.vue') },
  { path: 'paket-wisata', nameSuffix: 'tours', component: () => import('../pages/Tours.vue') },
  { path: 'paket-wisata/:slug', nameSuffix: 'tour-detail', component: () => import('../pages/TourDetail.vue') },
  { path: 'pesan', nameSuffix: 'booking', component: () => import('../pages/Booking.vue') },
  { path: 'tentang', nameSuffix: 'about', component: () => import('../pages/About.vue') },
  { path: 'faq', nameSuffix: 'faq', component: () => import('../pages/Faq.vue') },
  { path: 'kontak', nameSuffix: 'contact', component: () => import('../pages/Contact.vue') }
]

const routes = [
  // 1. Standard Root Routes (Default Gerayana Rental)
  ...basePageRoutes.map((r) => ({
    path: r.path ? `/${r.path}` : '/',
    name: r.nameSuffix,
    component: r.component
  })),

  // 2. Subpath Repo Prefix (e.g. /gerayana-rent/:rentalSlug/...)
  ...basePageRoutes.map((r) => ({
    path: r.path ? `/gerayana-rent/:rentalSlug/${r.path}` : '/gerayana-rent/:rentalSlug',
    name: `repo-rental-${r.nameSuffix}`,
    component: r.component
  })),

  // 3. Dynamic Client Mockup Routes (e.g. /:rentalSlug/...)
  ...basePageRoutes.map((r) => ({
    path: r.path ? `/:rentalSlug/${r.path}` : '/:rentalSlug',
    name: `rental-${r.nameSuffix}`,
    component: r.component
  })),

  // 4. Catch-all 404 Route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation Guard: Synchronize active rental state on route navigation
router.beforeEach((to, from, next) => {
  const { setRental } = useRental()

  // 1. Extract from route param
  let slug = to.params.rentalSlug

  // 2. Fallback to query param (?rental=... or ?client=... or ?mockup=...)
  if (!slug && (to.query.rental || to.query.client || to.query.mockup)) {
    slug = to.query.rental || to.query.client || to.query.mockup
  }

  if (slug) {
    setRental(slug)
  } else {
    setRental('gerayana')
  }

  next()
})

export default router
