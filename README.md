# 👨🏽‍💻 Website - André Rodrigo

Welcome to my website! A modern and responsive web application built with Next.js! This project showcases essential pages such as About, Contacts, and Portfolio, where I display my web and mobile projects.

**Website:** https://www.andrerodrigo.com
**Blog:** https://www.blog.andrerodrigo.com

## 🚀 Getting Started

### Prerequisites

- Node.js >=22
- pnpm >=9 ([Install pnpm](https://pnpm.io/installation))

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📂 Project Structure

Here is a brief overview of the project's structure:

```
/app
  └── /[locale]           # Internationalized routes (en, pt)
        ├── /about
        ├── /blog
        │   └── /[slug]
        ├── /contacts
        ├── /portfolio
        │   ├── /web
        │   ├── /mobile
        │   ├── layout.tsx
        │   └── page.tsx
        ├── /pricing
        ├── /faqs
        ├── globals.scss
        ├── layout.tsx
        ├── page.tsx
        └── not-found.tsx

/assets
/components
  ├── /Button, /Card, /Navbar, /Footer
  ├── /ContactBanner, /ImageZoomEffect, /LanguageSelector
  ├── /PageContainer, /ProjectDisplay, /Testimonials
  └── ...

/constants
/data
/hooks
/i18n                    # next-intl config (request.ts)
/messages                # en.json, pt.json
/metadata                # metadata.utils.ts, types.ts
/motion
/public
/utils

navigation.ts            # Localized routes (next-intl)
locale.types.ts
next.config.mjs
package.json
README.md
```

## 🚀 Pages

- **Home**: The landing page with an introduction and links to other sections.
- **About**: Information about me and my background.
- **Contact**: A page with a form to reach out to me.
- **Portfolio**: A showcase of my web and mobile projects, including subcategories for apps and websites.
- **Not Found**: Custom 404 error page.

## 📦 Key Libraries

Here are some of the key libraries used in this project:

- **Next.js 16** – React framework with App Router.
- **next-intl** – Internationalization (en/pt).
- **framer-motion** – Animations.
- **@iconify/react** – Icons.
- **@typeform/embed-react** – Typeform embeds.
- **chart.js & react-chartjs-2** – Charts.
- **swiper** – Touch sliders/carousels.
- **graphql & graphql-request** – GraphQL client for blog.
- **sass** – Styling; **Tailwind CSS** – Utility CSS.
- **@vercel/speed-insights** – Performance monitoring.

## 🛠️ Scripts

Run scripts using pnpm:

- `pnpm dev` – Development server.
- `pnpm build` – Production build (includes image pipeline).
- `pnpm build:ci` – CI build (no image optimization).
- `pnpm start` – Production server.
- `pnpm lint` / `pnpm lint:fix` – ESLint.
- `pnpm type-check` – TypeScript check.
- `pnpm prettier` – Format code.
- `pnpm test` – Run tests.

Enjoy exploring my website and discovering my projects!
