import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 51730,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  html: {
    cspNonce: 'ZWxlY3Ryb24tYXBwLXRlbXBsYXRl'
  },
  plugins: [
    react()
  ]
})
