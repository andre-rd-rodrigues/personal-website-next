import { Locale } from '@/locale.types';

export type MetadataProps = {
  params: Promise<{ locale: Locale; slug?: string }>;
};
