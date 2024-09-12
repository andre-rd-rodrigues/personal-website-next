"use client";
import { useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { scaleSpringVariant, slowRotateVariant } from "@/motion/motionVariants";

const AnalyticsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("analytics_banner");

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.analyticsAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setCookie(null, "analyticsAccepted", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={scaleSpringVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileInView="visible"
          className="fixed z-10 bottom-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg text-white max-w-md"
        >
          <div className="flex gap-2 items-center">
            <motion.span animate={slowRotateVariant}>
              <Icon icon="fluent:cookies-16-regular" />
            </motion.span>
            <h2 className="font-bold text-lg">Cookies</h2>
          </div>
          <p className="text-sm mt-2">{t("description")}</p>
          <div className="text-end">
            <button
              className="mt-4 bg-white text-black px-4 py-2 rounded transition duration-300 hover:opacity-50"
              onClick={handleClose}
            >
              {t("accept")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsBanner;
