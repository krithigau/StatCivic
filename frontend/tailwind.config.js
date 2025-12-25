/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tn-red': '#8B1E3F', // That deep red from your screenshot
        'tn-dark': '#1A1A2E',
      }
    },
  },
  plugins: [],
}