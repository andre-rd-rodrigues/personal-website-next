import { Jost } from 'next/font/google';
import localFont from 'next/font/local';

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-jost',
});

const blacker = localFont({
  src: './blacker-sans.light.woff2',
  display: 'swap',
  variable: '--font-blacker',
});

const moniqa = localFont({
  src: [
    {
      path: './moniqa.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './moniqa-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-moniqa',
});

export { jost, blacker, moniqa };
