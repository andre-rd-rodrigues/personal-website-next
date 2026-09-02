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

> **For agents**: Reference these principles when evaluating topic briefs (Phase 1), shaping article structure (Phase 2), revising prose (Phase 3), and crafting SEO metadata (Phase 4). If a draft doesn't clearly serve at least two of the four principles, revise it until it does.

---

## Pipeline Overview

```
Configure → Research → First Draft (EN) → Editorial Revision (EN) → SEO & Evidence Gate
  → Translate & Naturalize (PT-PT) → Cover Images → File Creation & Validation
```

Track progress with this checklist (copy into your response):

```
Pipeline Progress:
- [ ] Phase 0: Configuration
- [ ] Phase 1: Trend Research
- [ ] Phase 2: First Draft (EN)
- [ ] Phase 3: Editorial Revision (EN)
- [ ] Phase 4: SEO & Evidence Gate
- [ ] Phase 5: PT-PT Translation & Naturalization
- [ ] Phase 6: Cover Image Generation
- [ ] Phase 7: File Creation & Validation
```

Drafting and revision are deliberately separate phases. Phase 2 optimizes for substance; Phase 3 optimizes for how the prose reads. Trying to do both at once produces the formulaic cadence this pipeline exists to avoid.

**Why this order**: revision runs before SEO because the SEO phase is itself a slop source (keyword padding, manufactured FAQs, added transitions), and before translation because translating first pays the naturalization cost twice and lets the PT version drift from the final EN voice.

**Per-article loop**: run one article fully through Phases 2-4 before starting the next, so cadence judgement is applied to a single article in context. Cover generation is the only phase independent of the prose, so it may run in the background while Phase 5 proceeds.

## Cost-aware orchestration

Keep the parent agent as the orchestrator and route text-heavy work through the project subagents whose models are pinned in `.cursor/agents/`:

- Phase 0 stays in the parent agent.
- Phase 1 uses `blog-trend-researcher` once for the whole batch.
- Phase 2 uses `blog-draft-writer` once per approved article.
- Phases 3 and 4 use one `blog-quality-editor` invocation per article. It must complete the phases sequentially, even though they share one context.
- Phase 5 uses `blog-pt-localizer` once for the approved batch.
- Phases 6 and 7 stay in the parent agent and use the image, filesystem, and shell tools directly.

Give each subagent only the pipeline config, approved brief, slug, relevant file paths, and confirmed first-party evidence. Do not paste article bodies into handoff prompts; subagents read and edit the shared files directly. Keep prose phases sequential rather than parallel. If a subagent lacks context, resume it once with the missing detail instead of restarting the phase or duplicating the work in the parent agent.

## Autonomy Contract

The pipeline stops for user input at exactly **two** points:

1. **Topic-brief approval** at the end of Phase 1.
2. **Cover-image approval** at the end of Phase 6.

Every other phase proceeds without asking, including all revision passes. Do not pause mid-loop for reassurance, and do not ask the user to choose between wording options. Apply the rules in this skill and report what was done.

**Scope guard**: these phases apply to articles the pipeline is currently producing. Existing published articles in `content/blog/en/` still contain older patterns; only revise them when the user explicitly asks.

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

These are the categories already published, and they render as filter pills on the blog index.

| Option          | Label (EN)    | Label (PT)   |
| --------------- | ------------- | ------------ |
| `websites`      | Websites      | Websites     |
| `seo`           | SEO           | SEO          |
| `design`        | Design        | Design       |
| `ai`            | AI            | IA           |
| `online-stores` | Online Stores | Lojas Online |

Single-select. Default: `websites`.

Only `AI` (→ `IA`) and `Online Stores` (→ `Lojas Online`) are translated. `Websites`, `SEO`, and `Design` must stay byte-identical across locales or the filter pills diverge between EN and PT.

