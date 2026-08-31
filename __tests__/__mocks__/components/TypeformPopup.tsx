import React from 'react';
import { BUDGET_TYPEFORM_ID, TYPEFORM_ID } from '@/constants/common.constants';

type MockButtonProps = {
  intent: 'consultation' | 'message' | 'quote';
};

const intentConfig = {
  consultation: {
    id: TYPEFORM_ID,
    label: 'Book a free consultation',
  },
  message: {
    id: TYPEFORM_ID,
    label: 'Send message',
  },
  quote: {
    id: BUDGET_TYPEFORM_ID,
    label: 'Request a quote',
  },
} as const;

const MockButton = ({ intent }: MockButtonProps) => {
  const config = intentConfig[intent];

  return React.createElement(
    'button',
    {
      'data-testid': 'typeform-popup-button',
      'data-form-id': config.id,
      'data-intent': intent,
      type: 'button',
    },
    config.label,
  );
};

const TypeformPopupMock = {
  __esModule: true,
  default: {
    Button: MockButton,
    Minimal: MockButton,
  },
};

export default TypeformPopupMock;
