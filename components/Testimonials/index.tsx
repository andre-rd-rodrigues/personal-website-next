import React, { ReactNode } from 'react';

import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInVariant,
  getAttentionVariant,
  motion,
} from '@/motion/motionVariants';

import { testimonials_sider } from '@/helpers/slider.settings';
import Slider from 'react-slick';

import styles from './testimonials.module.scss';
import AppLink from '../AppLink';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionTitle from '../SectionTitle';
import { TESTIMONIALS } from './testimonials.constants';

const Testimonials = () => {
  const t = useTranslations('testimonials');

  const settings = {
    ...testimonials_sider,
    dotsClass: `${styles.dots} slick-dots`,
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      className={styles.container}
    >
      <SectionTitle title={t('title')} />
      <motion.div variants={fadeInVariant}>
        <Slider {...settings}>
          {TESTIMONIALS.map((item, index) => (
            <Testimonial t={t} key={index} {...item} />
          ))}
        </Slider>
      </motion.div>
      <div className={styles.letsTalk}>
        <p>{t('lets_talk.title')}</p>
        <motion.div
          variants={getAttentionVariant}
          animate="animate"
          whileHover="hover"
          className="mt-3"
        >
          <AppLink label={t('lets_talk.cta')} href="/contacts" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonials;

interface TestimonialProps {
  client_name: string;
  client_details: string;
  picture_path: string;
  review: string;
  t: (text: string) => ReactNode;
}

const Testimonial: React.FC<TestimonialProps> = ({
  client_name,
  client_details,
  picture_path,
  review,
  t,
}) => (
  <motion.div
    variants={fadeInSlideInVariant}
    id="testimonials"
    className={`${styles.testimonialContainer} border-1 rounded-lg border-gray-800 bg-gray-800 bg-opacity-10 p-8 backdrop-blur-[40px]`}
  >
    <div className="d-flex h-full flex-col justify-between">
      <p className={styles.testimonialReview}>{t(review)}</p>
      <div className={styles.testimonialClientContainer}>
        <div>
          <h5 className="text-xl font-extralight">{client_name}</h5>
          <p className="text-sm">{t(client_details)}</p>
        </div>
        <div className="relative mt-4 h-20 w-20 overflow-hidden">
          <Image
            src={picture_path}
            alt="Personal Picture"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  </motion.div>
);
