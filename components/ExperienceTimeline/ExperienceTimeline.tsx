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
import CONTACTS from "@/constants/contacts.constants";

const ExperienceTimeline = () => {
  const t = useTranslations("about_page");
  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.container}
    >
      <h2>{t("experience.title")}</h2>
      <VerticalTimeline>
        {experienceTimeline.map(
          ({ company, duration, role, experience, img_url }) => (
            <VerticalTimelineElement
              key={company}
              className="vertical-timeline-element--work"
              date={duration}
              contentStyle={{
                background: "none",
                borderRadius: "0",
                cursor: "pointer"
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
              onTimelineElementClick={() =>
                window.open(CONTACTS.LINKEDIN, "_blank")
              }
            >
              <h4>{company}</h4>
              <h5>{role}</h5>
              <p>{t(experience)}</p>
            </VerticalTimelineElement>
          )
        )}
      </VerticalTimeline>
    </motion.div>
  );
};

export default ExperienceTimeline;
