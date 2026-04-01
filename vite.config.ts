// vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    
    // 👇 Простые настройки без poolOptions:
    pool: 'threads',           // или 'forks'
    testTimeout: 10000,
    hookTimeout: 10000,
    maxConcurrency: 1,         // однопоточный режим для стабильности
  },
});