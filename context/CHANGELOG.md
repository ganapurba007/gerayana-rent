# CHANGELOG.md

> Riwayat aktif proyek — hanya simpan ~10-15 fase terbaru di sini. Fase lama dipindahkan ke `CHANGELOG-archive.md` (ringkas, jangan copy-paste detail penuh). Entri terbaru selalu di PALING ATAS.

<!--
Format tiap entri:

## Fase [N] — [judul singkat] ([tanggal])
**FR terkait:** [nomor FR dari PRD.md §3, kalau ada]
**Yang dikerjakan:**
- [poin singkat]
**File yang berubah:** [daftar file utama, tidak perlu semua kalau banyak]
**Test:** [X passed / Y total]
**Docs updated:** [PRD §9 / SCHEMA.md / tidak ada perubahan scope]
-->

## Fase 6 — Paket Wisata (Daftar, Detail, Panel Harga) (2026-10-10)
**FR terkait:** FR-5.1, FR-5.2, FR-5.3, FR-5.4, FR-5.5
**Yang dikerjakan:**
- Membuat composable `useTourFilters.js` untuk memfilter paket wisata berdasarkan durasi dan rentang harga serta sinkronisasi query URL
- Membuat `TourPricePanel.vue` (FR-5.3 & FR-5.4: pemilih tanggal berangkat, konter jumlah peserta dengan batas `minPax`–`maxPax`, tabel skema tier harga, rincian total estimasi, dan bar CTA melayang pada mobile)
- Merakit `src/pages/Tours.vue` (FR-5.1: grid kartu tur, filter durasi, dan pengurutan harga/popularitas)
- Merakit `src/pages/TourDetail.vue` (FR-5.2: daftar destinasi utama, itinerary per hari via `Accordion.vue`, titik kumpul, 'Sudah/Belum termasuk', FR-5.5: paket tur lainnya max 3 unit & fallback 404 jika slug tidak ditemukan)
- Menulis unit test untuk filter tur dan perhitungan tier panel harga (`src/test/tours.test.js`)
**File yang berubah:** src/composables/useTourFilters.js, src/components/tour/TourPricePanel.vue, src/pages/Tours.vue, src/pages/TourDetail.vue, src/test/tours.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 33 passed / 33 total
**Docs updated:** tidak ada perubahan scope

## Fase 5 — Detail Armada & Panel Harga (2026-10-10)
**FR terkait:** FR-4.1, FR-4.2, FR-4.3, FR-4.4, FR-4.5, FR-4.6, FR-4.7
**Yang dikerjakan:**
- Membuat composable `useBookingDraft.js` untuk manajemen penyimpanan draft pesanan di `sessionStorage`
- Membuat komponen `VehicleGallery.vue` (FR-4.1: galeri foto utama & pemilih thumbnail)
- Membuat `VehiclePricePanel.vue` (FR-4.2, FR-4.4, FR-4.5: pemilih tanggal & lokasi, slot jam penjemputan, opsi driver & layanan tambahan, kalkulasi total estimasi dengan rincian, peringatan bentrok `bookedRanges`, serta bar CTA melayang tetap pada mobile)
- Merakit `src/pages/VehicleDetail.vue` (FR-4.1: spesifikasi lengkap & fitur, FR-4.3: daftar 'Sudah/Belum termasuk', deposit dummy, & syarat sewa ringkas, FR-4.6: section armada serupa max 3 unit, FR-4.7: fallback 404 jika slug tidak ditemukan)
- Menulis unit test untuk galeri, kalkulasi panel harga, dan storage draft (`src/test/vehicleDetail.test.js`)
**File yang berubah:** src/composables/useBookingDraft.js, src/components/vehicle/VehicleGallery.vue, src/components/vehicle/VehiclePricePanel.vue, src/pages/VehicleDetail.vue, src/test/vehicleDetail.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 31 passed / 31 total
**Docs updated:** tidak ada perubahan scope

