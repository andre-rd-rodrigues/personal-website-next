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
  subtitle?: string;
  description: string;
  features: string[];
  cta?: ReactNode;
  price: string;
  extras?: string[];
}

function PricingCard({
  title,
  subtitle,
  description,
  features,
  cta,
  price,
  extras,
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
              className="mb-4 text-2xl text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {title}
            </CardItem>
            <CardItem translateZ="30" as="p" className="text-base">
              {description}
            </CardItem>
            <CardItem
              as="p"
              translateZ="70"
              className="text-pink mt-7 text-5xl font-medium"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {price}
            </CardItem>
            {subtitle && (
              <CardItem
                as="p"
                translateZ="70"
                className="text-sm"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                {subtitle}
              </CardItem>
            )}
            <CardItem translateZ="55" className="mb-12 mt-7 w-full text-center">
              {cta}
            </CardItem>
          </div>
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

          {extras && (
            <>
              <hr className="my-7 text-gray-300" />
              <p className="font- mb-4 text-base text-[var(--color-primary)]">
                Ofertas
              </p>
              <ul className="space-y-3">
                {extras.map((feature, index) => (
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
            </>
          )}
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
