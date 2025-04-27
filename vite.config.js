import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,         // allow any external IP (not just localhost)
    port: 5173,
    allowedHosts: ['.onrender.com'], // Allow all .onrender.com subdomains
    proxy: {
      '/upload': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/videos': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
