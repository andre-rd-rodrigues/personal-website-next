import { Locale } from '@/locale.types';

export type MetadataProps = {
  params: { locale: Locale; slug?: string };
};

export type MetadataPage =
  | 'home'
  | 'about'
  | 'portfolio'
  | 'contacts'
  | 'skills';
