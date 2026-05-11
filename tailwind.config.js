/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c4ff',
          300: '#a5a0ff',
          400: '#8478ff',
          500: '#6c5ce7',
          600: '#5a3fd4',
          700: '#4c32b0',
          800: '#3e2a8e',
          900: '#352674',
          950: '#1e1549',
        },
        accent: {
          50: '#eef8ff',
          100: '#d8eeff',
          200: '#b9e2ff',
          300: '#89d0ff',
          400: '#52b4ff',
          500: '#2a93ff',
          600: '#0d74ff',
          700: '#065cf0',
          800: '#0c4ac2',
          900: '#104098',
          950: '#0f295c',
        },
        surface: {
          50: '#f8f9fc',
          100: '#f1f3f8',
          200: '#e6e9f0',
          300: '#d3d8e4',
          400: '#b8bfd0',
          500: '#9ba3b8',
          600: '#828a9e',
          700: '#6e7588',
          800: '#5c6271',
          900: '#4d525d',
          950: '#31343b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 4px 15px -3px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'typing': 'typing 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        typing: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
