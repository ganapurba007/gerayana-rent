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

## Pembersihan Teks Footer (2026-10-10)
**Yang dikerjakan:**
- Menghapus teks "Dummy Portfolio Project" dan keterangan "Dibuat dengan Vue 3 & Tailwind CSS" pada bagian bawah Footer (`src/components/layout/Footer.vue`).
- Mengganti teks dengan tagline bisnis yang profesional ("Solusi Sewa Mobil, Motor & Paket Wisata Terpercaya").
- Memperbarui alamat email dan tautan sosial media di `src/data/company.json` agar bebas dari imbuhan dummy (`info@gerayana-rent.com`).
**File yang berubah:** `src/components/layout/Footer.vue`, `src/data/company.json`, `src/test/components.test.js`, `context/CHANGELOG.md`
**Test:** 41 passed / 41 total
**Docs updated:** tidak ada perubahan scope

## Penghapusan Section Tentang Kami dari Beranda (2026-10-10)
**FR terkait:** FR-2.4
**Yang dikerjakan:**
- Menghapus komponen `AboutSection.vue` dari halaman Beranda (`src/pages/Home.vue`) agar susunan halaman lebih padat dan langsung berfokus pada armada & paket wisata unggulan. Informasi detail profil perusahaan tetap tersedia di rute halaman khusus `/tentang`.
**File yang berubah:** `src/pages/Home.vue`, `context/PRD.md`, `context/CHANGELOG.md`
**Test:** 41 passed / 41 total
**Docs updated:** PRD §9 (Amandemen)

## Perbaikan Visual Beranda, Kartu Pencarian & Foto Paket Wisata (2026-10-10)
**Yang dikerjakan:**
- Menyesuaikan gambar Hero Banner di beranda (`home.json`) dengan foto lanskap perjalanan & road trip alam yang lebih natural dan tersimpan lokal di `public/images/home/`.
- Menghapus style badge berbentuk kapsul/pill pada teks *eyebrow* Hero Banner ("Gerayana Rental & Trip") menjadi tipografi bersih dan minimalis.
- Memperbaiki kartu pencarian mengambang (`SearchWidget.vue`) yang sebelumnya terpotong/tenggelam di bawah hero akibat `overflow-hidden` pada elemen `<section>`; memindahkan `overflow-hidden` hanya pada pembungkus latar belakang slide gambar, menyempurnakan bayangan elevasi kartu (`shadow-2xl ring-1 ring-slate-900/5`), serta menyesuaikan *padding* atas pada section keunggulan agar posisi mengambang kartu proporsional dan tidak bertabrakan.
- Mengganti foto pada section Tentang Gerayana Rent (`AboutSection.vue`) dengan foto aktivitas persiapan liburan/road trip yang lebih relevan dan hangat.
- Memperbarui seluruh foto paket wisata (`tours.json` dan `public/images/tours/`) agar sesuai dengan destinasi aslinya: Gunung Bromo sunrise, Heritage candi & sejarah lokal, Snorkeling terumbu karang laut tropis, Air terjun alami alami yang deras, dan Kebun Teh Puncak Bogor yang hijau membentang.
**File yang berubah:** `src/data/home.json`, `src/data/tours.json`, `src/components/sections/HeroSection.vue`, `src/components/forms/SearchWidget.vue`, `src/components/sections/WhyUsSection.vue`, `src/components/sections/AboutSection.vue`, `context/CHANGELOG.md`
**Test:** 41 passed / 41 total
**Docs updated:** tidak ada perubahan scope

