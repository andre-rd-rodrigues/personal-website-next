'use client';
import { fadeInSlideInVariant, motion } from '@/motion/motionVariants';

import PageContainer from '@/components/PageContainer/PageContainer';

import AppButton from '@/components/AppButton';
import Card from '@/components/Card';

import { WORK_CATEGORIES } from '@/data/info.data';
import { useTranslations } from 'next-intl';
import { Col, Row } from 'react-bootstrap';

import SectionTitle from '@/components/SectionTitle';
import HeroSection from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import ICONS from '@/constants/icons.constants';
import Link from 'next/link';

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

      <Row>
        {WORK_CATEGORIES.map(({ name, description, src }, index) => (
          <Col lg={6} md={6} sm={12} key={index} className="mb-0 sm:mb-4">
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
          </Col>
        ))}
      </Row>

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
