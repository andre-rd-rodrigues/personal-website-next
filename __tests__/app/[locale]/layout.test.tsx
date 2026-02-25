import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import en from '@/messages/en.json';

// Layout uses getMessages() from next-intl/server (messages from server in real app)
jest.mock('next-intl/server', () => ({
  ...jest.requireActual('next-intl/server'),
  getMessages: () => Promise.resolve(en),
  getTranslations: () => (key: string) => key,
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

const paramsEn = Promise.resolve({ locale: 'en' });
const paramsPt = Promise.resolve({ locale: 'pt' });

function renderLayout(params: Promise<{ locale: string }> = paramsEn) {
  return render(
    <Suspense fallback={<div>Loading...</div>}>
      <RootLayout params={params}>{children}</RootLayout>
    </Suspense>,
  );
}

describe('Root layout', () => {
  const children = <div data-testid="layout-children">Page content</div>;

  it('renders without throwing', () => {
    expect(() => renderLayout()).not.toThrow();
  });

  it('sets html lang from locale', async () => {
    const { container } = renderLayout();
    await screen.findByTestId('layout-children');
    const html = container.querySelector('html');
    expect(html).toBeInTheDocument();
    expect(html).toHaveAttribute('lang', 'en');
  });

  it('sets html lang for pt locale', async () => {
    const { container } = renderLayout(paramsPt);
    await screen.findByTestId('layout-children');
    const html = container.querySelector('html');
    expect(html).toHaveAttribute('lang', 'pt');
  });

  it('renders Navbar', async () => {
    renderLayout();
    expect(await screen.findByRole('navigation')).toBeInTheDocument();
  });

  it('renders children', async () => {
    renderLayout();
    expect(await screen.findByTestId('layout-children')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders Footer', async () => {
    renderLayout();
    await screen.findByTestId('layout-children');
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('applies font class variables to html', async () => {
    const { container } = renderLayout();
    await screen.findByTestId('layout-children');
    const html = container.querySelector('html');
    // Layout uses jost.variable, blacker.variable, moniqa.variable (from @/assets/fonts)
    expect(html?.className).toBeTruthy();
    expect(html?.className?.includes('variable')).toBe(true);
  });
});
