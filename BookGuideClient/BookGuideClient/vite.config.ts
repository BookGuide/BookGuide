import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,   // 🔓 Docker dışından erişim için gerekli
    port: 5173    // 🌐 dış port ile eşleşmeli
  }
})
