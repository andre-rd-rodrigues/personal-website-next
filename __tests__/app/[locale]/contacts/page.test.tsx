import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Contacts from '@/app/[locale]/contacts/page';
import CONTACTS from '@/constants/contacts.constants';

jest.mock(
  '@/components/TypeformPopup',
  () => require('@/__tests__/__mocks__/components/TypeformPopup').default,
);

describe('Contacts page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Contacts />)).not.toThrow();
  });

  it('renders the page title from translations', () => {
    renderWithIntl(<Contacts />);
    expect(
      screen.getByRole('heading', { name: 'Get in touch!', level: 1 }),
    ).toBeInTheDocument();
  });

  it('renders the email section with label and mailto link', () => {
    renderWithIntl(<Contacts />);
    expect(screen.getByText("let's chat")).toBeInTheDocument();
    const emailLink = screen.getByRole('link', { name: CONTACTS.EMAIL });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${CONTACTS.EMAIL}`);
    expect(emailLink).toHaveAttribute('target', '_blank');
    expect(emailLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders the social section with links to Linktree, Instagram, and LinkedIn', () => {
    renderWithIntl(<Contacts />);
    expect(screen.getByText('social network')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    const linktreeLink = links.find(
      (l) => l.getAttribute('href') === CONTACTS.LINKTREE,
    );
    const instagramLink = links.find(
      (l) => l.getAttribute('href') === CONTACTS.INSTAGRAM,
    );
    const linkedinLink = links.find(
      (l) => l.getAttribute('href') === CONTACTS.LINKEDIN,
    );

    expect(linktreeLink).toBeDefined();
    expect(linktreeLink).toHaveAttribute('href', CONTACTS.LINKTREE);
    expect(instagramLink).toBeDefined();
    expect(instagramLink).toHaveAttribute('href', CONTACTS.INSTAGRAM);
    expect(linkedinLink).toBeDefined();
    expect(linkedinLink).toHaveAttribute('href', CONTACTS.LINKEDIN);
  });

  it('renders the reach out section with Typeform popup button', () => {
    renderWithIntl(<Contacts />);
    expect(screen.getByText('reach out')).toBeInTheDocument();
    expect(screen.getByTestId('typeform-popup-button')).toBeInTheDocument();
  });
});
