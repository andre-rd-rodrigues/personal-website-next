import { Post } from '@/app/[locale]/blog/page';
import ICONS from '@/constants/icons.constants';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../Button';

type Props = {
  post: Post;
};

const BlogMainArticleCard = ({ post }: Props) => {
  const t = useTranslations('buttons');
  const { title, description, publishedDate, category, coverPhoto, slug } =
    post;

  return (
    <div
      className={`rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-[40px]`}
    >
      <div>
        <div className="group/card border-1 relative flex flex-wrap gap-10 rounded-lg p-8 md:flex-nowrap md:p-12">
          <div>
            <div className="text-pink-500 flex gap-5">
              <p className="text-pink-500 text-sm font-normal uppercase">
                {category}
              </p>
              |
              <p className="text-pink-500 text-sm font-normal">
                {publishedDate}
              </p>
            </div>
            <div>
              <div
                className="my-5 w-full text-4xl text-white"
                style={{
                  fontFamily: 'var(--font-jost)',
                }}
              >
                {title}
              </div>
              <div className="text-slate-300">{description}</div>
              <div className="mt-7 w-full text-right">
                {/*  @ts-expect-error href does not have the type  */}
                <Link href={`/blog/${slug}`}>
                  <Button.Text icon={ICONS.arrow} label={t('readMore')} />
                </Link>
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
    </div>
  );
};

export default BlogMainArticleCard;
