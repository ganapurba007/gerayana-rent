<script setup>
import { useHead } from '@unhead/vue'
import companyData from '../data/company.json'
import HeroSection from '../components/sections/HeroSection.vue'
import WhyUsSection from '../components/sections/WhyUsSection.vue'
import FeaturedVehiclesSection from '../components/sections/FeaturedVehiclesSection.vue'
import CategoriesSection from '../components/sections/CategoriesSection.vue'
import FeaturedToursSection from '../components/sections/FeaturedToursSection.vue'
import CallToActionStrip from '../components/sections/CallToActionStrip.vue'
import FunFactsSection from '../components/sections/FunFactsSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'

useHead({
  title: `${companyData.name} - ${companyData.tagline}`,
  meta: [
    { name: 'description', content: companyData.about }
  ]
})
</script>

<template>
  <div>
    <!-- FR-2.1 & FR-2.2: Hero Slider & Search Widget -->
    <HeroSection />

    <!-- FR-2.3: Kenapa Memilih Kami -->
    <WhyUsSection />

    <!-- FR-2.5: Armada Unggulan -->
    <FeaturedVehiclesSection />

    <!-- FR-2.6: Kategori Kendaraan -->
    <CategoriesSection />

    <!-- FR-2.7: Paket Wisata Unggulan -->
    <FeaturedToursSection />

    <!-- FR-2.8: Strip CTA WA / Telepon -->
    <CallToActionStrip />

    <!-- FR-2.9: Fun Facts -->
    <FunFactsSection />

    <!-- FR-2.10: Testimoni -->
    <TestimonialsSection />
  </div>
</template>
