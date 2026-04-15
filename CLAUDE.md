# CLAUDE.md

Project guidance for AI assistants. See also **AGENTS.md** for stack, scripts, and i18n conventions.

## Design Context

### Users

- **Who:** Prospective clients, recruiters, and collaborators evaluating a **Senior Software Engineer / web developer** (André Rodrigo).
- **Context:** Browsing portfolio, pricing, FAQs, and contact — often on mobile first; locales **en** and **pt** (EU Portuguese).
- **Job to be done:** Build trust, understand services and range, compare packages, and **take the next step** (contact, Typeform, external links).

### Brand Personality

- **Voice:** Professional, direct, technically credible — **confident without cold corporate tone**.
- **Tone:** Clear CTAs, benefit-oriented copy (speed, performance, outcomes where stated in `messages/`).
- **Three words (inferred):** _Modern · Credible · Approachable_

### Aesthetic Direction

- **Theme:** **Dark-first** experience — deep background (`--color-dark` / SCSS dark), **white** primary text, **magenta-pink accent** (`#ff56cd` → `--color-primary` / Tailwind `pink`), **purple** secondary (`#8b5afe` in tokens).
- **Surfaces:** Frosted / glass panels (`backdrop-blur`, semi-transparent `bg-gray-800/10`, borders `border-gray-800`) — navbar, cards, pricing tables.
- **Shape:** Generous **rounded** corners (`rounded-2xl`, `rounded-full` for pills and nav).
- **Typography:** **Jost** as default UI/body (light weights common); **Blacker** and **Moniqa** as display/accent variables on `html` — use existing patterns in components before introducing new font stacks.
- **Motion:** **Framer Motion** — `whileInView`, variants from `motion/motionVariants.ts`; animations should feel **purposeful**, not decorative overload.
- **Anti-patterns to avoid:** Generic “AI landing page” look (Inter on white, cliché purple gradients); breaking **locale parity** (different layout per language); hard-coded user-facing strings outside **`messages/en.json`** and **`messages/pt.json`**.

### Design Principles

1. **Token-first styling** — Prefer `constants/design-tokens.constants.ts`, `:root` CSS variables (`--color-primary`, etc.), and Tailwind extensions over one-off hex values.
2. **Hierarchy on dark** — Reserve **primary pink** for emphasis, links, and key actions; keep body text readable (weight ~300, sufficient line-height — see `globals.scss`).
3. **Consistent components** — Reuse **Button**, **Card**, **Section** / **PageContainer**, **Navbar** patterns rather than one-off styled divs.
4. **i18n by default** — All visible copy through **next-intl**; navigation via `@/navigation` (`Link`, `usePathname`, `useRouter`).
5. **Performance & polish** — **Next.js `Image`** for raster assets; avoid layout shift; keep bundle-conscious choices aligned with existing Next 16 / React 19 setup.

### Accessibility & inclusion

- No explicit WCAG level documented in-repo; **aim for sensible contrast** on dark backgrounds with white text and pink accents; verify focus states on interactive elements.
- When adding motion, consider **`prefers-reduced-motion`** where heavy animation is introduced (existing pages use viewport-based motion — extend thoughtfully).

---

## Refine with you (optional)

If any of the below should change, edit this section or tell the assistant in chat:

- **Brand personality** — Are the three words (_Modern · Credible · Approachable_) right?
- **References / anti-references** — Any sites or products that should explicitly inspire or **avoid**?
- **Accessibility** — Target **WCAG 2.1 AA** (or stricter) as a formal requirement?
