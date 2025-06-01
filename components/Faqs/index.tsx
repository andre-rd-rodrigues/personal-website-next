import { useState } from 'react';
import { useTranslations } from 'next-intl';
import useTranslation from '@/hooks/useTranslation';
import { Link } from '@/navigation';
import Button from '../Button';
import ICONS from '@/constants/icons.constants';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';

export function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpen(!open)}
        >
          <span className="text-lg font-normal">{question}</span>
          <Icon
            icon={ICONS.arrowMinimal}
            className={`transform text-white transition-transform duration-300 ${
              open ? '-rotate-90' : 'rotate-90'
            }`}
            fontSize={20}
          />
        </button>

        <motion.div
          initial={false}
          animate={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="mt-4 text-base">{answer}</p>
        </motion.div>
      </div>
      <hr className="mb-4 mt-4 border-gray-300 dark:border-zinc-700" />
    </>
  );
}

interface Props {
  numberOfQuestionsVisible?: number;
}

export default function Faqs({ numberOfQuestionsVisible }: Props) {
  const t = useTranslations('faqs');
  const t_button = useTranslations('buttons');

  const { getTranslationsArray } = useTranslation();

  const faqs = getTranslationsArray('faqs.questions');

  const visibleFaqs = numberOfQuestionsVisible
    ? faqs.slice(0, numberOfQuestionsVisible)
    : faqs;

  return (
    <section className="">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-6xl font-extralight">{t('title')}</h2>
            <p className="mb-6 text-base">{t('description')}</p>
            <Link href="/faqs">
              <Button.Text icon={ICONS.arrow} label={t_button('readMore')} />
            </Link>
          </div>

          <div>
            {visibleFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
