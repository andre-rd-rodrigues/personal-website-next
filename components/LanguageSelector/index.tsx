import { useLocale } from 'next-intl';
import styles from './language.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname, useRouter } from '@/navigation';
import { ChangeEvent } from 'react';

const LanguageSelector = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    router.push(pathname, { locale: selectedLanguage });
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <Icon icon="ph:globe-thin" fontSize={30} color="white" />
      <select
        onChange={handleChangeLanguage}
        value={locale}
        suppressHydrationWarning
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
