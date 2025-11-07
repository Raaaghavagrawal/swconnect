import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 7400
  },
  // Ensure proper base path for deployment
  base: '/',
  build: {
    // Ensure assets are properly referenced
    assetsDir: 'assets',
    outDir: 'dist',
    // Generate source maps for debugging (set to true if needed)
    sourcemap: false
  }
});

