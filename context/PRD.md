# PRD.md — Website Rental Motor, Mobil & Paket Wisata (Dummy Portfolio)

> Dokumen ini adalah RENCANA. Untuk kebenaran struktur data saat ini, selalu rujuk `SCHEMA.md`, bukan §4 di bawah. Kalau ada perbedaan antara section manapun di sini dengan kode aktual, catat di §9 Amandemen — jangan biarkan diam-diam berbeda.

## Daftar Isi
- §1 Overview
- §2 Tech Stack
- §3 Functional Requirements
- §4 Data Model (rencana awal — lihat SCHEMA.md untuk aktual)
- §5 Security & Constraints
- §6 Milestone
- §7 Non-Goals (di luar scope)
- §8 Development Guidelines
- §9 Amandemen (log perubahan scope dari rencana awal)
- §10 Referensi Tampilan
- §11 Prinsip UX (User Friendly)

---

## 1. Overview
**Apa yang dibangun:** Website penyewaan kendaraan (mobil dan motor) dan paket wisata untuk bisnis fiktif **Gerayana Rental & Trip**, memakai Vue 3 dan Tailwind CSS. Pengguna dapat mencari kendaraan berdasarkan tanggal dan lokasi, melihat harga transparan, lalu mengirim permintaan pemesanan lewat WhatsApp. Semua data adalah dummy dari file JSON lokal; tidak ada backend dan tidak ada pembayaran.
**Untuk siapa:** (1) calon penyewa/wisatawan yang ingin memesan dengan cepat dari ponsel; (2) reviewer portfolio (HRD/engineer) yang menilai kualitas UI, UX, dan kode.
**Masalah yang diselesaikan:** Memperlihatkan kemampuan membangun alur pencarian, filter, kalkulasi harga, dan pemesanan multi-langkah yang mudah dipakai, untuk portfolio.

## 2. Tech Stack
| Layer | Pilihan | Alasan singkat |
|---|---|---|
| Backend | — (tidak ada) | Scope frontend saja; pemesanan berakhir di WhatsApp |
| Frontend | Vue 3 (Vite, Composition API `<script setup>`), Vue Router, Tailwind CSS | Sesuai target portfolio |
| Form & validasi | VeeValidate + Zod (`@vee-validate/zod`) | Validasi deklaratif, mudah dites |
| Database | — (tidak ada) | Data dummy di `src/data/*.json` |
| Auth | — (tidak ada) | Tidak ada akun/login |
| Hosting/Deploy | Vercel atau Netlify | Gratis, deploy dari GitHub |

Pendukung: `lucide-vue-next` (ikon), `@unhead/vue` (meta per halaman), input tanggal native `<input type="date">` (tanpa library date picker), `Intl` untuk format Rupiah dan tanggal Indonesia, ESLint + Prettier, Vitest + Vue Test Utils.

## 3. Functional Requirements

> Format: FR-[nomor modul].[nomor urut] — [judul]. Jangan ubah nomor FR yang sudah ada meskipun requirement-nya diubah — tambahkan FR baru dengan nomor lanjutan dan catat di §9.

### 3.1 Layout Global
- **FR-1.1** — Top bar kecil: telepon (klik untuk menelepon), email, jam operasional; disembunyikan di mobile.
- **FR-1.2** — Navbar sticky: logo; menu Beranda, Armada (dropdown: Mobil, Motor), Paket Wisata, Tentang, FAQ, Kontak; tombol CTA "Cari Kendaraan". Di mobile menjadi hamburger menu yang bisa ditutup via tombol, klik link, dan Esc.
- **FR-1.3** — Menu aktif diberi penanda visual; halaman dalam menampilkan breadcrumb.
- **FR-1.4** — Footer: ringkasan bisnis, tautan cepat, kontak, jam operasional, media sosial (dummy).
- **FR-1.5** — Tombol WhatsApp melayang di semua halaman (membuka `wa.me` dengan pesan sapaan awal), tidak menutupi tombol aksi utama di mobile.
- **FR-1.6** — Scroll kembali ke atas saat pindah halaman, plus tombol *scroll to top*.
- **FR-1.7** — Setiap halaman punya `<title>` dan meta description sendiri.
- **FR-1.8** — Halaman 404 dengan tautan ke Beranda, Armada, dan Paket Wisata.

