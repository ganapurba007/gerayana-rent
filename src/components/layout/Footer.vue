<script setup>
import companyData from '../../data/company.json'
import { Car, MapPin, Phone, Mail, Clock, Instagram, Facebook, Video, ShieldCheck } from 'lucide-vue-next'

const iconMap = {
  Instagram,
  Facebook,
  Video
}
</script>

<template>
  <footer class="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        <!-- Col 1: Business Profile -->
        <div class="space-y-4">
          <router-link to="/" class="flex items-center gap-3 group focus:outline-none">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Car class="w-6 h-6" />
            </div>
            <div>
              <span class="text-lg font-extrabold text-white tracking-tight leading-none block">GERAYANA</span>
              <span class="text-[11px] font-semibold text-brand-400 uppercase tracking-widest block mt-0.5">Rental & Trip</span>
            </div>
          </router-link>

          <p class="text-sm leading-relaxed text-slate-400">
            {{ companyData.about }}
          </p>

          <div class="flex items-center gap-3 pt-2">
            <a
              v-for="soc in companyData.social"
              :key="soc.name"
              :href="soc.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              :aria-label="soc.name"
            >
              <component :is="iconMap[soc.icon] || ShieldCheck" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h3 class="text-white font-bold text-base mb-4 tracking-wide">Tautan Cepat</h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <router-link to="/" class="hover:text-brand-400 transition-colors">Beranda</router-link>
            </li>
            <li>
              <router-link to="/armada" class="hover:text-brand-400 transition-colors">Daftar Armada Mobil & Motor</router-link>
            </li>
            <li>
              <router-link to="/paket-wisata" class="hover:text-brand-400 transition-colors">Paket Wisata & Liburan</router-link>
            </li>
            <li>
              <router-link to="/tentang" class="hover:text-brand-400 transition-colors">Tentang Kami</router-link>
            </li>
            <li>
              <router-link to="/faq" class="hover:text-brand-400 transition-colors">Pertanyaan Umum (FAQ)</router-link>
            </li>
            <li>
              <router-link to="/kontak" class="hover:text-brand-400 transition-colors">Hubungi Kami</router-link>
            </li>
          </ul>
        </div>

        <!-- Col 3: Services -->
        <div>
          <h3 class="text-white font-bold text-base mb-4 tracking-wide">Layanan Utama</h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <router-link to="/armada?type=mobil" class="hover:text-brand-400 transition-colors">Sewa Mobil Lepas Kunci</router-link>
            </li>
            <li>
              <router-link to="/armada?type=mobil" class="hover:text-brand-400 transition-colors">Sewa Mobil Dengan Driver</router-link>
            </li>
            <li>
              <router-link to="/armada?type=motor" class="hover:text-brand-400 transition-colors">Sewa Motor Harian & Mingguan</router-link>
            </li>
            <li>
              <router-link to="/paket-wisata" class="hover:text-brand-400 transition-colors">Paket Wisata Bromo & City Tour</router-link>
            </li>
            <li>
              <router-link to="/faq" class="hover:text-brand-400 transition-colors">Syarat & Ketentuan Sewa</router-link>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact & Hours -->
        <div class="space-y-4">
          <h3 class="text-white font-bold text-base mb-4 tracking-wide">Kontak & Operasional</h3>
          
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{{ companyData.contact.address }}</span>
            </div>

            <div class="flex items-center gap-3">
              <Phone class="w-4 h-4 text-brand-400 shrink-0" />
              <a :href="`tel:${companyData.contact.phone}`" class="hover:text-white transition-colors">
                {{ companyData.contact.phone }}
              </a>
            </div>

            <div class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-brand-400 shrink-0" />
              <a :href="`mailto:${companyData.contact.email}`" class="hover:text-white transition-colors">
                {{ companyData.contact.email }}
              </a>
            </div>

            <div class="flex items-start gap-3 pt-2">
              <Clock class="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
              <span>{{ companyData.operatingHours.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
        <p>© 2026 {{ companyData.name }}. All Rights Reserved.</p>
        <p class="text-slate-500">Solusi Sewa Mobil, Motor & Paket Wisata Terpercaya</p>
      </div>
    </div>
  </footer>
</template>
