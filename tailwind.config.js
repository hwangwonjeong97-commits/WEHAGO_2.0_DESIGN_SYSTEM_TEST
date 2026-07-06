import { colors, fontSize, fontFamily, fontWeight } from './theme.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily,
      fontWeight,
    },
  },
  plugins: [],
}
