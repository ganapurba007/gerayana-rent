<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Car, Menu, X, Sparkles } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import { useRental } from '../../composables/useRental'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const { rental, rentalLink, currentSlug } = useRental()

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleKeyDown(e) {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Close mobile menu on route change
watch(() => route.fullPath, () => {
  closeMobileMenu()
})

watch(isMobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

const navLinks = [
  { name: 'Beranda', to: '/' },
  { name: 'Sewa Mobil', to: '/armada?type=mobil' },
  { name: 'Sewa Motor', to: '/armada?type=motor' },
  { name: 'Paket Wisata', to: '/paket-wisata' },
  { name: 'Tentang Kami', to: '/tentang' },
  { name: 'FAQ', to: '/faq' },
  { name: 'Kontak', to: '/kontak' }
]

function isLinkActive(link) {
  const currentPath = route.path
  if (link.to === '/') {
    return currentPath === '/' || currentPath === `/${currentSlug.value}` || currentPath === `/gerayana-rent/${currentSlug.value}`
  }
  if (link.to === '/armada?type=mobil') {
    return currentPath.endsWith('/armada') && route.query.type !== 'motor'
  }
  if (link.to === '/armada?type=motor') {
    return currentPath.endsWith('/armada') && route.query.type === 'motor'
  }
  return currentPath.endsWith(link.to) || currentPath.includes(link.to)
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <router-link :to="rentalLink('/')" class="flex items-center gap-3 group focus:outline-none" @click="closeMobileMenu">
          <div v-if="rental.logo" class="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-md shadow-brand-500/10 border border-slate-100 group-hover:scale-105 transition-transform">
            <img :src="rental.logo" :alt="rental.name" class="w-full h-full object-contain p-1" />
          </div>
          <div v-else class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Car class="w-6 h-6" />
          </div>
          <div>
            <span class="text-lg font-extrabold text-slate-900 tracking-tight leading-none block uppercase">{{ rental.shortName || 'GERAYANA' }}</span>
            <span class="text-[11px] font-semibold text-brand-600 uppercase tracking-widest block mt-0.5">{{ rental.subName || 'Rental & Trip' }}</span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="rentalLink(link.to)"
            :class="[
              'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative',
              isLinkActive(link)
                ? 'text-brand-600 font-semibold bg-brand-50/80'
                : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
            ]"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <!-- CTA Button (Desktop) -->
        <div class="hidden lg:flex items-center gap-3">
          <router-link :to="rentalLink('/armada')">
            <Button variant="accent" size="md">
              <Sparkles class="w-4 h-4 shrink-0" />
              <span>Cari Kendaraan</span>
            </Button>
          </router-link>
        </div>

        <!-- Mobile Hamburger Button -->
        <button
          type="button"
          @click="toggleMobileMenu"
          class="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-100 focus:outline-none transition-colors"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Buka menu navigasi"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer Overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed inset-0 top-20 bg-slate-900/50 backdrop-blur-xs z-30"
        @click="closeMobileMenu"
      />
    </Transition>

    <!-- Mobile Drawer Content -->
    <Transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in transform"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-40 p-5 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="rentalLink(link.to)"
          @click="closeMobileMenu"
          :class="[
            'block px-4 py-2.5 rounded-lg text-base font-medium transition-colors',
            isLinkActive(link)
              ? 'text-brand-600 bg-brand-50 font-semibold'
              : 'text-slate-700 hover:bg-slate-50'
          ]"
        >
          {{ link.name }}
        </router-link>

        <div class="pt-3 border-t border-slate-100">
          <router-link :to="rentalLink('/armada')" @click="closeMobileMenu" class="block">
            <Button variant="accent" size="lg" block>
              <Sparkles class="w-5 h-5 shrink-0" />
              <span>Cari Kendaraan</span>
            </Button>
          </router-link>
        </div>
      </div>
    </Transition>
  </header>
</template>
