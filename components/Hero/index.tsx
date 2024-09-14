import React, { ReactNode } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={`text-white md:p-20 ${className}`}>
      <h3 className="mb-4 text-5xl font-extralight md:mb-12 md:w-4/5 md:text-7xl">
        {title}
      </h3>
      <div className="md:w-4/5">{subtitle}</div>
    </div>
  );
};

export default HeroSection;
