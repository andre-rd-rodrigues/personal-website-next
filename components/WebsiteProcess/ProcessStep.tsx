import { Icon } from '@iconify/react';

type ProcessStepProps = {
  icon: string;
  title: string;
  description: string;
};

export default function ProcessStep({
  icon,
  title,
  description,
}: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="mb-4 inline-block">
        <Icon
          icon={icon}
          fontSize={45}
          className="text-[var(--color-primary)]"
        />
      </div>
      <h3 className="mb-4 text-3xl font-normal">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  );
}
