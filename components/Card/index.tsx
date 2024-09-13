import React, { ReactNode } from 'react';
import Image from 'next/image';
import styles from './card.module.scss';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  footer: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  footer,
  imageUrl,
}) => {
  return (
    <div
      className={`${styles.container} border-1 relative h-full rounded-lg border-gray-800 bg-gray-800 bg-opacity-10 p-8 shadow-lg backdrop-blur-[40px] md:p-12 md:text-left`}
    >
      <div className="relative mb-4 h-40 w-full">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="contain" />
      </div>
      <h2 className="my-5 text-5xl font-light">{title}</h2>
      <div className="flex flex-col justify-between">
        <p>{description}</p>
        <div className="mt-4 w-full">{footer}</div>
      </div>
    </div>
  );
};

export default Card;
