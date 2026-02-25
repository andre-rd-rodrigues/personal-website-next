import React from 'react';
import { render, screen } from '@testing-library/react';
import en from '@/messages/en.json';

// Layout uses useMessages() from next-intl (messages from server in real app)
jest.mock('next-intl', () => ({
  ...jest.requireActual('next-intl'),
  useMessages: () => en,
}));

jest.mock(
  '@/components/LanguageSelector',
  () => require('@/__tests__/__mocks__/components/LanguageSelector').default,
);

// External/script components; avoid loading third-party code in tests
jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => null,
}));
jest.mock('@/components/Analytics', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@/components/GlobalBackground', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@/components/PageLoading', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@/components/Cookies', () => ({
  __esModule: true,
  default: () => null,
}));

import RootLayout from '@/app/[locale]/layout';

describe('Root layout', () => {
  const children = <div data-testid="layout-children">Page content</div>;

  it('renders without throwing', () => {
    expect(() =>
      render(<RootLayout params={{ locale: 'en' }}>{children}</RootLayout>),
    ).not.toThrow();
  });

  it('sets html lang from locale', () => {
    const { container } = render(
      <RootLayout params={{ locale: 'en' }}>{children}</RootLayout>,
    );
    const html = container.querySelector('html');
    expect(html).toBeInTheDocument();
    expect(html).toHaveAttribute('lang', 'en');
  });

  it('sets html lang for pt locale', () => {
    const { container } = render(
      <RootLayout params={{ locale: 'pt' }}>{children}</RootLayout>,
    );
    const html = container.querySelector('html');
    expect(html).toHaveAttribute('lang', 'pt');
  });

  it('renders Navbar', () => {
    render(<RootLayout params={{ locale: 'en' }}>{children}</RootLayout>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<RootLayout params={{ locale: 'en' }}>{children}</RootLayout>);
    expect(screen.getByTestId('layout-children')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    render(<RootLayout params={{ locale: 'en' }}>{children}</RootLayout>);
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('applies font class variables to html', () => {
    const { container } = render(
      <RootLayout params={{ locale: 'en' }}>{children}</RootLayout>,
    );
    const html = container.querySelector('html');
    // Layout uses jost.variable, blacker.variable, moniqa.variable (from @/assets/fonts)
    expect(html?.className).toBeTruthy();
    expect(html?.className?.includes('variable')).toBe(true);
  });
});
