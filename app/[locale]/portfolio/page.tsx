'use client';
import { fadeInSlideInVariant, motion } from '@/motion/motionVariants';

import PageContainer from '@/components/PageContainer/PageContainer';

import Button from '@/components/Button';
import Card from '@/components/Card';

import { WORK_CATEGORIES } from '@/data/info.data';
import { useTranslations } from 'next-intl';

import HeroSection from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import TypeformPopup from '@/components/TypeformPopup';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import ICONS from '@/constants/icons.constants';
import TESTIMONIALS from '@/constants/testimonials.constants';
import { Link } from '@/navigation';
import Section from '@/components/Section';

const Portfolio = () => {
  const t = useTranslations('portfolio');
  const t_button = useTranslations('buttons');
  const t_testimonials = useTranslations('testimonials');

  const getCategoryPageLink = (category: string) =>
    `/portfolio/${category.toLowerCase()}` as
      | '/portfolio/web'
      | '/portfolio/mobile';

  return (
    <PageContainer>
      <SectionTitle title={t('title')} />

      <div className="mt-20 grid items-baseline gap-6 md:grid-cols-12">
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
                    <Button.Text
                      className="w-full"
                      label={t_button('explore')}
                      icon={ICONS.arrow}
                      fullWidth
                      hover={false}
                    />
                  </Link>
                }
              />
            </motion.div>
          </div>
        ))}
      </div>

      <Section>
        <HeroSection.Text
          textClassName="font-light"
          title={t('heroSection.title')}
          subtitle={
            <p className="text-lg font-extralight md:text-xl">
              {t('heroSection.description')}
            </p>
          }
          options={{
            subtitleDelay: 1,
          }}
        />
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionTitle title={t_testimonials('title')} />
        <InfiniteMovingCards items={TESTIMONIALS} />
      </Section>

      {/* Contact */}
      <Section>
        <HeroSection.Cta
          text={t('contact.description')}
          cta={<TypeformPopup.Button />}
        />
      </Section>
    </PageContainer>
  );
};

export default Portfolio;
