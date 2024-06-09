/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      linearGradientColors: {
        'cream-white': ['33% #F6EBE1', '100% #FFFFFF'],
      },
      colors: {
        main: '#022B3A',
        'main-hover': '#054C66',
        secondary: '#EDE0D4',
        'second-light': '#F6EBE1',
        black: '#333333'
      },
      fontFamily: {
        main: "Alata, sans-serif",
        secondary: "Cairo, sans-serif"
      }
    },
  },
  plugins: [],
}

