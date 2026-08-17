import sitemap from '@/app/sitemap';
import { getAllPostsMeta } from '@/lib/blog.meta';
import { locales } from '@/navigation';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const host = 'https://www.andrerodrigo.com';

/** Number of statically configured routes in `routing.pathnames`. */
const STATIC_PATHNAME_COUNT = 9;

type SitemapEntries = Awaited<ReturnType<typeof sitemap>>;

const isBlogPost = (url: string) => /\/blog\/[^/]+$/.test(url);

describe('sitemap', () => {
  let entries: SitemapEntries;

  beforeAll(async () => {
    entries = await sitemap();
  });

  it('returns an array of sitemap entries', () => {
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it('each entry has url, lastModified and alternates.languages', () => {
    for (const entry of entries) {
      expect(entry).toHaveProperty('url');
      expect(typeof entry.url).toBe('string');
      expect(entry).toHaveProperty('lastModified');
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry).toHaveProperty('alternates');
      expect(entry.alternates).toHaveProperty('languages');
      expect(typeof entry.alternates?.languages).toBe('object');
    }
  });

  it('all URLs use the configured host and include locale', () => {
    for (const entry of entries) {
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

  it('static routes expose an alternate for every locale', () => {
    const staticEntries = entries.filter((e) => !isBlogPost(e.url));
    expect(staticEntries.length).toBe(STATIC_PATHNAME_COUNT * locales.length);

    for (const entry of staticEntries) {
      const languages = entry.alternates?.languages;
      expect(languages).toBeDefined();
      if (!languages) continue;
      for (const locale of locales) {
        expect(languages).toHaveProperty(locale);
        expect(languages[locale]).toMatch(
          new RegExp(`^${escapeRegExp(host)}/${locale}`),
        );
      }
    }
  });

  it('blog posts only advertise alternates for locales that publish them', () => {
    const blogEntries = entries.filter((e) => isBlogPost(e.url));
    expect(blogEntries.length).toBeGreaterThan(0);

    for (const entry of blogEntries) {
      const pairs = Object.entries(entry.alternates?.languages ?? {});
      expect(pairs.length).toBeGreaterThan(0);
      for (const [locale, url] of pairs) {
        expect(locales).toContain(locale);
        expect(url).toMatch(
          new RegExp(`^${escapeRegExp(host)}/${locale}/blog/`),
        );
      }
    }
  });

  it('includes homepage URLs for both locales', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${host}/en`);
    expect(urls).toContain(`${host}/pt`);
  });

  it('includes localized paths (e.g. /about and /sobre for pt)', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${host}/en/about`);
    expect(urls).toContain(`${host}/pt/sobre`);
    expect(urls).toContain(`${host}/en/contacts`);
    expect(urls).toContain(`${host}/pt/contactos`);
  });

  it('includes every blog post for each locale', async () => {
    const urls = entries.map((e) => e.url);

    for (const locale of locales) {
      const posts = await getAllPostsMeta(locale);
      expect(posts.length).toBeGreaterThan(0);
      for (const post of posts) {
        expect(urls).toContain(`${host}/${locale}/blog/${post.slug}`);
      }
    }
  });

  it('blog entries use the post published date as lastModified', async () => {
    const [post] = await getAllPostsMeta('en');
    const entry = entries.find((e) => e.url === `${host}/en/blog/${post.slug}`);

    expect(entry?.lastModified).toEqual(new Date(post.publishedDate));
  });

  it('entry count equals static routes × locales plus every blog post', async () => {
    const postCounts = await Promise.all(
      locales.map(async (locale) => (await getAllPostsMeta(locale)).length),
    );
    const blogCount = postCounts.reduce((total, count) => total + count, 0);

    expect(entries.length).toBe(
      STATIC_PATHNAME_COUNT * locales.length + blogCount,
    );
  });
});
