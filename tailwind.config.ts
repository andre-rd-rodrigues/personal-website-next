import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bgBlue: '#ECF4FA',
        blue: '#011954',
        'custom-yellow': '#ffca6c',
        cyan: '#00BFC8',
        dark: '#2f333a',
        orange: '#FD7959',
      },
    },
  },
  plugins: [],
};
export default config;
