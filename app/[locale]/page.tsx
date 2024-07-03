"use client";
import { useTranslations } from "next-intl";

import styles from "@/assets/styles/pages/homepage.module.scss";
import AppLink from "@/components/AppLink/AppLink";
import GalleryShowcase from "@/components/GalleryShowcase/GalleryShowcase";
import { fadeInVariant, homepageDelayVariant } from "@/motion/motionVariants";
import { PopupButton } from "@typeform/embed-react";
import { motion } from "framer-motion";
import ReactGA from "react-ga4";
import {
  EventActions,
  EventCategories,
  EventLabels
} from "@/constants/analytics.constants";

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
            <PopupButton
              id="wTr5ba0e"
              size={60}
              className={styles.formButton}
              onClick={() =>
                ReactGA.event({
                  category: EventCategories.USER_INTERACTION,
                  action: EventActions.OPEN_CONTACT_TYPEFORM,
                  label: EventLabels.CONTACT_FORM_BUTTON
                })
              }
            >
              {t("form.button")}
            </PopupButton>
          </motion.div>
        </motion.div>
      </GalleryShowcase>
    </main>
  );
};

export default Home;
