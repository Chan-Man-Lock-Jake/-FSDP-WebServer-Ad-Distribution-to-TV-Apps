import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const HOST = process.env.HOST || 'localhost';

export default defineConfig({
  plugins: [react()],
  server: {
    host: HOST,
    port: 5173,
    proxy: {
      '/api': {
        target: `http://${HOST}:3000`, // Your Express backend
        changeOrigin: true,
        onError(err, req, res) {
          console.error(`[Proxy Error] Failed to connect to target: ${err.message}`);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to connect to the backend server.' }));
        },
      },
    },
  },
  // <-- Add this section to skip certain packages from Vite's optimize step
  optimizeDeps: {
    exclude: [
      '@ffmpeg/ffmpeg', 
      '@ffmpeg/util'
      // Add others here if needed
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
