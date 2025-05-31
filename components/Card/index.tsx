import React, { ReactNode } from 'react';
import Image from 'next/image';
import styles from './card.module.scss';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { Icon } from '@iconify/react';
import ICONS from '@/constants/icons.constants';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  footer?: ReactNode;
}

const BasicCard: React.FC<CardProps> = ({
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

interface PricingCardProps {
  title: string;
  description: string;
  features: string[];
  cta?: ReactNode;
  price: string;
}

function PricingCard({
  title,
  description,
  features,
  cta,
  price,
}: PricingCardProps) {
  return (
    <div
      className={`${styles.container} rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-2xl`}
    >
      <CardContainer className="inter-var">
        <CardBody className="group/card relative h-auto w-auto p-8 md:p-12">
          <div className="mb-6">
            <CardItem
              as="h2"
              translateZ="70"
              className="m-auto text-2xl text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {title}
            </CardItem>
            <CardItem
              as="h3"
              translateZ="70"
              className="text-pink m-auto mb-8 mt-4 text-5xl font-medium"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {price}
            </CardItem>
            <CardItem translateZ="30" as="p" className="text-center">
              {description}
            </CardItem>
            <CardItem translateZ="55" className="mb-12 mt-7 w-full text-center">
              {cta}
            </CardItem>
          </div>
          {/*  <hr className="my-8 border-t border-gray-400" /> */}
          <div className="mt-6">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-base">
                  <Icon
                    icon={ICONS.check}
                    className="text-[var(--color-primary)]"
                    fontSize={19}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}

const Card = {
  Basic: BasicCard,
  Pricing: PricingCard,
};

export default Card;
