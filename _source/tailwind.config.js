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
        cream: '#FFF8F0',
        ink: '#1F2233',
        brand: {
          50: '#EEF1FF',
          100: '#E0E5FF',
          200: '#C7CFFF',
          300: '#A5AFFF',
          400: '#8189FB',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(31,34,51,.18)',
        pop: '0 18px 40px -18px rgba(99,102,241,.45)',
        key: '0 5px 0 0 rgba(0,0,0,.14)',
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