## Perbaikan Tampilan & Foto Armada (2026-10-10)
**Yang dikerjakan:**
- Memperbarui foto seluruh 14 kendaraan (8 mobil dan 6 motor) dengan foto asli/akurat beresolusi tinggi yang tersimpan lokal di `public/images/vehicles/`, sehingga tiap kendaraan memiliki foto yang sesuai dengan nama dan modelnya (Innova Zenix, Fortuner GR Sport, Avanza, Brio RS, Xpander Cross, Alphard Transformer, Yaris Cross, Sigra, NMAX, PCX, Vespa Primavera, Vario, Scoopy, Aerox).
- Merapikan desain `VehicleCard.vue`: menyelaraskan tinggi judul kartu (`min-h-[3rem]`) agar kartu selalu sejajar, mengelompokkan spesifikasi ke dalam panel kontras lembut (`bg-slate-50/90 border border-slate-100`), menata harga dan tombol aksi 50/50 (`Detail` dan `Pesan`) secara simetris dan lega tanpa terpotong di berbagai resolusi layar.
- Mempercantik badge tahun, tipe kendaraan, dan label unggulan dengan tipografi yang lebih rapi dan konsisten.
**File yang berubah:** `src/data/vehicles.json`, `src/components/vehicle/VehicleCard.vue`, `context/CHANGELOG.md`
**Test:** 41 passed / 41 total
**Docs updated:** tidak ada perubahan scope

## Perbaikan Bug — Inisialisasi Plugin `@unhead/vue` (2026-10-10)
**Yang dikerjakan:**
- Memperbaiki pengimporan `createHead` dari `@unhead/vue/client` di `src/main.js` agar Vue Head plugin terdaftar dengan benar melalui `app.use(head)`.
- Mengatasi error `injection "usehead" not found` dan unhandled exception pada `<router-view />` yang sebelumnya menyebabkan halaman utama hanya menampilkan Header & Footer tanpa konten halaman.
**File yang berubah:** `src/main.js`, `AGENTS.md`, `context/CHANGELOG.md`
**Test:** 41 passed / 41 total
**Docs updated:** tidak ada perubahan scope

## Fase 8 — Halaman Informasi (Tentang, FAQ, Kontak) (2026-10-10)
**FR terkait:** FR-7.1, FR-7.2, FR-7.3
**Yang dikerjakan:**
- Merakit `src/pages/About.vue` (FR-7.1: profil perusahaan, visi & misi, nilai utama layanan, dan garis waktu sejarah perkembangan bisnis)
- Merakit `src/pages/Faq.vue` (FR-7.2: pertanyaan umum dikelompokkan per kategori via `Accordion.vue` dengan fitur *live search* pencarian kata kunci interaktif)
- Merakit `src/pages/Contact.vue` (FR-7.3: informasi kontak & peta dummy, form pesan umum dengan validasi Zod, perlindungan *honeypot*, serta simulasi pengiriman pesan + notifikasi Toast)
- Menulis unit test untuk halaman informasi, filter pencarian FAQ, dan validasi form kontak (`src/test/infoPages.test.js`)
**File yang berubah:** src/pages/About.vue, src/pages/Faq.vue, src/pages/Contact.vue, src/test/infoPages.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 41 passed / 41 total
**Docs updated:** tidak ada perubahan scope

## Fase 7 — Pemesanan 3 Langkah & WhatsApp (2026-10-10)
**FR terkait:** FR-6.1, FR-6.2, FR-6.3, FR-6.4, FR-6.5, FR-6.6
**Yang dikerjakan:**
- Membuat komponen wizard 3 langkah: `BookingStep1.vue` (FR-6.2: ringkasan pilihan item, jadwal, lokasi, & opsi + callout jika belum ada item dipilih), `BookingStep2.vue` (FR-6.3: form data pemesan dengan validasi Zod pada blur/submit & auto-focus field error pertama), dan `BookingStep3.vue` (FR-6.4 & FR-6.5: konfirmasi ringkasan akhir, tombol utama 'Kirim via WhatsApp', tombol sekunder 'Salin Ringkasan' + toast, pembersihan draft di `sessionStorage`, dan penjelasan konfirmasi admin)
- Merakit `src/pages/Booking.vue` (FR-6.1: bilah progres 3 langkah interaktif & FR-6.6: navigasi bolak-balik tanpa kehilangan isian form)
- Menulis unit test untuk alur 3 langkah dan validasi form data pemesan (`src/test/booking.test.js`)
**File yang berubah:** src/components/forms/BookingStep1.vue, src/components/forms/BookingStep2.vue, src/components/forms/BookingStep3.vue, src/pages/Booking.vue, src/test/booking.test.js, AGENTS.md, context/CHANGELOG.md
**Test:** 38 passed / 38 total
**Docs updated:** tidak ada perubahan scope

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
