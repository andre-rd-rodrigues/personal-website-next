import { Icon } from '@iconify/react';
import { FC } from 'react';
import styles from './appbutton.module.scss';

interface AppButtonProps {
  label?: string;
  downloadCV?: boolean;
  className?: string;
  icon?: {
    icon: string;
    fontSize?: number;
    className?: string;
  };
}

const AppButton: FC<AppButtonProps> = ({
  label,
  downloadCV,
  className,
  icon,
}) => {
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
    <button className={styles.btn}>
      {icon && <Icon {...icon} />}
      {label}
    </button>
  );
};

export default AppButton;
