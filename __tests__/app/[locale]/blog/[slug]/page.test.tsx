import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import userEvent from '@testing-library/user-event';
import { mockBack } from '@/__tests__/__mocks__/navigation.mock';
import BlogPostClient from '@/app/[locale]/blog/[slug]/BlogPostClient';
import type { Post } from '@/types/blog';

jest.mock('@/navigation', () =>
  require('@/__tests__/__mocks__/navigation.mock').mockNavigationModule(),
);

jest.mock('@/utils/post.utils', () => ({
  ...jest.requireActual('@/utils/post.utils'),
  injectHeaderIds: (html: string) => ({
    html,
    headings: [{ text: 'Hello', id: 'hello-0', level: 2 }],
  }),
}));

const postWithContent: Post = {
  id: '1',
  title: 'Test Post Title',
  slug: 'test-post',
  category: 'Tech',
  publishedDate: '2024-01-01',
  description: 'Summary',
  isTopPick: false,
  content: { html: '<h1>Hello</h1><p>Body text</p>' },
  coverPhoto: { url: 'https://example.com/cover.jpg' },
};

describe('Blog post (BlogPostClient)', () => {
  beforeEach(() => {
    mockBack.mockClear();
    window.scrollTo = jest.fn();
  });

  it('renders without throwing', async () => {
    renderWithIntl(<BlogPostClient post={postWithContent} />);
    expect(
      await screen.findByRole('heading', {
        name: 'Test Post Title',
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it('renders post title and content when post is passed', async () => {
    renderWithIntl(<BlogPostClient post={postWithContent} />);
    await screen.findByRole('heading', { name: 'Test Post Title', level: 1 });
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders article FAQs as dropdowns without a search bar', async () => {
    const user = userEvent.setup();
    const postWithFaqs: Post = {
      ...postWithContent,
      content: {
        html:
          '<h2>Frequently Asked Questions</h2>' +
          '<h3>Does this work?</h3><p>Yes, it does.</p>',
      },
    };

    renderWithIntl(<BlogPostClient post={postWithFaqs} />);

    const faqButton = await screen.findByRole('button', {
      name: 'Does this work?',
    });
    expect(screen.queryByRole('search')).not.toBeInTheDocument();
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(faqButton);
    expect(faqButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Yes, it does.')).toBeInTheDocument();
  });
});
