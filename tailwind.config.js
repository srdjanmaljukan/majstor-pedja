/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        navy: {
          900: '#0D1B2A',
          800: '#1B2A3B',
          700: '#1D3557',
          600: '#2E4A6E',
        },
        rust: {
          500: '#E63946',
          400: '#FF5A63',
        },
        cream: '#F8F4EE',
        warm: '#EDE8E0',
      },
    },
  },
  plugins: [],
}
