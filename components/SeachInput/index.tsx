import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FAQItem } from '../Faqs';
import { Icon } from '@iconify/react';
import ICONS from '@/constants/icons.constants';

type FAQ = {
  question: string;
  answer: string;
};

export default function FaqSearch({ faqs }: { faqs: FAQ[] }) {
  const t = useTranslations('faqs');

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>(faqs);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);

    if (input.trim() === '') {
      setSuggestions([]);
      setFilteredFaqs(faqs);
      return;
    }

    const matches = faqs
      .filter((faq) => faq.question.toLowerCase().includes(input.toLowerCase()))
      .map((faq) => faq.question);

    setSuggestions(matches.slice(0, 5)); // limit to 5 suggestions
  };

  const handleSuggestionClick = (question: string) => {
    setSearch(question);
    setSuggestions([]);
    const selected = faqs.filter((faq) => faq.question === question);
    setFilteredFaqs(selected);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const matches = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredFaqs(matches);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeIndex]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative" role="search">
        <div className="relative w-full">
          <Icon
            icon={ICONS.search}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            fontSize={16}
          />

          <input
            type="text"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            aria-autocomplete="list"
            aria-controls="search-suggestion-list"
            aria-expanded={suggestions.length > 0}
            className="w-full rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 py-2 pl-10 pr-4 text-white backdrop-blur-2xl focus:outline-none focus:ring-2"
          />

          {suggestions.length > 0 && (
            <ul
              id="search-suggestion-list"
              role="listbox"
              className="absolute z-10 mt-1 w-full rounded-lg bg-zinc-800 shadow-md"
            >
              {suggestions.map((suggestion: string, idx: number) => (
                <li
                  key={idx}
                  role="option"
                  aria-selected={activeIndex === idx}
                  tabIndex={-1}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    activeIndex === idx ? 'bg-zinc-700' : 'hover:bg-zinc-700'
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      <div className="mt-16 space-y-6">
        {filteredFaqs.length === 0 ? (
          <div className="text-center">
            <h3 className="mb-5 text-4xl font-light">
              {t('noQuestionFound.title')}
            </h3>
            <p>{t('noQuestionFound.description')}</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))
        )}
      </div>
    </div>
  );
}
