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
      '@pages': path.resolve(__dirname, './src/pages')
    }
  }
});
