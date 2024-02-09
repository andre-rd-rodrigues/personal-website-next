import { PopupButton } from "@typeform/embed-react";
import { containerVariant, motion } from "@/motion/motionVariants";

import styles from "./contactbanner.module.scss";
import { useTranslations } from "next-intl";

const ContactBanner = () => {
  const t = useTranslations("contacts");

  return (
    <motion.div
      className={styles.container}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h4>{t("banner.title")}</h4>
      <PopupButton id="wTr5ba0e" size={60} className={styles.button}>
        {t("banner.cta")}
      </PopupButton>
    </motion.div>
  );
};

export default ContactBanner;
