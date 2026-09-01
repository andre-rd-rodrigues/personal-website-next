import { extractArticleFaqs, injectHeaderIds } from '@/utils/post.utils';

describe('injectHeaderIds', () => {
  it('returns html and empty headings for empty input', () => {
    const result = injectHeaderIds('');
    expect(result).toHaveProperty('html');
    expect(result).toHaveProperty('headings');
    expect(Array.isArray(result.headings)).toBe(true);
    expect(result.headings).toHaveLength(0);
  });

  it('returns html and empty headings for undefined input', () => {
    const result = injectHeaderIds(undefined);
    expect(result.headings).toHaveLength(0);
  });

  it('injects ids into h1-h6 and returns headings for h1, h2, h3', () => {
    const html = '<h1>Hello World</h1><h2>Section One</h2>';
    const result = injectHeaderIds(html);
    expect(result.headings).toHaveLength(2);
    expect(result.headings[0]).toEqual({
      text: 'Hello World',
      id: 'hello-world-0',
      level: 1,
    });
    expect(result.headings[1]).toEqual({
      text: 'Section One',
      id: 'section-one-1',
      level: 2,
    });
    expect(result.html).toContain('id="hello-world-0"');
    expect(result.html).toContain('id="section-one-1"');
  });

  it('normalizes heading text to lowercase id and replaces non-alphanumeric with hyphen', () => {
    const html = "<h1>What's Next?</h1>";
    const result = injectHeaderIds(html);
    expect(result.headings[0].id).toBe('what-s-next-0');
    expect(result.html).toContain('id="what-s-next-0"');
  });

  it('strips leading and trailing hyphens from id segment', () => {
    const html = '<h1>---Hi---</h1>';
    const result = injectHeaderIds(html);
    expect(result.headings[0].id).toBe('hi-0');
  });

  it('only includes h1, h2, h3 in headings array (not h4, h5, h6)', () => {
    const html = '<h1>A</h1><h4>B</h4><h2>C</h2>';
    const result = injectHeaderIds(html);
    expect(result.headings).toHaveLength(2);
    expect(result.headings[0].text).toBe('A');
    expect(result.headings[1].text).toBe('C');
    expect(result.html).toContain('id="a-0"');
    expect(result.html).toContain('id="c-2"');
  });
});

describe('extractArticleFaqs', () => {
  it('extracts heading-based questions and preserves content after the section', () => {
    const html =
      '<p>Intro</p><h2>Frequently Asked Questions</h2>' +
      '<h3>First question?</h3><p>First answer.</p>' +
      '<h3>Second question?</h3><p>Second answer.</p>' +
      '<hr><p>Closing call to action.</p>';

    const result = extractArticleFaqs(html);

    expect(result.faqs).toEqual([
      {
        question: 'First question?',
        answerHtml: '<p>First answer.</p>',
      },
      {
        question: 'Second question?',
        answerHtml: '<p>Second answer.</p>',
      },
    ]);
    expect(result.html).toContain('data-blog-faqs');
    expect(result.html).not.toContain('<h3>');
    expect(result.html).toContain('Closing call to action.');
  });

  it('extracts bold paragraph questions in Portuguese articles', () => {
    const html =
      '<h2>Perguntas Frequentes</h2>' +
      '<p><strong>Quanto custa?</strong></p><p>Depende do projeto.</p>';

    const result = extractArticleFaqs(html);

    expect(result.faqs).toEqual([
      {
        question: 'Quanto custa?',
        answerHtml: '<p>Depende do projeto.</p>',
      },
    ]);
  });

  it('leaves regular article content unchanged when there is no FAQ section', () => {
    const html = '<h2>Regular section</h2><p>Article copy.</p>';

    expect(extractArticleFaqs(html)).toEqual({ html, faqs: [] });
  });
});
