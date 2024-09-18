import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Section({ children, className }: Props) {
  return <div className={`my-20 md:my-32 ${className}`}>{children}</div>;
}

export default Section;
