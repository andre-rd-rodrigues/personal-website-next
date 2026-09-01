---
name: blog-content-pipeline
description: End-to-end blog article pipeline that researches AI and software development trends, creates English blog articles, optimizes them for SEO, and translates to European Portuguese. Use when the user asks to generate new blog posts, run the blog pipeline, or create content for the blog.
---

# Blog Content Pipeline

Automated pipeline that produces SEO-optimized, bilingual (EN + PT-PT) blog articles about AI and software development trends. Starts by collecting user preferences, then flows through research, writing, SEO, translation, and file creation.

## Content Philosophy

Every article produced by this pipeline must serve the author's broader professional goals. These four principles are non-negotiable and should guide topic selection, writing style, and editorial decisions across all phases.

### 1. Proof of Communication (The "Soft Skill" Factor)

Many engineers can code in a vacuum, but few can explain _why_ they chose a specific architecture or _how_ they debugged a complex race condition. Each article must demonstrate the ability to:

- **Translate technical jargon into readable prose** — no gatekeeping; clarity over cleverness.
- **Document processes for teammates** — write as if onboarding a colleague, not lecturing a student.
- **Advocate for specific technologies or methodologies** — take a position and defend it with evidence.

### 2. Establishing Authority & "Proof of Work"

A GitHub repo shows the final product; a blog post shows the journey. Articles should transition the author from "job seeker" to "subject matter expert" by:

- **Showing the reasoning behind decisions** — architecture trade-offs, debugging war stories, lessons from failures.
- **Creating SEO-discoverable content** — recruiters and hiring managers search for technical solutions; if they find this blog, the first interview is already passed.
- **Building Lindy-effect content** — good technical writing stays relevant for years, compounding reputation while the author sleeps.

### 3. Learning by Teaching (The Feynman Loop)

Writing is the ultimate test of technical depth. If you can't explain a concept simply, you don't understand it well enough. Articles should:

- **Expose and fill knowledge gaps** — the writing process itself is a learning exercise.
- **Break complex ideas into digestible steps** — use analogies, diagrams, and progressive disclosure.
- **Invite the reader into the problem-solving process** — don't just present the answer; walk through the thinking.

### 4. Personal Brand & Networking

In a competitive market, a blog makes the author a "known quantity." Each article should:

- **Give people a reason to reach out** — whether for a job offer, podcast invitation, or collaboration.
- **Turn the website from a static resume into a living hub of activity** — show continuous learning and engagement with the industry.
- **Build a recognizable voice and perspective** — consistency in tone and recurring themes create brand recall.

> **For agents**: Reference these principles when evaluating topic briefs (Phase 1), shaping article structure (Phase 2), and crafting SEO metadata (Phase 3). If a draft doesn't clearly serve at least two of the four principles, revise it until it does.

---

## Pipeline Overview

```
Configure → Research → Write (EN) → SEO → Translate (PT-PT) → Save Files → Generate Cover Images
```

Track progress with this checklist (copy into your response):

```
Pipeline Progress:
- [ ] Phase 0: Configuration
- [ ] Phase 1: Trend Research
- [ ] Phase 2: Article Writing (EN)
- [ ] Phase 3: SEO Optimization
- [ ] Phase 4: PT-PT Translation
- [ ] Phase 5: File Creation
- [ ] Phase 6: Cover Image Generation
```

---

## Phase 0: Configuration

**Before any research or writing**, prompt the user with structured questions using the `AskQuestion` tool to collect pipeline preferences. Use the exact questions below:

### Question 1 — Target Audience (multi-select)

| Option       | Label                           | When to pick                                           |
| ------------ | ------------------------------- | ------------------------------------------------------ |
| `developers` | Developers & Engineers          | Technical how-tos, code-heavy, architecture deep-dives |
| `business`   | Business Owners & Entrepreneurs | ROI-focused, strategy, non-technical language          |
| `leads`      | Tech Leads & CTOs               | Decision-making, team scaling, build-vs-buy            |
| `career`     | Career Changers & Junior Devs   | Learning paths, getting started, career advice         |

Allow multiple selections. Default: `developers` + `business`.

### Question 2 — Content Category

| Option       | Label      |
| ------------ | ---------- |
| `technology` | Technology |
| `career`     | Career     |

Single-select. Default: `technology`.

### Question 3 — Content Format

| Option       | Label                  | Description                                  |
| ------------ | ---------------------- | -------------------------------------------- |
| `tutorial`   | Tutorial / How-To      | Step-by-step practical guide                 |
| `opinion`    | Opinion / Analysis     | Industry take or trend commentary            |
| `listicle`   | Listicle / Tips        | Numbered tips or curated list                |
| `case-study` | Case Study / Deep-Dive | In-depth exploration of a real-world example |

