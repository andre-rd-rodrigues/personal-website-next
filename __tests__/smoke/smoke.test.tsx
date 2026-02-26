import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';

jest.mock(
  '@/components/Testimonials',
  () => require('@/__tests__/__mocks__/components/Testimonials').default,
);
jest.mock(
  '@/components/LanguageSelector',
  () => require('@/__tests__/__mocks__/components/LanguageSelector').default,
);
import Button from '@/components/Button';
import Container from '@/components/Container';
import HeroSection from '@/components/Hero';
import Navbar from '@/components/Navbar/Navbar';
import SectionTitle from '@/components/SectionTitle';
import Testimonials from '@/components/Testimonials';

describe('Smoke: core components (no i18n)', () => {
  it('Container renders without throwing', () => {
    expect(() =>
      renderWithIntl(
        <Container>
          <span>Content</span>
        </Container>,
      ),
    ).not.toThrow();
  });
});

describe('Smoke: framer-motion', () => {
  it('Button.Minimal renders without throwing', () => {
    renderWithIntl(<Button.Minimal label="Click" />);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('Button.Text renders without throwing', () => {
    renderWithIntl(<Button.Text label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('SectionTitle renders without throwing', () => {
    renderWithIntl(<SectionTitle title="Section" />);
    expect(screen.getByText('Section')).toBeInTheDocument();
  });

  it('HeroSection.Text renders without throwing', () => {
    const { container } = renderWithIntl(
      <HeroSection.Text title="Hero Title" />,
    );
    expect(container.textContent).toMatch(/Hero\s*Title/);
  });
});

describe('Smoke: next-intl + app shell', () => {
  it('Navbar renders without throwing', () => {
    renderWithIntl(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('Smoke: Swiper (mocked – manually verify after swiper upgrades)', () => {
  it('Testimonials slot renders without throwing', () => {
    renderWithIntl(<Testimonials />);
    expect(screen.getByTestId('testimonials-mock')).toBeInTheDocument();
  });
});
