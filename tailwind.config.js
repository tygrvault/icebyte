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
          DEFAULT: '#666',
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
        success: {
          DEFAULT: '#0070F3',
          50: '#D4E8FF',
          100: '#C0DDFF',
          200: '#97C7FF',
          300: '#6EB1FF',
          400: '#469BFF',
          500: '#1D85FF',
          600: '#0070F3',
          700: '#0056BB',
          800: '#003C83',
          900: '#00224B',
          950: '#00162F'
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
