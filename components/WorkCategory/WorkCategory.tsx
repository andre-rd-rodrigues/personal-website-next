import React from "react";
import ImageZoomEffect from "@/components/ImageZoomEffect/ImageZoomEffect";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./workcategory.module.scss";
import { Link } from "@/navigation";

interface Props {
  category: "Websites" | "Apps" | "Editorial";
  order: number;
  src: string;
}

const WorkCategory = ({ category, order, src }: Props) => {
  const categoryLink =
    category === "Editorial"
      ? "https://www.blog.andrerodrigo.com"
      : (`/portfolio/${category.toLowerCase()}` as
          | "/portfolio/websites"
          | "/portfolio/apps");

  const { scrollY } = useScroll();

  const yPosUp = useTransform(scrollY, [0, 500], [0, -40]); // Moves elements upwards on scroll

  return (
    //@ts-expect-error blog pathname is not defined
    <Link href={categoryLink} className={styles.container}>
      <ImageZoomEffect height="40vw" maxHeight="300px" src={src} />
      <motion.div
        style={{
          y: yPosUp
        }}
        className={styles.text}
      >
        <p>0{order}</p>
        <h3>{category}</h3>
      </motion.div>
    </Link>
  );
};

export default WorkCategory;
