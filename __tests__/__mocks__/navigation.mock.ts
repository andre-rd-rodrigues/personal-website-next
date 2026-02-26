/**
 * Reusable mock for @/navigation (useRouter).
 * Import mockBack to assert on back() calls in tests.
 *
 * @example
 * import { mockBack } from '@/__tests__/__mocks__/navigation.mock';
 * jest.mock('@/navigation', () =>
 *   require('@/__tests__/__mocks__/navigation.mock').mockNavigationModule(),
 * );
 *
 * beforeEach(() => mockBack.mockClear());
 * expect(mockBack).toHaveBeenCalled();
 */
export const mockBack = jest.fn();

export const mockNavigationModule = () => ({
  ...jest.requireActual('@/navigation'),
  useRouter: () => ({ back: mockBack }),
});
