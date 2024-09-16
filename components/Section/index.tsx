import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Section({ children }: Props) {
  return <div className="my-20 md:my-32">{children}</div>;
}

export default Section;