If the user asks for a category outside this list, warn that it creates a new filter pill containing a single article, then proceed if they confirm.

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
- Category: [Websites | SEO | Design | AI | Online Stores]
- Format: [selected format]
- Count: [1-3]
```

---

## Phase 1: Trend Research

**Role**: Product Trend Researcher (see `.cursor/rules/trend-researcher.mdc`)

Using the **pipeline config** from Phase 0, search the web for current trends in **AI** and **software development** (or, for niche case-study topics, the real questions the author's target clients are searching). Focus on:

1. **Audience-aligned topics**: Tailor research to the selected audience(s).
   - _Developers_: New frameworks, tools, patterns, performance techniques.
   - _Business Owners_: Market trends, ROI of tech investments, digital transformation.
   - _Tech Leads / CTOs_: Architecture decisions, team productivity, emerging stacks.
   - _Career Changers_: Learning roadmaps, entry-level opportunities, skill gaps.
   - _Niche verticals_ (advogados, saúde/terapia, wellness, clubes de desporto): search PT-market queries directly (e.g. "quanto custa um site para advogados", "automação marcações clínica", "gestão de sócios clube desportivo", "RGPD site psicólogo") and mine competitor pricing pages, FAQs, and PAA boxes for the questions real prospects ask. Map each question to whichever real project (Bárbara Barbizani, Carolina Jardim, Paixão Med, Brennda Castro, CDEFF) can answer it with a genuine worked example.
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
- **Title idea**: [working title in sentence case]
- **Angle**: [specific perspective or hook]
- **Target audience**: [from pipeline config]
- **Format**: [from pipeline config]
- **Philosophy alignment**: [which 2+ principles this topic serves and why]
- **Key points to cover**: [3-5 bullet points]
- **Supporting sources**: [URLs for credibility and reference]
```

Present the briefs to the user and **wait for approval** before proceeding.

---

## Phase 2: First Draft (EN)

**Role**: Marketing Content Creator (see `.cursor/rules/marketing-content-creator.md`)

Write the first draft of a full blog article in **English**, adapting to the **pipeline config**. This phase optimizes for **argument, practical depth, worked examples, structure, and sourced evidence**. Rough sentence-level prose is acceptable here. Phase 3 fixes cadence. Do not spend effort polishing individual sentences yet.

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
4. Use a clear H2/H3 hierarchy for scannability and the ToC. Write the frontmatter `title` (H1) and every H2/H3 in **sentence case**: capitalize only the first word plus proper nouns and acronyms (`How to add an AI chatbot to your website safely`, not `How To Add An AI Chatbot To Your Website Safely`; `Quando faz sentido pedir ajuda`, not `Quando Faz Sentido Pedir Ajuda`). Keep headings short and direct — roughly two to six words, no colon-subtitle padding or filler verbs (see the heading rule in [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md)).
5. **No markdown tables**: The blog renderer does not support markdown table syntax (pipes and dashes render as raw text). Use bold-label lists instead. For example, instead of a table with "Feature | Description" columns, write `- **Feature** — description.`
6. Include practical examples and links to external resources.
7. Target **800-1500 words** per article. Cut repetition and move extra citations to `## Sources` rather than padding length.
8. End with a conclusion and a natural call-to-action linking to `https://www.andrerodrigo.com/contacts`.
   - Earn the CTA from the article: name a concrete situation in which professional help becomes useful.
   - Ask for one easy, relevant next step, such as sending the site, proposal, requirements, or current workflow.
   - State the immediate outcome of the conversation in practical terms. Keep it to one or two sentences.
   - Avoid generic invitations (`get in touch if you need help`), self-praise, credentials, pressure disclaimers, fear-based consequences, and vague service claims such as "tailored solutions" or "maximize your potential."
9. **Evidence and honesty**:
   - Link every **external** statistic, benchmark, market count, price range, regulatory claim, and attributed result to a credible public source close to the claim.
   - **First-party private data is legitimate evidence.** The author has real freelance client projects (e.g. Bárbara Barbizani, Brennda Castro, Carolina Jardim, Paixão Med, CDEFF) and real, privately-held Google Analytics data for sites he built. When the author supplies a real number, result, or observation from this private data in chat, use it and attribute it in first person **without** a public link — e.g. "Num site de advocacia que geri, o tempo de carregamento caiu de X para Y segundos" or "According to my own analytics on a wellness-clinic site I built…". Anonymize the project name if the author hasn't confirmed it can be named.
   - The line is **fabrication, not privacy**: a real number or outcome the author confirms is legitimate evidence even though it isn't publicly verifiable. A plausible-sounding number nobody confirmed is not — never invent client stories, personal experience, survey findings, anonymous case studies, or first-person claims that the author did not actually supply.
   - Before drafting a section that leans on a first-party metric, ask the author (or check prior chat context) for the specific number rather than estimating one. If no real figure is available, label the number explicitly as illustrative instead of guessing.
   - Do not claim a result is typical, guaranteed, or caused by one change unless the cited evidence (public or first-party) supports that conclusion.
