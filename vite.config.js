// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ustaw base na nazwę repo jeśli hostujesz na GitHub Pages
  // np. base: '/apk/' dla https://aurabroker.github.io/apk/
  base: '/',
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
