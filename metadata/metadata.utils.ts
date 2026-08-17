import { WEBSITE_DOMAIN_URL } from '@/constants/common.constants';
import { Locale } from '@/locale.types';
import { buildLocalizedUrl } from '@/utils/url.utils';
import { Metadata } from 'next';

type GetMetadataOptions = Metadata & {
  src?: string;
  /** Active locale, used to build a self-referencing canonical URL. */
  locale?: Locale;
  /**
   * Internal route key (e.g. `/about`) or a fully resolved path (e.g.
   * `/blog/my-post`). Used together with `locale` to build the canonical URL.
   */
  pathname?: string;
};

export const getMetadata = async (
  options: GetMetadataOptions,
): Promise<Metadata> => {
  const { src, locale, pathname } = options;

  const ogImage = src || 'https://i.postimg.cc/kXyC26Dr/opengraph-image.webp';

  const canonical =
    locale && pathname !== undefined
      ? buildLocalizedUrl(pathname, locale)
      : undefined;

  return {
    metadataBase: new URL(WEBSITE_DOMAIN_URL),
    title: options.title,
    description: options.description,
    icons: [
      {
        url: '/images/favicon/favicon-16x16.webp',
        sizes: '16x16',
        rel: 'icon',
      },
      {
        url: '/images/favicon/favicon-32x32.webp',
        sizes: '32x32',
        rel: 'icon',
      },
      {
        url: '/images/favicon/apple-touch-icon.webp',
        sizes: '180x180',
        rel: 'apple-touch-icon',
      },
      {
        url: '/images/favicon/android-chrome-192x192.webp',
        sizes: '192x192',
        rel: 'icon',
      },
      {
        url: '/images/favicon/android-chrome-512x512.webp',
        sizes: '512x512',
        rel: 'icon',
      },
      { url: '/images/favicon/favicon.ico', rel: 'shortcut icon' },
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: options.title!,
      description: options.description!,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title!,
      description: options.description!,
      images: [ogImage],
    },
  };
};
