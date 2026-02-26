import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import { mockUseFetch } from '@/__tests__/__mocks__/useFetch.mock';
import Blog from '@/app/[locale]/blog/page';

jest.mock('@/hooks/useFetch', () =>
  require('@/__tests__/__mocks__/useFetch.mock').mockUseFetchModule(),
);

describe('Blog list page', () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it('renders without throwing', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
    expect(() => renderWithIntl(<Blog />)).not.toThrow();
  });

  it('shows loading state when useFetch is loading', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    renderWithIntl(<Blog />);
    expect(screen.getByText('Loading articles...')).toBeInTheDocument();
  });

  it('shows error state when useFetch returns error', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed'),
    });
    renderWithIntl(<Blog />);
    expect(
      screen.getByRole('heading', { name: /something went wrong/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders main article and regular posts when data is returned', () => {
    mockUseFetch.mockReturnValue({
      data: {
        posts: [
          {
            id: '1',
            title: 'Top Pick Post',
            slug: 'top-pick',
            category: 'Tech',
            publishedDate: '2024-01-01',
            description: 'Summary',
            isTopPick: true,
            content: { html: '<p>Content</p>' },
            coverPhoto: { url: 'https://example.com/cover.jpg' },
          },
          {
            id: '2',
            title: 'Regular Post',
            slug: 'regular',
            category: 'Dev',
            publishedDate: '2024-01-02',
            description: 'Another',
            isTopPick: false,
            content: { html: '<p>Body</p>' },
            coverPhoto: { url: 'https://example.com/2.jpg' },
          },
        ],
      },
      loading: false,
      error: null,
    });
    renderWithIntl(<Blog />);
    expect(screen.getByText('Top Pick Post')).toBeInTheDocument();
    expect(screen.getByText('Regular Post')).toBeInTheDocument();
  });
});
