/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {
      spacing: {
        '8xl': "1400px"
      }
    },
  },
  plugins: [],
}

