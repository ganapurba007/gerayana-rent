import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Accordion from '../components/ui/Accordion.vue'
import TopBar from '../components/layout/TopBar.vue'
import { useToast } from '../composables/useToast'

describe('UI & Layout Components Tests', () => {
  it('Button renders slot text and loading state', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Klik Saya' }
    })
    expect(wrapper.text()).toContain('Klik Saya')

    const loadingWrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Kirim' }
    })
    expect(loadingWrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('Card renders slot content', () => {
    const wrapper = mount(Card, {
      props: { hoverable: true },
      slots: { default: '<p>Content Card</p>' }
    })
    expect(wrapper.html()).toContain('Content Card')
    expect(wrapper.classes()).toContain('hover:shadow-lg')
  })

  it('Badge renders text and variant style', () => {
    const wrapper = mount(Badge, {
      props: { variant: 'success' },
      slots: { default: 'Tersedia' }
    })
    expect(wrapper.text()).toContain('Tersedia')
    expect(wrapper.classes()).toContain('bg-emerald-50')
  })

  it('Accordion toggles items on click and updates aria-expanded', async () => {
    const items = [
      { id: 'item-1', title: 'Pertanyaan 1', content: 'Jawaban 1' },
      { id: 'item-2', title: 'Pertanyaan 2', content: 'Jawaban 2' }
    ]
    const wrapper = mount(Accordion, {
      props: { items, defaultOpenId: 'item-1' }
    })

    const btn1 = wrapper.find('#accordion-header-item-1')
    expect(btn1.attributes('aria-expanded')).toBe('true')

    const btn2 = wrapper.find('#accordion-header-item-2')
    expect(btn2.attributes('aria-expanded')).toBe('false')

    await btn2.trigger('click')
    expect(btn2.attributes('aria-expanded')).toBe('true')
  })

  it('useToast adds and removes toasts correctly', () => {
    const { toasts, success, removeToast } = useToast()
    success('Pesan Sukses', 0)
    expect(toasts.value.length).toBeGreaterThan(0)
    const toastId = toasts.value[toasts.value.length - 1].id
    expect(toasts.value.find(t => t.id === toastId).message).toBe('Pesan Sukses')
    removeToast(toastId)
    expect(toasts.value.find(t => t.id === toastId)).toBeUndefined()
  })

  it('TopBar renders phone and email from company data', () => {
    const wrapper = mount(TopBar)
    expect(wrapper.text()).toContain('081234567890')
    expect(wrapper.text()).toContain('info@gerayana-rent.dummy')
  })
})
