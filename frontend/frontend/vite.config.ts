import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Use port 3000
    strictPort: false,  // Allow it to try another port if 3000 is taken
  }
})