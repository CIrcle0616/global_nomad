import type { Config } from 'tailwindcss';
import scrollbarHide from 'tailwind-scrollbar-hide';

// content 경로가 프로젝트 구조와 일치하기!
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        black: '#1B1B1B', // 일반 블랙
        nomad: {
          black: '#112211', // 노마드 전용 포인트 브랙
        },
        gray: {
          900: '#4B4B4B',
          800: '#79747E',
          700: '#A1A1A1',
          600: '#A4A1AA',
          500: '#ADAEB8',
          400: '#CBC9CF',
          300: '#DDDDDD',
          200: '#EEEEEE',
          100: '#FAFAFA',
        },
        green: {
          500: '#0B382D',
          300: '#CEDBD5',
          100: '#00AC07',
        },
        red: {
          500: '#FF472E',
          300: '#FFC2BA',
          100: '#FFE4E0',
        },
        orange: {
          500: '#FF7C1D',
          100: '#FFF4E8',
        },
        yellow: {
          100: '#FFC29D',
        },
        blue: {
          500: '#0085FF',
          300: '#2EB4FF',
          100: '#E5F3FF',
        },
      },
      fontSize: {
        '3xl-bold': ['32px', { lineHeight: '42px', fontWeight: '700' }],
        '3xl-semibold': ['32px', { lineHeight: '42px', fontWeight: '600' }],

        '2xl-bold': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        '2xl-semibold': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        '2xl-medium': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        '2xl-regular': ['24px', { lineHeight: '32px', fontWeight: '400' }],

        'xl-bold': ['20px', { lineHeight: '32px', fontWeight: '700' }],
        'xl-semibold': ['20px', { lineHeight: '32px', fontWeight: '600' }],
        'xl-medium': ['20px', { lineHeight: '32px', fontWeight: '500' }],
        'xl-regular': ['20px', { lineHeight: '32px', fontWeight: '400' }],

        '2lg-bold': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        '2lg-semibold': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        '2lg-medium': ['18px', { lineHeight: '26px', fontWeight: '500' }],
        '2lg-regular': ['18px', { lineHeight: '26px', fontWeight: '400' }],

        'lg-bold': ['16px', { lineHeight: '26px', fontWeight: '700' }],
        'lg-semibold': ['16px', { lineHeight: '26px', fontWeight: '600' }],
        'lg-medium': ['16px', { lineHeight: '26px', fontWeight: '500' }],
        'lg-regular': ['16px', { lineHeight: '26px', fontWeight: '400' }],

        'md-bold': ['14px', { lineHeight: '24px', fontWeight: '700' }],
        'md-semibold': ['14px', { lineHeight: '24px', fontWeight: '600' }],
        'md-medium': ['14px', { lineHeight: '24px', fontWeight: '500' }],
        'md-regular': ['14px', { lineHeight: '24px', fontWeight: '400' }],

        'sm-semibold': ['13px', { lineHeight: '22px', fontWeight: '600' }],
        'sm-medium': ['13px', { lineHeight: '22px', fontWeight: '500' }],

        'xs-semibold': ['12px', { lineHeight: '18px', fontWeight: '600' }],
        'xs-medium': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'xs-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },
    },
    keyframes: {
      'fade-slide-in': {
        '0%': {
          opacity: '0',
          transform: 'translateY(16px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'fade-slide-in': 'fade-slide-in 0.4s ease-out',
    },
  },


  plugins: [scrollbarHide],

};

export default config;
