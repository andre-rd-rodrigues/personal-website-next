import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Pricing from '@/app/[locale]/pricing/page';
import { BUDGET_TYPEFORM_ID } from '@/constants/common.constants';

jest.mock('@/components/Faqs', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'faqs-section' }),
}));
jest.mock(
  '@/components/TypeformPopup',
  () => require('@/__tests__/__mocks__/components/TypeformPopup').default,
);

describe('Pricing page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Pricing />)).not.toThrow();
  });

  it('renders packs section title and description', () => {
    renderWithIntl(<Pricing />);
    expect(
      screen.getByRole('heading', { name: 'Packages', level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Choose a package that grows with your business/),
    ).toBeInTheDocument();
  });

  it('renders all four pack titles', () => {
    renderWithIntl(<Pricing />);
    expect(screen.getAllByText('Online Presence').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Professional').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Premium').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Enterprise').length).toBeGreaterThan(0);
  });

  it('renders pack prices and descriptions', () => {
    renderWithIntl(<Pricing />);
    expect(screen.getAllByText('504 €').length).toBeGreaterThan(0);
    expect(screen.getAllByText('882 €').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1323 €').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Custom quote').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Perfect for small businesses and personal websites.')
        .length,
    ).toBeGreaterThan(0);
  });

  it('renders maintenance section', () => {
    renderWithIntl(<Pricing />);
    expect(
      screen.getByRole('heading', { name: 'Monthly Fee', level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ensure your website stays updated, available, and secure/,
      ),
    ).toBeInTheDocument();
  });

  it('renders maintenance plan cards', () => {
    renderWithIntl(<Pricing />);
    expect(screen.getByText('Essential')).toBeInTheDocument();
    expect(screen.getByText('Essential Plus')).toBeInTheDocument();
    expect(screen.getByText('Independent')).toBeInTheDocument();
  });

  it('renders budget Typeform CTAs wired to the budget form', () => {
    renderWithIntl(<Pricing />);
    const budgetCtas = screen.getAllByTestId('typeform-popup-button');
    // 4 desktop tier buttons + 4 mobile card buttons (+ the Development Stages CTA)
    expect(budgetCtas.length).toBeGreaterThanOrEqual(8);
    budgetCtas.forEach((cta) => {
      expect(cta).toHaveAttribute('data-form-id', BUDGET_TYPEFORM_ID);
    });
  });

  it('renders Faqs section', () => {
    renderWithIntl(<Pricing />);
    expect(screen.getByTestId('faqs-section')).toBeInTheDocument();
  });
});
