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
