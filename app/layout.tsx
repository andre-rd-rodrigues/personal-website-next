import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import "bootstrap/dist/css/bootstrap.min.css";
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/locale.types";

type Props = {
  children: ReactNode;
  params: {
    locale: Locale;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
