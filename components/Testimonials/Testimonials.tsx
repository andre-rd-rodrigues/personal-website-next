import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";
import {
  containerVariant,
  fadeInVariant,
  motion
} from "@/motion/motionVariants";

import { testimonials_sider } from "@/helpers/slider.settings";
import Slider from "react-slick";

import styles from "./testimonials.module.scss";
import AppLink from "../AppLink";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { testimonials } from "@/data/info.data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const t = useTranslations("testimonials");

  const settings = {
    ...testimonials_sider,
    dotsClass: `${styles.dots} slick-dots`
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.container}
    >
      <motion.div variants={fadeInVariant}>
        <h1>{t("title")}</h1>
      </motion.div>
      <motion.div variants={fadeInVariant}>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <Testimonial t={t} key={index} {...item} />
          ))}
        </Slider>
      </motion.div>
      <div className={styles.letsTalk}>
        <p>{t("lets_talk.title")}</p>
        <AppLink label={t("lets_talk.cta")} href="/contact" />
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
  project_link?: string;
  t: (text: string) => ReactNode;
}

const Testimonial: React.FC<TestimonialProps> = ({
  client_name,
  client_details,
  picture_path,
  review,
  project_link,
  t
}) => (
  <div id="testimonials" className={styles.testimonialContainer}>
    <a href={project_link} rel="noreferrer" target="_blank">
      <Icon icon="ri:double-quotes-l" className={styles.quotation} />
      <p className={styles.testimonialReview}>{t(review)}</p>
      <div className={styles.testimonialClientContainer}>
        <div>
          <h5>{client_name}</h5>
          <p>{t(client_details)}</p>
        </div>
        <div className="relative overflow-hidden w-28 h-28">
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
    </a>
  </div>
);
