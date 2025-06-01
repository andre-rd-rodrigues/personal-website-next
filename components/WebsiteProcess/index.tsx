import { useTranslations } from 'next-intl';
import ProcessStep from './ProcessStep';
import useTranslation from '@/hooks/useTranslation';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  motion,
} from '@/motion/motionVariants';

export default function WebsiteProcess() {
  const t = useTranslations('website_process');
  const { getTranslationsArray } = useTranslation();

  const steps = getTranslationsArray('website_process.steps');

  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 py-16 backdrop-blur-2xl">
      <motion.div
        variants={containerVariant}
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeInSlideLeftVariant}
          className="mb-7 text-center text-6xl font-extralight"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          variants={fadeInSlideLeftVariant}
          className="m-auto mb-16 max-w-3xl text-center text-lg"
        >
          {t('description')}
        </motion.p>
        <motion.div className="grid gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.span variants={fadeInSlideInVariant} key={index}>
              <ProcessStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
