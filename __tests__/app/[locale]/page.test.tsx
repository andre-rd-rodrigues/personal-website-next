import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Home from '@/app/[locale]/page';
import CONTACTS from '@/constants/contacts.constants';

jest.mock(
  '@/components/Testimonials',
  () => require('@/__tests__/__mocks__/components/Testimonials').default,
);
jest.mock(
  '@/components/TypeformPopup',
  () => require('@/__tests__/__mocks__/components/TypeformPopup').default,
);

jest.mock('@/components/ui/compare', () => ({
  Compare: () => React.createElement('div', { 'data-testid': 'compare-mock' }),
}));

describe('Home page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Home />)).not.toThrow();
  });

  it('renders hero with name André Rodrigo', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByRole('heading', { name: /andré rodrigo/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it('renders hero subtitle', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByText(/production of websites, apps and digital presence/i),
    ).toBeInTheDocument();
  });

  it('renders Portfolio CTA link in hero', () => {
    renderWithIntl(<Home />);
    const portfolioLink = screen.getByRole('link', { name: /portfolio/i });
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink.getAttribute('href')).toMatch(/portfolio/);
  });

  it('renders About me section', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByRole('heading', { name: /about me/i }),
    ).toBeInTheDocument();
  });

  it('renders about description', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByText(
        /my name is André Rodrigues and I'm a Software Engineer/i,
      ),
    ).toBeInTheDocument();
  });

  it('has LinkedIn link in about section', () => {
    renderWithIntl(<Home />);
    const links = screen.getAllByRole('link');
    const linkedInLink = links.find(
      (a) => a.getAttribute('href') === CONTACTS.LINKEDIN,
    );
    expect(linkedInLink).toBeDefined();
    expect(linkedInLink).toBeInTheDocument();
  });

  it('has See more link to about page', () => {
    renderWithIntl(<Home />);
    const seeMoreLinks = screen.getAllByRole('link', { name: /see more/i });
    expect(seeMoreLinks.length).toBeGreaterThan(0);
    expect(
      seeMoreLinks.some((l) => l.getAttribute('href')?.includes('about')),
    ).toBe(true);
  });

  it('renders Expertise section', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByRole('heading', { name: /^expertise$/i }),
    ).toBeInTheDocument();
  });

  it('renders expertise cards (Web, Mobile, Design)', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByRole('heading', { name: /^web$/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /^mobile$/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /^design$/i, level: 3 }),
    ).toBeInTheDocument();
  });

  it('renders Skills button linking to about', () => {
    renderWithIntl(<Home />);
    const skillsLink = screen.getByRole('link', { name: /skills/i });
    expect(skillsLink).toBeInTheDocument();
    expect(skillsLink.getAttribute('href')).toMatch(/about/);
  });

  it('renders portfolio section with title', () => {
    const { container } = renderWithIntl(<Home />);
    // portfolio_parallax.title may be split across elements
    expect(container.textContent).toMatch(
      /delivering impactful|solutions to elevate your brand/i,
    );
  });

  it('has See more link to portfolio', () => {
    renderWithIntl(<Home />);
    const portfolioLinks = screen.getAllByRole('link', { name: /see more/i });
    expect(
      portfolioLinks.some((l) => l.getAttribute('href')?.includes('portfolio')),
    ).toBe(true);
  });

  it('renders rebrand hero title', () => {
    renderWithIntl(<Home />);
    const matches = screen.getAllByText(/stand out from the competition/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('renders Testimonials section', () => {
    renderWithIntl(<Home />);
    expect(screen.getByTestId('testimonials-mock')).toBeInTheDocument();
  });

  it('renders contact CTA with Typeform button', () => {
    renderWithIntl(<Home />);
    expect(screen.getByTestId('typeform-popup-button')).toBeInTheDocument();
  });
});
