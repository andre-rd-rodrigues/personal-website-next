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

describe('Skills section (About page)', () => {
  it('renders technical expertise heading', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByRole('heading', { name: /technical expertise/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders skills description', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByText(/frontend and backend development, infrastructure/i),
    ).toBeInTheDocument();
  });

  it('renders both radar charts', () => {
    renderWithIntl(<About />);
    const charts = screen.getAllByTestId('radar-chart-mock');
    expect(charts).toHaveLength(2);
  });
});
