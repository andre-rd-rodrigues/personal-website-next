import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import BlogListClient from '@/app/[locale]/blog/BlogListClient';
import type { Post } from '@/types/blog';

const mockPosts: Post[] = [
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
];

describe('Blog list (BlogListClient)', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<BlogListClient posts={[]} />)).not.toThrow();
  });

  it('renders main article and regular posts when posts are passed', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    expect(screen.getByText('Top Pick Post')).toBeInTheDocument();
    expect(screen.getByText('Regular Post')).toBeInTheDocument();
  });

  it('renders only regular posts when no isTopPick', () => {
    const noTopPick = mockPosts.map((p) => ({ ...p, isTopPick: false }));
    renderWithIntl(<BlogListClient posts={noTopPick} />);
    expect(screen.getByText('Top Pick Post')).toBeInTheDocument();
    expect(screen.getByText('Regular Post')).toBeInTheDocument();
  });
});
