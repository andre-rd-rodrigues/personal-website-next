'use client';
import { fadeInSlideInVariant, motion } from '@/motion/motionVariants';

import PageContainer from '@/components/PageContainer/PageContainer';

import styles from '@/assets/styles/pages/portfolio.module.scss';
import AppButton from '@/components/AppButton';
import Card from '@/components/Card';
import Testimonials from '@/components/Testimonials/Testimonials';
import { WORK_CATEGORIES } from '@/data/info.data';
import { useTranslations } from 'next-intl';
import { Col, Row } from 'react-bootstrap';
import { Link } from '@/navigation';

const Portfolio = () => {
  const t = useTranslations('portfolio');

  const getCategoryPageLink = (category: string) =>
    category === 'Editorial'
      ? 'https://www.blog.andrerodrigo.com'
      : (`/portfolio/${category.toLowerCase()}` as
          | '/portfolio/websites'
          | '/portfolio/apps');

  return (
    <PageContainer className={styles.container}>
      <div className={styles.portfolio}>
        <h1>{t('title')}</h1>

        <Row className="mb-12">
          {WORK_CATEGORIES.map(({ name, description, src }, index) => (
            <Col lg={6} md={6} sm={12} key={index} className="mb-4">
              <motion.div variants={fadeInSlideInVariant} className="h-full">
                <Card
                  title={name}
                  description={t(description)}
                  imageUrl={src}
                  footer={
                    // @ts-expect-error blog pathname is not defined
                    <Link href={getCategoryPageLink(name)}>
                      <AppButton
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
      </div>
      <Testimonials />
    </PageContainer>
  );
};

export default Portfolio;
