<script setup>
import { ref } from 'vue'
import companyData from '../../data/company.json'
import homeData from '../../data/home.json'
import Button from '../ui/Button.vue'
import { useInView } from '../../composables/useInView'
import { useCountUp } from '../../composables/useCountUp'
import { CheckCircle2, ArrowRight, Award } from 'lucide-vue-next'

const sectionRef = ref(null)
const { isInView } = useInView(sectionRef)
const { currentCount } = useCountUp(homeData.experienceYears || 5, isInView, 1500)
</script>

<template>
  <section ref="sectionRef" class="py-16 bg-white overflow-hidden border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left Image & Animated Experience Card -->
        <div class="relative">
          <div class="aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
            <img
              src="/images/home/about-service.jpg"
              alt="Layanan Profesional Gerayana Rent"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Animated Experience Counter Overlay -->
          <div class="absolute -bottom-6 -right-2 sm:bottom-6 sm:-right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-4 max-w-xs">
            <div class="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <Award class="w-6 h-6" />
            </div>
            <div>
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-extrabold text-white">
                  {{ currentCount }}
                </span>
                <span class="text-xl font-bold text-accent-400">+</span>
              </div>
              <span class="text-xs font-medium text-slate-300">Tahun Pengalaman Melayani</span>
            </div>
          </div>
        </div>

        <!-- Right Content & Guarantee Points -->
        <div class="space-y-6">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Tentang Gerayana Rent
            </span>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mitra Transportasi & Liburan Terbaik Anda
            </h2>
          </div>

          <p class="text-slate-600 text-base leading-relaxed">
            {{ companyData.about }}
          </p>

          <!-- 4 Guarantee Points -->
          <div class="space-y-3 pt-2">
            <div
              v-for="(point, idx) in homeData.aboutPoints"
              :key="idx"
              class="flex items-start gap-3"
            >
              <CheckCircle2 class="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <span class="text-sm font-medium text-slate-700 leading-snug">{{ point }}</span>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="pt-4">
            <router-link to="/tentang">
              <Button variant="secondary" size="lg">
                <span>Baca Selengkapnya</span>
                <ArrowRight class="w-4 h-4" />
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
