import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const HOST = process.env.HOST || 'localhost'; // Default to localhost if not set

export default defineConfig({
  plugins: [react()],
  server: {
    host: HOST,
    port: 5173, // Vite dev server port
    proxy: {
      '/api': {
        target: `http://${HOST}:3000`, // URL for your Express backend
        changeOrigin: true,
        onError(err, req, res) {
          console.error(`[Proxy Error] Failed to connect to target: ${err.message}`);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to connect to the backend server.' }));
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
