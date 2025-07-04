import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale } from './locale.types';

// Can be imported from a shared config
const locales = ['en', 'pt'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
