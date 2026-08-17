import { WEBSITE_DOMAIN_URL } from '@/constants/common.constants';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/locale.types';

type PathnameConfig = Record<string, string | Record<string, string>>;

/**
 * Resolve the locale-specific path for a known route (e.g. `/about` -> `/sobre`
 * for `pt`). Unknown routes are returned unchanged, which allows dynamic paths
 * such as `/blog/my-post` to be passed straight through.
 */
export const resolveLocalizedPath = (
  pathname: string,
  locale: Locale,
): string => {
  const config = (routing.pathnames as PathnameConfig)[pathname];

  const localizedPath =
    typeof config === 'string' ? config : (config?.[locale] ?? pathname);

  return localizedPath === '/' ? '' : localizedPath;
};

/**
 * Build the absolute, locale-prefixed URL for a route. Shared by canonical tags
 * and the sitemap so both always advertise identical URLs.
 */
export const buildLocalizedUrl = (pathname: string, locale: Locale): string =>
  `${WEBSITE_DOMAIN_URL}/${locale}${resolveLocalizedPath(pathname, locale)}`;
