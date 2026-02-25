import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import About from '@/app/[locale]/about/page';

jest.mock(
  '@/components/RadarChart',
  () => require('@/__tests__/__mocks__/components/RadarChart').default,
);
jest.mock(
  '@/components/TypeformPopup',
  () => require('@/__tests__/__mocks__/components/TypeformPopup').default,
);

describe('About page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<About />)).not.toThrow();
  });

  it('renders hero section with translated title', () => {
    const { container } = renderWithIntl(<About />);

    expect(container.textContent).toMatch(/customerexperience.*technology/i);
  });

  it('renders hero description (Steve Jobs quote)', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByText(/- Steve Jobs, Co-Founder of Apple/i),
    ).toBeInTheDocument();
  });

  it('renders About me section', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByRole('heading', { name: /about me/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders about me description text', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByText(/I love this quote by Steve Jobs/i),
    ).toBeInTheDocument();
  });

  it('renders Skills section title', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByRole('heading', { name: /^skills$/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders contact section with schedule title', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByRole('heading', { name: /schedule a meeting/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('has CV download link with correct href', () => {
    renderWithIntl(<About />);
    const cvLink = document.querySelector('a[href="/docs/cv.pdf"]');
    expect(cvLink).toBeInTheDocument();
    expect(cvLink).toHaveAttribute('href', '/docs/cv.pdf');
  });

  it('has LinkedIn link with correct href', () => {
    const { container } = renderWithIntl(<About />);
    const linkedInLink = Array.from(container.querySelectorAll('a')).find((a) =>
      a.getAttribute('href')?.includes('linkedin.com'),
    );
    expect(linkedInLink).toBeTruthy();
    expect(linkedInLink?.getAttribute('href')).toContain('linkedin.com');
  });

  it('renders TrustedCompanies section', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByRole('heading', { name: /trusted by companies/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders radar chart placeholders (mocked)', () => {
    renderWithIntl(<About />);
    const charts = screen.getAllByTestId('radar-chart-mock');
    expect(charts).toHaveLength(2);
  });

  it('renders contact CTA button (Typeform popup)', () => {
    renderWithIntl(<About />);
    expect(screen.getByTestId('typeform-popup-button')).toBeInTheDocument();
  });
});
