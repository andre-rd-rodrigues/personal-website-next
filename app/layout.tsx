import { Locale } from '@/locale.types';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children }: Props) {
  return children;
}
