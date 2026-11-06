import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: '127.0.0.1', port: 5173, open: false, allowedHosts: true },
  // allow tunnel domains (trycloudflare / ngrok / locale.lt) to reach preview
  preview: { host: '127.0.0.1', port: 4173, allowedHosts: true },
  build: { chunkSizeWarningLimit: 4000 },
})