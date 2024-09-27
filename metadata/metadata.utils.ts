import { WEBSITE_DOMAIN_URL } from '@/constants/common.constants';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const getMetadata = (options: Metadata): Metadata => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';

  return {
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
      canonical: `${WEBSITE_DOMAIN_URL}/${pathname}`,
    },
    openGraph: {
      title: options.title!,
      description: options.description!,
      type: 'website',
      images: [
        {
          url: 'https://i.postimg.cc/nM8ThXPW/preview.webp',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};
