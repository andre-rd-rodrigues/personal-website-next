import React, { ReactNode } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="text-white md:p-20">
      <h3 className="mb-4 text-5xl font-extralight md:mb-12 md:w-4/5 md:text-7xl">
        {title}
      </h3>
      <div className="md:w-4/5">{subtitle}</div>
    </div>
  );
};

export default HeroSection;
