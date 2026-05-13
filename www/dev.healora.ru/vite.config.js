import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH || '/';
  process.env.VITE_BUILD_TIME = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  return {
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
  };
});
