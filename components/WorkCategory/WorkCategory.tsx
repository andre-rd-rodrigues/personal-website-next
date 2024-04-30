import React from "react";
import ImageZoomEffect from "@/components/ImageZoomEffect/ImageZoomEffect";

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

  return (
    //@ts-expect-error blog pathname is not defined
    <Link href={categoryLink} className={styles.container}>
      <ImageZoomEffect height="40vw" maxHeight="300px" src={src} />
      <div className={styles.text}>
        <p>0{order}</p>
        <h3>{category}</h3>
      </div>
    </Link>
  );
};

export default WorkCategory;
