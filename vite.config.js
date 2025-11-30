import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/S215-SDP05-Hackthon/',
  plugins: [react()],
})
