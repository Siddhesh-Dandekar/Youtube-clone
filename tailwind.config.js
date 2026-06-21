/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ytred: {
          DEFAULT: '#cc0000',
          hover: '#a30000',
        },
      },
    },
  },
  plugins: [],
}
