import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Only apply this section when running `vite` (npm run dev)
  ...(command === 'serve' && {
    server: {
      host: '0.0.0.0',
      port: 5173,                      // fixed dev port
      allowedHosts: ['localhost'],     // your local dev host
      proxy: {
        // redirect /upload → Express on 5000
        '/upload': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        // redirect /videos → Express on 5000
        '/videos': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }),
}));
