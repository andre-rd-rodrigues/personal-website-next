import { locales, pathnames } from '@/navigation';
import { MetadataRoute } from 'next';
const host = 'https://www.andrerodrigo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    //@ts-expect-error expected
    const localePath = pathnames[pathname]?.[locale];
    //@ts-expect-error expected
    const path = localePath || pathnames[pathname] || pathname;

    return `${host}/${locale}${path === '/' ? '' : path}`;
  }

  return Object.keys(pathnames).flatMap((pathname) => {
    return locales.map((locale) => ({
      url: getUrl(pathname, locale),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, getUrl(pathname, loc)]),
        ),
      },
    }));
  });
}