Single-select. Default: `opinion`.

### Question 4 — Number of Articles

| Option | Label      |
| ------ | ---------- |
| `1`    | 1 article  |
| `2`    | 2 articles |
| `3`    | 3 articles |

Single-select. Default: `1`.

Store the user's selections as **pipeline config** and reference them throughout all subsequent phases:

```
Pipeline Config:
- Audience: [selected audiences]
- Category: [Technology | Career]
- Format: [selected format]
- Count: [1-3]
```

---

## Phase 1: Trend Research

**Role**: Product Trend Researcher (see `.cursor/rules/trend-researcher.mdc`)

Using the **pipeline config** from Phase 0, search the web for current trends in **AI** and **software development**. Focus on:

1. **Audience-aligned topics**: Tailor research to the selected audience(s).
   - _Developers_: New frameworks, tools, patterns, performance techniques.
   - _Business Owners_: Market trends, ROI of tech investments, digital transformation.
   - _Tech Leads / CTOs_: Architecture decisions, team productivity, emerging stacks.
   - _Career Changers_: Learning roadmaps, entry-level opportunities, skill gaps.
2. **Format fit**: Prioritize topics that naturally suit the selected content format (tutorial, opinion, listicle, or case study).
3. **Timeliness**: Prioritize trends from the last 1-3 months.
4. **Content gap and search intent**: Inventory existing titles, slugs, headings, and target queries in `content/blog/en/`. Reject a topic when it would answer the same reader question as an existing article. A different title is not a content gap.
5. **Distinctive evidence**: Prefer topics that can include a real implementation, architecture, decision log, screenshot, code/configuration, measured result, or clearly labelled worked example. If none is available, narrow the topic until the author can add something a generic summary cannot.
6. **Source and vendor currency**: Verify time-sensitive tools, products, regulations, and benchmarks against current primary sources. Do not recommend a vendor from a secondary roundup without confirming that the product and relevant feature still exist.

Generate exactly the number of briefs specified in the config's **Count**.

**Philosophy filter**: Before finalizing a brief, verify the topic serves at least **two** of the four content philosophy principles. Prefer topics that let the author:

- Share a real decision-making process or debugging journey (Proof of Communication + Authority).
- Teach something non-trivial by breaking it down (Learning by Teaching).
- Stake out a recognizable opinion or niche (Personal Brand).

Discard topic ideas that would produce generic, commodity content anyone could write.

**Output**: A short brief per article idea:

```
## Topic Brief
- **Title idea**: [working title]
- **Angle**: [specific perspective or hook]
- **Target audience**: [from pipeline config]
- **Format**: [from pipeline config]
- **Philosophy alignment**: [which 2+ principles this topic serves and why]
- **Key points to cover**: [3-5 bullet points]
- **Supporting sources**: [URLs for credibility and reference]
```

Present the briefs to the user and **wait for approval** before proceeding.

---

## Phase 2: Article Writing (EN)

**Role**: Marketing Content Creator (see `.cursor/rules/marketing-content-creator.md`)

For each approved topic, write a full blog article in **English**, adapting to the **pipeline config**:

1. **Tone**: Conversational-professional, consistent with existing articles in `content/blog/en/`. Adjust depth based on audience:
   - _Developers_: Include code snippets, technical specifics, and tool comparisons.
   - _Business Owners_: Emphasize outcomes, ROI, and plain-language explanations.
   - _Tech Leads / CTOs_: Balance technical depth with strategic framing.
   - _Career Changers_: Encouraging tone, beginner-friendly explanations, actionable next steps.
   - _Multiple audiences_: Layer content so non-technical readers get value from the intro and conclusions while technical readers find depth in the body.
2. **Structure**: Follow the selected format:
   - _Tutorial_: Problem → Prerequisites → Step-by-step → Result → Next steps.
   - _Opinion_: Hook → Context → Thesis → Supporting arguments → Counter-points → Takeaway.
   - _Listicle_: Brief intro → Numbered items with consistent depth → Wrap-up.
   - _Case Study_: Background → Challenge → Approach → Results → Lessons learned.
3. **Philosophy in practice**: Weave the content philosophy into the writing naturally:
   - _Proof of Communication_: Translate jargon; write as if onboarding a smart colleague. No gatekeeping.
   - _Authority_: Show the "why" behind decisions, not just the "what." Include trade-offs considered and lessons from real experience.
   - _Learning by Teaching_: Walk the reader through the thinking process. Use the Feynman approach — if a section can't be explained simply, rewrite it until it can.
   - _Personal Brand_: Maintain a consistent, opinionated voice. Take a position and defend it rather than presenting a neutral survey.
