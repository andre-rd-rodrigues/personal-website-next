import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^react$': '<rootDir>/node_modules/react/index.js',
    '^react-dom$': '<rootDir>/node_modules/react-dom/index.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/__tests__/utils/',
    '<rootDir>/__tests__/__mocks__/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.vercel/'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
};

async function jestConfig() {
  const nextConfig = await createJestConfig(config)();
  // next-intl v4 is ESM-only; its transitive deps (@formatjs/*, use-intl,
  // intl-messageformat) are too. Override the transform-ignore patterns so
  // Jest transforms them via SWC instead of choking on bare `export`.
  nextConfig.transformIgnorePatterns = [
    '/node_modules/(?!.pnpm)/',
    '/node_modules/.pnpm/(?!(next-intl|use-intl|intl-messageformat|@formatjs\\+|geist))',
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return nextConfig;
}

export default jestConfig;
