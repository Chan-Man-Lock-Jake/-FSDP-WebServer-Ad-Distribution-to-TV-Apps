import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

var HOST = '172.20.10.2' || 'localhost';

export default defineConfig({
  root: 'client',
  plugins: [react()],
  server: {
    host: HOST,
    port: 5173, // Vite dev server port
    proxy: {
      '/api': {
        target: `http://${HOST}:3000`, // URL for your Express backend
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
