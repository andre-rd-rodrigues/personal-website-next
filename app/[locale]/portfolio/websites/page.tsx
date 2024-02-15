"use client";
import PageContainer from "@/components/PageContainer/PageContainer";
import React from "react";
import { motion, workPageHeaderContent } from "@/motion/motionVariants";
import styles from "@/assets/styles/pages/portfoliocategorypage.module.scss";
import { categories, projects as projects_data } from "@/data/info.data";
import { useTranslations } from "next-intl";
import ProjectDisplay from "@/components/ProjectDisplay/ProjectDisplay";
import { Link } from "@/navigation";
import { Icon } from "@iconify/react";

const Websites = () => {
  const t = useTranslations();

  const section = categories.websites;
  const projects = projects_data.websites;

  return (
    <PageContainer className={styles.container}>
      <header className={styles.header}>
        <h1>{section.title}</h1>

        <motion.p
          variants={workPageHeaderContent}
          initial="hidden"
          animate="visible"
        >
          {t(section.description)}
        </motion.p>
      </header>

      <motion.div
        variants={workPageHeaderContent}
        initial="hidden"
        animate="visible"
        className={styles.showCaseContainer}
      >
        {projects.map(({ src, label, ref }, i) => (
          <ProjectDisplay href={ref} src={src} label={label} key={i} />
        ))}
      </motion.div>

      {/* Next category button */}
      <Link href={`/portfolio/apps`} className={styles.nextCategoryContainer}>
        <p>NEXT</p>
        <p>Apps</p>
        <Icon icon="bi:arrow-right-short" className={styles.arrow} />
      </Link>
    </PageContainer>
  );
};

export default Websites;
