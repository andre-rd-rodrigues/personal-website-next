import React, { ReactNode, CSSProperties, useEffect, useState } from 'react';
import styles from './imagezoomeffect.module.scss';

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
  height = '100%',
  width = '100%',
  children,
  overlay,
  maxHeight,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check window width after component mounts
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    handleResize(); // Check initially

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{ ...style, height, width, maxHeight }}
      className={`${isMobile ? styles.wrapperMobile : styles.wrapper} rounded-lg`}
    >
      <div
        className={`${styles.image} ${overlay && styles.overlay}`}
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default ImageZoomEffect;
