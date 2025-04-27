import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  ...(command === 'serve' && {
    server: {
      host: '0.0.0.0',
      port: 5173,
      // allow the exact host (with and without port)
      allowedHosts: [
        'localhost',
        'reactweb-3103.onrender.com',
        'reactweb-3103.onrender.com:10000'
      ],
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
  }),
}));
