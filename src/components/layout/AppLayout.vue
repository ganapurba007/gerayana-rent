<script setup>
import TopBar from './TopBar.vue'
import Navbar from './Navbar.vue'
import Breadcrumb from './Breadcrumb.vue'
import Footer from './Footer.vue'
import FloatingWhatsApp from './FloatingWhatsApp.vue'
import ScrollToTop from './ScrollToTop.vue'
import Toast from '../ui/Toast.vue'

defineProps({
  breadcrumbItems: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
    <!-- Top Bar -->
    <TopBar />

    <!-- Sticky Navbar -->
    <Navbar />

    <!-- Breadcrumbs if items provided -->
    <Breadcrumb v-if="breadcrumbItems && breadcrumbItems.length > 0" :items="breadcrumbItems" />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Floating WhatsApp CTA -->
    <FloatingWhatsApp />

    <!-- Scroll To Top Button -->
    <ScrollToTop />

    <!-- Global Toast Container -->
    <Toast />
  </div>
</template>
