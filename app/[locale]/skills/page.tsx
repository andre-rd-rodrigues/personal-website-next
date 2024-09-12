"use client";
import PageContainer from "@/components/PageContainer/PageContainer";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "@/assets/styles/pages/skills.module.scss";
import { Col, Row } from "react-bootstrap";
import {
  containerVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
  motion
} from "@/motion/motionVariants";
import Button from "@/components/AppButton";
import Image from "next/image";

const Skills = () => {
  const t = useTranslations();

  return (
    <PageContainer className={styles.container}>
      <h1>Skills</h1>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
      >
        <Row className={styles.section}>
          <Col sm={12} md={12} lg={6} className={styles.imgCol}>
            <motion.div variants={fadeInVariant}>
              <Image
                src="/images/skills/development.jpg"
                alt="André Rodrigues - Web Development Skills"
                className={styles.img}
                objectFit="cover"
                layout="fill"
              />
            </motion.div>
          </Col>
          <Col sm={12} md={12} lg={6} className={styles.developerSkillsCol}>
            <div>
              <motion.h2 variants={fadeInVariant}>Development</motion.h2>
              <ul>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>Master the Basics:</b> HTML5, CSS3, Javascript, SASS,
                  jQuery
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>Front-End Frameworks:</b> React.js, React Native, Next.js
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>Back-end:</b> Node.js, RESTful APIs, GraphQL, MongoDB,
                  Mongoose, PostgreSQL
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>DevOps:</b> Github actions, Docker, Pipemotion.lines, yml
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>Testing:</b> Jest, Enzyme, Cypress, React Testing
                  motion.Library
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>Deep knowledge in Responsive Layouts:</b> Bootstrap,
                  React-Bootstrap, Tailwind-CSS, Media queries
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>SEO & Analytics:</b> SEO optimization, Google Analytics,
                  Insights
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  <b>Others:</b> Version control (Git/Github), Python, Webpack
                  and others
                </motion.li>
              </ul>
            </div>
            <div className={styles.webDesignContainer}>
              <motion.h2 variants={fadeInVariant}>Web design</motion.h2>
              <ul>
                <motion.li variants={fadeInSlideLeftVariant}>Figma</motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>Sketch</motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  Affinity Designer
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  Affinity Publisher
                </motion.li>
                <motion.li variants={fadeInSlideLeftVariant}>
                  UX, UI, Web, Mobile, Apps, Logos
                </motion.li>
              </ul>
            </div>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
      >
        <Row className={styles.section}>
          <Col sm={12} md={12} lg={6} className={styles.softSkillsCol}>
            <motion.h2 variants={fadeInSlideLeftVariant}>Soft skills</motion.h2>
            <motion.p variants={fadeInSlideLeftVariant}>
              {t("skills_page.soft_skills")}
            </motion.p>
          </Col>
          <Col sm={12} md={12} lg={6} className={styles.softSkillsImgCol}>
            <motion.img
              variants={fadeInVariant}
              src="/images/skills/soft.jpeg"
              alt="André Rodrigues - Soft Skills"
              className={styles.img}
            />
          </Col>
        </Row>
      </motion.div>
      <Button downloadCV className="text-center" />
    </PageContainer>
  );
};

export default Skills;
