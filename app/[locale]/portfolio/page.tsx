"use client";
import { fadeInVariant, motion } from "@/motion/motionVariants";

import PageContainer from "@/components/PageContainer/PageContainer";
import WorkCategory from "@/components/WorkCategory/WorkCategory";

import styles from "@/assets/styles/pages/portfolio.module.scss";
import Testimonials from "@/components/Testimonials/Testimonials";
import { works_categories } from "@/data/info.data";
import { useTranslations } from "next-intl";
import { Col, Row } from "react-bootstrap";

const Portfolio = () => {
  const t = useTranslations("portfolio");

  return (
    <PageContainer className={styles.container}>
      <div className={styles.portfolio}>
        <h1>{t("title")}</h1>

        <Row>
          {works_categories.map(({ name, src }, index) => (
            <Col lg={4} md={4} sm={12} key={index}>
              <motion.div
                variants={fadeInVariant}
                className={styles.worksCategories}
              >
                <WorkCategory
                  category={name as "Websites" | "Apps" | "Editorial"}
                  order={index + 1}
                  src={src}
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
