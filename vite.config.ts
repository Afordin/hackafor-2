import path from 'path';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [react(), UnoCSS(), vercel()],
    resolve: {
      alias: {
        '@common': path.resolve(__dirname, './src/common/index.ts'),
        '@components': path.resolve(__dirname, './src/components/index.ts'),
        '@data': path.resolve(__dirname, './src/data/index.ts'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@store': path.resolve(__dirname, './src/store/index.ts'),
        '@utils': path.resolve(__dirname, './src/utils/index.ts')
      }
    },
    define: {
      'process.env': {
        VITE_BASE_URL: process.env.VITE_BASE_URL,
        VITE_BASE_API_URL: process.env.VITE_BASE_API_URL,
        VITE_PROJECT_URL: process.env.VITE_PROJECT_URL,
        VITE_API_KEY: process.env.VITE_API_KEY,
        VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL
      }
    }
  };
});
