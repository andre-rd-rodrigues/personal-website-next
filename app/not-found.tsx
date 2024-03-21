import { Locale } from "@/locale.types";
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: {
    locale: Locale;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function NotFound({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
