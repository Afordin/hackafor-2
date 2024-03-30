import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      cBackground: '#060606',
      cGray: '#737373',
      cBorder: '#51546E',
      cWhite: '#FAFAFA',
      cBlack: '#0A0A0A',
      pBorder: '#262626'
    }
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        dmsans: 'DM Sans'
      }
    }),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ]
})
