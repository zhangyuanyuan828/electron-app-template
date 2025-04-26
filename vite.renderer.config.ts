import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
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
