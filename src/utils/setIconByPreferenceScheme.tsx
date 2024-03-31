/**
 * Interface of the images Urls
 */
interface Images {
  /** Image Url when color scheme preference is dark  */
  dark: string;
  /** Image Url when color scheme preference is ligth */
  light: string;
}
/**
 * Function changes the app icon depending on the color scheme preference *
 * @param images An object that contains the Urls of the image of each preference
 * @returns A function that handle the remove listener of the event
 */
export default function setIconByPreferenceScheme({ dark, light }: Images) {
  if (!dark || !light) throw new Error('Both image URLs for dark and light schemes must be provided.');

  /**Get the media query of prefers-color-scheme */
  const darkSchemaMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  /**Get the link element that load the icon */
  const iconLink = document.querySelector('link[rel="icon"]');

  const handleColorScheme = (event: MediaQueryListEvent | MediaQueryList) => {
    if (!iconLink) throw new Error("Icon link element don't found");

    const isDark = event.matches === true;
    if (isDark) {
      iconLink.setAttribute('href', dark);
    } else {
      iconLink.setAttribute('href', light);
    }
  };

  /**Handle the first preference of color scheme */
  handleColorScheme(darkSchemaMediaQuery);

  /**Add the event change of the color-scheme and
   * handle the prefers-color-shceme if this changes
   */
  darkSchemaMediaQuery.addEventListener('change', handleColorScheme);

  /**
   * Removes the event
   * This return it is not neccesary at all, but is returned just in case
   */
  return () => darkSchemaMediaQuery.removeEventListener('change', handleColorScheme);
}
