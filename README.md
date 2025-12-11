# 👨🏽‍💻 Website - André Rodrigues

Welcome to my website! A modern and responsive web application built with Next.js! This project showcases essential pages such as About, Contacts, and Portfolio, where I display my web and mobile projects.

**Website:** https://www.andrerodrigo.com
**Blog:** https://www.blog.andrerodrigo.com

## 🚀 Getting Started

### Prerequisites
- Node.js >=22
- Bun >=1.0.0 ([Install Bun](https://bun.sh/docs/installation))

### Installation
```bash
# Install dependencies
bun install

# Start development server
bun dev
```

## 📂 Project Structure

Here is a brief overview of the project's structure:

```
plaintextCopiar código
/your-project
│
├── /app
│   ├── /[locale]
│   │   ├── [...not_found]
│   │   ├── /about
│   │   ├── /contacts
│   │   ├── /portfolio
│   │   │   ├── /apps
│   │   │   ├── /websites
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.scss
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   └── sitemap.ts
│
├── /assets
│
├── /components
│   ├── /Button.Text
│   ├── /AppHead
│   ├── /AppLink
│   ├── /Navbar
│   ├── /ContactBanner
│   ├── /ExperienceTimeline
│   ├── /Footer
│   ├── /GalleryShowcase
│   ├── /ImageZoomEffect
│   ├── /LanguageSelector
│   ├── /PageContainer
│   ├── /ProjectDisplay
│   ├── /TechStack
│   ├── /Testimonials
│   └── /WorkCategory
│
├── /constants
│
├── /data
│
├── /helpers
│
├── /hooks
│
├── /messages
│
├── /metadata
│   ├── index.ts
│   └── metadata-utils.ts
│
├── package.json
├── README.md
└── next.config.js

```

## 🚀 Pages

- **Home**: The landing page with an introduction and links to other sections.
- **About**: Information about me and my background.
- **Contact**: A page with a form to reach out to me.
- **Portfolio**: A showcase of my web and mobile projects, including subcategories for apps and websites.
- **Not Found**: Custom 404 error page.

## 📦 Key Libraries

Here are some of the key libraries used in this project:

- **@iconify/react**: For a wide range of icons.
- **@typeform/embed-react**: For embedding Typeform forms.
- **react-ga4**: Analytics integration with Google.
- **framer-motion**: For animations.
- **next-intl**: For internationalization support.
- **next-seo**: For SEO management.
- **react-slick**: For carousels and sliders.
- **react-vertical-timeline-component**: For creating vertical timelines.
- **sass**: For styling.

## 🛠️ Scripts

Run scripts using Bun:
- `bun dev`: Runs the development server.
- `bun build`: Builds the application for production.
- `bun start`: Starts the production server.
- `bun lint`: Runs the linter.
- `bun prod`: Builds and starts the production server.
- `bun type-check`: Type checks the codebase.
- `bun prettier`: Formats code with Prettier.

Enjoy exploring my website and discovering my projects!
