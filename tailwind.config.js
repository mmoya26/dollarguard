/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {
      spacing: {
        '8xl': "1400px"
      },
      width: {
        'initial': 'initial'
      },
      flexGrow: {
        2: '2'
      },
      flex: {
        '2': '2 2 0%'
      }
    },
  },
  plugins: [],
}

