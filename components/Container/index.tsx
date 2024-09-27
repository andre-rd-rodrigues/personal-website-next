import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: Props) {
  return (
    <div className={`mx-auto my-12 max-w-7xl px-5 md:my-20 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
