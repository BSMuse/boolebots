import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'build',
    assetsDir: 'assets', // This specifies where your assets will be placed in the build output directory
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Create an alias for your images directory
      '@images': '/src/images',
    },
  },
});