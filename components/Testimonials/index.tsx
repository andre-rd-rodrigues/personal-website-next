import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import TESTIMONIALS from '@/constants/testimonials.constants';

const Testimonials = () => {
  return <InfiniteMovingCards items={TESTIMONIALS} />;
};

export default Testimonials;
