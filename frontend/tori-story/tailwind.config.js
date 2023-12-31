/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      orange: {
        50: '#FFF1EA',
        100: '#FFD2BB',
        200: '#FFB38C',
        300: '#FF955D',
        400: '#FF762E',
        500: '#DD5E1C',
        600: '#BB490D',
        700: '#993603',
        800: '#772900',
        900: '#551D00',
      },
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
      red: {
        50: '#FFECEC',
        100: '#FFC2C2',
        200: '#FF9797',
        300: '#FF6D6D',
        400: '#FF4343',
        500: '#DD2F2F',
        600: '#BB1F1F',
        700: '#991212',
        800: '#770808',
        900: '#550101',
      },
      extend: {},
    },
    plugins: [],
    extend: {
      fontFamily: {
        jua: ['jua'],
        omyu: ['omyu'],
        unbeePuding: ['unbeePuding'],
        unbeePudingBold: ['unbeePudingBold'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0.1rem)' },
          '50%': { transform: 'translateX(-0.1rem)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        shake: 'shake 0.3s ease-in-out infinite',
      },
    },
  },
};
