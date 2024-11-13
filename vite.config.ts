import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import * as path from 'path';

export default defineConfig({
  plugins: [
    react(),
    (compression as any)({
      algorithm: 'gzip'
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
    hmr: {
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    }
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: path.resolve(__dirname, 'src', 'app', 'layout.tsx')
    },
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    loader: "ts",
  }
});
