import { useEffect } from 'react'

/**
 * Interface of the images Urls
 */
interface Images {
  /** Image Url when color scheme preference is dark  */
  dark: string
  /** Image Url when color scheme preference is ligth */
  light: string
}
/**
 * Custom hook that changes the app icon depending on the color scheme preference *
 * @param images An object that contains the Urls of the image of each preference
 */
export default function useColorScheme({ dark, light }: Images) {
  if (!dark || !light)
    throw new Error(
      'Both image URLs for dark and light schemes must be provided.'
    )

  useEffect(() => {
    const darkSchemaMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    const iconLink = document.querySelector('link[rel="icon"]')

    const handleColorScheme = (event: MediaQueryListEvent | MediaQueryList) => {
      if (!iconLink) return
      const isDark = event.matches === true
      if (isDark) {
        iconLink.setAttribute('href', dark)
      } else {
        iconLink.setAttribute('href', light)
      }
    }

    handleColorScheme(darkSchemaMediaQuery)

    darkSchemaMediaQuery.addEventListener('change', handleColorScheme)

    return () =>
      darkSchemaMediaQuery.removeEventListener('change', handleColorScheme)
  }, [dark, light])
}
