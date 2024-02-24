import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    // If you're using a custom port, specify it here
     port:   5173,
  },
  plugins: [react()],
})

