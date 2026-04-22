import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 80 },  // .jpg extension
      jpeg: { quality: 80 }, // .jpeg extension
      png: { quality: 85 },
      webp: { lossless: false, quality: 80 },
      avif: { lossless: false, quality: 80 },
      svg: { multipass: true },
    }),
  ],
})
