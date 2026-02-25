import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale } from '../locale.types';

const locales = ['en', 'pt'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
