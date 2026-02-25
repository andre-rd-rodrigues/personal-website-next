import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import '@testing-library/jest-dom';

import en from '@/messages/en.json';

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { ...options });
}

function renderWithIntl(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { locale?: string },
) {
  const { locale = 'en', ...renderOptions } = options ?? {};
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={en as unknown as AbstractIntlMessages}
    >
      {ui}
    </NextIntlClientProvider>,
    renderOptions,
  );
}

export * from '@testing-library/react';
export { customRender as render, renderWithIntl };
