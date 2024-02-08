"use client";
import { useTranslations } from "next-intl";

import styles from "@/assets/styles/pages/homepage.module.scss";
import AppLink from "@/components/AppLink/AppLink";
import GalleryShowcase from "@/components/GalleryShowcase/GalleryShowcase";
import { fadeInVariant, homepageDelayVariant } from "@/motion/motionVariants";
import { PopupButton } from "@typeform/embed-react";
import { motion } from "framer-motion";

export default function Home() {
  const t = useTranslations("homepage");

  return (
    <main className={styles.homepage}>
      <GalleryShowcase>
        <div className={styles.title}>
          <h1>Andre Rodrigo</h1>
          <motion.div
            variants={homepageDelayVariant}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeInVariant}>{t("subtitle")}</motion.p>
            <motion.div variants={fadeInVariant}>
              <AppLink href="/portfolio" label={t("cta")} />|
              <PopupButton
                id="wTr5ba0e"
                size={60}
                className={styles.formButton}
              >
                {t("form.button")}
              </PopupButton>
            </motion.div>
          </motion.div>
        </div>
      </GalleryShowcase>
    </main>
  );
}
