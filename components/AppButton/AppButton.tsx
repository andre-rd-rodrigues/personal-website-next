import React, { FC } from "react";
import styles from "./appbutton.module.scss";

interface AppButtonProps {
  label?: string;
  downloadCV?: boolean;
  className?: string;
}

const AppButton: FC<AppButtonProps> = ({ label, downloadCV, className }) => {
  if (downloadCV) {
    return (
      <div className={className}>
        <a className={styles.container} href="/assets/docs/cv.pdf" download>
          DOWNLOAD CV
        </a>
      </div>
    );
  }
  return <button className={styles.container}>{label}</button>;
};

export default AppButton;
