/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Pure Black & White Theme
        dark: {
          'main': '#000000',
          'card': '#1a1a1a',
          'lighter': '#2d2d2d'
        },
        text: {
          'primary': '#ffffff',
          'secondary': '#d4d4d8',
          'muted': '#9ca3af'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'white-sm': '0 4px 12px rgba(255, 255, 255, 0.1)',
        'white-lg': '0 10px 30px rgba(255, 255, 255, 0.15)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.2)'
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      backdropBlur: {
        'xs': '2px',
      }
    }
  },
  plugins: []
}
