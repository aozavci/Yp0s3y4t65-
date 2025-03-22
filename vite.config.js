import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Yp0s3y4t65-/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
