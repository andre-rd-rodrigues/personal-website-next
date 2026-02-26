import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Pricing from '@/app/[locale]/pricing/page';

jest.mock('@/components/Faqs', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'faqs-section' }),
}));

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
    expect(screen.getAllByText('800 €').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1,400 €').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2,100 €').length).toBeGreaterThan(0);
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

  it('renders CTA buttons', () => {
    renderWithIntl(<Pricing />);
    const getStarted = screen.getAllByRole('button', { name: 'Get started' });
    expect(getStarted.length).toBeGreaterThan(0);
    const select = screen.getAllByRole('button', { name: 'Select' });
    expect(select.length).toBeGreaterThan(0);
    const sendMessage = screen.getAllByRole('button', { name: 'Send message' });
    expect(sendMessage.length).toBeGreaterThan(0);
  });

  it('renders Faqs section', () => {
    renderWithIntl(<Pricing />);
    expect(screen.getByTestId('faqs-section')).toBeInTheDocument();
  });
});
