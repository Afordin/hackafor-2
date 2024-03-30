import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common/index.ts'),
      '@components': path.resolve(__dirname, './src/components/index.ts')
    }
  }
})
