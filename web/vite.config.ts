import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Pinned to 5273 to avoid colliding with other Vite dev servers
    // (default 5173 is widely used by other projects on the same machine)
    port: 5273,
    strictPort: true,
    host: true,
    // Allow any host (dev only — needed for Cloudflare tunnel ingress)
    allowedHosts: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    sourcemap: true,
    target: 'es2020',
  },
});
