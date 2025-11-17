'use client';
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
import SectionTitle from '@/components/SectionTitle';
import WebsiteProcess from '@/components/WebsiteProcess';
import Section from '@/components/Section';
import Faqs from '@/components/Faqs';

const Pricing = () => {
  const t = useTranslations('pricing');
  const t_button = useTranslations('buttons');
  const { getTranslationsArray } = useTranslation();

  const maintenancePlans = getTranslationsArray('pricing.maintenance.plans');

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

      {/* Pricing Table - Desktop */}
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-24 hidden overflow-x-auto md:block"
      >
        <div className="min-w-full rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-4 backdrop-blur-2xl md:p-6">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-4 text-center text-lg font-normal text-[var(--color-primary)] md:px-6 md:py-6 md:text-xl">
                  {t('packs.starter.title')}
                </th>
                <th
                  className="overflow-hidden border-l border-r border-t border-gray-800 bg-gray-800/10 px-4 py-4 text-center text-lg font-normal text-[var(--color-primary)] md:px-6 md:py-6 md:text-xl"
                  style={{
                    borderTopLeftRadius: '1.5rem',
                    borderTopRightRadius: '1.5rem',
                  }}
                >
                  {t('packs.professional.title')}
                </th>
                <th className="px-4 py-4 text-center text-lg font-normal text-[var(--color-primary)] md:px-6 md:py-6 md:text-xl">
                  {t('packs.premium.title')}
                </th>
                <th className="px-4 py-4 text-center text-lg font-normal text-[var(--color-primary)] md:px-6 md:py-6 md:text-xl">
                  {t('packs.enterprise.title')}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Price Row */}
              <tr className="border-b border-gray-800">
                <td className="px-4 py-4 text-center text-white md:px-6 md:py-6">
                  <div className="font-medium">{t('packs.starter.price')}</div>
                  <div className="text-xs text-white/60">
                    {t('packs.starter.subtitle')}
                  </div>
                </td>
                <td className="overflow-hidden border-l border-r border-gray-800 bg-gray-800/10 px-4 py-4 text-center text-white md:px-6 md:py-6">
                  <div className="font-medium">
                    {t('packs.professional.price')}
                  </div>
                  <div className="text-xs text-white/60">
                    {t('packs.professional.subtitle')}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-white md:px-6 md:py-6">
                  <div className="font-medium">{t('packs.premium.price')}</div>
                  <div className="text-xs text-white/60">
                    {t('packs.premium.subtitle')}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-white md:px-6 md:py-6">
                  <div className="font-medium">
                    {t('packs.enterprise.price')}
                  </div>
                </td>
              </tr>

              {/* Description Row */}
              <tr className="border-b border-gray-800">
                <td className="px-4 py-4 text-center font-normal text-white/80 md:px-6 md:py-6">
                  {t('packs.starter.description')}
                </td>
                <td className="overflow-hidden border-l border-r border-gray-800 bg-gray-800/10 px-4 py-4 text-center font-normal text-white/80 md:px-6 md:py-6">
                  {t('packs.professional.description')}
                </td>
                <td className="px-4 py-4 text-center font-normal text-white/80 md:px-6 md:py-6">
                  {t('packs.premium.description')}
                </td>
                <td className="px-4 py-4 text-center font-normal text-white/80 md:px-6 md:py-6">
                  {t('packs.enterprise.description')}
                </td>
              </tr>

              {/* Features Row */}
              <tr className="border-b border-gray-800">
                <td className="px-4 py-4 align-top text-white/80 md:px-6 md:py-6">
                  <ul className="space-y-1 text-base">
                    {getTranslationsArray('pricing.packs.starter.features').map(
                      (feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-lg text-[var(--color-primary)]">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </td>
                <td className="overflow-hidden border-l border-r border-gray-800 bg-gray-800/10 px-4 py-4 align-top text-white/80 md:px-6 md:py-6">
                  <ul className="space-y-1 text-base">
                    {getTranslationsArray(
                      'pricing.packs.professional.features',
                    ).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-lg text-[var(--color-primary)]">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {getTranslationsArray(
                      'pricing.packs.professional.extras',
                    ).map((extra, idx) => (
                      <li
                        key={`extra-${idx}`}
                        className="flex items-start text-[var(--color-primary)]"
                      >
                        <span className="mr-2 text-lg">+</span>
                        <span>{extra}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4 align-top text-white/80 md:px-6 md:py-6">
                  <ul className="space-y-1 text-base">
                    {getTranslationsArray('pricing.packs.premium.features').map(
                      (feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-lg text-[var(--color-primary)]">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ),
                    )}
                    {getTranslationsArray('pricing.packs.premium.extras').map(
                      (extra, idx) => (
                        <li
                          key={`extra-${idx}`}
                          className="flex items-start text-[var(--color-primary)]"
                        >
                          <span className="mr-2 text-lg">+</span>
                          <span>{extra}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </td>
                <td className="px-4 py-4 align-top text-white/80 md:px-6 md:py-6">
                  <ul className="space-y-1 text-base">
                    {getTranslationsArray(
                      'pricing.packs.enterprise.features',
                    ).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-lg text-[var(--color-primary)]">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

              {/* Action Row */}
              <tr>
                <td className="px-4 py-4 text-center md:px-6 md:py-6">
                  <Button.Text
                    className="w-full"
                    label={t_button('getStarted')}
                    fullWidth
                    hover={false}
                  />
                </td>
                <td
                  className="overflow-hidden border-b border-l border-r border-gray-800 bg-gray-800/10 px-4 py-4 text-center md:px-6 md:py-6"
                  style={{
                    borderBottomLeftRadius: '1.5rem',
                    borderBottomRightRadius: '1.5rem',
                  }}
                >
                  <Button.Text
                    className="w-full"
                    label={t_button('select')}
                    fullWidth
                    hover={false}
                  />
                </td>
                <td className="px-4 py-4 text-center md:px-6 md:py-6">
                  <Button.Text
                    className="w-full"
                    label={t_button('select')}
                    fullWidth
                    hover={false}
                  />
                </td>
                <td className="px-4 py-4 text-center md:px-6 md:py-6">
                  <Button.Text
                    className="w-full"
                    label={t_button('send_message')}
                    fullWidth
                    hover={false}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pricing Cards - Mobile */}
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-24 block space-y-5 md:hidden"
      >
        {/* Starter Pack */}
        <div className="rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-6 backdrop-blur-2xl">
          <h3 className="mb-2 text-center text-2xl font-normal text-[var(--color-primary)]">
            {t('packs.starter.title')}
          </h3>
          <div className="mb-4 text-center">
            <div className="text-3xl font-medium text-white">
              {t('packs.starter.price')}
            </div>
            <div className="text-sm text-white/60">
              {t('packs.starter.subtitle')}
            </div>
          </div>
          <p className="mb-6 text-center text-white/80">
            {t('packs.starter.description')}
          </p>
          <ul className="mb-6 space-y-2 text-white/80">
            {getTranslationsArray('pricing.packs.starter.features').map(
              (feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-lg text-[var(--color-primary)]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6">
            <Button.Text
              className="w-full"
              label={t_button('getStarted')}
              fullWidth
              hover={false}
            />
          </div>
        </div>

        {/* Professional Pack */}
        <div className="rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-6 backdrop-blur-2xl">
          <h3 className="mb-2 text-center text-2xl font-normal text-[var(--color-primary)]">
            {t('packs.professional.title')}
          </h3>
          <div className="mb-4 text-center">
            <div className="text-3xl font-medium text-white">
              {t('packs.professional.price')}
            </div>
            <div className="text-sm text-white/60">
              {t('packs.professional.subtitle')}
            </div>
          </div>
          <p className="mb-6 text-center text-white/80">
            {t('packs.professional.description')}
          </p>
          <ul className="mb-6 space-y-2 text-white/80">
            {getTranslationsArray('pricing.packs.professional.features').map(
              (feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-lg text-[var(--color-primary)]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ),
            )}
            {getTranslationsArray('pricing.packs.professional.extras').map(
              (extra, idx) => (
                <li
                  key={`extra-${idx}`}
                  className="flex items-start text-[var(--color-primary)]"
                >
                  <span className="mr-2 text-lg">+</span>
                  <span>{extra}</span>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6">
            <Button.Text
              className="w-full"
              label={t_button('select')}
              fullWidth
              hover={false}
            />
          </div>
        </div>

        {/* Premium Pack */}
        <div className="rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-6 backdrop-blur-2xl">
          <h3 className="mb-2 text-center text-2xl font-normal text-[var(--color-primary)]">
            {t('packs.premium.title')}
          </h3>
          <div className="mb-4 text-center">
            <div className="text-3xl font-medium text-white">
              {t('packs.premium.price')}
            </div>
            <div className="text-sm text-white/60">
              {t('packs.premium.subtitle')}
            </div>
          </div>
          <p className="mb-6 text-center text-white/80">
            {t('packs.premium.description')}
          </p>
          <ul className="mb-6 space-y-2 text-white/80">
            {getTranslationsArray('pricing.packs.premium.features').map(
              (feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-lg text-[var(--color-primary)]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ),
            )}
            {getTranslationsArray('pricing.packs.premium.extras').map(
              (extra, idx) => (
                <li
                  key={`extra-${idx}`}
                  className="flex items-start text-[var(--color-primary)]"
                >
                  <span className="mr-2 text-lg">+</span>
                  <span>{extra}</span>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6">
            <Button.Text
              className="w-full"
              label={t_button('select')}
              fullWidth
              hover={false}
            />
          </div>
        </div>

        {/* Enterprise Pack */}
        <div className="rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-6 backdrop-blur-2xl">
          <h3 className="mb-2 text-center text-2xl font-normal text-[var(--color-primary)]">
            {t('packs.enterprise.title')}
          </h3>
          <div className="mb-4 text-center">
            <div className="text-3xl font-medium text-white">
              {t('packs.enterprise.price')}
            </div>
          </div>
          <p className="mb-6 text-center text-white/80">
            {t('packs.enterprise.description')}
          </p>
          <ul className="mb-6 space-y-2 text-white/80">
            {getTranslationsArray('pricing.packs.enterprise.features').map(
              (feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-lg text-[var(--color-primary)]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6">
            <Button.Text
              className="w-full"
              label={t_button('send_message')}
              fullWidth
              hover={false}
            />
          </div>
        </div>
      </motion.div>

      {/* Maintenance */}
      <div className="mt-20">
        <SectionTitle title={t('maintenance.title')} color="primary" tag="h2" />

        <motion.p
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t('maintenance.description')}
        </motion.p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {maintenancePlans.map((plan, index) => (
          <Card.Pricing
            key={index}
            title={plan.title}
            subtitle={plan.subtitle}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            cta={<hr className="my-8 border-t border-gray-600" />}
          />
        ))}
      </div>

      {/* Process */}
      <Section>
        <WebsiteProcess />
      </Section>

      {/* Faqs */}
      <Faqs numberOfQuestionsVisible={4} />
    </PageContainer>
  );
};

export default Pricing;
