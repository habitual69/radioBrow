/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#252422',
        'light-primary': '#e0e2db',
        'secondary': '#e6af2e',
        'trinary': '#001219',
      },
    },
  },
  plugins: [],
}