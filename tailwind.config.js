/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f9fa',
          100: '#e7ecf0',
          200: '#d1dbe2',
          300: '#a9bac7',
          400: '#7c95a7',
          500: '#57718a',
          600: '#2c3e50', // Hexa Steel brand color
          700: '#243342',
          800: '#1c2834',
          900: '#141c24',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
