import React from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import Image from 'next/image';
import type { PostSummary } from '@/types/blog';
import Button from '../Button';
import { useTranslations } from 'next-intl';
import ICONS from '@/constants/icons.constants';
import { Link } from '@/navigation';

const BlogCard = ({
  post,
  onCategoryClick,
}: {
  post: PostSummary;
  onCategoryClick?: (category: string) => void;
}) => {
  const t = useTranslations('buttons');
  const tFilters = useTranslations('blogFilters');

  const { title, description, publishedDate, category, coverPhoto, slug } =
    post;

  return (
    <article className="block rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-[40px]">
      <CardContainer className="inter-var">
        <CardBody className="group/card border-1 relative h-auto w-auto rounded-lg p-8 md:p-12 md:text-left">
          <Link
            href={{ pathname: '/blog/[slug]', params: { slug } }}
            aria-label={title}
            className="absolute inset-0 z-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          />

          <CardItem
            translateZ="47"
            className="pointer-events-none relative mb-4 h-48 w-full"
          >
            <Image
              src={coverPhoto.url}
              alt={title}
              fill
              className="group-hover rounded-md object-cover"
            />
          </CardItem>

          <div className="flex items-center justify-between">
            {onCategoryClick ? (
              <button
                type="button"
                aria-label={tFilters('filterByCategory', { category })}
                onClick={() => onCategoryClick(category)}
                className="relative z-20 rounded-sm text-sm font-extralight uppercase text-pink underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                {category}
              </button>
            ) : (
              <p className="text-sm font-extralight uppercase text-pink">
                {category}
              </p>
            )}
            <p className="text-sm font-extralight text-pink">{publishedDate}</p>
          </div>

          <CardItem
            as="h3"
            translateZ="33"
            className="pointer-events-none my-5 w-full text-3xl font-light"
            style={{
              fontFamily: 'var(--font-jost)',
            }}
          >
            {title}
          </CardItem>
          <div className="flex flex-col justify-between">
            <CardItem
              translateZ="27"
              as="p"
              className="pointer-events-none text-slate-300"
            >
              {description}
            </CardItem>
            <CardItem
              translateZ="40"
              className="pointer-events-none mt-7 w-full text-right"
            >
              <Button.Text as="span" icon={ICONS.arrow} label={t('readMore')} />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </article>
  );
};

export default BlogCard;
