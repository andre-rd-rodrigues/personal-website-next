import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Home from '@/app/[locale]/page';
import { BUDGET_TYPEFORM_ID, TYPEFORM_ID } from '@/constants/common.constants';
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

  it('renders an outcome-led hero with André Rodrigo as supporting identity', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByRole('heading', {
        name: /fast, secure digital solutions built for real growth/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^André Rodrigo$/)).toBeInTheDocument();
  });

  it('renders the hero benefit statement and authority proof', () => {
    renderWithIntl(<Home />);
    expect(
      screen.getByText(/custom websites, apps, and AI automations/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/5\+ years of experience.*15\+ projects/i),
    ).toBeInTheDocument();
  });

  it('renders the projects and results CTA link in hero', () => {
    renderWithIntl(<Home />);
    const portfolioLink = screen.getByRole('link', {
      name: /view projects and results/i,
    });
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
      screen.getByText(/I’m André Rodrigo[\s\S]*Senior Software Engineer/i),
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

  it('renders expertise button linking to about', () => {
    renderWithIntl(<Home />);
    const skillsLink = screen.getByRole('link', {
      name: /see competencies|skills/i,
    });
    expect(skillsLink).toBeInTheDocument();
    expect(skillsLink.getAttribute('href')).toMatch(/about/);
  });

  it('renders portfolio section with title', () => {
    const { container } = renderWithIntl(<Home />);
    // portfolio_parallax.title may be split across elements
    expect(container.textContent).toMatch(
      /digital solutions|built for real challenges/i,
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

  it('routes consultation and quote CTAs to their dedicated forms', () => {
    renderWithIntl(<Home />);
    const ctas = screen.getAllByTestId('typeform-popup-button');
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    const budgetCta = ctas.find(
      (cta) => cta.getAttribute('data-form-id') === BUDGET_TYPEFORM_ID,
    );
    expect(budgetCta).toBeDefined();
    const consultationCta = ctas.find(
      (cta) =>
        cta.getAttribute('data-form-id') === TYPEFORM_ID &&
        cta.getAttribute('data-intent') === 'consultation',
    );
    expect(consultationCta).toBeDefined();
  });
});
