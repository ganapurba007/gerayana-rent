# AGENTS.md

> File ini adalah pintu masuk pertama untuk AI agent. Baca file ini SEBELUM membaca file lain.

## Proyek
**Nama:** Website Rental Motor, Mobil & Paket Wisata — Gerayana Rental & Trip (dummy portfolio)
**Tujuan:** Website penyewaan kendaraan dan paket wisata untuk bisnis fiktif; pengguna mencari, melihat harga transparan, lalu mengirim permintaan pesan lewat WhatsApp. Dibuat untuk portfolio dengan fokus UX yang mudah dipakai.
**Stack:** Vue 3 (Vite, Composition API), Vue Router, Tailwind CSS, VeeValidate + Zod, data dummy JSON lokal (tanpa backend/database/pembayaran), Vitest + Vue Test Utils

## Status Saat Ini
- **Fase aktif:** Fase 5 — Detail Armada & Panel Harga (selesai)
- **Test:** 31 passed / 31 total
- **Sedang dikerjakan:** Menunggu Fase 6 — Paket Wisata (Daftar, Detail, Panel Harga)
- **Update terakhir:** 2026-10-10

> Update 3 baris di atas setiap kali fase/task berubah. Jangan biarkan basi.

## Urutan Baca Dokumentasi (WAJIB diikuti urutannya)

1. **`context/rules.md`** — WAJIB dibaca setiap sesi, sebelum coding apapun. Berisi cara kerja (bukan apa yang dibangun).
2. **`context/PRD.md`** — baca HANYA section yang relevan dengan task saat ini. Gunakan daftar isi di bagian atas PRD untuk lompat langsung ke section terkait. **Jangan baca seluruh file** kecuali diminta eksplisit.
3. **`context/SCHEMA.md`** — rujukan struktur data AKTUAL (file JSON di `src/data/` dan objek `BookingDraft`, tanpa database). Gunakan ini untuk detail teknis data, bukan §4 PRD (PRD hanya rencana awal, bisa basi).
4. **`context/CHANGELOG.md`** — baca 3-5 entri PALING BARU saja untuk konteks kerja terbaru. Jangan baca lebih dari itu kecuali diminta eksplisit.
5. **`context/CHANGELOG-archive.md`** — JANGAN dibaca sama sekali kecuali diminta eksplisit oleh user. Ini riwayat lama, tidak relevan untuk kerja aktif.

## Aturan Wajib (Anti-Halu & Anti-Drift)

- **Jangan asumsikan kode yang tidak kamu baca sendiri.** Kalau butuh tahu apakah sebuah fungsi/komponen/file data sudah ada, baca kodenya langsung — jangan menebak dari nama file atau dari ingatan sesi sebelumnya.
- **Jangan percaya PRD 100% untuk "apa yang sudah ada."** PRD adalah rencana, bisa basi. Kode dan `SCHEMA.md` adalah kebenaran. Kalau PRD dan kode berbeda, kode yang benar — laporkan selisihnya ke user, jangan diam-diam mengikuti salah satu.
- **Kalau tidak yakin, berhenti dan tanya.** Jangan lanjut coding dengan asumsi yang belum dikonfirmasi.
- **Setiap task yang mengubah scope** (fitur baru, field data baru, halaman baru) **wajib update dokumentasi di sesi yang sama**: `context/PRD.md` (section Amandemen) dan/atau `context/SCHEMA.md`. Jangan ditunda.
- **Jangan reproduksi ulang seluruh file besar ke dalam context percakapan** kalau hanya butuh satu bagian kecil — baca section spesifik saja untuk menghemat token.
- **Konten selalu dari `src/data/*.json`**, jangan hardcode di komponen. Logika harga, tanggal, ketersediaan, dan pesan WhatsApp wajib berupa fungsi murni di `src/lib/` beserta test.
- **Semua data bersifat dummy/fiktif** (nama bisnis, nomor WhatsApp, alamat). Jangan memakai data nyata. Referensi tampilan (PRD §10) hanya untuk pola layout; jangan menyalin gambar, logo, atau teks dari situs referensi.
- **Cek PRD §11 (Prinsip UX)** sebelum menyatakan sebuah fase selesai.

## Referensi Cepat
| Butuh tahu... | Baca file/section |
|---|---|
| Cara kerja & gaya kode | `context/rules.md` |
| Requirement fitur X | `context/PRD.md` § terkait |
| Struktur data (file JSON, BookingDraft) | `context/SCHEMA.md` |
| Acuan tampilan / pola layout | `context/PRD.md` §10 |
| Standar UX yang harus dipenuhi | `context/PRD.md` §11 |
| Apa yang baru dikerjakan | `context/CHANGELOG.md` (3-5 entri terakhir) |
| Riwayat lama proyek | `context/CHANGELOG-archive.md` (hanya jika diminta) |
