"use client";
import PageContainer from "@/components/PageContainer/PageContainer";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "@/assets/styles/pages/skills.module.scss";
import { Col, Row } from "react-bootstrap";
import { fadeInVariant, motion } from "@/motion/motionVariants";
import Button from "@/components/AppButton";
import Image from "next/image";

const Skills = () => {
  const t = useTranslations();

  return (
    <PageContainer className={styles.container}>
      <h1>Skills</h1>

      <Row className={styles.section}>
        <Col sm={12} md={12} lg={6} className={styles.imgCol}>
          <Image
            src="/images/skills/development.jpg"
            alt="André Rodrigues - Web Development Skills"
            className={styles.img}
            objectFit="cover"
            layout="fill"
          />
        </Col>
        <Col sm={12} md={12} lg={6} className={styles.developerSkillsCol}>
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
          >
            <h2>Development</h2>
            <ul>
              <li>
                <b>Master the Basics:</b> HTML5, CSS3, Javascript, SASS, jQuery
              </li>
              <li>
                <b>Front-End Frameworks:</b> React.js, React Native, Next.js
              </li>
              <li>
                <b>Back-end:</b> Node.js, RESTful APIs, GraphQL, MongoDB,
                Mongoose, PostgreSQL
              </li>
              <li>
                <b>DevOps:</b> Github actions, Docker, Pipelines, yml
              </li>
              <li>
                <b>Testing:</b> Jest, Enzyme, Cypress, React Testing Library
              </li>
              <li>
                <b>Deep knowledge in Responsive Layouts:</b> Bootstrap,
                React-Bootstrap, Tailwind-CSS, Media queries
              </li>
              <li>
                <b>SEO & Analytics:</b> SEO optimization, Google Analytics,
                Insights
              </li>
              <li>
                <b>Others:</b> Version control (Git/Github), Python, Webpack and
                others
              </li>
            </ul>
          </motion.div>
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            className={styles.webDesignContainer}
          >
            <h2>Web design</h2>
            <ul>
              <li>Figma</li>
              <li>Sketch</li>
              <li>Affinity Designer</li>
              <li>Affinity Publisher</li>
              <li>UX, UI, Web, Mobile, Apps, Logos</li>
            </ul>
          </motion.div>
        </Col>
      </Row>

      <Row className={styles.section}>
        <Col sm={12} md={12} lg={6} className={styles.softSkillsCol}>
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
          >
            <h2>Soft skills</h2>
            <p>{t("skills_page.soft_skills")}</p>
          </motion.div>
        </Col>
        <Col sm={12} md={12} lg={6} className={styles.softSkillsImgCol}>
          <motion.img
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            src="/images/skills/soft.jpeg"
            alt="André Rodrigues - Soft Skills"
            className={styles.img}
          />
        </Col>
      </Row>

      <Button downloadCV className="text-center" />
    </PageContainer>
  );
};

export default Skills;
