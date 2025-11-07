import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 7400
  },
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    sourcemap: false
  },
  // Prevent esbuild from resolving parent tsconfig.json files
  esbuild: {
    tsconfigRaw: '{}',
  },
});

