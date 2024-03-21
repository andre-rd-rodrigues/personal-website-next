import { Locale } from "@/locale.types";
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import Error from "next/error";

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
      <Error statusCode={404} />
    </div>
  );
}
