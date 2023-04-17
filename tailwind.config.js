/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
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
        }
      }
    },
  },
  plugins: [],
}
