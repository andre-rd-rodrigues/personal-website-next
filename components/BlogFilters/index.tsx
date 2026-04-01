'use client';

import { Icon } from '@iconify/react';
import ICONS from '@/constants/icons.constants';
import { useTranslations } from 'next-intl';

type BlogFiltersProps = {
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
};

const PILL_BASE =
  'cursor-pointer rounded-full border px-5 py-2 text-sm transition-all duration-300';
const PILL_ACTIVE = 'border-pink text-white';
const PILL_INACTIVE =
  'border-gray-800 bg-gray-800/10 text-white hover:bg-gray-800/30';

export default function BlogFilters({
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: BlogFiltersProps) {
  const t = useTranslations('blogFilters');

  return (
    <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`${PILL_BASE} ${activeCategory === 'all' ? PILL_ACTIVE : PILL_INACTIVE}`}
          onClick={() => onCategoryChange('all')}
        >
          {t('all')}
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`${PILL_BASE} ${activeCategory === cat ? PILL_ACTIVE : PILL_INACTIVE}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:max-w-xs">
        <Icon
          icon={ICONS.search}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-300"
          width={18}
          height={18}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-full border border-gray-800 bg-gray-800/10 py-2 pl-11 pr-4 text-sm text-white placeholder-gray-400 backdrop-blur-[40px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink"
        />
      </div>
    </div>
  );
}