10. **Practitioner standard**: At least one substantial section must demonstrate implementation-level reasoning—trade-offs, failure modes, validation, architecture, code/configuration, or an evidence-backed decision process. Tool lists and generic advice do not satisfy this requirement.

**Output format:** markdown with frontmatter matching the blog schema:

```yaml
---
title: 'How to add an AI chatbot to your website safely'
category: Websites # Websites | SEO | Design | AI | Online Stores
publishedDate: 'YYYY-MM-DD'
description: 'Compelling 1-2 sentence summary for cards and meta.'
isTopPick: false
slug: article-slug-here
coverImage: /images/blog/article-slug-here.webp
---
```

**Save the draft to `content/blog/en/{slug}.md`.** Phases 3 and 4 edit that file in place, and the prose check needs a real file to read. The draft stays uncommitted until Phase 7 validation passes.

---

## Phase 3: Editorial Revision (EN)

**Read [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md) before starting this phase.** It contains the measurable rules, the banned-construction list, and the rewrite patterns. Apply them; do not re-derive them from memory.

The draft from Phase 2 reads like AI output because the model defaults to uniform sentence shapes, filler transitions, generic source attributions, injected disclaimers, and restatements of the obvious. This phase rewrites those patterns out.

### Process

1. Read the draft top to bottom as a cold reader, not as its author.
2. Run the checklist in [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md) against every section.
3. Perform a separate **semantic AI-slop pass**. The script cannot reliably detect meaning-level patterns, so look manually for:
   - authority postures such as “you are asking the wrong question”, “the honest answer”, and “here is the part others miss”;
   - overly symmetrical case studies (`client A does X; client B does Y; both care about Z, but…`);
   - generic reveal-and-summary structure, tidy three-part lists repeated section after section, and conclusions that merely restate the introduction;
   - technical terminology that displays developer knowledge without helping the article's actual reader decide;
   - PT-PT that mirrors English clause order or sounds like translated marketing copy.
4. Rewrite the article in place, applying every fix. For niche articles, read it aloud from the perspective of the named professional (lawyer, clinician, therapist, club director) and replace any sentence they would need a developer to decode.
5. **Pruning pass (deletion only).** In a separate pass you may only cut, never rewrite: delete the weakest sentence in each section, every paragraph that restates an earlier point (including intro/conclusion echoes and FAQ answers that repeat the body), and any scene-setting or reassurance that survived the rewrite. See the pruning rules in [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md). Expect to lose 5-15% of the words. Run `scripts/llm-audit.mjs {slug}` to list each paragraph for the emptiness judgement this pass needs.
6. Run the prose check:
   ```bash
   node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs content/blog/en/{slug}.md
   ```
7. Address the reported findings, then re-check **once**. Treat `audience jargon check` and other SOFT findings as prompts to justify the choice; keep a flagged pattern only when it genuinely serves the reader.
8. Run the check once more with `--strict` and clear every **HARD**-category finding (flagged with `!`): em-dash in prose, false contrast, filler transition, staged reveal, authority posture, audience fan-out, throat-clearing, generic headings, and word count over 1500.
   ```bash
   node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs --strict content/blog/en/{slug}.md
   ```
   SOFT categories (scare quotes, audience jargon, triads, slop lexicon, demonstrative closers, colon reveals, rhetorical questions, filler adverbs, cadence, repeated citations) stay advisory.
9. Save a baseline for the Phase 4 regression gate:
   ```bash
   node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs --baseline /tmp/{slug}-prose-baseline.json content/blog/en/{slug}.md
   ```

### Bounded loop

Allow a **maximum of two revision passes**. After the second pass, proceed to Phase 4 even if minor cadence issues remain. SOFT findings are advisory prompts, not mandatory edits; HARD findings must reach zero before Phase 7, since the strict gate runs in `pnpm test` for allowlisted articles. Never loop indefinitely chasing a clean SOFT report.

