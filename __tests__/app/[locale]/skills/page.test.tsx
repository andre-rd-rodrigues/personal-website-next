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
  it('renders Skills heading', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByRole('heading', { name: /^skills$/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders skills description', () => {
    renderWithIntl(<About />);
    expect(
      screen.getByText(
        /front-end and back-end development and infrastructure/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders both radar charts', () => {
    renderWithIntl(<About />);
    const charts = screen.getAllByTestId('radar-chart-mock');
    expect(charts).toHaveLength(2);
  });
});
