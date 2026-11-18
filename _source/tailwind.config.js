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
        cream: '#FFFCF4',
        ink: '#23343B',
        brand: {
          50: '#E9F8F1',
          100: '#D5F1E4',
          200: '#B5E5D2',
          300: '#87D2B6',
          400: '#50B894',
          500: '#247E65',
          600: '#1A6B54',
          700: '#14533F',
        },
      },
      boxShadow: {
        soft: '0 4px 14px -7px rgba(49,51,36,.16)',
        pop: '0 12px 32px -14px rgba(30,77,62,.24)',
        key: '0 3px 0 rgba(24,66,51,.2)',
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
