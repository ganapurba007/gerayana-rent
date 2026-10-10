import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../pages/About.vue'
import Faq from '../pages/Faq.vue'
import Contact from '../pages/Contact.vue'

// Mock router and unhead
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useRoute: () => ({ query: {} })
}))

vi.mock('@unhead/vue', () => ({
  useHead: vi.fn(),
  createUnhead: vi.fn()
}))

describe('Information Pages Unit Tests (Tentang, FAQ, Kontak)', () => {
  it('About page renders company profile and history timeline', () => {
    const wrapper = mount(About)
    expect(wrapper.text()).toContain('Gerayana Rental & Trip')
    expect(wrapper.text()).toContain('Visi & Misi Layanan')
    expect(wrapper.text()).toContain('Perjalanan Singkat Kami')
  })

  it('Faq page filters items in real-time when query typed', async () => {
    const wrapper = mount(Faq)

    expect(wrapper.text()).toContain('Pertanyaan Yang Sering Diajukan')

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('deposit')

    expect(wrapper.text()).toContain('deposit')
  })

  it('Contact page validates required fields (min 20 char message)', async () => {
    const wrapper = mount(Contact)

    const nameInput = wrapper.find('#contact-name')
    await nameInput.setValue('Budi')

    const waInput = wrapper.find('#contact-whatsapp')
    await waInput.setValue('081234567890')

    const msgInput = wrapper.find('#contact-message')
    await msgInput.setValue('Pendek') // < 20 chars

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.text()).toContain('Pesan minimal 20 karakter')
  })
})
