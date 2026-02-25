import '@testing-library/jest-dom';
import React from 'react';

class MockIntersectionObserver {
  observe = (): null => null;
  disconnect = (): null => null;
  unobserve = (): null => null;
  takeRecords = (): IntersectionObserverEntry[] => [];
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
}
global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(
    props: React.ComponentProps<'img'> & { fill?: boolean },
  ) {
    const { src, alt, fill: _fill, ...rest } = props;
    return React.createElement('img', { src, alt, ...rest });
  },
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: jest.fn(),
}));
