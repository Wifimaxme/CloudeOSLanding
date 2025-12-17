import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Для GitHub Pages всегда используем base path
  const base = mode === 'production' || process.env.GITHUB_ACTIONS ? '/CloudeOSLanding/' : '/';
  
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
