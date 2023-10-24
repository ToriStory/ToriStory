/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jua: ['jua'],
        omyu: ['omyu'],
        unbeePuding: ['unbeePuding'],
        unbeePudingBold: ['unbeePudingBold'],
      },
    },
  },
  plugins: [],
};
