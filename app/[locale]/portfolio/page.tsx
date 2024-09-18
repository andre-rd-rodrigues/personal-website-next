'use client';
import { fadeInSlideInVariant, motion } from '@/motion/motionVariants';

import PageContainer from '@/components/PageContainer/PageContainer';

import AppButton from '@/components/AppButton';
import Card from '@/components/Card';

import { WORK_CATEGORIES } from '@/data/info.data';
import { useTranslations } from 'next-intl';

import SectionTitle from '@/components/SectionTitle';
import HeroSection from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import ICONS from '@/constants/icons.constants';
import { Link } from '@/navigation';

const Portfolio = () => {
  const t = useTranslations('portfolio');
  const t_button = useTranslations('buttons');

  const getCategoryPageLink = (category: string) =>
    category === 'Editorial'
      ? 'https://www.blog.andrerodrigo.com'
      : (`/portfolio/${category.toLowerCase()}` as
          | '/portfolio/web'
          | '/portfolio/mobile');

  return (
    <PageContainer>
      <SectionTitle title={t('title')} />

      <div className="grid items-baseline gap-6 md:grid-cols-12">
        {WORK_CATEGORIES.map(({ name, description, src }, i) => (
          <div
            className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-6"
            key={i}
          >
            <motion.div variants={fadeInSlideInVariant} className="h-full">
              <Card
                title={name}
                description={t(description)}
                imageUrl={src}
                footer={
                  <Link href={getCategoryPageLink(name)}>
                    <AppButton.Button
                      className="w-full"
                      label={t_button('explore')}
                      icon={ICONS.arrow}
                      fullWidth
                    />
                  </Link>
                }
              />
            </motion.div>
          </div>
        ))}
      </div>

      <HeroSection.Text
        title={t('heroSection.title')}
        subtitle={
          <p className="text-lg font-extralight md:text-xl">
            {t('heroSection.description')}
          </p>
        }
        className="my-12"
        options={{
          subtitleDelay: 2,
        }}
      />

      <Testimonials />
    </PageContainer>
  );
};

export default Portfolio;
