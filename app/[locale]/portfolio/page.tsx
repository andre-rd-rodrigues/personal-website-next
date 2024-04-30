"use client";
import React from "react";
import { fadeInVariant, motion } from "@/motion/motionVariants";

import PageContainer from "@/components/PageContainer/PageContainer";
import WorkCategory from "@/components/WorkCategory/WorkCategory";

import { Col, Row } from "react-bootstrap";
import styles from "@/assets/styles/pages/portfolio.module.scss";
import { works_categories } from "@/data/info.data";
import { useTranslations } from "next-intl";
import Testimonials from "@/components/Testimonials/Testimonials";

const Portfolio = () => {
  const t = useTranslations("portfolio");

  return (
    <PageContainer className={styles.container}>
      <div className={styles.portfolio}>
        <h1>{t("title")}</h1>

        <motion.div variants={fadeInVariant} className={styles.worksCategories}>
          <Row>
            {works_categories.map(({ name, src }, index) => (
              <Col lg={4} md={4} sm={12} key={index}>
                <WorkCategory
                  category={name as "Websites" | "Apps" | "Editorial"}
                  order={index + 1}
                  src={src}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
      <Testimonials />
    </PageContainer>
  );
};

export default Portfolio;
