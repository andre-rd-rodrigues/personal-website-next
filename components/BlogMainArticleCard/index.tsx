import type { PostSummary } from '@/types/blog';
import ICONS from '@/constants/icons.constants';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../Button';

type Props = {
  post: PostSummary;
  onCategoryClick?: (category: string) => void;
};

const BlogMainArticleCard = ({ post, onCategoryClick }: Props) => {
  const t = useTranslations('buttons');
  const tFilters = useTranslations('blogFilters');
  const { title, description, publishedDate, category, coverPhoto, slug } =
    post;

  return (
    <article className="block rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-[40px]">
      <div>
        <div className="group/card border-1 relative flex flex-wrap gap-10 rounded-lg p-8 md:flex-nowrap md:p-12">
          <Link
            href={{ pathname: '/blog/[slug]', params: { slug } }}
            aria-label={title}
            className="absolute inset-0 z-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          />

          <div>
            <div className="flex gap-5 text-pink">
              {onCategoryClick ? (
                <button
                  type="button"
                  aria-label={tFilters('filterByCategory', { category })}
                  onClick={() => onCategoryClick(category)}
                  className="relative z-20 rounded-sm text-sm font-normal uppercase text-pink underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  {category}
                </button>
              ) : (
                <p className="text-sm font-normal uppercase text-pink">
                  {category}
                </p>
              )}
              |<p className="text-sm font-normal text-pink">{publishedDate}</p>
            </div>
            <div>
              <div
                className="my-5 w-full text-4xl font-light text-white"
                style={{
                  fontFamily: 'var(--font-jost)',
                }}
              >
                {title}
              </div>
              <div className="text-slate-300">{description}</div>
              <div className="mt-7 w-full text-right">
                <Button.Text
                  as="span"
                  icon={ICONS.arrow}
                  label={t('readMore')}
                />
              </div>
            </div>
          </div>

          <div className="relative min-h-48 w-full sm:min-h-full">
            <Image
              src={coverPhoto.url}
              alt={title}
              fill
              className="group-hover rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogMainArticleCard;
