'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import HeroSection from '@/components/Hero';
import PageContainer from '@/components/PageContainer/PageContainer';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import useTranslation from '@/hooks/useTranslation';
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const t = useTranslations('pricing');
  const t_button = useTranslations('buttons');
  const { getTranslationsArray } = useTranslation();

  return (
    <PageContainer>
      <Section>
        <HeroSection.Text title={t('heroTitle')} className="pb-0" />
      </Section>
      <Section>
        <SectionTitle title={t('packs.title')} color="primary" tag="h2" />
        <p>{t('packs.description')}</p>
        <div className="flex justify-between gap-5">
          <Card.Pricing
            title={t('packs.starter.title')}
            price={t('packs.starter.price')}
            description={t('packs.starter.description')}
            features={getTranslationsArray('pricing.packs.starter.features')}
            cta={
              <Button.Text
                className="w-full"
                label={t_button('getStarted')}
                fullWidth
                hover={false}
              />
            }
          />
          <Card.Pricing
            title={t('packs.professional.title')}
            price={t('packs.professional.price')}
            description={t('packs.professional.description')}
            features={getTranslationsArray(
              'pricing.packs.professional.features',
            )}
            cta={
              <Button.Text
                className="w-full"
                label={t_button('getStarted')}
                fullWidth
                hover={false}
              />
            }
          />
          <Card.Pricing
            title={t('packs.premium.title')}
            price={t('packs.premium.price')}
            description={t('packs.premium.description')}
            features={getTranslationsArray('pricing.packs.premium.features')}
            cta={
              <Button.Text
                className="w-full"
                label={t_button('getStarted')}
                fullWidth
                hover={false}
              />
            }
          />
          <Card.Pricing
            title={t('packs.enterprise.title')}
            price={t('packs.enterprise.price')}
            description={t('packs.enterprise.description')}
            features={getTranslationsArray('pricing.packs.enterprise.features')}
            cta={
              <Button.Text
                className="w-full"
                label={t_button('getStarted')}
                fullWidth
                hover={false}
              />
            }
          />
        </div>
      </Section>
    </PageContainer>
  );
};

export default Pricing;
