import React, { ReactNode } from 'react';
import Image from 'next/image';
import styles from './card.module.scss';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  footer?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  footer,
  imageUrl,
}) => {
  return (
    <div
      className={`${styles.container} rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-2xl`}
    >
      <CardContainer className="inter-var">
        <CardBody className="group/card border-1 relative h-auto w-auto p-8 md:p-12 md:text-left">
          <CardItem translateZ="60" className="relative mb-4 h-40 w-full">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="group-hover"
            />
          </CardItem>
          <CardItem
            as="h3"
            translateZ="70"
            className="my-5 w-full text-center text-4xl font-light sm:text-start"
            style={{
              fontFamily: 'var(--font-jost)',
            }}
          >
            {title}
          </CardItem>
          <div className="flex flex-col justify-between">
            <CardItem translateZ="30" as="p">
              {description}
            </CardItem>
            <CardItem translateZ="55" className="mt-7 w-full">
              {footer}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default Card;
