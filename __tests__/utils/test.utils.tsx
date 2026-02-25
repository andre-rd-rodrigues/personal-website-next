import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import '@testing-library/jest-dom';

import en from '@/messages/en.json';
import pt from '@/messages/pt.json';

const messagesByLocale: Record<string, AbstractIntlMessages> = {
  en: en as AbstractIntlMessages,
  pt: pt as AbstractIntlMessages,
};

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
  const messages = messagesByLocale[locale] ?? messagesByLocale.en;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    renderOptions,
  );
}

export * from '@testing-library/react';
export { customRender as render, renderWithIntl };
