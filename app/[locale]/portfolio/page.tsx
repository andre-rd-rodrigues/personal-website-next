'use client';
import { fadeInSlideInVariant, motion } from '@/motion/motionVariants';

import PageContainer from '@/components/PageContainer/PageContainer';

import AppButton from '@/components/AppButton';
import Card from '@/components/Card';

import { WORK_CATEGORIES } from '@/data/info.data';
import { useTranslations } from 'next-intl';
import { Col, Row } from 'react-bootstrap';
import { Link } from '@/navigation';
import SectionTitle from '@/components/SectionTitle';
import HeroSection from '@/components/Hero';
import Testimonials from '@/components/Testimonials';

const Portfolio = () => {
  const t = useTranslations('portfolio');

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
                  // @ts-expect-error blog pathname is not defined
                  <Link href={getCategoryPageLink(name)}>
                    <AppButton.Button
                      className="w-full"
                      label="Explore"
                      icon={{
                        icon: 'guidance:left-arrow',
                        fontSize: 25,
                        className: 'd-inline mr-4',
                      }}
                    />
                  </Link>
                }
              />
            </motion.div>
          </Col>
        ))}
      </Row>

      <HeroSection.Text
        title={
          'Helping you seamlessly hire and pay individuals all around the world.'
        }
        subtitle={
          <p className="text-lg font-extralight md:text-xl">
            With so many workforce’s now borderless, payments must be too. Take
            the pain out of your workforce payments with Navro.
          </p>
        }
        className="my-12"
      />

      <Testimonials />
    </PageContainer>
  );
};

export default Portfolio;
