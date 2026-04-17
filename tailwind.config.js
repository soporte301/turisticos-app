/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#FF0085',
        },
        teal: {
          DEFAULT: '#009E99',
        },
        yellow: {
          DEFAULT: '#f9ce09',
        },
        black: {
          DEFAULT: '#242424',
        },
        white: {
          DEFAULT: '#ffffff',
        }
      },
      fontFamily: {
        main: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
