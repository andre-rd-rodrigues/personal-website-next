import React from 'react';
import TESTIMONIALS from '@/constants/testimonials.constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2000,
      }}
      modules={[Autoplay, Pagination]}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >
      {TESTIMONIALS.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard item={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Testimonials;

const TestimonialCard = ({
  item,
}: {
  item: {
    client_name: string;
    client_details: string;
    picture_path: string;
    review: string;
  };
}) => {
  const t = useTranslations('testimonials');
  return (
    <blockquote
      className="relative mb-6 w-full rounded-2xl border border-gray-800 px-8 py-6"
      key={item.client_details}
    >
      <p className="text-md relative z-20 font-light leading-[1.6]">
        &quot;{t(item.review)}&quot;
      </p>
      <div className="relative z-20 mt-6 flex flex-row items-center gap-5">
        <div className="relative mt-4 h-16 w-16 overflow-hidden">
          <Image
            src={item.picture_path}
            alt="Personal Picture"
            fill
            className="rounded-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="leading-[1.6]">{item.client_name}</p>
          <p className="text-sm font-light italic leading-[1.6]">
            {t(item.client_details)}
          </p>
        </div>
      </div>
    </blockquote>
  );
};
