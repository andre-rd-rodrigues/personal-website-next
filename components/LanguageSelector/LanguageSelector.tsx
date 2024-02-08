import { useLocale } from "next-intl";
import styles from "./language.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "@/navigation";

const LanguageSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    router.push(pathname, { locale: selectedLanguage });
  };

  return (
    <div className={styles.container}>
      <Icon icon="ph:globe-thin" fontSize={30} color="white" />
      <select onChange={handleChangeLanguage} value={locale}>
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
