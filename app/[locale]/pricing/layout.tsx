import { ReactNode } from 'react';

import { Metadata, MetadataProps, getMetadata } from '@/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return await getMetadata({
    title: t('pricingTitle'),
    description: t('pricingDescription'),
  });
}

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
