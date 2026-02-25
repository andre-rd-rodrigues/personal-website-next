import Navbar from '@/components/Navbar/Navbar';
import './globals.scss';

import { blacker, jost, moniqa } from '@/assets/fonts';

import Footer from '@/components/Footer/Footer';
import { getMetadata } from '@/metadata/metadata.utils';
import { MetadataProps } from '@/metadata/types';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import Cookies from '@/components/Cookies';

import { SpeedInsights } from '@vercel/speed-insights/next';
import GlobalBackground from '@/components/GlobalBackground';
import PageLoading from '@/components/PageLoading';
import Analytics from '@/components/Analytics';

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return await getMetadata({
    title: t('homeTitle'),
    description: t('description'),
  });
}

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) => {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    
    <html
      lang={locale}
      className={`${jost.variable} ${blacker.variable} ${moniqa.variable}`}
    >
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <GlobalBackground />
          <PageLoading />
          <Navbar />
          {children}
          <Cookies />
          <Footer />

          {/* Metrics */}
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
