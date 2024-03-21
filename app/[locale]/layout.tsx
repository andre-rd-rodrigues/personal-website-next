import AppNavbar from "@/components/AppNavbar/AppNavbar";
import "./globals.scss";

import { blacker, italiana, jost, moniqa } from "@/assets/fonts";

import Footer from "@/components/Footer/Footer";
import { getMetadata } from "@/metadata/metadata.utils";
import { Metadata, ResolvingMetadata } from "next";
import { MetadataProps } from "@/metadata/types";

export async function generateMetadata({
  params
}: MetadataProps): Promise<Metadata> {
  const { locale } = params;
  return getMetadata(locale, "home");
}

const RootLayout = ({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  return (
    <html
      lang={locale}
      className={`${jost.variable} ${blacker.variable} ${italiana.variable} ${moniqa.variable}`}
    >
      <body className="min-h-screen">
        <AppNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
