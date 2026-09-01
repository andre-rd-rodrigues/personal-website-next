import React from 'react';
import {
  renderWithIntl,
  screen,
  fireEvent,
} from '@/__tests__/utils/test.utils';
import BlogListClient from '@/app/[locale]/blog/BlogListClient';
import type { Post } from '@/types/blog';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Top Pick Post',
    slug: 'top-pick',
    category: 'Technology',
    publishedDate: '2024-01-01',
    description: 'Summary of the top pick',
    isTopPick: true,
    content: { html: '<p>Content</p>' },
    coverPhoto: { url: 'https://example.com/cover.jpg' },
  },
  {
    id: '2',
    title: 'Regular Tech Post',
    slug: 'regular-tech',
    category: 'Technology',
    publishedDate: '2024-01-02',
    description: 'A tech article',
    isTopPick: false,
    content: { html: '<p>Body</p>' },
    coverPhoto: { url: 'https://example.com/2.jpg' },
  },
  {
    id: '3',
    title: 'Career Advice',
    slug: 'career-advice',
    category: 'Career',
    publishedDate: '2024-01-03',
    description: 'Career tips for developers',
    isTopPick: false,
    content: { html: '<p>Career</p>' },
    coverPhoto: { url: 'https://example.com/3.jpg' },
  },
  {
    id: '4',
    title: 'SEO Strategies',
    slug: 'seo-strategies',
    category: 'SEO',
    publishedDate: '2024-01-04',
    description: 'Improve your search rankings',
    isTopPick: false,
    content: { html: '<p>SEO</p>' },
    coverPhoto: { url: 'https://example.com/4.jpg' },
  },
];

describe('Blog list (BlogListClient)', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<BlogListClient posts={[]} />)).not.toThrow();
  });

  it('renders main article and regular posts when posts are passed', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    expect(screen.getByText('Top Pick Post')).toBeInTheDocument();
    expect(screen.getByText('Regular Tech Post')).toBeInTheDocument();
    expect(screen.getByText('Career Advice')).toBeInTheDocument();
    expect(screen.getByText('SEO Strategies')).toBeInTheDocument();
  });

  it('links the full featured and regular cards to their articles', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);

    expect(screen.getByRole('link', { name: /Top Pick Post/ })).toHaveAttribute(
      'href',
      '/en/blog/top-pick',
    );
    expect(
      screen.getByRole('link', { name: /Regular Tech Post/ }),
    ).toHaveAttribute('href', '/en/blog/regular-tech');
  });

  it('renders category filter pills', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Career' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SEO' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Technology' }),
    ).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    expect(
      screen.getByPlaceholderText('Search articles...'),
    ).toBeInTheDocument();
  });

  it('filters posts by category', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    fireEvent.click(screen.getByRole('button', { name: 'Career' }));

    expect(screen.getByText('Career Advice')).toBeInTheDocument();
    // Top pick stays visible regardless of filter
    expect(screen.getByText('Top Pick Post')).toBeInTheDocument();
    // Active pill should have the active class
    expect(screen.getByRole('button', { name: 'Career' }).className).toContain(
      'border-pink',
    );
  });

  it('filters posts by search query', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText('Search articles...');
    fireEvent.change(searchInput, { target: { value: 'rankings' } });

    expect(screen.getByText('SEO Strategies')).toBeInTheDocument();
  });

  it('shows no results message when no posts match', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText('Search articles...');
    fireEvent.change(searchInput, { target: { value: 'xyznonexistent' } });

    expect(screen.getByText('No articles found.')).toBeInTheDocument();
  });

  it('resets filter when All is clicked after filtering', () => {
    renderWithIntl(<BlogListClient posts={mockPosts} />);
    fireEvent.click(screen.getByRole('button', { name: 'Career' }));

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Regular Tech Post')).toBeInTheDocument();
    expect(screen.getByText('Career Advice')).toBeInTheDocument();
    expect(screen.getByText('SEO Strategies')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' }).className).toContain(
      'border-pink',
    );
  });
});