### 3.2 Beranda
- **FR-2.1** — Hero slider 2–3 slide (gambar, headline, subheadline). Auto-play berhenti saat hover/fokus dan dinonaktifkan jika pengguna memilih `prefers-reduced-motion`.
- **FR-2.2** — Widget pencarian di hero: jenis (Mobil/Motor), lokasi ambil, tanggal ambil, tanggal kembali, tombol "Cari Kendaraan". Default tanggal: besok dan lusa. Submit menuju `/armada` dengan parameter di URL (FR-3.1).
- **FR-2.3** — Section "Kenapa Memilih Kami": 3 kartu keunggulan (mis. Pesan Mudah & Cepat, Banyak Titik Antar-Jemput, Unit Terawat).
- **FR-2.4** — Section "Tentang Kami" singkat: paragraf, 4 poin jaminan, angka "tahun pengalaman" beranimasi hitung saat terlihat, tombol ke `/tentang`.
- **FR-2.5** — Section armada unggulan: tab Mobil/Motor, 6 kartu (data `featured: true`), tombol "Lihat Semua Armada".
- **FR-2.6** — Section kategori kendaraan: kartu per kategori (mis. City Car, MPV, SUV, Matic, Sport) dengan jumlah unit tersedia; klik menuju `/armada` terfilter kategori tersebut.
- **FR-2.7** — Section paket wisata unggulan: 3 kartu menuju `/paket-wisata/:slug`.
- **FR-2.8** — Strip CTA "Pesan lewat telepon/WhatsApp" dengan nomor yang bisa diklik.
- **FR-2.9** — Fun facts: 3 angka beranimasi (mis. unit disewakan, destinasi, pelanggan puas).
- **FR-2.10** — Testimoni pelanggan (foto, nama, jenis layanan, kutipan).

### 3.3 Armada (Daftar Mobil & Motor)
- **FR-3.1** — Halaman `/armada` (juga `/armada?type=mobil|motor`) membaca kriteria dari query URL: `type`, `lokasi`, `ambil`, `kembali`, `kategori`, `transmisi`, `kursi`, `hargaMin`, `hargaMax`, `urut`. Setiap perubahan filter memperbarui URL tanpa reload, sehingga hasil bisa dibagikan dan tombol Kembali browser berfungsi.
- **FR-3.2** — Bar ringkasan pencarian di atas hasil (lokasi, tanggal, jenis) yang bisa diedit langsung, dengan validasi sama seperti FR-2.2.
- **FR-3.3** — Panel filter: kategori, transmisi, jumlah penumpang minimal, rentang harga/hari. Di mobile berupa *bottom sheet* dengan tombol "Terapkan" dan "Reset".
- **FR-3.4** — Chip filter aktif (bisa dihapus satu per satu), jumlah hasil, dan pengurutan (Terpopuler, Termurah, Termahal).
- **FR-3.5** — Kartu kendaraan: foto, badge (Unggulan, tahun), nama, spesifikasi berikon (penumpang, transmisi, bahan bakar, bagasi atau kapasitas mesin), harga per hari, tombol "Lihat Detail" dan "Pesan".
- **FR-3.6** — Ketersediaan: jika tanggal dipilih, kendaraan yang bentrok dengan `bookedRanges` diberi label "Tidak tersedia di tanggal ini", tombol Pesan dinonaktifkan, dan diurutkan paling akhir.
- **FR-3.7** — Empty state saat hasil kosong: pesan jelas, saran melonggarkan filter, tombol "Reset Filter", dan tautan tanya via WhatsApp.

### 3.4 Detail Armada
- **FR-4.1** — Halaman `/armada/:slug`: galeri (gambar utama + thumbnail), nama, kategori, tahun, spesifikasi lengkap, daftar fitur.
- **FR-4.2** — Panel harga: pilih tanggal ambil/kembali dan lokasi ambil; sistem menghitung durasi (hari), subtotal, opsi tambahan (mis. sopir untuk mobil, helm tambahan untuk motor), dan **total estimasi** dengan rincian.
- **FR-4.3** — Bagian "Sudah termasuk" dan "Belum termasuk", deposit (dummy), serta syarat sewa ringkas (SIM, KTP, jaminan).
- **FR-4.4** — Peringatan jika tanggal dipilih bentrok dengan `bookedRanges`.
- **FR-4.5** — Tombol "Pesan Sekarang" menuju `/pesan` membawa data pilihan. Di mobile tersedia bar CTA tetap di bawah layar berisi total estimasi dan tombol Pesan.
- **FR-4.6** — Section "Armada serupa" (maks. 3, kategori sama).
- **FR-4.7** — Slug tidak ditemukan menampilkan halaman 404.

