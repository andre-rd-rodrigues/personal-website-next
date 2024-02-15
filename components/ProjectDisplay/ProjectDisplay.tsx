import React from "react";
import ImageZoomEffect from "@/components/ImageZoomEffect/ImageZoomEffect";
import styles from "./projectdisplay.module.scss";

interface ProjectDisplayProps {
  src: string;
  label: string;
  href?: string;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  src,
  label,
  href
}) => {
  return (
    <a href={href} target="_" className={styles.container}>
      <ImageZoomEffect overlay height="100%" width="100%" src={src}>
        <h4>{label}</h4>
      </ImageZoomEffect>
    </a>
  );
};

export default ProjectDisplay;
