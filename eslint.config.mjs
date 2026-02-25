import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  { rules: eslintConfigPrettier.rules },
  {
    rules: {
      'prefer-const': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
    },
  },
  {
    files: ['__tests__/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    '.vercel/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '*.css',
    'dist/**',
    'esm/**',
    'public/**',
    'tests/**',
    'scripts/**',
    '*.config.js',
    '*.config.cjs',
    'coverage/**',
    'node_modules/**',
  ]),
]);
