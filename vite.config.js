// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: https://aurabroker.github.io/APK/
  base: '/APK/',
  build: {
    outDir:    'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Czytelne nazwy chunków
        manualChunks: {
          react:  ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
