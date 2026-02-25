import sitemap from '@/app/sitemap';
import { locales } from '@/navigation';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const host = 'https://www.andrerodrigo.com';

describe('sitemap', () => {
  it('returns an array of sitemap entries', () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('each entry has url, lastModified and alternates.languages', () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry).toHaveProperty('url');
      expect(typeof entry.url).toBe('string');
      expect(entry).toHaveProperty('lastModified');
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry).toHaveProperty('alternates');
      expect(entry.alternates).toHaveProperty('languages');
      expect(typeof entry.alternates.languages).toBe('object');
    }
  });

  it('all URLs use the configured host and include locale', () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry.url.startsWith(host)).toBe(true);
      const withoutHost = entry.url.slice(host.length);
      const hasLocale =
        withoutHost === '/en' ||
        withoutHost.startsWith('/en/') ||
        withoutHost === '/pt' ||
        withoutHost.startsWith('/pt/');
      expect(hasLocale).toBe(true);
    }
  });

  it('alternates.languages has an entry for each locale', () => {
    const result = sitemap();
    for (const entry of result) {
      for (const locale of locales) {
        expect(entry.alternates.languages).toHaveProperty(locale);
        expect(entry.alternates.languages[locale]).toMatch(
          new RegExp(`^${escapeRegExp(host)}/${locale}`),
        );
      }
    }
  });

  it('includes homepage URLs for both locales', () => {
    const result = sitemap();
    const urls = result.map((e) => e.url);
    expect(urls).toContain(`${host}/en`);
    expect(urls).toContain(`${host}/pt`);
  });

  it('includes localized paths (e.g. /about and /sobre for pt)', () => {
    const result = sitemap();
    const urls = result.map((e) => e.url);
    expect(urls.some((u) => u === `${host}/en/about`)).toBe(true);
    expect(urls.some((u) => u === `${host}/pt/sobre`)).toBe(true);
    expect(urls.some((u) => u === `${host}/en/contacts`)).toBe(true);
    expect(urls.some((u) => u === `${host}/pt/contactos`)).toBe(true);
  });

  it('entry count equals pathnames × locales', () => {
    const result = sitemap();
    const pathnameCount = 9;
    expect(result.length).toBe(pathnameCount * locales.length);
  });
});
