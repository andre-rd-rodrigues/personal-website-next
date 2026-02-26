import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import useTranslation from '@/hooks/useTranslation';

function TestComponent() {
  const { getTranslationsArray } = useTranslation();
  const words = getTranslationsArray('homepage.rebrand_hero.flipWords.words');
  const notArray = getTranslationsArray('homepage.subtitle');
  return (
    <div>
      <span data-testid="words">{words.join(',')}</span>
      <span data-testid="not-array-length">{notArray.length}</span>
    </div>
  );
}

describe('useTranslation', () => {
  let consoleError: jest.SpyInstance;
  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockRestore();
  });

  it('returns array for nested key that points to an array (en)', () => {
    renderWithIntl(<TestComponent />);
    expect(screen.getByTestId('words').textContent).toBe(
      'modern,user-focused,engaging',
    );
  });

  it('returns empty array for key that is not an array', () => {
    renderWithIntl(<TestComponent />);
    expect(screen.getByTestId('not-array-length').textContent).toBe('0');
  });

  it('returns pt array when locale is pt', () => {
    renderWithIntl(<TestComponent />, { locale: 'pt' });
    expect(screen.getByTestId('words').textContent).toBe(
      'moderno,profissional,intuitivo',
    );
  });
});
