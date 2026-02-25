# AGENTS.md

This file provides essential information for AI agents working on this codebase.

## 📋 Project Overview

**Project Name:** `andre-website`  
**Type:** Personal portfolio website  
**Framework:** Next.js 16.x (App Router)  
**Language:** TypeScript  
**Package Manager:** pnpm (>=9)  
**Node.js:** >=22

**Live Sites:**

- Website: https://www.andrerodrigo.com
- Blog: https://www.blog.andrerodrigo.com

## 🚀 Quick Start

### Development Environment

- Use `pnpm install` to install dependencies
- Run `pnpm dev` to start the development server (webpack)
- Check the `name` field in `package.json` to confirm the project name: `andre-website`
- Node.js version requirement: `>=22`, pnpm version: `>=9`

### Getting Full Context

For comprehensive codebase context, refer to **`repomix-output.xml`** in the project root. This file contains:

- Complete directory structure
- Full contents of 133+ source files
- Project configuration files
- Translation files
- Component implementations

The repomix file is organized with:

1. File summary and usage guidelines
2. Complete directory structure
3. All source files with their full contents

**Note:** The repomix file is read-only. Always make changes to the original repository files, not the packed version.

## 🏗️ Tech Stack

### Core Framework & Libraries

- **Next.js 16.x** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.5.x** - Type safety
- **next-intl 3.19.x** - Internationalization (i18n)
- **Tailwind CSS 3.3.x** - Utility-first CSS framework
- **Sass/SCSS** - CSS preprocessing

### Key Dependencies

- **framer-motion 11.0.3** - Animations
- **@iconify/react** - Icon library
- **@typeform/embed-react** - Form embeds
- **chart.js & react-chartjs-2** - Data visualization
- **swiper** - Touch sliders
- **graphql & graphql-request** - GraphQL client
- **@vercel/speed-insights** - Performance monitoring

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **knip** - Dead code detection
- **@next/bundle-analyzer** - Bundle analysis

## 📂 Project Structure

```
/app/[locale]/          # Internationalized routes (en, pt)
  ├── about/            # About page
  ├── blog/             # Blog pages
  ├── contacts/         # Contact page
  ├── portfolio/        # Portfolio pages
  │   ├── web/         # Web projects
  │   └── mobile/      # Mobile projects
  ├── pricing/         # Pricing page
  ├── faqs/            # FAQs page
  └── page.tsx         # Homepage

/components/            # Reusable React components
  ├── Button/          # Button variants (Text, Icon, Minimal)
  ├── Card/            # Card components
  ├── Navbar/          # Navigation bar
  ├── Footer/          # Footer component
  ├── Hero/            # Hero sections
  ├── Testimonials/    # Testimonial slider
  └── ui/              # UI components (3d-card, compare, etc.)

/constants/             # Constant definitions (incl. design-tokens.constants.ts)
/data/                  # Static data (projects, expertise)
/hooks/                 # Custom React hooks
/i18n/                  # next-intl request config (i18n/request.ts)
/messages/              # i18n translation files (en.json, pt.json)
/metadata/              # SEO metadata utilities
/motion/                # Framer Motion animation variants
/public/                # Static assets (images, videos, fonts)
/utils/                 # Utility functions
```

## 🎯 Key Conventions

### File Naming

- Components: PascalCase (e.g., `Button.tsx`, `Navbar.tsx`)
- Utilities: camelCase (e.g., `post.utils.ts`)
- Constants: camelCase with `.constants.ts` suffix
- Styles: kebab-case with `.module.scss` suffix

### Import Paths

- Use `@/` alias for root imports (configured in `tsconfig.json`)
- Example: `import Button from '@/components/Button'`
- Example: `import { EXPERTISE } from '@/data/info.data'`

### Component Structure

- Components are typically in their own folders with `index.tsx`
- Some components have multiple variants (e.g., `Button.Text`, `Button.Icon`, `Button.Minimal`)
- Use `'use client'` directive for client components

### Internationalization

- All user-facing text should use `next-intl`
- Translation keys are in `/messages/en.json` and `/messages/pt.json`
- Use `useTranslations()` hook in client components: `const t = useTranslations()`
- Use `getTranslations()` from `next-intl/server` in server components
- Locale config and message loading: `i18n/request.ts` (used by next-intl plugin in `next.config.mjs`)
- Route definitions and localized pathnames: `navigation.ts` (re-exports `Link`, `useRouter`, `usePathname` from next-intl)
- Locale type: `locale.types.ts` (e.g. `Locale`); routes are locale-prefixed: `/en/about`, `/pt/about`

### Styling

- **Tailwind CSS** for utility classes
- **SCSS Modules** for component-specific styles
- Global styles in `app/[locale]/globals.scss`
- Use CSS modules: `import styles from './component.module.scss'`

### Animations

- Framer Motion variants defined in `/motion/motionVariants.ts`
- Common patterns: `fadeInVariant`, `fadeInSlideInVariant`, `containerVariant`
- Use `whileInView` for scroll-triggered animations

## 📝 Important Files

### Configuration

