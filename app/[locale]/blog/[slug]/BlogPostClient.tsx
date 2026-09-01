'use client';

import styles from '@/assets/styles/pages/blog.module.scss';
import Container from '@/components/Container';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ICONS from '@/constants/icons.constants';
import { useRouter } from '@/navigation';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import parser from 'react-html-parser';
import type { Post } from '@/types/blog';
import { motion } from 'framer-motion';
import { fadeInVariant } from '@/motion/motionVariants';
import { IMAGE_DATA_BLUR_URL } from '@/constants/common.constants';
import { useEffect, useState } from 'react';
import {
  extractArticleFaqs,
  injectHeaderIds,
  type ArticleFaq,
} from '@/utils/post.utils';
import ContentNavigator from '@/components/ContentNavigator';
import { FAQItem } from '@/components/Faqs';

export type Heading = { text: string | null; id: string; level: number };

type HtmlParserNode = {
  type?: string;
  attribs?: Record<string, string>;
};

type BlogPostClientProps = {
  post: Post;
};

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [enhancedPost, setEnhancedPost] = useState<{
    html: string;
    headings: Heading[];
    faqs: ArticleFaq[];
  } | null>(null);

  const { title, publishedDate, content, coverPhoto, category } = post;
  const router = useRouter();

  useEffect(() => {
    if (!content?.html) return;
    const { html: htmlWithFaqPlaceholder, faqs } = extractArticleFaqs(
      content.html,
    );
    const { html, headings } = injectHeaderIds(htmlWithFaqPlaceholder);
    const update = () => setEnhancedPost({ html, headings, faqs });
    queueMicrotask(update);
  }, [content?.html]);

  if (!enhancedPost) {
    return (
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          className="flex min-h-[60vh] items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-[var(--color-primary)] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <p className="text-white/60">Loading article...</p>
          </div>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container>
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        animate="visible"
        className={styles.container}
      >
        <TracingBeam>
          <Icon
            icon={ICONS.arrow}
            fontSize={30}
            color="white"
            className="rotate-180 cursor-pointer opacity-50"
            onClick={() => router.back()}
          />
          <h1 className="my-8 text-5xl">{title}</h1>
          <div className={styles.headerImage}>
            <Image
              src={coverPhoto?.url ?? ''}
              alt={title ?? 'André Rodrigo'}
              fill
              className="rounded-lg object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_DATA_BLUR_URL}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal uppercase opacity-80">
              {category}
            </p>
            <p className="text-sm font-normal opacity-80">{publishedDate}</p>
          </div>
          <div className={styles.content}>
            {parser(enhancedPost.html, {
              transform: (node: HtmlParserNode, index: number) => {
                if (
                  node.type !== 'tag' ||
                  node.attribs?.['data-blog-faqs'] === undefined
                ) {
                  return undefined;
                }

                return (
                  <div key={`article-faqs-${index}`} className="mt-8">
                    {enhancedPost.faqs.map((faq) => (
                      <FAQItem
                        key={faq.question}
                        question={faq.question}
                        answer={parser(faq.answerHtml)}
                      />
                    ))}
                  </div>
                );
              },
            })}
          </div>
        </TracingBeam>
        <ContentNavigator headings={enhancedPost.headings} />
      </motion.div>
    </Container>
  );
}