4. Use clear heading hierarchy (H2/H3) for scannability and ToC.
5. **No markdown tables**: The blog renderer does not support markdown table syntax (pipes and dashes render as raw text). Use bold-label lists instead. For example, instead of a table with "Feature | Description" columns, write `- **Feature** — description.`
6. Include practical examples and links to external resources.
7. Target **800-1500 words** per article.
8. End with a conclusion and a call-to-action linking to `https://www.andrerodrigo.com/contacts`.
9. **Evidence and honesty**:
   - Link every statistic, benchmark, market count, price range, regulatory claim, and attributed result to a credible source close to the claim.
   - Never invent client stories, personal experience, survey findings, anonymous case studies, or first-person claims to create authority.
   - When using hypothetical numbers or workflows, label them explicitly as illustrative.
   - Do not claim a result is typical, guaranteed, or caused by one change unless the cited evidence supports that conclusion.
10. **Practitioner standard**: At least one substantial section must demonstrate implementation-level reasoning—trade-offs, failure modes, validation, architecture, code/configuration, or an evidence-backed decision process. Tool lists and generic advice do not satisfy this requirement.

**Output format** — markdown with frontmatter matching the blog schema:

```yaml
---
title: 'Article Title Here'
category: Technology # or Career
publishedDate: 'YYYY-MM-DD'
description: 'Compelling 1-2 sentence summary for cards and meta.'
isTopPick: false
slug: article-slug-here
coverImage: /images/blog/article-slug-here.webp
---
```

---

## Phase 3: SEO Optimization

**Role**: SEO Specialist (see `.cursor/rules/seo-specialist.mdc`)

Optimize each English article for search, factoring in the **pipeline config** audience:

1. **Title tag**: Include primary keyword, 50-60 chars. Update `title` in frontmatter.
2. **Meta description**: Compelling copy with keyword and CTA, 150-160 chars. Update `description` in frontmatter.
3. **Heading structure**: H1 (title) contains primary keyword; H2/H3 cover subtopics and PAA questions.
4. **Keyword intent**: Match keyword strategy to the target audience's search behavior:
   - _Developers_: Technical terms, tool names, "how to" / "tutorial" modifiers.
   - _Business Owners_: Outcome-oriented keywords ("increase revenue", "reduce costs").
   - _Tech Leads_: Decision-oriented keywords ("best practices", "comparison", "scalable").
   - _Career Changers_: Beginner modifiers ("for beginners", "getting started", "roadmap").
5. **Keyword placement**: Primary keyword in first 100 words, naturally distributed throughout.
6. **Internal links**: Link to other blog posts in `content/blog/en/` where relevant.
7. **External links**: Cite authoritative, preferably primary sources for E-E-A-T signals. Every numeric, legal, regulatory, pricing, market-share, and performance claim must have an inline source or be removed/rephrased.
8. **Content structure**: Add FAQ section at the end if it targets PAA opportunities.
9. **Slug**: Ensure `slug` in frontmatter is URL-friendly and keyword-rich.
10. **Lindy-effect optimization**: Favor evergreen phrasing that will stay relevant for years. Avoid date-specific language in headings (e.g., "in 2026") unless the article is explicitly a time-bound roundup. The goal is content that compounds the author's reputation long after publication.
11. **Authority signals**: Ensure the article positions the author as a practitioner, not a summarizer. First-person experience ("I built…", "We migrated…") and specific technical detail outperform generic overviews for both E-E-A-T and reader trust.

Apply changes directly to the article markdown. Do not create a separate report.

---

## Phase 4: PT-PT Translation

**Role**: PT-PT Localization Specialist (see `.cursor/rules/pt-localization.mdc`)

Translate each SEO-optimized English article to **European Portuguese (PT-PT)**:

1. Translate `title`, `description`, and all body content.
2. Keep `slug`, `publishedDate`, `isTopPick`, `coverImage`, and `category` identical to EN.
3. Translate `category` value: Technology → Tecnologia, Career → Carreira.
4. Use PT-PT vocabulary: "ecrã", "ficheiro", "utilizador", "telemóvel".
5. Use infinitive gerund style: "estou a fazer" (not "estou fazendo").
6. Follow the Acordo Ortográfico de 1990.
7. Preserve all markdown structure, links, code blocks, and image references.
8. Adapt metaphors that don't work culturally in Portugal.

---

## Phase 5: File Creation

Save the final files to the blog content directories:

| Language   | Path                        |
| ---------- | --------------------------- |
| English    | `content/blog/en/{slug}.md` |
| Portuguese | `content/blog/pt/{slug}.md` |

After writing files:

