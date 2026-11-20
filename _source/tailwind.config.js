/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', '"Nunito"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F8F8FF',
        ink: '#30354B',
        brand: {
          50: '#F0EFFF',
          100: '#E2E0FF',
          200: '#CAC6FF',
          300: '#ACA6FB',
          400: '#8D83F0',
          500: '#7164DD',
          600: '#5E52C5',
          700: '#4C439F',
        },
      },
      boxShadow: {
        soft: '0 8px 22px -13px rgba(66,63,116,.28)',
        pop: '0 12px 28px -15px rgba(80,70,156,.34)',
        key: '0 3px 0 rgba(78,66,151,.2)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        popin: { '0%': { transform: 'scale(.9)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        pulseRing: { '0%': { transform: 'scale(.9)', opacity: '.7' }, '100%': { transform: 'scale(1.5)', opacity: '0' } },
        slideup: { '0%': { transform: 'translateY(14px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        popin: 'popin .28s cubic-bezier(.34,1.56,.64,1) both',
        pulseRing: 'pulseRing 1.4s ease-out infinite',
        slideup: 'slideup .35s ease-out both',
      },
    },
  },
  plugins: [],
}
