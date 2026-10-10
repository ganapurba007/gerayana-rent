import { z } from 'zod'
import { getTodayString } from './dates'

export const customerSchema = z.object({
  name: z.string()
    .min(3, { message: 'Nama wajib diisi (minimal 3 karakter)' })
    .max(60, { message: 'Nama maksimal 60 karakter' }),
  whatsapp: z.string()
    .regex(/^(08|\+?628)[0-9]{8,11}$/, { message: 'Nomor WhatsApp tidak valid (misal: 081234567890 atau 6281234567890)' }),
  email: z.string()
    .email({ message: 'Format email tidak valid' })
    .optional()
    .or(z.literal('')),
  notes: z.string()
    .max(300, { message: 'Catatan maksimal 300 karakter' })
    .optional(),
  agreed: z.boolean()
    .refine(val => val === true, { message: 'Anda harus menyetujui syarat sebelum mengirim' })
})

export const vehicleBookingSchema = z.object({
  startDate: z.string()
    .min(1, { message: 'Tanggal ambil wajib diisi' })
    .refine(date => date >= getTodayString(), { message: 'Tanggal ambil tidak boleh di masa lalu' }),
  endDate: z.string()
    .min(1, { message: 'Tanggal kembali wajib diisi' }),
  pickupTime: z.string()
    .min(1, { message: 'Pilih jam ambil' }),
  pickupLocationId: z.string()
    .min(1, { message: 'Pilih lokasi ambil' })
}).refine(data => data.endDate >= data.startDate, {
  message: 'Tanggal kembali harus setelah atau sama dengan tanggal ambil',
  path: ['endDate']
})

export const contactFormSchema = z.object({
  name: z.string()
    .min(3, { message: 'Nama wajib diisi (minimal 3 karakter)' })
    .max(60, { message: 'Nama maksimal 60 karakter' }),
  whatsapp: z.string()
    .regex(/^(08|\+?628)[0-9]{8,11}$/, { message: 'Nomor WhatsApp tidak valid' }),
  message: z.string()
    .min(20, { message: 'Pesan minimal 20 karakter' })
    .max(500, { message: 'Pesan maksimal 500 karakter' }),
  websiteHp: z.string().max(0) // Honeypot field (must be empty)
})
