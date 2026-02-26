/**
 * Reusable mock for @/hooks/useFetch.
 * Import mockUseFetch to control return values in tests.
 *
 * @example
 * import { mockUseFetch } from '@/__tests__/__mocks__/useFetch.mock';
 * jest.mock('@/hooks/useFetch', () =>
 *   require('@/__tests__/__mocks__/useFetch.mock').mockUseFetchModule(),
 * );
 *
 * beforeEach(() => mockUseFetch.mockReset());
 * mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });
 */
export const mockUseFetch = jest.fn();

export const mockUseFetchModule = () => ({
  __esModule: true,
  default: (query: unknown, params?: unknown) => mockUseFetch(query, params),
});
