import React, { ReactNode } from 'react';
import styles from './card.module.scss';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

interface PricingCardProps {
  title: string;
  description: string;
  footer?: ReactNode;
}

function PricingCard({ title, description, footer }: PricingCardProps) {
  return (
    <div
      className={`${styles.container} rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-2xl`}
    >
      <CardContainer className="inter-var">
        <CardBody className="group/card border-1 relative h-auto w-auto p-8 md:p-12 md:text-left">
          <CardItem
            as="h2"
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
}

export default PricingCard;
