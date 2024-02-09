import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import styles from "./pagecontainer.module.scss";
import { containerVariant } from "@/motion/motionVariants";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className
}) => {
  return (
    <motion.main
      variants={containerVariant as Variants} // Add type assertion for variants
      whileInView="visible"
      initial="hidden"
      className={`${styles.container} ${className}`}
    >
      {children}
    </motion.main>
  );
};

export default PageContainer;
