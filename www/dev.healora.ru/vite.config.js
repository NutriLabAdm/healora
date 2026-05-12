import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  plugins: [react()],
  base: basePath,
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3051',
        changeOrigin: true,
        secure: false,
      },

    }
  },
  build: {
    outDir: '../dev.healora.ru/dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
