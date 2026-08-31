import React from 'react';
import {
  act,
  fireEvent,
  renderWithIntl,
  screen,
} from '@/__tests__/utils/test.utils';

jest.mock(
  '@/components/Testimonials',
  () => require('@/__tests__/__mocks__/components/Testimonials').default,
);
jest.mock(
  '@/components/LanguageSelector',
  () => require('@/__tests__/__mocks__/components/LanguageSelector').default,
);
jest.mock(
  '@/components/TypeformPopup',
  () => require('@/__tests__/__mocks__/components/TypeformPopup').default,
);
import Button from '@/components/Button';
import Container from '@/components/Container';
import HeroSection from '@/components/Hero';
import Navbar from '@/components/Navbar/Navbar';
import SectionTitle from '@/components/SectionTitle';
import Testimonials from '@/components/Testimonials';
import { TYPEFORM_ID } from '@/constants/common.constants';

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
  it('Navbar renders with consultation CTAs', async () => {
    renderWithIntl(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    await act(async () => {
      await Promise.resolve();
    });

    const desktopCta = screen.getByTestId('typeform-popup-button');
    expect(desktopCta).toHaveAttribute('data-intent', 'consultation');
    expect(desktopCta).toHaveAttribute('data-form-id', TYPEFORM_ID);

    fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

    const consultationCtas = screen
      .getAllByTestId('typeform-popup-button')
      .filter((cta) => cta.getAttribute('data-intent') === 'consultation');
    expect(consultationCtas).toHaveLength(2);
    consultationCtas.forEach((cta) => {
      expect(cta).toHaveAttribute('data-form-id', TYPEFORM_ID);
    });
  });
});

describe('Smoke: Testimonials (mocked)', () => {
  it('Testimonials slot renders without throwing', () => {
    renderWithIntl(<Testimonials />);
    expect(screen.getByTestId('testimonials-mock')).toBeInTheDocument();
  });
});
