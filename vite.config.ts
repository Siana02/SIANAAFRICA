import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg:  { quality: 92, progressive: true, chromaSubsampling: '4:4:4' },
      jpeg: { quality: 92, progressive: true, chromaSubsampling: '4:4:4' },
      png:  { quality: 95, compressionLevel: 7 },
      webp: { lossless: false, quality: 92 },
      avif: { lossless: false, quality: 85 },
      svg:  { multipass: true },
    }),
  ],
})
