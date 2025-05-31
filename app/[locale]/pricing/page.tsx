'use client';

import HeroSection from '@/components/Hero';
import PageContainer from '@/components/PageContainer/PageContainer';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import { useTranslations } from 'next-intl';

const Contacts = () => {
  const t = useTranslations('pricing');

  return (
    <PageContainer>
      <Section>
        <HeroSection.Text title={t('heroTitle')} className="pb-0" />
      </Section>
      <Section>
        <SectionTitle title={t('packs.title')} color="primary" tag="h2" />
        <p>{t('packs.description')}</p>
      </Section>
    </PageContainer>
  );
};

export default Contacts;
