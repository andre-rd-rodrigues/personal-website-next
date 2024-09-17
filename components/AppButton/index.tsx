import { Icon } from '@iconify/react';
import { FC } from 'react';
import styles from './appbutton.module.scss';
import { motion } from 'framer-motion';
import { rotateScaleVariant } from '@/motion/motionVariants';

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

const Button: FC<AppButtonProps> = ({ label, downloadCV, className, icon }) => {
  if (downloadCV) {
    return (
      <div className={className}>
        <a
          className={styles.btn}
          href="/docs/cv.pdf"
          download="André_Rodrigues_CV.pdf"
        >
          <Icon fontSize={25} icon="mingcute:download-3-line" />
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

const ButtonIcon = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  return (
    <motion.button
      variants={rotateScaleVariant}
      whileHover="hover"
      className={`${styles.btn_no_hover} ${className} gap-0 p-3`}
    >
      <Icon icon={icon} fontSize={25} />
    </motion.button>
  );
};

const AppButton = {
  Button,
  Icon: ButtonIcon,
};

export default AppButton;
