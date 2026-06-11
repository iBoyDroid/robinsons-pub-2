/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pg:          '#1B5E38',
        'pg-dark':   '#0D3D22',
        ga:          '#C49A35',
        'ga-light':  '#D4AA45',
        pb:          '#0A0A0A',
        ps:          '#141414',
        ps2:         '#1C1C1C',
        cr:          '#F0E6C8',
        mt:          '#A89070',
        bd:          '#2A2A2A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