### Over-editing guard

Before exiting the phase, verify:

- No factual claim was removed.
- No citation was dropped.
- No heading was removed without merging its content elsewhere.
- The article is still within the **800-1500 word** target.

If revision pushes the draft under 800 words, add **substantive practical detail**: a concrete example, a failure mode, a validation step. Never restore filler to hit the count.

### Output contract

Rewrite the **whole article** in the file. Never leave the revision as a diff, a list of suggested edits, or a few isolated sentence swaps. The point is the cadence of the full piece.

Report to the user with a change summary of **at most five bullets** naming the classes of issues fixed (for example: "collapsed repeated Commission attributions into a Sources block"). Do not enumerate every sentence changed, and do not paste the full article into the chat.

---

## Phase 4: SEO & Evidence Gate

**Role**: SEO Specialist (see `.cursor/rules/seo-specialist.mdc`)

Optimize each English article for search, factoring in the **pipeline config** audience:

1. **Title tag**: Include primary keyword, 50-60 chars. Update `title` in frontmatter. Use **sentence case** — not title case or Pascal case (`7 website privacy checks for small businesses`, not `7 Website Privacy Checks For Small Businesses`).
2. **Meta description**: Compelling copy with keyword and CTA, 150-160 chars. Update `description` in frontmatter.
3. **Heading structure**: H1 (`title`) contains primary keyword; H2/H3 cover subtopics and PAA questions. Keep the H1 and every H2/H3 in sentence case and follow the heading rule in [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md) — use a short keyword-rich noun phrase or question, not title case or a colon-subtitle.
4. **Keyword intent**: Match keyword strategy to the target audience's search behavior:
   - _Developers_: Technical terms, tool names, "how to" / "tutorial" modifiers.
   - _Business Owners_: Outcome-oriented keywords ("increase revenue", "reduce costs").
   - _Tech Leads_: Decision-oriented keywords ("best practices", "comparison", "scalable").
   - _Career Changers_: Beginner modifiers ("for beginners", "getting started", "roadmap").
5. **Keyword placement**: Primary keyword in first 100 words, naturally distributed throughout.
6. **Internal links**: Link to other blog posts in `content/blog/en/` where relevant.
7. **External links**: Cite authoritative, preferably primary sources for E-E-A-T signals. Every numeric, legal, regulatory, pricing, market-share, and performance claim must have an inline source or be removed/rephrased. Run `scripts/llm-audit.mjs {slug}`, fetch each cited source, and confirm it supports the claim (quote the supporting sentence); drop or rewrite anything it does not.
8. **Content structure**: Add an FAQ section at the end if it targets PAA opportunities. Use the sentence-case H2 `Frequently asked questions` with H3 questions — see the FAQ rendering constraints in [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md).
9. **Slug**: Ensure `slug` in frontmatter is URL-friendly and keyword-rich.
10. **Lindy-effect optimization**: Favor evergreen phrasing that will stay relevant for years. Avoid date-specific language in headings (e.g., "in 2026") unless the article is explicitly a time-bound roundup. The goal is content that compounds the author's reputation long after publication.
11. **Authority signals**: Position the author as a practitioner rather than a summarizer, through specific technical detail and visible reasoning. Use first-person experience ("I built…", "We migrated…") **only when the user or source material actually supplies it** — never invent it for E-E-A-T. This rule overrides any SEO benefit.

### Do not undo Phase 3

The SEO phase is the most common place where formulaic prose returns. While optimizing:

- Do not add sections, paragraphs, or sentences purely to increase length or keyword count.
- Do not manufacture FAQ entries that no reader would search for.
- Do not reintroduce filler transitions or generic source attributions.
- Rewrite existing sentences to carry keywords instead of appending new ones.

### Frontmatter revalidation

Verify after every SEO edit:

- `title` — 50-60 characters, sentence case (not title case or Pascal case).
- `description` — 150-160 characters.
- `category` — exactly one of `Websites`, `SEO`, `Design`, `AI`, `Online Stores`.
- `slug` — unchanged once assigned in Phase 2.
- `coverImage` — matches `/images/blog/{slug}.webp`.
- `publishedDate` — the real creation date.

