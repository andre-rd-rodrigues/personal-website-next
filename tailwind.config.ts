import type { Config } from 'tailwindcss';

// Values from constants/design-tokens.constants.ts, inlined to avoid
// Turbopack module-resolution issues with tailwind.config.ts.
const BREAKPOINTS = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };
const COLORS = { white: '#ffffff', dark: '#161616' };

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
