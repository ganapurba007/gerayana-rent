<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Car, Menu, X, ChevronDown, Sparkles } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isArmadaDropdownOpen = ref(false)

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
  isArmadaDropdownOpen.value = false
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
  {
    name: 'Armada',
    to: '/armada',
    dropdown: [
      { name: 'Semua Armada', to: '/armada' },
      { name: 'Sewa Mobil', to: '/armada?type=mobil' },
      { name: 'Sewa Motor', to: '/armada?type=motor' }
    ]
  },
  { name: 'Paket Wisata', to: '/paket-wisata' },
  { name: 'Tentang Kami', to: '/tentang' },
  { name: 'FAQ', to: '/faq' },
  { name: 'Kontak', to: '/kontak' }
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group focus:outline-none" @click="closeMobileMenu">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Car class="w-6 h-6" />
          </div>
          <div>
            <span class="text-lg font-extrabold text-slate-900 tracking-tight leading-none block">GERAYANA</span>
            <span class="text-[11px] font-semibold text-brand-600 uppercase tracking-widest block mt-0.5">Rental & Trip</span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.name">
            <!-- Normal Link -->
            <router-link
              v-if="!link.dropdown"
              :to="link.to"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors relative',
                isActive(link.to)
                  ? 'text-brand-600 font-semibold bg-brand-50/80'
                  : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
              ]"
            >
              {{ link.name }}
            </router-link>

            <!-- Dropdown Link (Armada) -->
            <div
              v-else
              class="relative"
              @mouseenter="isArmadaDropdownOpen = true"
              @mouseleave="isArmadaDropdownOpen = false"
            >
              <router-link
                :to="link.to"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1',
                  isActive(link.to)
                    ? 'text-brand-600 font-semibold bg-brand-50/80'
                    : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                ]"
              >
                <span>{{ link.name }}</span>
                <ChevronDown class="w-4 h-4 text-slate-400" />
              </router-link>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="transform opacity-0 scale-95 -translate-y-1"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform opacity-100 scale-100 translate-y-0"
                leave-to-class="transform opacity-0 scale-95 -translate-y-1"
              >
                <div
                  v-if="isArmadaDropdownOpen"
                  class="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                >
                  <router-link
                    v-for="subItem in link.dropdown"
                    :key="subItem.to"
                    :to="subItem.to"
                    class="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {{ subItem.name }}
                  </router-link>
                </div>
              </Transition>
            </div>
          </template>
        </nav>

        <!-- CTA Button (Desktop) -->
        <div class="hidden lg:flex items-center gap-3">
          <router-link to="/armada">
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
        class="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-40 p-5 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto"
      >
        <template v-for="link in navLinks" :key="link.name">
          <div v-if="link.dropdown" class="space-y-1">
            <span class="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              {{ link.name }}
            </span>
            <router-link
              v-for="subItem in link.dropdown"
              :key="subItem.to"
              :to="subItem.to"
              @click="closeMobileMenu"
              :class="[
                'block px-4 py-2.5 rounded-lg text-base font-medium transition-colors',
                route.fullPath === subItem.to
                  ? 'text-brand-600 bg-brand-50 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              ]"
            >
              {{ subItem.name }}
            </router-link>
          </div>

          <router-link
            v-else
            :to="link.to"
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-2.5 rounded-lg text-base font-medium transition-colors',
              isActive(link.to)
                ? 'text-brand-600 bg-brand-50 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            ]"
          >
            {{ link.name }}
          </router-link>
        </template>

        <div class="pt-3 border-t border-slate-100">
          <router-link to="/armada" @click="closeMobileMenu" class="block">
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
