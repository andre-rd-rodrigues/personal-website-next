"use client";
import { useTranslations } from "next-intl";

import styles from "@/assets/styles/pages/homepage.module.scss";
import AppLink from "@/components/AppLink/AppLink";
import GalleryShowcase from "@/components/GalleryShowcase/GalleryShowcase";
import { fadeInVariant, homepageDelayVariant } from "@/motion/motionVariants";
import { PopupButton } from "@typeform/embed-react";
import { motion } from "framer-motion";

const Home = () => {
  const t = useTranslations("homepage");

  return (
    <main className={styles.homepage}>
      <GalleryShowcase>
        <motion.div
          variants={homepageDelayVariant}
          initial="hidden"
          animate="visible"
          className={styles.title}
        >
          <motion.h1 variants={fadeInVariant}>Andre Rodrigo</motion.h1>

          <motion.p variants={fadeInVariant}>{t("subtitle")}</motion.p>
          <motion.div variants={fadeInVariant}>
            <AppLink href="/portfolio" label={t("cta")} />|
            <PopupButton id="wTr5ba0e" size={60} className={styles.formButton}>
              {t("form.button")}
            </PopupButton>
          </motion.div>
        </motion.div>
      </GalleryShowcase>
    </main>
  );
};

export default Home;
