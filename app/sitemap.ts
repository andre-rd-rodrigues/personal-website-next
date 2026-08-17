import { getAllPostsMeta } from '@/lib/blog.meta';
import type { Locale } from '@/locale.types';
import { locales, pathnames } from '@/navigation';
import { buildLocalizedUrl } from '@/utils/url.utils';
import { MetadataRoute } from 'next';

/** hreflang map covering every locale that serves the given route. */
function getLanguageAlternates(
  buildUrl: (locale: Locale) => string,
  availableLocales: readonly Locale[] = locales,
) {
  return Object.fromEntries(
    availableLocales.map((locale) => [locale, buildUrl(locale)]),
  );
}

const getBlogPostUrl = (slug: string, locale: Locale): string =>
  `${buildLocalizedUrl('/blog', locale)}/${slug}`;

function getStaticEntries(): MetadataRoute.Sitemap {
  return Object.keys(pathnames).flatMap((pathname) =>
    locales.map((locale) => ({
      url: buildLocalizedUrl(pathname, locale),
      lastModified: new Date(),
      alternates: {
        languages: getLanguageAlternates((loc) =>
          buildLocalizedUrl(pathname, loc),
        ),
      },
    })),
  );
}

function getLastModified(publishedDate: string): Date {
  const date = new Date(publishedDate);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const postsByLocale = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      posts: await getAllPostsMeta(locale),
    })),
  );

  /**
   * Translations are not guaranteed to exist for every post, so a slug is only
   * advertised as an alternate for the locales that actually publish it.
   */
  const localesBySlug = new Map<string, Locale[]>();
  for (const { locale, posts } of postsByLocale) {
    for (const { slug } of posts) {
      localesBySlug.set(slug, [...(localesBySlug.get(slug) ?? []), locale]);
    }
  }

  return postsByLocale.flatMap(({ locale, posts }) =>
    posts.map((post) => ({
      url: getBlogPostUrl(post.slug, locale),
      lastModified: getLastModified(post.publishedDate),
      alternates: {
        languages: getLanguageAlternates(
          (loc) => getBlogPostUrl(post.slug, loc),
          localesBySlug.get(post.slug) ?? [locale],
        ),
      },
    })),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogEntries();
  return [...getStaticEntries(), ...blogEntries];
}
