import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';

function ErrorGeneric() {
  const t = useTranslations('');
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="mx-auto max-w-[800px]">
        <h2 className="mb-5 text-center text-5xl">{t('error.title')}</h2>
        <p className="mb-7">{t('error.description')}</p>
        <Button.Text
          label={t('buttons.goBack')}
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
}

export default ErrorGeneric;
