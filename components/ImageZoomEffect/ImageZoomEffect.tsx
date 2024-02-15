import React, { ReactNode, CSSProperties } from "react";
import styles from "./imagezoomeffect.module.scss";

interface ImageZoomEffectProps {
  src: string;
  style?: CSSProperties;
  height?: string | number;
  width?: string | number;
  children?: ReactNode;
  overlay?: boolean;
  maxHeight?: string | number;
}

const ImageZoomEffect: React.FC<ImageZoomEffectProps> = ({
  src,
  style,
  height = "100%",
  width = "100%",
  children,
  overlay,
  maxHeight
}) => {
  return (
    <div
      style={{ ...style, height, width, maxHeight }}
      className={`${
        window.innerWidth >= 576 ? styles.wrapper : styles.wrapperMobile
      }`}
    >
      <div
        className={`${styles.image} ${overlay && styles.overlay}`}
        style={{
          backgroundImage: `url(${src})`
        }}
      />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default ImageZoomEffect;
