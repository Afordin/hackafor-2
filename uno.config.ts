import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      cBackground: '#060606',
      cGray: '#737373',
      cBorder: '#51546E',
      cWhite: '#FAFAFA',
      cBlack: '#0A0A0A',
      pBorder: '#262626',
      primary: {
        50: '#fff0f2',
        100: '#ffdde1',
        200: '#ffc1c8',
        300: '#ff96a3',
        400: '#ff596d',
        500: '#ff2640',
        600: '#fc1c37',
        700: '#d4011a',
        800: '#af0519',
        900: '#900c1c',
        950: '#4f000a'
      },
      secondary: {
        50: '#fbf5fe',
        100: '#f5eafd',
        200: '#ebd3fb',
        300: '#deb0f7',
        400: '#cd82f0',
        500: '#ad40e1',
        600: '#9a32c7',
        700: '#8226a5',
        800: '#6b2187',
        900: '#5c206f',
        950: '#3a0949'
      }
    },
    fontSize: {
      'fluid-xs': 'var(--fluid-xs)',
      'fluid-sm': 'var(--fluid-sm)',
      'fluid-base': 'var(--fluid-base)',
      'fluid-lg': 'var(--fluid-lg)',
      'fluid-xl': 'var(--fluid-xl)',
      'fluid-2xl': 'var(--fluid-2xl)',
      'fluid-3xl': 'var(--fluid-3xl)',
      'fluid-4xl': 'var(--fluid-4xl)',
      'fluid-5xl': 'var(--fluid-5xl)',
      'fluid-title': 'var(--fluid-title)'
    }
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        dmsans: {
          name: 'DM Sans',
          weights: ['300', '400', '500', '700', '800']
        }
      }
    }),
    presetIcons({})
  ]
});
