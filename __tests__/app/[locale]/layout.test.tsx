import React from 'react';
import { render, screen } from '@testing-library/react';
import type { AbstractIntlMessages } from 'next-intl';
import en from '@/messages/en.json';

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

import { RootLayoutBody } from '@/app/[locale]/layout';

const layoutChildren = <div data-testid="layout-children">Page content</div>;

function renderLayout(
  locale: string = 'en',
  children: React.ReactNode = layoutChildren,
) {
  return render(
    <RootLayoutBody
      locale={locale}
      messages={en as unknown as AbstractIntlMessages}
    >
      {children}
    </RootLayoutBody>,
  );
}

describe('Root layout', () => {
  it('renders without throwing', () => {
    expect(() => renderLayout()).not.toThrow();
  });

  it('renders with en locale', () => {
    renderLayout('en');
    expect(screen.getByTestId('layout-children')).toBeInTheDocument();
  });

  it('renders with pt locale', () => {
    renderLayout('pt');
    expect(screen.getByTestId('layout-children')).toBeInTheDocument();
  });

  it('renders Navbar', () => {
    renderLayout();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders children', () => {
    renderLayout();
    expect(screen.getByTestId('layout-children')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    renderLayout();
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