### Regression check

Re-run the prose check as a regression gate against the Phase 3 baseline:

```bash
node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs --diff /tmp/{slug}-prose-baseline.json content/blog/en/{slug}.md
```

A non-zero exit means the SEO pass reintroduced a pattern (a label count went up versus the baseline). Fix it, then re-run until the diff reports PASS.

Apply changes directly to the article markdown. Do not create a separate report.

---

## Phase 5: PT-PT Translation & Naturalization

**Role**: PT-PT Localization Specialist (see `.cursor/rules/pt-localization.mdc`)

Translate each SEO-optimized English article to **European Portuguese (PT-PT)**. A faithful translation of clean English still reads stiffly if clause order is mirrored, so this phase also naturalizes the result.

1. Translate `title`, `description`, and all body content. Keep the translated `title` in **sentence case**, same as EN.
2. Keep `slug`, `publishedDate`, `isTopPick`, and `coverImage` identical to EN.
3. **Category mapping**: translate `AI` → `IA` and `Online Stores` → `Lojas Online`. Keep `Websites`, `SEO`, and `Design` **byte-identical** to EN — these strings drive the per-locale filter pills on the blog index, so any divergence splits the filters between locales.
4. Use PT-PT vocabulary: "ecrã", "ficheiro", "utilizador", "telemóvel".
5. Use infinitive gerund style: "estou a fazer" (not "estou fazendo").
6. Follow the Acordo Ortográfico de 1990.
7. Preserve all markdown structure, links, code blocks, and image references.
8. Adapt metaphors that don't work culturally in Portugal.
9. Keep the translated `title` and every H2/H3 in sentence case, preserving capitalization only for proper nouns and acronyms.

### Naturalization

Apply the same structural rules from [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md) to the Portuguese text. **Restructure sentences freely** rather than mirroring English clause order. Idiomatic PT-PT matters more than structural parity. Section headings, claims, and citations must still correspond one-to-one.

Avoid these PT-specific patterns:

- `É importante notar que` — state the point directly.
- `Além disso` as a default connector between every paragraph.
- `No mundo de hoje` and similar scene-setting openers.
- `do início ao fim` — a narrative crutch; name the actual scope.
- `Por outro lado` used where no genuine contrast exists.

Rename the sources heading to `Fontes` if the EN article has a `Sources` section.

Write the result to `content/blog/pt/{slug}.md`, then run the prose check on it to catch the PT-specific patterns:

```bash
node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs content/blog/pt/{slug}.md
```

---

## Phase 6: Cover Image Generation

Generate a custom cover image for each article that matches the blog's established visual identity. The `coverImage` frontmatter field must point to `/images/blog/{slug}.webp`, and the file must exist at `public/images/blog/{slug}.webp`.

### The Blog Cover "Vibe" (Extracted Style Guide)

The existing covers fall into two families. The **3D-render / illustration family** is the reproducible house style. Always generate in this style so the blog stays cohesive.

**House style (playful modern concept illustration):**

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

## Phase 7: File Creation & Validation

Both articles were written in Phases 2 and 5, and covers exist by now, so `coverImage` resolves when the integrity checks run.

Confirm the final files are in place:

| Language   | Path                        |
| ---------- | --------------------------- |
| English    | `content/blog/en/{slug}.md` |
| Portuguese | `content/blog/pt/{slug}.md` |

Then validate:

1. Confirm EN and PT contain the same slug set and that each new article has its translation.
2. Run the cannibalization check against the corpus; for any `!` overlap, consolidate into the strongest URL or sharpen the angle:
   ```bash
   node .cursor/skills/blog-content-pipeline/scripts/corpus-dedupe.mjs {slug}
   ```
3. Extract every internal `/blog/{slug}` link and verify that the target markdown file exists. Never publish a link to a planned article.
4. For every local `coverImage`, verify that the referenced file exists under `public/`.
5. Re-check all vendors and time-sensitive claims immediately before publishing.
6. Run the accuracy check and resolve any `!` finding (dead link, or a citation/heading mismatch between locales); confirm every `~` numeric claim has a source:
   ```bash
   node .cursor/skills/blog-content-pipeline/scripts/accuracy-check.mjs --links {slug}
   ```
