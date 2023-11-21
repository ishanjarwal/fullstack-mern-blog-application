/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pri": "var(--pri)",
        "dark": "var(--dark)",
        "text": "var(--text)",
        "text-muted": "var(--text-muted)",
        "background": "var(--background)",
        "light": "var(--light)",
      },
      maxWidth: {
        '6xl': '1200px',
        '7xl': '1350px',
        '8xl': '1600px',
      },
      screens: {
        'xs': '425px',
      }
    },
  },
  plugins: [],
}