/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgb(var(--color-brand-50, 240 253 250) / <alpha-value>)',
          100: 'rgb(var(--color-brand-100, 204 251 241) / <alpha-value>)',
          200: 'rgb(var(--color-brand-200, 153 246 228) / <alpha-value>)',
          300: 'rgb(var(--color-brand-300, 94 234 212) / <alpha-value>)',
          400: 'rgb(var(--color-brand-400, 45 212 191) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500, 20 184 166) / <alpha-value>)',
          600: 'rgb(var(--color-brand-600, 13 148 136) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700, 15 118 110) / <alpha-value>)',
          800: 'rgb(var(--color-brand-800, 17 94 89) / <alpha-value>)',
          900: 'rgb(var(--color-brand-900, 19 78 74) / <alpha-value>)',
          950: 'rgb(var(--color-brand-950, 4 47 46) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-brand-500, 20 184 166) / <alpha-value>)',
        },
        accent: {
          50: 'rgb(var(--color-accent-50, 255 251 235) / <alpha-value>)',
          100: 'rgb(var(--color-accent-100, 254 243 199) / <alpha-value>)',
          200: 'rgb(var(--color-accent-200, 253 230 138) / <alpha-value>)',
          300: 'rgb(var(--color-accent-300, 252 211 77) / <alpha-value>)',
          400: 'rgb(var(--color-accent-400, 251 191 36) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500, 245 158 11) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600, 217 119 6) / <alpha-value>)',
          700: 'rgb(var(--color-accent-700, 180 83 9) / <alpha-value>)',
          800: 'rgb(var(--color-accent-800, 146 64 14) / <alpha-value>)',
          900: 'rgb(var(--color-accent-900, 120 53 15) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-accent-500, 245 158 11) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
