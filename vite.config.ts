import path from 'path';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common/index.ts'),
      '@components': path.resolve(__dirname, './src/components/index.ts'),
      '@data': path.resolve(__dirname, './src/data/index.ts'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store/index.ts'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@config': path.resolve(__dirname, './src/config')
    }
  }
});
