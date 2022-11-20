/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      sm: '380px',
      md: '700px',
      lg: '900px',
      lg2: '1170px',
      xl: '1360px',
      xl2: '1500px',
      xl3: '1536px',
      xl4: '1820px',
    },
  },
  plugins: [],
}