### 3.5 Paket Wisata
- **FR-5.1** — Halaman `/paket-wisata`: grid kartu (foto, nama, destinasi ringkas, durasi mis. 2H1M, harga mulai per orang); filter durasi dan rentang harga; urutan (Terpopuler, Termurah).
- **FR-5.2** — Halaman `/paket-wisata/:slug`: galeri, ringkasan, itinerary per hari (accordion; hari pertama terbuka), "Sudah termasuk" dan "Belum termasuk", titik kumpul.
- **FR-5.3** — Panel harga: pilih tanggal berangkat dan jumlah peserta (dibatasi `minPax`–`maxPax`); harga per orang mengikuti `priceTiers`; tampil total estimasi dan rincian.
- **FR-5.4** — Tombol "Pesan Paket" menuju `/pesan`; bar CTA tetap di mobile seperti FR-4.5.
- **FR-5.5** — Section "Paket lainnya" (maks. 3). Slug tidak ditemukan menampilkan 404.

### 3.6 Pemesanan
- **FR-6.1** — Halaman `/pesan` berupa alur 3 langkah dengan indikator progres: (1) Ringkasan pesanan, (2) Data pemesan, (3) Konfirmasi dan kirim.
- **FR-6.2** — Langkah 1: ringkasan item, tanggal, lokasi, opsi, dan total estimasi; semua bisa diubah tanpa meninggalkan alur. Jika akses langsung tanpa pilihan, tampilkan ajakan memilih armada atau paket.
- **FR-6.3** — Langkah 2: form data pemesan dengan validasi (tabel di bawah). Validasi saat blur dan submit; fokus pindah ke field error pertama.
- **FR-6.4** — Langkah 3: ringkasan akhir. Tombol utama "Kirim via WhatsApp" membuka `wa.me` dengan pesan terisi otomatis (item, tanggal, lokasi, opsi, total estimasi, nama pemesan). Tombol sekunder "Salin Ringkasan". Teks jelas bahwa pesanan baru terkonfirmasi setelah dibalas admin dan tidak ada pembayaran di situs ini.
- **FR-6.5** — Draft pesanan disimpan di `sessionStorage` agar tidak hilang saat refresh atau tombol Kembali; dibersihkan setelah langkah 3 selesai.
- **FR-6.6** — Pengguna bisa kembali ke langkah sebelumnya tanpa kehilangan isian.

**Field data pemesan (FR-6.3):**

| Field | Tipe | Aturan | Pesan error |
|---|---|---|---|
| Nama lengkap | text | Wajib, 3–60 karakter | "Nama wajib diisi (minimal 3 karakter)" |
| WhatsApp | tel | Wajib, `08xx` atau `+62xx`, 10–14 digit | "Nomor WhatsApp tidak valid" |
| Email | email | Opsional; jika diisi harus valid | "Format email tidak valid" |
| Tanggal ambil | date | Wajib, tidak boleh sebelum hari ini | "Tanggal ambil tidak boleh di masa lalu" |
| Tanggal kembali | date | Wajib untuk armada, minimal sama dengan atau setelah tanggal ambil (durasi min. 1 hari) | "Tanggal kembali harus setelah tanggal ambil" |
| Jam ambil | select | Wajib untuk armada (slot per 30 menit, jam operasional) | "Pilih jam ambil" |
| Lokasi ambil | select | Wajib untuk armada, dari data lokasi | "Pilih lokasi ambil" |
| Jumlah peserta | number | Wajib untuk paket, dalam rentang `minPax`–`maxPax` | "Jumlah peserta harus antara {min} dan {max}" |
| Catatan | textarea | Opsional, maks. 300 karakter, ada penghitung | "Catatan maksimal 300 karakter" |
| Persetujuan | checkbox | Wajib dicentang (syarat sewa) | "Anda harus menyetujui syarat sebelum mengirim" |

