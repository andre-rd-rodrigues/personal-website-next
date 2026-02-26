import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import { mockUseFetch } from '@/__tests__/__mocks__/useFetch.mock';
import { mockBack } from '@/__tests__/__mocks__/navigation.mock';
import BlogPostClient from '@/app/[locale]/blog/[slug]/BlogPostClient';

jest.mock('@/hooks/useFetch', () =>
  require('@/__tests__/__mocks__/useFetch.mock').mockUseFetchModule(),
);
jest.mock('@/navigation', () =>
  require('@/__tests__/__mocks__/navigation.mock').mockNavigationModule(),
);

const postWithContent = {
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

describe('Blog post page', () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
    mockBack.mockClear();
  });

  it('renders without throwing', () => {
    mockUseFetch.mockReturnValue({
      data: { posts: [postWithContent] },
      loading: false,
      error: null,
    });
    expect(() =>
      renderWithIntl(<BlogPostClient slug="test-post" />),
    ).not.toThrow();
  });

  it('shows loading state when useFetch is loading', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    renderWithIntl(<BlogPostClient slug="test-post" />);
    expect(screen.getByText('Loading article...')).toBeInTheDocument();
  });

  it('shows error when useFetch returns error', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed'),
    });
    renderWithIntl(<BlogPostClient slug="test-post" />);
    expect(
      screen.getByRole('heading', { name: /something went wrong/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders post title and content when data is returned', async () => {
    mockUseFetch.mockReturnValue({
      data: { posts: [postWithContent] },
      loading: false,
      error: null,
    });
    renderWithIntl(<BlogPostClient slug="test-post" />);
    await screen.findByRole('heading', { name: 'Test Post Title', level: 1 });
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });
});
