import type { Post } from '@/types/blog';

export type ArticleFaq = {
  question: string;
  answerHtml: string;
};

const FAQ_SECTION_TITLES = [
  'frequently asked questions',
  'perguntas frequentes',
];

export function getLatestPosts(posts: Post[], limit = 3) {
  return posts
    .toSorted(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    )
    .slice(0, limit);
}

function isFaqQuestion(element: Element) {
  if (element.tagName === 'H3') return true;
  if (element.tagName !== 'P') return false;

  const elementChildren = Array.from(element.children);
  return (
    elementChildren.length === 1 &&
    elementChildren[0].tagName === 'STRONG' &&
    element.textContent?.trim() === elementChildren[0].textContent?.trim()
  );
}

export function extractArticleFaqs(htmlContent?: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent || '', 'text/html');
  const faqHeading = Array.from(doc.querySelectorAll('h2')).find((heading) =>
    FAQ_SECTION_TITLES.includes(
      heading.textContent?.trim().toLowerCase() ?? '',
    ),
  );

  if (!faqHeading) {
    return { html: doc.body.innerHTML, faqs: [] };
  }

  const sectionElements: Element[] = [];
  let element = faqHeading.nextElementSibling;

  while (element && !['H2', 'HR'].includes(element.tagName)) {
    sectionElements.push(element);
    element = element.nextElementSibling;
  }

  const faqs: ArticleFaq[] = [];
  let question = '';
  let answerElements: Element[] = [];

  const addFaq = () => {
    if (!question || answerElements.length === 0) return;

    faqs.push({
      question,
      answerHtml: answerElements.map((answer) => answer.outerHTML).join(''),
    });
  };

  sectionElements.forEach((sectionElement) => {
    if (isFaqQuestion(sectionElement)) {
      addFaq();
      question = sectionElement.textContent?.trim() ?? '';
      answerElements = [];
      return;
    }

    if (question) answerElements.push(sectionElement);
  });
  addFaq();

  if (faqs.length === 0) {
    return { html: doc.body.innerHTML, faqs };
  }

  sectionElements.forEach((sectionElement) => sectionElement.remove());
  const faqPlaceholder = doc.createElement('div');
  faqPlaceholder.setAttribute('data-blog-faqs', '');
  faqHeading.insertAdjacentElement('afterend', faqPlaceholder);

  return { html: doc.body.innerHTML, faqs };
}

export function injectHeaderIds(htmlContent?: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent || '', 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6'); // Adjust as needed for your content

  headings.forEach((heading, index) => {
    // Create an ID from the heading text
    const id =
      heading
        .textContent!.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${index}`;
    heading.id = id; // Set the ID
  });

  return {
    html: doc.body.innerHTML,
    headings: extractHeadings(doc.body.innerHTML),
  };
}

function extractHeadings(htmlContent: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3');
  return Array.from(headings).map((h) => ({
    text: h.textContent,
    id: h.id,
    level: parseInt(h.tagName.substring(1), 10),
  }));
}
