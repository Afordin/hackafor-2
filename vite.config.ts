import path from 'path';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  plugins: [react(), UnoCSS(), vercel()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common/index.ts'),
      '@components': path.resolve(__dirname, './src/components/index.ts'),
      '@data': path.resolve(__dirname, './src/data/index.ts'),
      '@pages': path.resolve(__dirname, './src/pages')
    }
  },
  define: {
    VITE_BASE_URL: process.env.VITE_BASE_URL,
    VITE_BASE_API_URL: process.env.VITE_BASE_API_URL,
    VITE_PROJECT_URL: process.env.VITE_PROJECT_URL,
    VITE_API_KEY: process.env.VITE_API_KEY
  }
});
