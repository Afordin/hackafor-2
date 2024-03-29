import { defineConfig, presetIcons, presetWebFonts, presetUno } from "unocss";

export default defineConfig({
  theme: {
    colors: {
      cBackground: "#060606",
    },
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        dmsans: "DM Sans",
      },
    }),
    presetIcons({
      cdn: "https://esm.sh/",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