1. Confirm EN and PT contain the same slug set and that each new article has its translation.
2. Extract every internal `/blog/{slug}` link and verify that the target markdown file exists. Never publish a link to a planned article.
3. For every local `coverImage`, verify that the referenced file exists under `public/`.
4. Re-check all vendors and time-sensitive claims immediately before publishing.
5. Run `pnpm test` so the blog content-integrity checks validate locale parity, links, and covers.
6. Run `pnpm type-check` to verify no TypeScript errors.
7. Run `pnpm lint` to verify no lint errors.
8. Confirm the new articles appear in the dev server (`pnpm dev`).

---

## Phase 6: Cover Image Generation

Generate a custom cover image for each article that matches the blog's established visual identity. The `coverImage` frontmatter field must point to `/images/blog/{slug}.webp`, and the file must exist at `public/images/blog/{slug}.webp`.

### The Blog Cover "Vibe" (Extracted Style Guide)

The existing covers fall into two families. The **3D-render / illustration family** is the reproducible house style — always generate in this style so the blog stays cohesive.

**House style — playful modern concept illustration:**

- **Rendering:** Glossy 3D "clay" render _or_ clean isometric flat-vector illustration. Smooth plastic finish, soft studio lighting, gentle drop shadows, objects floating with generous negative space.
- **Background:** One solid, soft, single-color backdrop. Rotate across the series to keep variety while staying in-family: pastel pink, coral, warm beige, or periwinkle/sky blue.
- **Palette:** Candy-pop accents on the neutral backdrop — magenta-pink (align with brand `--color-primary` `#ff56cd`), indigo/purple (`#8b5afe`), coral-orange, sunny yellow, mint green, plus white. Keep it bright and friendly.
- **Composition:** ONE central concept object or a tiny scene (2–4 objects max). Landscape orientation. Uncluttered. Lots of breathing room.
- **Recurring motifs:** browser windows, mouse cursors/pointers, chat bubbles, robots, shopping baskets, padlocks/shields, dashboards, connected app tiles/nodes — pick what fits the article topic.
- **Mood:** Modern · Credible · Approachable. Clean, optimistic, tech/business themed.
- **Avoid:** text inside the image (AI text rendering is unreliable — at most one very short label), realistic human faces, dark/gritty/moody photos, cluttered scenes, generic corporate stock-photo clichés, cliché purple AI-gradient blobs.

### Process

1. **Derive a concept** from the article's core idea (e.g. customer-service AI → friendly robot with a headset and chat bubbles; data privacy → browser window with a padlock and shield; tool stack → connected stack of app tiles).
2. **Pick a background color** for each article, rotating through the palette so a batch of articles isn't all the same color.
3. **Generate** using the image generation tool with `aspect_ratio: "16:9"`. Pass 1–3 existing 3D-render covers as `reference_image_paths` to anchor the house style (e.g. `public/images/blog/how-to-add-ai-chatbot-to-your-website.webp` for the isometric look). Write a detailed prompt following the style guide above.
4. **Convert to WebP** and place at the final path. The generation tool outputs PNG/JPG; convert with `cwebp -q 82 <input> -o public/images/blog/{slug}.webp` (fall back to `magick`/`sips` if `cwebp` is unavailable). Remove the temporary source file.
5. **Verify** the file exists at `public/images/blog/{slug}.webp` and that the `coverImage` frontmatter in both the EN and PT files matches exactly.
6. **Present** the generated covers to the user for approval; regenerate any they want changed.

### Prompt Template

> A playful, modern 3D clay-render illustration on a solid soft {BACKGROUND} background with generous negative space, landscape composition. Center: {CONCEPT OBJECT/SCENE}, glossy smooth plastic finish with soft drop shadows, floating slightly. A few small floating accent objects: {2–3 SUPPORTING ICONS}. Bright candy-pop palette (magenta-pink, indigo/purple, coral, yellow, mint) with white, soft studio lighting, clean and uncluttered, no text, friendly and approachable tech vibe.

---

## Important Notes

- **Always ask for user approval** after Phase 1 before writing articles.
- **Cover images**: `coverImage` references `/images/blog/{slug}.webp`. Phase 6 generates this image automatically in the blog's house style and places the `.webp` at `public/images/blog/{slug}.webp` — do not leave the path pointing at a non-existent file.
- **Existing articles**: Compare reader intent and outline—not only keywords—before writing. Consolidate overlapping topics into the strongest existing URL instead of producing a thin cluster.
- **Consistent voice**: Read 1-2 existing articles to match the writing style before drafting.
- **No manufactured authority**: If first-party evidence is unavailable, write transparently from cited sources or use a clearly labelled worked example. Never imply client work or personal results that were not provided.
