import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

type Locale = 'en' | 'pt';

type BlogFile = {
  filename: string;
  slug: string;
  coverImage: string;
  isTopPick: boolean;
  content: string;
};

const locales: Locale[] = ['en', 'pt'];

function readBlogFiles(locale: Locale): BlogFile[] {
  const directory = path.join(process.cwd(), 'content', 'blog', locale);

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(directory, filename), 'utf8');
      const { data, content } = matter(raw);

      return {
        filename,
        slug: data.slug,
        coverImage: data.coverImage,
        isTopPick: data.isTopPick ?? false,
        content,
      };
    });
}

describe('blog content integrity', () => {
  const postsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, readBlogFiles(locale)]),
  ) as Record<Locale, BlogFile[]>;

  it('publishes the same slugs in English and Portuguese', () => {
    const englishSlugs = postsByLocale.en.map(({ slug }) => slug).sort();
    const portugueseSlugs = postsByLocale.pt.map(({ slug }) => slug).sort();

    expect(portugueseSlugs).toEqual(englishSlugs);
  });

  it.each(locales)('%s filenames match their frontmatter slugs', (locale) => {
    for (const post of postsByLocale[locale]) {
      expect(post.filename).toBe(`${post.slug}.md`);
    }
  });

  it.each(locales)(
    '%s internal blog links point to published articles',
    (locale) => {
      const publishedSlugs = new Set(
        postsByLocale[locale].map(({ slug }) => slug),
      );

      for (const post of postsByLocale[locale]) {
        const linkedSlugs = Array.from(
          post.content.matchAll(/\]\(\/blog\/([^#?)]+)(?:[#?][^)]*)?\)/g),
          (match) => match[1],
        );

        for (const linkedSlug of linkedSlugs) {
          expect({
            source: post.slug,
            target: linkedSlug,
            exists: publishedSlugs.has(linkedSlug),
          }).toEqual({
            source: post.slug,
            target: linkedSlug,
            exists: true,
          });
        }
      }
    },
  );

  it.each(locales)('%s local cover images exist', (locale) => {
    for (const post of postsByLocale[locale]) {
      if (!post.coverImage.startsWith('/')) continue;

      const coverPath = path.join(
        process.cwd(),
        'public',
        post.coverImage.slice(1),
      );

      expect({
        slug: post.slug,
        coverImage: post.coverImage,
        exists: fs.existsSync(coverPath),
      }).toEqual({
        slug: post.slug,
        coverImage: post.coverImage,
        exists: true,
      });
    }
  });

  it('features the same single article in both locales', () => {
    const featuredByLocale = Object.fromEntries(
      locales.map((locale) => [
        locale,
        postsByLocale[locale]
          .filter(({ isTopPick }) => isTopPick)
          .map(({ slug }) => slug),
      ]),
    ) as Record<Locale, string[]>;

    expect(featuredByLocale.en).toHaveLength(1);
    expect(featuredByLocale.pt).toEqual(featuredByLocale.en);
  });
});