### 3.7 Halaman Informasi
- **FR-7.1** — `/tentang`: profil bisnis, visi, nilai layanan, dan timeline singkat.
- **FR-7.2** — `/faq`: pertanyaan dikelompokkan per kategori (Syarat Sewa, Pembayaran & Deposit, Antar-Jemput, Paket Wisata), accordion, dengan kolom pencarian sederhana.
- **FR-7.3** — `/kontak`: info kontak, jam operasional, peta (embed atau gambar statis, lokasi dummy), dan form pesan umum (nama, WhatsApp, pesan 20–500 karakter, honeypot) dengan perilaku validasi sama seperti FR-6.3 dan pengiriman disimulasikan (loading, toast sukses, skenario gagal simulasi).

## 4. Data Model (Rencana Awal)

> ⚠️ Section ini rencana awal saat proyek dimulai. Untuk struktur AKTUAL saat ini, selalu cek `SCHEMA.md`. Proyek ini tidak memakai database; "data model" berarti struktur file JSON di `src/data/`.

```
src/data/
├── company.json       (identitas, kontak, WhatsApp, jam operasional, sosial, about)
├── home.json          (heroSlides, benefits, aboutPoints, experienceYears, stats)
├── categories.json    (kategori kendaraan per jenis mobil/motor)
├── vehicles.json      (armada mobil dan motor)
├── tours.json         (paket wisata + itinerary)
├── locations.json     (titik ambil/antar)
├── testimonials.json
└── faqs.json
```

Volume data dummy minimal: 8 mobil, 6 motor, 5 paket wisata, 6 lokasi, 4 testimoni, 12 FAQ, 5 kategori mobil, 3 kategori motor. Beberapa kendaraan diberi `bookedRanges` agar fitur ketersediaan bisa didemokan.

## 5. Security & Constraints
- Tidak ada backend, auth, atau pembayaran. Data pemesan hanya ada di browser (draft `sessionStorage`) dan dikirim pengguna sendiri lewat WhatsApp; tidak ada data yang dikirim ke server mana pun.
- Nomor WhatsApp, telepon, email, alamat, dan nama bisnis semuanya fiktif/dummy. Jangan memakai nomor atau data nyata siapa pun.
- Semua input divalidasi di sisi klien dengan skema Zod; teks pengguna yang dimasukkan ke pesan WhatsApp di-*encode* (`encodeURIComponent`); tidak memakai `v-html` untuk data pengguna.
- Gambar wajib bebas lisensi (Unsplash/Pexels) atau placeholder; atribusi dicatat di README. Format WebP, idealnya < 200 KB per gambar, rasio tetap agar tidak terjadi layout shift.
- Perhitungan harga murni di klien dan bersifat **estimasi**; label "Estimasi" wajib tampil di mana pun total ditampilkan.
- Target Lighthouse (Performance, Accessibility, Best Practices, SEO) minimal 90.

## 6. Milestone
| Fase | Fitur | Status |
|---|---|---|
| 0 | Setup: Vite, Tailwind (token tema), Vue Router, ESLint/Prettier, Vitest, struktur folder | ⬜ |
| 1 | Layout global (FR-1.x) + komponen UI dasar (Button, Card, Badge, Accordion, Toast, BottomSheet) | ⬜ |
| 2 | Data dummy JSON + helper (format Rupiah/tanggal, hitung durasi, hitung harga, cek ketersediaan) beserta test | ⬜ |
| 3 | Beranda (FR-2.x) termasuk widget pencarian | ⬜ |
| 4 | Armada: daftar, filter via URL, ketersediaan (FR-3.x) | ⬜ |
| 5 | Detail armada + panel harga (FR-4.x) | ⬜ |
| 6 | Paket wisata: daftar, detail, panel harga (FR-5.x) | ⬜ |
| 7 | Pemesanan 3 langkah + WhatsApp (FR-6.x) | ⬜ |
| 8 | Tentang, FAQ, Kontak (FR-7.x) | ⬜ |
| 9 | Polishing UX: responsif, aksesibilitas, SEO, performa (§11) | ⬜ |
| 10 | Rilis: deploy, README, screenshot, tautan demo | ⬜ |

