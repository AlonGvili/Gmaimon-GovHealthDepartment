const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand:{
          light: colors.sky["200"],
          DEFAULT: colors.sky["500"],
          dark: colors.sky["700"],
        }
      },
    },
    colors: {
      ...colors,
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
