import { Icon } from '@iconify/react';
import { FC } from 'react';

interface ButtonProps {
  label?: string;
  className?: string;
  icon?: string;
  fullWidth?: boolean;
}

const ButtonWithText: FC<ButtonProps> = ({ label, icon, fullWidth }) => {
  return (
    <button
      style={{ width: fullWidth ? '100%' : 'auto' }}
      className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff56cd_0%,#393BB2_50%,#ff56cd_100%)]" />
      <span
        className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gray-900 p-3 px-5 font-light text-white backdrop-blur-3xl"
        style={{
          fontFamily: 'var(--font-sans)',
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {icon && <Icon icon={icon} />}
        {label}
      </span>
    </button>
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
    <button className="relative inline-flex w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff56cd_0%,#393BB2_50%,#ff56cd_100%)]" />
      <span className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 p-3 text-white backdrop-blur-3xl">
        <Icon icon={icon} fontSize={fontSize || 25} />
      </span>
    </button>
  );
};

const Button = {
  Text: ButtonWithText,
  Icon: ButtonIcon,
};

export default Button;
