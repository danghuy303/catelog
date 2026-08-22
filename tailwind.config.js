/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1667FF', // Primary Brand Color
          600: '#0d4dc3',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          dark: '#0f172a',
        },
        tealBrand: {
          50: '#f0fdf4',
          500: '#00A88F', // Secondary Accent Color
          600: '#008a76',
        },
        darkBrand: '#111827',
        surfaceBg: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 103, 255, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 12px 36px -4px rgba(22, 103, 255, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'mega': '0 20px 50px -10px rgba(15, 23, 42, 0.15)',
      },
      maxWidth: {
        '7xl': '1280px',
      }
    },
  },
  plugins: [],
};
