import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt'] as const,
  defaultLocale: 'pt',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/blog': {
      en: '/blog',
      pt: '/blog',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      pt: '/blog/[slug]',
    },
    '/about': {
      en: '/about',
      pt: '/sobre',
    },
    '/pricing': {
      en: '/pricing',
      pt: '/preçário',
    },
    '/faqs': {
      en: '/faqs',
      pt: '/faqs',
    },
    '/portfolio': {
      en: '/portfolio',
      pt: '/portfolio',
    },
    '/portfolio/web': {
      en: '/portfolio/web',
      pt: '/portfolio/web',
    },
    '/portfolio/mobile': {
      en: '/portfolio/mobile',
      pt: '/portfolio/mobile',
    },
    '/contacts': {
      en: '/contacts',
      pt: '/contactos',
    },
  },
});
