/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PJS: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage:{
        grid: 'url(./src/assets/grd.png)'
      },
    },
  },
  plugins: [],
}