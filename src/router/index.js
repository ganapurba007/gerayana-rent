import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/armada',
    name: 'fleet',
    component: () => import('../pages/Fleet.vue')
  },
  {
    path: '/armada/:slug',
    name: 'vehicle-detail',
    component: () => import('../pages/VehicleDetail.vue')
  },
  {
    path: '/paket-wisata',
    name: 'tours',
    component: () => import('../pages/Tours.vue')
  },
  {
    path: '/paket-wisata/:slug',
    name: 'tour-detail',
    component: () => import('../pages/TourDetail.vue')
  },
  {
    path: '/pesan',
    name: 'booking',
    component: () => import('../pages/Booking.vue')
  },
  {
    path: '/tentang',
    name: 'about',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../pages/Faq.vue')
  },
  {
    path: '/kontak',
    name: 'contact',
    component: () => import('../pages/Contact.vue')
  },
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
    return { top: 0 }
  }
})

export default router
