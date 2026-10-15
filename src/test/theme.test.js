import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  mixRgb,
  generateColorShades,
  shadesToCssVariables,
  applyCssVariablesToElement
} from '../lib/theme'

describe('Theme & Dynamic Palette Unit Tests', () => {
  it('hexToRgb correctly parses 6-digit hex', () => {
    const rgb = hexToRgb('#14b8a6')
    expect(rgb).toEqual({ r: 20, g: 184, b: 166 })
  })

  it('hexToRgb correctly parses 3-digit hex', () => {
    const rgb = hexToRgb('#fff')
    expect(rgb).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('hexToRgb falls back to default on invalid input', () => {
    expect(hexToRgb('')).toEqual({ r: 20, g: 184, b: 166 })
    expect(hexToRgb('invalid')).toEqual({ r: 20, g: 184, b: 166 })
    expect(hexToRgb(null)).toEqual({ r: 20, g: 184, b: 166 })
  })

  it('mixRgb blends two colors correctly', () => {
    const white = { r: 255, g: 255, b: 255 }
    const black = { r: 0, g: 0, b: 0 }
    const middle = mixRgb(white, black, 0.5)
    expect(middle).toEqual({ r: 128, g: 128, b: 128 })
  })

  it('generateColorShades returns full 50-950 scale', () => {
    const shades = generateColorShades('#ea580c')
    expect(shades[500]).toEqual({ r: 234, g: 88, b: 12 })
    expect(shades[50]).toBeDefined()
    expect(shades[950]).toBeDefined()
    expect(shades[50].r).toBeGreaterThan(shades[500].r)
  })

  it('shadesToCssVariables formats properly for Tailwind color channels', () => {
    const shades = {
      500: { r: 20, g: 184, b: 166 },
      600: { r: 13, g: 148, b: 136 }
    }
    const cssVars = shadesToCssVariables(shades, 'brand')
    expect(cssVars['--color-brand-500']).toBe('20 184 166')
    expect(cssVars['--color-brand-600']).toBe('13 148 136')
  })

  it('applyCssVariablesToElement sets properties on DOM element', () => {
    const el = document.createElement('div')
    applyCssVariablesToElement({ '--color-brand-500': '20 184 166' }, el)
    expect(el.style.getPropertyValue('--color-brand-500')).toBe('20 184 166')
  })
})