## Fase 4 — Halaman Armada (Daftar, Filter URL, Ketersediaan) (2026-10-10)
**FR terkait:** FR-3.1, FR-3.2, FR-3.3, FR-3.4, FR-3.5, FR-3.6, FR-3.7
**Yang dikerjakan:**
- Membuat composable `useVehicleFilters.js` untuk mengelola kriteria pencarian dan sinkronisasi otomatis ke query URL tanpa reload browser (FR-3.1 & FR-3.4)
- Membuat komponen `VehicleFilterPanel.vue` (FR-3.3: filter kategori, transmisi, kapasitas penumpang, rentang harga)
- Membuat `ActiveFilterChips.vue` (FR-3.4: chip filter aktif yang bisa dihapus satu per satu, counter jumlah hasil, dan pengurutan Terpopuler/Termurah/Termahal)
- Implementasi logika pengurutan ketersediaan (FR-3.6: kendaraan yang bentrok dengan `bookedRanges` otomatis diurutkan di paling bawah dan tombol booking dinonaktifkan)
- Membuat `EmptyState.vue` (FR-3.7: tampilan saat hasil pencarian kosong + tombol reset & tautan WhatsApp)
- Merakit seluruh elemen pada `src/pages/Fleet.vue` dengan dukungan *responsive layout* (sidebar di desktop & `BottomSheet.vue` di mobile) dan unit test (`src/test/fleet.test.js`)
**File yang berubah:** src/composables/useVehicleFilters.js, src/components/vehicle/*.vue, src/pages/Fleet.vue, src/test/fleet.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 28 passed / 28 total
**Docs updated:** tidak ada perubahan scope

## Fase 3 — Halaman Beranda & Search Widget (2026-10-10)
**FR terkait:** FR-2.1, FR-2.2, FR-2.3, FR-2.4, FR-2.5, FR-2.6, FR-2.7, FR-2.8, FR-2.9, FR-2.10
**Yang dikerjakan:**
- Membuat composables `useInView.js` dan `useCountUp.js` untuk animasi angka hitung saat elemen terlihat
- Membuat komponen kartu `VehicleCard.vue` (spesifikasi berikon & indikator bentrok tanggal) dan `TourCard.vue` (destinasi & harga mulai)
- Membuat `SearchWidget.vue` (FR-2.2: toggle Mobil/Motor, pilih lokasi, input tanggal ambil/kembali dengan validasi inline, navigasi ke `/armada` dengan query URL)
- Membuat section Beranda: `HeroSection.vue` (FR-2.1: slider gambar & headline dengan auto-play pause on hover/reduced motion), `WhyUsSection.vue` (FR-2.3: 3 kartu keunggulan), `AboutSection.vue` (FR-2.4: poin jaminan & animasi tahun pengalaman), `FeaturedVehiclesSection.vue` (FR-2.5: tab Mobil/Motor), `CategoriesSection.vue` (FR-2.6: hitung unit per kategori dinamis), `FeaturedToursSection.vue` (FR-2.7), `CallToActionStrip.vue` (FR-2.8: telepon/WA), `FunFactsSection.vue` (FR-2.9: 3 angka beranimasi), dan `TestimonialsSection.vue` (FR-2.10)
- Merakit seluruh section pada `src/pages/Home.vue` dan menulis unit test (`src/test/home.test.js`)
**File yang berubah:** src/composables/*.js, src/components/vehicle/*.vue, src/components/tour/*.vue, src/components/forms/*.vue, src/components/sections/*.vue, src/pages/Home.vue, src/test/home.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 25 passed / 25 total
**Docs updated:** tidak ada perubahan scope

## Fase 1 — Layout Global & Komponen UI Dasar (2026-10-10)
**FR terkait:** FR-1.1, FR-1.2, FR-1.3, FR-1.4, FR-1.5, FR-1.6, FR-1.7, FR-1.8
**Yang dikerjakan:**
- Membuat komponen UI dasar: `Button.vue` (multiple variants & loading spinner), `Card.vue`, `Badge.vue`, `Accordion.vue` (aksesibel via `aria-expanded`), `Toast.vue` (+ composable `useToast`), dan `BottomSheet.vue` (mobile filter sheet dengan penanganan tombol Esc & scroll locking)
- Membuat komponen layout global: `TopBar.vue` (FR-1.1), `Navbar.vue` (FR-1.2 & FR-1.3: sticky, logo, dropdown Armada, CTA "Cari Kendaraan", mobile drawer), `Breadcrumb.vue` (FR-1.3), `Footer.vue` (FR-1.4), `FloatingWhatsApp.vue` (FR-1.5), `ScrollToTop.vue` (FR-1.6)
- Menghubungkan seluruh layout di `AppLayout.vue` dan memperbarui `App.vue`
- Menulis unit test untuk komponen UI & layout (`src/test/components.test.js`)
**File yang berubah:** src/components/ui/*.vue, src/components/layout/*.vue, src/composables/useToast.js, src/App.vue, src/test/components.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 22 passed / 22 total
**Docs updated:** tidak ada perubahan scope

## Fase 0 — Setup Proyek & Struktur Data Dummy (2026-10-10)
**FR terkait:** - (Setup Dasar & Infrastruktur)
**Yang dikerjakan:**
- Setup Vite, Vue 3, Vue Router, Pinia, Tailwind CSS (token warna `brand`, `accent`, font `Plus Jakarta Sans`), `@unhead/vue`, `@lucide/vue`, VeeValidate + Zod, dan Vitest
- Menyiapkan struktur folder `src/` (`components/`, `pages/`, `lib/`, `data/`, `test/`)
- Mengisi 8 file JSON data dummy sesuai `SCHEMA.md` (`company.json`, `home.json`, `categories.json`, `vehicles.json`, `tours.json`, `locations.json`, `testimonials.json`, `faqs.json`)
- Membuat helper fungsi murni di `src/lib/` (`format.js`, `dates.js`, `pricing.js`, `availability.js`, `whatsapp.js`, `schemas.js`)
- Menulis unit test untuk validasi skema data JSON dan fungsi helper (16 tests passed)
**File yang berubah:** package.json, vite.config.js, tailwind.config.js, postcss.config.js, src/assets/main.css, src/main.js, src/App.vue, src/router/index.js, src/pages/*, src/data/*.json, src/lib/*.js, src/test/*.js, AGENTS.md, context/CHANGELOG.md
**Test:** 16 passed / 16 total
**Docs updated:** tidak ada perubahan scope

## Fase 0 — Perencanaan & dokumentasi awal (2026-10-10)
**Yang dikerjakan:**
- Menyusun `PRD.md` (FR, tech stack, milestone, non-goals, referensi tampilan, prinsip UX)
- Menyusun `SCHEMA.md` untuk struktur data JSON dummy dan objek runtime `BookingDraft`
- Menyiapkan `AGENTS.md`
**File yang berubah:** AGENTS.md, context/PRD.md, context/SCHEMA.md, context/CHANGELOG.md
**Test:** 0 passed / 0 total
**Docs updated:** tidak ada perubahan scope
