import Button from '@/components/Button';
import Card from '@/components/Card';
import PageContainer from '@/components/PageContainer/PageContainer';
import useTranslation from '@/hooks/useTranslation';
import { useTranslations } from 'next-intl';
import {
  fadeInVariant,
  fadeInSlideLeftVariant,
  motion,
} from '@/motion/motionVariants';

const Pricing = () => {
  const t = useTranslations('pricing');
  const t_button = useTranslations('buttons');
  const { getTranslationsArray } = useTranslation();

  return (
    <PageContainer>
      <div className="m-auto max-w-2xl text-center">
        <motion.h2
          variants={fadeInSlideLeftVariant}
          initial="hidden"
          whileInView="visible"
          className="mb-10 text-center text-6xl text-[var(--color-primary)]"
          viewport={{ once: true }}
        >
          {t('packs.title')}
        </motion.h2>
        <motion.p
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t('packs.description')}
        </motion.p>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card.Pricing
          title={t('packs.starter.title')}
          price={t('packs.starter.price')}
          description={t('packs.starter.description')}
          features={getTranslationsArray('pricing.packs.starter.features')}
          cta={
            <Button.Text
              className="w-full"
              label={t_button('getStarted')}
              fullWidth
              hover={false}
            />
          }
        />
        <Card.Pricing
          title={t('packs.professional.title')}
          price={t('packs.professional.price')}
          description={t('packs.professional.description')}
          features={getTranslationsArray('pricing.packs.professional.features')}
          cta={
            <Button.Text
              className="w-full"
              label={t_button('select')}
              fullWidth
              hover={false}
            />
          }
        />
        <Card.Pricing
          title={t('packs.premium.title')}
          price={t('packs.premium.price')}
          description={t('packs.premium.description')}
          features={getTranslationsArray('pricing.packs.premium.features')}
          cta={
            <Button.Text
              className="w-full"
              label={t_button('select')}
              fullWidth
              hover={false}
            />
          }
        />
        <Card.Pricing
          title={t('packs.enterprise.title')}
          price={t('packs.enterprise.price')}
          description={t('packs.enterprise.description')}
          features={getTranslationsArray('pricing.packs.enterprise.features')}
          cta={
            <Button.Text
              className="w-full"
              label={t_button('send_message')}
              fullWidth
              hover={false}
            />
          }
        />
      </div>
    </PageContainer>
  );
};

export default Pricing;
