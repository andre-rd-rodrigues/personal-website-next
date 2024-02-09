"use client";
import PageContainer from "@/components/PageContainer/PageContainer";
import { fadeInVariant, motion } from "@/motion/motionVariants";
import { useTranslations } from "next-intl";
import React, { Suspense, lazy } from "react";

import styles from "@/assets/styles/pages/about.module.scss";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import ExperienceTimeline from "@/components/ExperienceTimeline/ExperienceTimeline";
import Button from "@/components/AppButton";
import ContactBanner from "@/components/ContactBanner/ContactBanner";

const TechStack = lazy(() => import("@/components/TechStack"));

const About = () => {
  const t = useTranslations("about_page");

  return (
    <PageContainer>
      <div className={styles.container}>
        <h1>{t("title")}</h1>

        {/*   About me */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          className={styles.section}
        >
          <Row>
            <Col lg={6} md={6} sm={12} className={styles.aboutTextContainer}>
              <div>
                <motion.h2 variants={fadeInVariant}>
                  {t("about_me.title")}
                </motion.h2>
                <motion.p variants={fadeInVariant}>
                  {t("about_me.description")} 🎯
                </motion.p>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} className={styles.profileImageContainer}>
              <Image
                src="/images/profile.png"
                alt="André Rodrigues - Web Developer"
                className="mx-auto"
                width={330}
                height={0}
              />
            </Col>
          </Row>

          {/* Experience */}
          <div className={styles.section}>
            <ExperienceTimeline />
          </div>

          {/* Tech stack */}
          <Suspense fallback={<p>Loading...</p>}>
            <div className={styles.section}>{<TechStack />}</div>
          </Suspense>

          <Button downloadCV className="text-end" />
        </motion.div>

        <ContactBanner />
      </div>
    </PageContainer>
  );
};

export default About;
