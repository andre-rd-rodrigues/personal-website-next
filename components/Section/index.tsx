import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Section({ children, className }: Props) {
  return <div className={`my-28 md:my-56 ${className}`}>{children}</div>;
}

export default Section;
