import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
