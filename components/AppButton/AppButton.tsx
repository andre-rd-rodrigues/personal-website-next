import { FC } from 'react';
import styles from './appbutton.module.scss';
import { Icon } from '@iconify/react';

interface AppButtonProps {
  label?: string;
  downloadCV?: boolean;
  className?: string;
}

const AppButton: FC<AppButtonProps> = ({ label, downloadCV, className }) => {
  if (downloadCV) {
    return (
      <div className={className}>
        <a
          className={styles.btn}
          href="/docs/cv.pdf"
          download="André_Rodrigues_CV.pdf"
        >
          <Icon
            fontSize={30}
            icon="material-symbols-light:download-sharp"
            className="d-inline mr-2 -translate-y-0.5"
          />
          Download CV
        </a>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <button className={styles.btn}>{label}</button>
    </div>
  );
};

export default AppButton;
