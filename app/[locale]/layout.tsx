import AppNavbar from "@/components/AppNavbar/AppNavbar";
import "./globals.scss";

import { blacker, italiana, jost, moniqa } from "@/assets/fonts";

import Footer from "@/components/Footer/Footer";
import { getMetadata } from "@/metadata/metadata.utils";
import { Metadata } from "next";
import { MetadataProps } from "@/metadata/types";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/Analytics";

export async function generateMetadata({
  params: { locale }
}: MetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return getMetadata({
    title: t("homeTitle"),
    description: t("description"),
    openGraph: {
      locale
    }
  });
}

const RootLayout = ({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = useMessages();

  return (
    <html
      lang={locale}
      className={`${jost.variable} ${blacker.variable} ${italiana.variable} ${moniqa.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/italiana.woff2"
          as="font"
          type="font/woff2"
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppNavbar />
          {children}
          <Footer />

          {/* Metrics */}
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
