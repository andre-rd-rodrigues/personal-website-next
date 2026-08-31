import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Portfolio from '@/app/[locale]/portfolio/page';
import { TYPEFORM_ID } from '@/constants/common.constants';

jest.mock('@/components/Testimonials', () => ({
  __esModule: true,
  default: () =>
    React.createElement('div', {
      className: 'swiper',
      'data-testid': 'testimonials-mock',
    }),
}));
jest.mock(
  '@/components/TypeformPopup',
  () => require('@/__tests__/__mocks__/components/TypeformPopup').default,
);

describe('Portfolio page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Portfolio />)).not.toThrow();
  });

  it('renders portfolio title', () => {
    renderWithIntl(<Portfolio />);
    expect(
      screen.getByRole('heading', { name: /^portfolio$/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it('renders category cards for Web and Mobile', () => {
    renderWithIntl(<Portfolio />);
    expect(
      screen.getByRole('heading', { name: /^web$/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /^mobile$/i, level: 3 }),
    ).toBeInTheDocument();
  });

  it('has Explore links to portfolio subpages', () => {
    renderWithIntl(<Portfolio />);
    const exploreLinks = screen.getAllByRole('link', { name: /explore/i });
    expect(exploreLinks).toHaveLength(2);
    const hrefs = exploreLinks.map((link) => link.getAttribute('href') ?? '');
    expect(hrefs.some((h) => h.includes('portfolio/web'))).toBe(true);
    expect(hrefs.some((h) => h.includes('portfolio/mobile'))).toBe(true);
  });

  it('renders hero section with translated title', () => {
    const { container } = renderWithIntl(<Portfolio />);
    expect(container.textContent).toMatch(
      /digitalsolutionsshapedaroundyourbusinessgoals/i,
    );
  });

  it('renders hero section description', () => {
    renderWithIntl(<Portfolio />);
    expect(
      screen.getByText(/every project starts by understanding the problem/i),
    ).toBeInTheDocument();
  });

  it('renders Testimonials section', () => {
    renderWithIntl(<Portfolio />);
    expect(screen.getByTestId('testimonials-mock')).toBeInTheDocument();
  });

  it('renders testimonials section title', () => {
    renderWithIntl(<Portfolio />);
    const headings = screen.getAllByRole('heading');
    expect(
      headings.some((h) => /testimonials/i.test(h.textContent ?? '')),
    ).toBe(true);
  });

  it('routes the contact CTA to the consultation form', () => {
    const { container } = renderWithIntl(<Portfolio />);
    expect(container.textContent).toMatch(
      /bookafreeconsultationandwe’lldefinethenextstepstogether/i,
    );
    expect(screen.getByTestId('typeform-popup-button')).toHaveAttribute(
      'data-form-id',
      TYPEFORM_ID,
    );
  });
});
