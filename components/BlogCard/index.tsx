import React from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import Image from 'next/image';
import { Post } from '@/app/[locale]/blog/page';
import Button from '../Button';
import { useTranslations } from 'next-intl';
import ICONS from '@/constants/icons.constants';
import { Link } from '@/navigation';

const BlogCard = ({ post }: { post: Post }) => {
  const t = useTranslations('buttons');

  const { title, description, publishedDate, category, coverPhoto, slug } =
    post;

  return (
    <div
      className={`rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-[40px]`}
    >
      <CardContainer className="inter-var">
        <CardBody className="group/card border-1 relative h-auto w-auto rounded-lg p-8 md:p-12 md:text-left">
          <CardItem translateZ="70" className="relative mb-4 h-48 w-full">
            <Image
              src={coverPhoto.url}
              alt={title}
              fill
              className="group-hover rounded-md object-cover"
            />
          </CardItem>

          <div className="flex justify-between">
            <p className="text-pink-500 text-sm font-medium uppercase">
              {category}
            </p>
            <p className="text-pink-500 text-sm font-medium">{publishedDate}</p>
          </div>

          <CardItem
            as="h3"
            translateZ="50"
            className="my-5 w-full text-3xl"
            style={{
              fontFamily: 'var(--font-jost)',
            }}
          >
            {title}
          </CardItem>
          <div className="flex flex-col justify-between">
            <CardItem translateZ="40" as="p" className="text-slate-300">
              {description}
            </CardItem>
            <CardItem translateZ="60" className="mt-7 w-full text-right">
              {/*  @ts-expect-error href does not have the type  */}
              <Link href={`/blog/${slug}`}>
                <Button.Text icon={ICONS.arrow} label={t('readMore')} />
              </Link>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default BlogCard;
