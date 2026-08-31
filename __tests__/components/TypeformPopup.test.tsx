import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import TypeformPopup from '@/components/TypeformPopup';
import { BUDGET_TYPEFORM_ID, TYPEFORM_ID } from '@/constants/common.constants';

jest.mock('@typeform/embed-react', () => ({
  PopupButton: ({ id, children }: { id: string; children: React.ReactNode }) =>
    React.createElement('button', { 'data-form-id': id }, children),
}));

describe('TypeformPopup', () => {
  it('maps quote intent to the budget form', () => {
    renderWithIntl(<TypeformPopup.Button intent="quote" />);

    expect(
      screen.getByRole('button', { name: 'Request a quote' }),
    ).toHaveAttribute('data-form-id', BUDGET_TYPEFORM_ID);
  });

  it('maps consultation intent to the consultation form', () => {
    renderWithIntl(<TypeformPopup.Button intent="consultation" />);

    expect(
      screen.getByRole('button', { name: 'Book a free consultation' }),
    ).toHaveAttribute('data-form-id', TYPEFORM_ID);
  });

  it('maps message intent to the contact form in the minimal variant', () => {
    renderWithIntl(<TypeformPopup.Minimal intent="message" />);

    expect(
      screen.getByRole('button', { name: 'Send message' }),
    ).toHaveAttribute('data-form-id', TYPEFORM_ID);
  });
});
