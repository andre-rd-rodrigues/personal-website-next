import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from "next-intl/navigation";

export const locales = ["en", "pt"] as const;
export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/blog": "/blog",

  // If locales use different paths, you can
  // specify each external path per locale.
  "/about": {
    en: "/about",
    pt: "/sobre"
  },
  "/portfolio": {
    en: "/portfolio",
    pt: "/portfolio"
  },
  "/portfolio/websites": {
    en: "/portfolio/websites",
    pt: "/portfolio/websites"
  },
  "/portfolio/apps": {
    en: "/portfolio/apps",
    pt: "/portfolio/apps"
  },
  "/contacts": {
    en: "/contacts",
    pt: "/contactos"
  },
  "/skills": {
    en: "/skills",
    pt: "/proficiência"
  }
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
