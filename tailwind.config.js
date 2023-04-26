const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff",
          100: "#fafafa",
          200: "#eaeaea",
          300: "#999",
          400: "#888",
          500: "#666",
          600: "#444",
          700: "#333",
          800: "#111",
          900: "#000",
        },
        ...defaultTheme.colors,
      },
      fontSize: {
        ...defaultTheme.fontSize
      },
      screens: {
        "xs": "440px"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
}
