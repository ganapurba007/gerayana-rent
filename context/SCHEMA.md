# SCHEMA.md

> Sumber kebenaran struktur data SAAT INI. Proyek ini TIDAK memakai database: "tabel" di bawah adalah struktur file JSON di `src/data/`. Berbeda dari §4 PRD.md yang cuma rencana awal — file ini WAJIB selalu sinkron dengan file JSON dan skema Zod aktual di kode. Update file ini di sesi yang sama setiap kali struktur data berubah.

**Terakhir disinkronkan:** 2026-10-10 — Fase 0 (rencana awal, belum ada kode)

**Konvensi umum:** tanggal memakai format ISO `YYYY-MM-DD`; harga berupa angka bulat Rupiah (tanpa titik/simbol); path gambar relatif terhadap `/public`.

---

## company.json (objek tunggal)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| name | string | wajib | "Gerayana Rental & Trip" |
| tagline | string | wajib | |
| about | string | wajib | |
| vision | string | wajib | |
| contact | object | wajib | `{ phone, whatsapp, email, address }`; `whatsapp` format internasional tanpa `+` (dummy), dipakai untuk `wa.me` |
| operatingHours | object | wajib | `{ label, openHour, closeHour }`; `openHour`/`closeHour` angka 0–23, dipakai untuk slot jam ambil |
| social | object[] | opsional | `{ name, url, icon }` |
| history | object[] | opsional | `{ year, title, description }` |

## home.json (objek tunggal)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| heroSlides | object[] | wajib, 2–3 item | `{ id, headline, subheadline, image }` |
| benefits | object[] | wajib, 3 item | `{ icon, title, description }` |
| aboutPoints | string[] | wajib, 4 item | |
| experienceYears | number | wajib | Untuk animasi hitung |
| stats | object[] | wajib, 3 item | `{ label, value, suffix }` |

## categories.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | string | PK | Mis. `mpv`, `suv`, `matic` |
| type | string | wajib | `mobil` atau `motor` |
| name | string | wajib | |
| icon | string | wajib | |
| image | string | opsional | |

## vehicles.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| slug | string | unik | Rute `/armada/:slug` |
| type | string | wajib | `mobil` atau `motor` |
| name | string | wajib | |
| brand | string | wajib | |
| category | string | FK → categories.id | Kategori harus bertipe sama dengan `type` |
| year | number | wajib | |
| seats | number | wajib | Jumlah penumpang (motor: 2) |
| transmission | string | wajib | `Manual` atau `Otomatis` |
| fuel | string | wajib | Mis. `Bensin`, `Diesel`, `Listrik` |
| luggage | string | opsional | Teks kapasitas bagasi (mobil) |
| engineCc | number | opsional | Kapasitas mesin (motor) |
| pricePerDay | number | wajib, > 0 | Rupiah per hari |
| driverPerDay | number | opsional | Tambahan sopir per hari (mobil); jika tidak ada, opsi sopir tidak tampil |
| extras | object[] | opsional | `{ id, label, pricePerDay }`, mis. helm tambahan |
| deposit | number | opsional | Deposit dummy, hanya informasi |
| features | string[] | wajib | Mis. AC, Bluetooth |
| includes | string[] | wajib | Sudah termasuk |
| excludes | string[] | wajib | Belum termasuk |
| description | string | wajib | |
| images | string[] | wajib, min 1 | Gambar pertama jadi thumbnail |
| featured | boolean | wajib | `true` → tampil di Beranda (FR-2.5) |
| popularity | number | wajib | Dasar urutan "Terpopuler" |
| bookedRanges | object[] | wajib (boleh kosong) | `{ from, to }`, keduanya inklusif, `from <= to`; dipakai cek ketersediaan |

## tours.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| slug | string | unik | Rute `/paket-wisata/:slug` |
| title | string | wajib | |
| destinations | string[] | wajib | Destinasi ringkas untuk kartu |
| durationDays | number | wajib | |
| durationNights | number | wajib | |
| summary | string | wajib | |
| description | string | wajib | |
| minPax | number | wajib | Peserta minimum |
| maxPax | number | wajib | `maxPax >= minPax` |
| priceTiers | object[] | wajib | `{ minPax, maxPax, pricePerPerson }`; rentang tier tidak boleh tumpang tindih dan harus menutup `minPax`–`maxPax` |
| itinerary | object[] | wajib | `{ day, title, activities: string[] }`, urut per hari |
| includes | string[] | wajib | |
| excludes | string[] | wajib | |
| meetingPoint | string | wajib | |
| images | string[] | wajib, min 1 | |
| featured | boolean | wajib | `true` → tampil di Beranda (FR-2.7) |
| popularity | number | wajib | |

## locations.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | string | PK | Mis. `bandara`, `stasiun` |
| name | string | wajib | Titik ambil/antar (fiktif) |
| address | string | wajib | |

## testimonials.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| name | string | wajib | |
| service | string | wajib | Mis. `Sewa Mobil`, `Sewa Motor`, `Paket Wisata` |
| quote | string | wajib | |
| avatar | string | wajib | |

## faqs.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| category | string | wajib | `Syarat Sewa`, `Pembayaran & Deposit`, `Antar-Jemput`, `Paket Wisata` |
| question | string | wajib | |
| answer | string | wajib | |

---

## Objek Runtime (bukan file JSON)

### BookingDraft
Disimpan di `sessionStorage` (kunci tetap, mis. `bookingDraft`), divalidasi dengan skema Zod di `src/lib/schemas.js`.

| Field | Tipe | Keterangan |
|---|---|---|
| kind | string | `armada` atau `paket` |
| itemSlug | string | Slug dari `vehicles.json` atau `tours.json` |
| startDate | string | ISO; tanggal ambil / berangkat |
| endDate | string | ISO; tanggal kembali (hanya `armada`) |
| pickupLocationId | string | FK → locations.id (hanya `armada`) |
| pickupTime | string | `HH:mm` (hanya `armada`) |
| withDriver | boolean | Hanya jika kendaraan punya `driverPerDay` |
| extraIds | string[] | FK → `vehicles.extras[].id` |
| pax | number | Jumlah peserta (hanya `paket`) |
| customer | object | `{ name, whatsapp, email, notes }` |
| agreed | boolean | Persetujuan syarat |

### Hasil perhitungan harga (`pricing.js`)
`{ days, baseSubtotal, driverSubtotal, extrasSubtotal, total, lines[] }` untuk armada; `{ pax, pricePerPerson, total, lines[] }` untuk paket. Selalu ditampilkan berlabel "Estimasi".

## Relasi (ringkas)
```
vehicles.category   → categories.id  (type kategori harus sama dengan vehicles.type)
BookingDraft.itemSlug → vehicles.slug | tours.slug (sesuai kind)
BookingDraft.pickupLocationId → locations.id
vehicles.featured / tours.featured → item yang tampil di Beranda
vehicles.bookedRanges → dipakai availability.js untuk label "Tidak tersedia"
```
Tidak ada foreign key sungguhan; konsistensi dijaga lewat test data (lihat PRD §8.3).

## Catatan Migrasi Penting
- Belum ada kode, jadi belum ada catatan. Tambahkan di sini keputusan struktur yang tidak obvious (mis. kenapa suatu field opsional, kenapa `bookedRanges` inklusif) supaya AI tidak "membetulkannya".
- Disarankan satu test yang memvalidasi seluruh file JSON terhadap skema (kategori valid, slug unik, tier harga tidak tumpang tindih) agar data dummy tidak diam-diam rusak.
