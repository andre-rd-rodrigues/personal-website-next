import Navbar from '@/components/Navbar/Navbar';
import './globals.scss';

import { blacker, jost, moniqa } from '@/assets/fonts';

import Footer from '@/components/Footer/Footer';
import { getMetadata } from '@/metadata/metadata.utils';
import { MetadataProps } from '@/metadata/types';
import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import Cookies from '@/components/Cookies';

import { SpeedInsights } from '@vercel/speed-insights/next';
import GlobalBackground from '@/components/GlobalBackground';
import PageLoading from '@/components/PageLoading';

export async function generateMetadata({
  params: { locale },
}: MetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return getMetadata({
    title: t('homeTitle'),
    description: t('description'),
  });
}

const RootLayout = ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = useMessages();

  return (
    <html
      lang={locale}
      className={`${jost.variable} ${blacker.variable} ${moniqa.variable}`}
    >
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Cookies />
          <Footer />

          {/* Metrics */}
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
      <GlobalBackground />
      <PageLoading />
    </html>
  );
};

export default RootLayout;
