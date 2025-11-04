/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Manrope', 'Montserrat', 'Martel Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['SUSE Mono', 'ui-monospace', 'monospace'],
        display: ['Orbitron', 'ui-sans-serif', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        martel: ['Martel Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

