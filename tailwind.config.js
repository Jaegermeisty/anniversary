/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FEFCF8',
          100: '#FBF5EE',
          200: '#F5EBE0',
          300: '#EFE0D2',
          400: '#E5D0BE',
        },
        blush: {
          50: '#FBF1F2',
          100: '#F5E6E8',
          200: '#E8C5C9',
          300: '#D9A7AE',
          400: '#C99DA3',
          500: '#B8838C',
          600: '#9A6A73',
          700: '#7E555E',
        },
        rose: {
          200: '#E8B4BC',
          300: '#DD9FA8',
          400: '#D08A94',
        },
        ink: {
          600: '#6B5B52',
          700: '#5C4F47',
          800: '#3D3530',
          900: '#2A2320',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.06) translateY(-8px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.12)' },
          '60%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'fade-in-scale': 'fadeInScale 1.1s ease-out forwards',
        'ken-burns': 'kenBurns 14s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.8s ease-in-out',
      },
    },
  },
  plugins: [],
};
