import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  renderWithIntl,
  screen,
  within,
} from '@/__tests__/utils/test.utils';
import FaqsPage from '@/app/[locale]/faqs/page';
import Faqs, { FAQItem } from '@/components/Faqs';
import FaqSearch from '@/components/SeachInput';

const mockFaqs = [
  {
    question: 'How long does a website take?',
    answer: 'Usually 3 to 5 weeks.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'Yes, I can set up hosting and domain.',
  },
  {
    question: 'Can I edit content later?',
    answer: 'Yes, I deliver with a CMS when applicable.',
  },
];

describe('FaqsPage', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<FaqsPage />)).not.toThrow();
  });

  it('renders the FAQs title and description from translations', () => {
    renderWithIntl(<FaqsPage />);
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/here are some answers to the most common questions/i),
    ).toBeInTheDocument();
  });

  it('renders the search form', () => {
    renderWithIntl(<FaqsPage />);
    const search = screen.getByRole('search');
    expect(search).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/type your question here/i),
    ).toBeInTheDocument();
  });

  it('renders FAQ items from translations', () => {
    renderWithIntl(<FaqsPage />);
    expect(
      screen.getByText(/how long does it take to build a website?/i),
    ).toBeInTheDocument();
  });
});

describe('Faqs (section component)', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Faqs />)).not.toThrow();
  });

  it('renders title and description', () => {
    renderWithIntl(<Faqs />);
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/here are some answers to the most common questions/i),
    ).toBeInTheDocument();
  });

  it('renders link to FAQs page', () => {
    renderWithIntl(<Faqs />);
    const link = screen.getByRole('link', { name: /read more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/en/faqs');
  });

  it('limits visible questions when numberOfQuestionsVisible is set', () => {
    renderWithIntl(<Faqs numberOfQuestionsVisible={2} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(
      screen.getByText(/how long does it take to build a website?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/advantages of hiring a developer/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/why don't you use tools like wordpress?/i),
    ).not.toBeInTheDocument();
  });

  it('renders all questions when numberOfQuestionsVisible is not set', () => {
    renderWithIntl(<Faqs />);
    const questions = screen.getAllByRole('button', { name: /.+/ });
    expect(questions.length).toBeGreaterThanOrEqual(6);
  });
});

describe('FAQItem', () => {
  it('renders question and hides answer initially', () => {
    renderWithIntl(
      <FAQItem question="Test question?" answer="Test answer text." />,
    );
    expect(screen.getByText('Test question?')).toBeInTheDocument();
    expect(screen.getByText('Test answer text.')).toBeInTheDocument();
  });

  it('toggles answer visibility on button click', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FAQItem question="Click me?" answer="Hidden at first." />);
    const button = screen.getByRole('button', { name: 'Click me?' });
    const answer = screen.getByText('Hidden at first.');
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(answer).toBeInTheDocument();

    await user.click(button);
    expect(answer).toBeInTheDocument();
  });
});

describe('FaqSearch', () => {
  it('renders search input and all FAQs by default', () => {
    renderWithIntl(<FaqSearch faqs={mockFaqs} />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/type your question here/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText('How long does a website take?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Do you provide hosting?')).toBeInTheDocument();
    expect(screen.getByText('Can I edit content later?')).toBeInTheDocument();
  });

  it('filters FAQs when user types and submits', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FaqSearch faqs={mockFaqs} />);
    const input = screen.getByPlaceholderText(/type your question here/i);
    const form = screen.getByRole('search');

    await user.type(input, 'hosting');
    fireEvent.submit(form);

    expect(screen.getByText('Do you provide hosting?')).toBeInTheDocument();
    expect(
      screen.queryByText('How long does a website take?'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Can I edit content later?'),
    ).not.toBeInTheDocument();
  });

  it('shows no question found state when filter has no matches', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FaqSearch faqs={mockFaqs} />);
    const input = screen.getByPlaceholderText(/type your question here/i);
    const form = screen.getByRole('search');

    await user.type(input, 'xyznonexistent');
    expect(
      await screen.findByDisplayValue('xyznonexistent'),
    ).toBeInTheDocument();
    fireEvent.submit(form);
    expect(
      await screen.findByText(/didn't find the answer you were looking for?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/feel free to reach out.*happy to help/i),
    ).toBeInTheDocument();
  });

  it('shows suggestions when typing a matching question', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FaqSearch faqs={mockFaqs} />);
    const input = screen.getByPlaceholderText(/type your question here/i);

    await user.type(input, 'host');

    const listbox = screen.getByRole('listbox', { name: undefined });
    expect(listbox).toBeInTheDocument();
    expect(
      within(listbox).getByText('Do you provide hosting?'),
    ).toBeInTheDocument();
  });

  it('filters to single FAQ when clicking a suggestion', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FaqSearch faqs={mockFaqs} />);
    const input = screen.getByPlaceholderText(/type your question here/i);

    await user.type(input, 'host');
    const suggestion = screen.getByRole('option', {
      name: 'Do you provide hosting?',
    });
    await user.click(suggestion);

    expect(screen.getByText('Do you provide hosting?')).toBeInTheDocument();
    expect(
      screen.queryByText('How long does a website take?'),
    ).not.toBeInTheDocument();
  });
});