7. Add the new slug to `scripts/strict-articles.txt` so the strict prose gate enforces zero HARD-category findings and the **1500-word ceiling** for it in `pnpm test`.
8. Confirm no new article silently skips the gate:
   ```bash
   node .cursor/skills/blog-content-pipeline/scripts/strict-coverage.mjs
   ```
9. Run `pnpm test` so the content-integrity checks validate locale parity, links, covers, and the strict prose gate for allowlisted articles.
10. Run `pnpm type-check` to verify no TypeScript errors.
11. Run `pnpm lint` to verify no lint errors.
12. Run `pnpm prettier`: markdown content files are covered by the Prettier check.
13. Confirm the new articles appear in the dev server (`pnpm dev`).

The mandatory gate is `pnpm test`, which runs `__tests__/content/blog-content.test.ts` and `__tests__/content/prose-strict.test.ts` (the strict prose gate for allowlisted new articles). The default prose check and the accuracy check stay advisory review aids.

---

## Important Notes

- **Two approval gates only**: topic briefs (Phase 1) and cover images (Phase 6). See the Autonomy Contract above.
- **Draft, then revise**: never merge Phases 2 and 3. The revision pass is what removes the formulaic cadence.
- **Cover images**: `coverImage` references `/images/blog/{slug}.webp`. Phase 6 generates this image automatically in the blog's house style and places the `.webp` at `public/images/blog/{slug}.webp` — do not leave the path pointing at a non-existent file.
- **Existing articles**: Compare reader intent and outline—not only keywords—before writing. Consolidate overlapping topics into the strongest existing URL instead of producing a thin cluster.
- **Consistent voice**: Read 1-2 existing articles to match the writing style before drafting.
- **No manufactured authority**: If first-party evidence is unavailable, write transparently from cited sources or use a clearly labelled worked example. Never imply client work or personal results that were not provided. When first-party evidence **is** available (private analytics, real freelance case studies), prefer it over generic sourcing — confirm the specific figures with the author before drafting rather than approximating them.
- **PT-PT is the primary audience**: the author's readers are mostly Portuguese. Treat Phase 5 as more than a translation pass — research PT-market search terms, pricing (€), and regulatory context (RGPD, not just GDPR-in-general) directly, rather than assuming the EN keyword strategy transfers as-is. For niche case-study topics (advogados, saúde, clubes de desporto), it's acceptable to draft PT-PT first if the PT keyword research is stronger, then adapt to EN.
- **Niche case-study articles**: articles built around the author's real freelance verticals (advocacia — Bárbara Barbizani; saúde/terapia — Carolina Jardim, Paixão Med; wellness — Brennda Castro; clubes de desporto — CDEFF) are a first-class content type, not a detour from the "AI and software development" focus described in the pipeline summary. Anchor each one to a real, commonly-searched question in that niche (pricing, automation, RGPD/compliance, booking) and answer it using the real project as the worked example — see Phase 1 for how to source these questions.
- **Professional titles in client references**: always refer to Bárbara Barbizani, Carolina Jardim, and Catarina Paixão with their professional title: `Dra. Bárbara Barbizani`, `Dra. Carolina Jardim`, and `Dra. Catarina Paixão` in PT; `Dr Bárbara Barbizani`, `Dr Carolina Jardim`, and `Dr Catarina Paixão` in EN. Do not shorten subsequent references to their first name alone.
- **Reference**: [EDITORIAL-REVISION.md](EDITORIAL-REVISION.md) holds the revision rules; `scripts/prose-check.mjs` reports mechanical findings (add `--strict` to fail on HARD categories and the 1500-word ceiling for new articles, `--baseline`/`--diff` for the Phase 4 regression gate); `scripts/accuracy-check.mjs` checks EN/PT citation parity, unsourced numbers, and (with `--links`) dead links; `scripts/llm-audit.mjs` lists paragraphs and claim/source pairs for the LLM audit (emptiness and source support); `scripts/corpus-dedupe.mjs` flags likely cannibalization against the corpus; `scripts/strict-coverage.mjs` warns when a new article is missing from the strict allowlist; `scripts/strict-articles.txt` lists the slugs the strict gate enforces in `pnpm test`.
