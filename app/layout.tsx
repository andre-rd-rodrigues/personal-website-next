import { Locale } from '@/locale.types';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};

export default function RootLayout({ children }: Props) {
  return children;
}
