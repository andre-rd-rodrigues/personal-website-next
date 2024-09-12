import React from 'react';
import styles from './applink.module.scss';
import { Link } from '@/navigation';

type LinkHref =
  | '/'
  | '/blog'
  | '/about'
  | '/portfolio'
  | '/portfolio/websites'
  | '/portfolio/apps'
  | '/contacts'
  | '/skills';

interface AppLinkProps {
  label: string;
  href: LinkHref;
}

const AppLink: React.FC<AppLinkProps> = ({ label, href }) => {
  const getStyle = () => {
    if (label.toLowerCase() === 'read now') {
      return `${styles.appLink} ${styles.readNow}`;
    }

    return `${styles.appLink}`;
  };

  const style = getStyle();

  return (
    <Link className={style} href={href}>
      {label}
    </Link>
  );
};

export default AppLink;