## 7. Non-Goals
Hal-hal yang SENGAJA tidak dibangun di scope ini, supaya AI tidak menambahkannya secara tidak diminta:
- Backend, database, panel admin, akun pengguna/login, dan pembayaran online.
- Keranjang, checkout, "My account", wishlist, dan halaman toko (pola e-commerce dari tema referensi).
- Blog, newsletter, halaman galeri terpisah, slider logo merek, dan banner unduh aplikasi.
- Pergantian mata uang; semua harga dalam Rupiah.
- Mode tarif per jam, malam, atau campuran seperti di tema referensi; tarif hanya per hari (kendaraan) dan per orang (paket).
- Pencarian dengan peta, ulasan/rating pengguna, dan perbandingan kendaraan.
- Dark mode dan multi bahasa.
- Library date picker, state management (Pinia) atau library animasi tambahan, kecuali diminta.

## 8. Development Guidelines

### 8.1 Alur Kerja Per Fase
1. Baca FR terkait di §3
2. Tulis rencana singkat (langkah + cara verifikasi)
3. Implementasi
4. Jalankan test, pastikan lolos
5. Update dokumentasi (lihat 8.4)
6. Commit

### 8.2 Standar Kode
Rujuk `rules.md`. Catatan spesifik proyek:
- Single File Component `.vue` dengan nama PascalCase dan `<script setup>`; satu komponen per file di `src/components/` (`layout/`, `ui/`, `sections/`, `forms/`, `vehicle/`, `tour/`).
- Halaman di `src/pages/`; composable di `src/composables/` (mis. `useCountUp`, `useInView`, `useBookingDraft`, `useVehicleFilters`); helper murni di `src/lib/` (`format.js`, `dates.js`, `pricing.js`, `availability.js`, `whatsapp.js`, `schemas.js`).
- Logika harga, tanggal, ketersediaan, dan pembuatan pesan WhatsApp harus berupa fungsi murni di `src/lib/` supaya mudah dites; komponen hanya memanggilnya.
- Konten selalu dibaca dari `src/data/*.json`, tidak ditulis keras di komponen.
- Warna, font, dan spasi utama didefinisikan sebagai token di `tailwind.config`.
- Rute halaman lazy-loaded: `component: () => import('./pages/Home.vue')`.
- Semua teks antarmuka dalam Bahasa Indonesia; semua format harga dan tanggal lewat helper `src/lib/format.js`.

### 8.3 Testing
- Minimum test per fitur baru: helper murni (hitung durasi, hitung harga termasuk opsi dan tier paket, cek bentrok tanggal, format Rupiah, pembuat pesan WhatsApp), skema Zod pemesanan dan kontak (valid dan tiap aturan invalid), logika filter dan urutan armada, serta perilaku komponen utama (`SearchWidget`, `BookingForm`) dengan Vue Test Utils.
- Pemeriksaan manual per fase: tampilan di 360, 768, 1024, 1280 px; navigasi keyboard pada form dan menu; Lighthouse pada fase 9.
- Cara menjalankan test: `npm run test`

### 8.4 Definition of Done Per Fase
Fase dianggap selesai jika:
- [ ] Fitur berjalan sesuai FR terkait
- [ ] Test lolos (sebutkan jumlah di CHANGELOG)
- [ ] Tidak ada regresi di fitur lama
- [ ] Checklist UX di §11 yang relevan dengan fase ini terpenuhi
- [ ] Docs updated: [Ya/Tidak — sebutkan file mana yang diupdate: PRD §9 / SCHEMA.md / keduanya / tidak ada perubahan scope]
- [ ] Entri baru ditambahkan di CHANGELOG.md

## 9. Amandemen

> Log semua perubahan/penambahan yang menyimpang dari rencana awal di §3/§4. Setiap entri baru ditambah di ATAS (paling baru di paling atas).

*(Belum ada amandemen.)*

## 10. Referensi Tampilan

Acuan visual: https://remons.ovathemewp.com/car/ (tema WordPress rental mobil, "Remons"). Yang DIADOPSI adalah pola layout dan urutan section; konten, nama, dan aset visual dibuat sendiri. Jangan menyalin gambar, logo, atau teks dari situs referensi. Catatan: yang ditinjau baru halaman beranda; halaman lain di tema itu (detail mobil, hasil pencarian) belum ditinjau.