- `next.config.mjs` - Next.js configuration (next-intl plugin points to `./i18n/request.ts`)
- `tsconfig.json` - TypeScript configuration (path aliases: `@/*`)
- `.eslintrc.js` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `tailwind.config.ts` - Tailwind CSS configuration
- `i18n/request.ts` - Internationalization (locale resolution, message loading); no root `middleware.ts` (next-intl uses request config)

### Key Source Files

- `app/[locale]/layout.tsx` - Root layout with NextIntlClientProvider
- `app/[locale]/page.tsx` - Homepage
- `app/[locale]/blog/[slug]/page.tsx` and `BlogPostClient.tsx` - Blog post (server + client)
- `data/info.data.tsx` - Project data and expertise definitions
- `constants/testimonials.constants.ts` - Testimonial data
- `constants/design-tokens.constants.ts` - Breakpoints, colors (aligned with Tailwind/SCSS)
- `metadata/metadata.utils.ts` - SEO metadata generation
- `navigation.ts` - Localized route pathnames and navigation (Link, useRouter, usePathname)
- `locale.types.ts` - Locale type used across app and i18n

## 🧪 Testing & Quality

### Upgrade safety (smoke tests)

When upgrading any dependency (next, react, next-intl, framer-motion, swiper, etc.):

1. **Before upgrading:** run `pnpm test` and confirm all tests pass.
2. **Upgrade** the library (e.g. `pnpm add next@latest`).
3. **After upgrading:** run `pnpm test` again. If all pass, the upgrade is likely safe; if something fails, the new version probably introduced a breaking change.

Smoke tests live in `__tests__/smoke/smoke.test.tsx` and cover core components and key libraries. For Swiper and the language selector, do a quick manual check in the browser after upgrading.

### Pre-commit Checks

The project uses Husky with lint-staged to automatically run:

- ESLint (`eslint --fix`)
- Prettier (`prettier --write`)
- TypeScript type checking (`tsc --noEmit`)

**Note:** Use `pnpm run <script>` or `pnpm <script>` for all commands.

### Available Scripts

- `pnpm dev` - Start development server (webpack)
- `pnpm build` - Build for production (includes image pipeline; uses Turbopack)
- `pnpm build:ci` - Build for CI (no image optimization)
- `pnpm start` - Start production server
- `pnpm test` - Run all tests (unit + smoke); **run before/after upgrades to feel safe**
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm lint:strict` - Lint all files strictly
- `pnpm prettier` - Format all files with Prettier
- `pnpm type-check` - Type check without emitting files
- `pnpm analyze` - Analyze bundle size
- `pnpm knip` - Find unused code

### CI/CD

- CI configuration: `.github/workflows/ci.yml` (uses pnpm, Node 22)
- Always run `pnpm lint`, `pnpm prettier`, and `pnpm type-check` before committing
- Ensure `pnpm build` (or `pnpm build:ci` in CI) passes before pushing
- All CI checks must pass before merging

## 🔄 Common Workflows

### Adding a New Page

1. Create route in `app/[locale]/[page-name]/page.tsx`
2. Add layout if needed: `app/[locale]/[page-name]/layout.tsx`
3. Add translations to `messages/en.json` and `messages/pt.json`
4. Update `navigation.ts` if needed
5. Add metadata using `getMetadata()` from `metadata/metadata.utils.ts`

### Adding a New Component

1. Create component folder in `components/[ComponentName]/`
2. Create `index.tsx` with the component
3. Add styles if needed: `component.module.scss`
4. Export from component: `export default ComponentName`
5. Import using `@/components/ComponentName`

### Adding Translations

1. Add keys to `messages/en.json` and `messages/pt.json`
2. Use nested structure: `"section.key": "value"`
3. Access via `t('section.key')` in components

### Working with Images

- Place images in `public/images/`
- Use Next.js `Image` component for optimization
- Reference as `/images/filename.webp`
- Profile images: `public/images/profile.webp`, `public/images/profile_home.webp`

## 📋 PR Instructions

### Commit Guidelines

- Title format: `[personal-website] <Title>` or `[andre-website] <Title>`
- Always run `pnpm lint`, `pnpm prettier`, and `pnpm type-check` before committing
- The project uses Husky with lint-staged, which will automatically run checks on pre-commit
- Ensure the build passes: `pnpm build` before pushing
- The commit should pass all CI checks (ESLint, Prettier, TypeScript, Build) before merging

### Code Style

- Follow ESLint and Prettier configurations
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

## 🐛 Troubleshooting

### Common Issues

- **Import errors**: Check `tsconfig.json` paths configuration
- **i18n not working**: Verify locale in route; check `i18n/request.ts` and `navigation.ts` for pathnames
- **Styles not applying**: Check if using CSS modules correctly
- **Build failures**: Run `bun type-check` to identify TypeScript errors
- **Lint errors**: Run `bun lint:fix` to auto-fix issues

### Getting Help

- Check `repomix-output.xml` for full codebase context
- Review existing components for patterns
- Check `README.md` for project overview
- Review `.github/workflows/ci.yml` for CI requirements

## 📚 Additional Resources

- **Full Codebase Context**: See `repomix-output.xml` for complete repository snapshot
- **Project README**: See `README.md` for user-facing documentation
- **Next.js Docs**: https://nextjs.org/docs
- **next-intl Docs**: https://next-intl-docs.vercel.app/
