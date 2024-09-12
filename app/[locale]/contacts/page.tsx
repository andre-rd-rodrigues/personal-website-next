"use client";
import styles from "@/assets/styles/pages/contact.module.scss";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Col, Row } from "react-bootstrap";

import PageContainer from "@/components/PageContainer/PageContainer";
import CONTACTS from "@/constants/contacts.constants";
import {
  containerVariant,
  fadeInVariant,
  rotateScaleVariant
} from "@/motion/motionVariants";
import { useTranslations } from "next-intl";

const Contacts = () => {
  const t = useTranslations("contacts_page");

  const spacing = {
    lg: 4,
    md: 4,
    sm: 12
  };

  return (
    <PageContainer className={styles.container}>
      <Row>
        <Col className={styles.col} {...spacing}>
          <h1>{t("title")}</h1>
        </Col>
        <Col className={styles.col} {...spacing}>
          <motion.div variants={fadeInVariant}>
            <h3>{t("email")}</h3>
            <a
              id="contact_email"
              href={`mailto:${CONTACTS.EMAIL}`}
              target="_blank"
              rel="noreferrer"
            >
              {CONTACTS.EMAIL}
            </a>
          </motion.div>
        </Col>
        <Col className={styles.col} {...spacing}>
          <motion.div variants={containerVariant} className={styles.social}>
            <h3>{t("social")}</h3>
            <div>
              <ul>
                <motion.li variants={rotateScaleVariant} whileHover="hover">
                  <a href={CONTACTS.LINKTREE} target="_blank" rel="noreferrer">
                    <Icon
                      icon="simple-icons:linktree"
                      className={styles.social_icon}
                    />
                  </a>
                </motion.li>
                <motion.li variants={rotateScaleVariant} whileHover="hover">
                  <a href={CONTACTS.INSTAGRAM} target="_blank" rel="noreferrer">
                    <Icon icon="mdi:instagram" className={styles.social_icon} />
                  </a>
                </motion.li>
                <motion.li variants={rotateScaleVariant} whileHover="hover">
                  <a href={CONTACTS.LINKEDIN} target="_blank" rel="noreferrer">
                    <Icon icon="mdi:linkedin" className={styles.social_icon} />
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Contacts;
