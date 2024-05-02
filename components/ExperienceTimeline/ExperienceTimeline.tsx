import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styles from "./experiencetimeline.module.scss";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { fadeInVariant, motion } from "@/motion/motionVariants";
import { experienceTimeline } from "@/data/info.data";
import useIsMobile from "@/hooks/useIsMobile";

const ExperienceTimeline = () => {
  const t = useTranslations("about_page");
  const isMobile = useIsMobile(991);

  const [expandedElements, setExpandedElements] = useState<string[]>([]);

  const toggleExpand = (company: string) => {
    if (expandedElements.includes(company)) {
      setExpandedElements(expandedElements.filter((el) => el !== company));
    } else {
      setExpandedElements([...expandedElements, company]);
    }
  };

  const isExpanded = (company: string) => {
    return expandedElements.includes(company);
  };

  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.container}
    >
      <h2>{t("experience.title")}</h2>
      <VerticalTimeline animate={false}>
        {experienceTimeline.map(
          ({ company, duration, role, experience, img_url }) => (
            <VerticalTimelineElement
              key={company}
              className="vertical-timeline-element--work"
              date={duration}
              contentStyle={{
                background: "none",
                borderRadius: "0"
              }}
              contentArrowStyle={{
                borderRight: "none"
              }}
              dateClassName={styles.date}
              iconStyle={{ overflow: "hidden" }}
              icon={
                <Image
                  src={img_url}
                  alt={`${company} - ${role}`}
                  layout="fill"
                  objectFit="cover"
                />
              }
            >
              <h5 className="mb-2 ">{company}</h5>
              <h4 className="opacity-75 font-normal">{role}</h4>
              <p
                className={`${
                  isMobile && !isExpanded(company) ? styles.truncate : ""
                }`}
              >
                {t(experience)}
              </p>
              {isMobile && (
                <div
                  className="mt-2 text-end cursor-pointer"
                  onClick={() => toggleExpand(company)}
                >
                  {isExpanded(company) ? "See less" : "See more"}
                </div>
              )}
            </VerticalTimelineElement>
          )
        )}
      </VerticalTimeline>
    </motion.div>
  );
};

export default ExperienceTimeline;
