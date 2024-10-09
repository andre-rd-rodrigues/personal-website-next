import { Icon } from '@iconify/react';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  label?: string;
  className?: string;
  icon?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const ButtonWithText: FC<ButtonProps> = ({
  label,
  icon,
  fullWidth,
  onClick,
}) => {
  return (
    <motion.button
      style={{ width: fullWidth ? '100%' : 'auto' }}
      className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#ff56cd_60%,#0000_100%)]" />
      <span
        className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gray-900 p-3 px-5 font-light text-white backdrop-blur-3xl"
        style={{
          fontFamily: 'var(--font-jost)',
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {icon && <Icon icon={icon} />}
        {label}
      </span>
    </motion.button>
  );
};

const ButtonIcon = ({
  icon,
  fontSize,
}: {
  icon: string;
  fontSize?: number;
}) => {
  return (
    <motion.button
      className="relative inline-flex w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#ff56cd_60%,#0000_100%)]" />
      <span className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 p-3 text-white backdrop-blur-3xl">
        <Icon icon={icon} fontSize={fontSize || 25} />
      </span>
    </motion.button>
  );
};

const ButtonMinimal: FC<ButtonProps> = ({
  label,
  icon,
  fullWidth,
  onClick,
}) => {
  return (
    <motion.button
      style={{ width: fullWidth ? '100%' : 'auto' }}
      className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span
        className="inline-flex cursor-pointer items-center justify-center gap-3 p-3 px-5 font-light text-white backdrop-blur-3xl"
        style={{
          fontFamily: 'var(--font-jost)',
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {icon && <Icon icon={icon} />}
        {label}
      </span>
    </motion.button>
  );
};

const Button = {
  Text: ButtonWithText,
  Icon: ButtonIcon,
  Minimal: ButtonMinimal,
};

export default Button;
