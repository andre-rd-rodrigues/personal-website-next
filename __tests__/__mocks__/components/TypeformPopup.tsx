import React from 'react';

type MockButtonProps = {
  id?: string;
  label?: string;
};

const MockButton = ({ id, label }: MockButtonProps) =>
  React.createElement(
    'button',
    {
      'data-testid': 'typeform-popup-button',
      'data-form-id': id ?? '',
      type: 'button',
    },
    label ?? 'Contact',
  );

const TypeformPopupMock = {
  __esModule: true,
  default: {
    Button: MockButton,
    Minimal: MockButton,
  },
};

export default TypeformPopupMock;
