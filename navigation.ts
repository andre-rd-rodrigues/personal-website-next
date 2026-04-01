import { createNavigation } from 'next-intl/navigation';
import { routing } from './i18n/routing';

export const locales = routing.locales;
export const localePrefix = routing.localePrefix;
export const pathnames = routing.pathnames;

export const { Link, usePathname, useRouter, redirect, getPathname } =
  createNavigation(routing);
