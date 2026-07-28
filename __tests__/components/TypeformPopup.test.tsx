import React from 'react';
import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import TypeformPopup from '@/components/TypeformPopup';
import { BUDGET_TYPEFORM_ID } from '@/constants/common.constants';

describe('TypeformPopup', () => {
  it('renders the budget CTA without throwing (Button variant)', () => {
    expect(() =>
      renderWithIntl(
        <TypeformPopup.Button id={BUDGET_TYPEFORM_ID} label="request_quote" />,
      ),
    ).not.toThrow();
    expect(screen.getByText('Request a quote')).toBeInTheDocument();
  });

  it('renders the budget CTA without throwing (Minimal variant)', () => {
    expect(() =>
      renderWithIntl(
        <TypeformPopup.Minimal id={BUDGET_TYPEFORM_ID} label="request_quote" />,
      ),
    ).not.toThrow();
    expect(screen.getByText('Request a quote')).toBeInTheDocument();
  });

  it('renders with default form id when no id is provided', () => {
    expect(() =>
      renderWithIntl(<TypeformPopup.Button label="schedule" />),
    ).not.toThrow();
    expect(screen.getByText('Schedule a call')).toBeInTheDocument();
  });
});