| Pola di referensi | Dipakai sebagai |
|---|---|
| Top bar (email, alamat, sosial) + header dengan menu dan tombol "Find a Car" | FR-1.1, FR-1.2 |
| Hero slider dengan widget pencarian (lokasi ambil, tanggal ambil/kembali, tipe mobil) | FR-2.1, FR-2.2 |
| "Why you should use" 3 kartu keunggulan | FR-2.3 |
| "Get to know us" dengan 4 poin dan angka tahun pengalaman | FR-2.4 |
| Kartu mobil (galeri, badge model, harga per satuan, spesifikasi berikon, tombol Book Now) | FR-2.5, FR-3.5 |
| Kategori kendaraan dengan jumlah unit tersedia | FR-2.6 |
| Strip "Call for booking" dengan nomor telepon | FR-2.8 |
| Fun facts (angka beranimasi) | FR-2.9 |
| Testimoni (foto, nama, peran, kutipan) | FR-2.10 |
| Footer: kontak, tautan "Explore" | FR-1.4 |
| Halaman FAQs | FR-7.2 |

Tidak diadopsi: blog, newsletter, galeri footer, slider logo merek, banner unduh aplikasi, pengalih mata uang, keranjang/checkout/akun/wishlist, mega menu, dan model tarif per jam/malam (lihat §7).
Tambahan di luar referensi: paket wisata (FR-5.x), alur pemesanan lewat WhatsApp (FR-6.x), dan ketersediaan berdasarkan tanggal (FR-3.6).

Palet warna dan tipografi final diputuskan di Fase 0 setelah mengamati referensi secara langsung (halaman yang dibaca berupa teks, jadi warna dan font belum diverifikasi). Semua dijadikan token di `tailwind.config`.

## 11. Prinsip UX (User Friendly)

Setiap fase harus memenuhi poin yang relevan. Poin ini menjadi acuan reviewer.

- **UX-1 Pencarian jelas dan cepat.** Widget pencarian punya label jelas, default tanggal yang masuk akal, validasi inline (tanggal kembali tidak boleh sebelum tanggal ambil), dan dapat diselesaikan dalam beberapa ketukan di mobile.
- **UX-2 Harga transparan.** Satuan selalu ditulis (`/hari`, `/orang`); total estimasi dan rinciannya tampil sebelum pemesanan; "sudah termasuk" dan "belum termasuk" tertulis; format Rupiah konsisten.
- **UX-3 Alur pendek.** Dari kartu kendaraan atau paket sampai pesan terkirim maksimal 3 langkah (detail, isi data, kirim); tidak ada pendaftaran akun.
- **UX-4 Mobile-first.** Area ketuk minimal 44×44 px, font isian minimal 16 px, jenis input yang tepat (`tel`, `email`, `date`) agar keyboard sesuai, bar CTA tetap di halaman detail, filter sebagai bottom sheet.
- **UX-5 Filter yang bisa dipahami.** Filter aktif tampil sebagai chip yang bisa dihapus, jumlah hasil terlihat, tombol Reset selalu ada, kriteria tersimpan di URL, empty state memberi jalan keluar.
- **UX-6 Umpan balik jelas.** Tombol menampilkan status loading/nonaktif; pesan error spesifik, singkat, dan tidak menyalahkan; sukses ditandai toast dan langkah berikutnya.
- **UX-7 Bantuan selalu dekat.** WhatsApp melayang, nomor telepon bisa diketuk, dan tautan FAQ tersedia di dekat form pemesanan.
- **UX-8 Data tidak hilang.** Draft pesanan bertahan saat refresh dan saat memakai tombol Kembali browser; berpindah langkah tidak menghapus isian.
- **UX-9 Aksesibel.** Kontras AA, fokus terlihat, bisa dioperasikan dengan keyboard, label dan `alt` lengkap, error terhubung via `aria-describedby`, slider otomatis menghormati `prefers-reduced-motion`.
- **UX-10 Bahasa dan format lokal.** Bahasa Indonesia sederhana; Rupiah, tanggal, dan nomor telepon mengikuti format Indonesia.
- **UX-11 Terasa cepat dan stabil.** Gambar lazy-load kecuali yang pertama, rasio gambar tetap agar tidak bergeser, target LCP di bawah 2,5 detik pada koneksi 4G.
