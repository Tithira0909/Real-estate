/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B2529',
        accent: '#D4AF37',
        surface: '#F9F9F9',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        signature: ['Pinyon Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shine: {
          'to': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
