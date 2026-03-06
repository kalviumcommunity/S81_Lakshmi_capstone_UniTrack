import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Removed strict port usage to avoid "Port already in use" errors.
  // Vite will default to 5173 or pick the next available port.
})
