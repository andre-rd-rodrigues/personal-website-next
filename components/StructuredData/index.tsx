import { WEBSITE_DOMAIN_URL } from '@/constants/common.constants';
import CONTACTS from '@/constants/contacts.constants';

type StructuredDataProps = {
  locale: string;
};

const StructuredData = ({ locale }: StructuredDataProps) => {
  const personId = `${WEBSITE_DOMAIN_URL}/#person`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'André Rodrigo',
        url: WEBSITE_DOMAIN_URL,
        image: `${WEBSITE_DOMAIN_URL}/images/profile.webp`,
        jobTitle: 'Senior Software Engineer',
        email: `mailto:${CONTACTS.EMAIL}`,
        sameAs: [
          CONTACTS.LINKEDIN,
          CONTACTS.FACEBOOK,
          CONTACTS.INSTAGRAM,
          CONTACTS.GITHUB,
          CONTACTS.LINKTREE,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${WEBSITE_DOMAIN_URL}/#website`,
        url: WEBSITE_DOMAIN_URL,
        name: 'André Rodrigo',
        inLanguage: locale,
        publisher: { '@id': personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
