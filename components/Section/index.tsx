import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Section({ children, className }: Props) {
  return <div className={`${className} my-20 md:my-32`}>{children}</div>;
}

export default Section;
