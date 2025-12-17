import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Для GitHub Pages всегда используем base path в продакшене
  // В dev режиме используем '/', в production - '/CloudeOSLanding/'
  const isProduction = mode === 'production' || process.env.NODE_ENV === 'production';
  const base = isProduction ? '/CloudeOSLanding/' : '/';
  
  console.log(`Vite config: mode=${mode}, NODE_ENV=${process.env.NODE_ENV}, base=${base}`);
  
  return {
    base,
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
