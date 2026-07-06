import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' → relative asset paths so it works on Vercel, GitHub Pages, or any static host.
export default defineConfig({
  base: './',
  plugins: [react()],
})
