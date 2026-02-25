import type { Config } from 'tailwindcss';
import { BREAKPOINTS, COLORS } from './constants/design-tokens.constants';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        pink: 'var(--color-primary)',
        dark: COLORS.dark,
        white: COLORS.white,
      },
      screens: {
        sm: `${BREAKPOINTS.sm}px`,
        md: `${BREAKPOINTS.md}px`,
        lg: `${BREAKPOINTS.lg}px`,
        xl: `${BREAKPOINTS.xl}px`,
        xxl: `${BREAKPOINTS.xxl}px`,
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
