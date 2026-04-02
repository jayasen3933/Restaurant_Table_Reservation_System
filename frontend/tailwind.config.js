/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b0',
          300: '#e9bb7c',
          400: '#e0a05c',
          500: '#d4863a',
          600: '#c06d2e',
          700: '#9f5428',
          800: '#804427',
          900: '#6a3923',
        },
      },
    },
  },
  plugins: [],
}
