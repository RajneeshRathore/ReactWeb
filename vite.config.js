import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,          // your React dev server
    proxy: {
      // whenever your React code does POST '/upload',
      // Vite will send it to your Express on port 5000
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
