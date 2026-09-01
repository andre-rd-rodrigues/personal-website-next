# Editorial Revision Reference

Read this during **Phase 3: Editorial Revision (EN)** and again when naturalizing PT-PT in Phase 5.

Every rule below is checkable. If a rule cannot be applied to a specific sentence, leave the sentence alone rather than inventing a fix.

## Why the draft needs this

Language models default to a small set of shapes: uniform sentence rhythm, transitions that add volume instead of meaning, generic source attributions at the end of sections, injected disclaimers, and restatements of what the reader already understood. Each pattern is individually harmless and collectively makes an article read as machine-written.

## Structural rules

**Vary paragraph shape.** No two consecutive paragraphs may follow the same `[claim] + [explanation] + [advice]` sequence. Rotate the opening move between a direct instruction, a concrete example, and a short declarative.

**Vary sentence length.** In any paragraph of three or more sentences, the longest and shortest sentence should differ by at least 8 words. Three consecutive 15-to-20-word sentences are the strongest signal of generated prose; `No. HTTPS protects data in transit. Access controls, storage, and backups still matter.` is the shape to aim for.

**End sections on substance.** No section may close with a sentence whose only job is to summarize, reassure, or attribute a source. Either end on the last real point or delete the sentence.

**One qualification per article.** At most one disclaimer or scope caveat, one sentence long, placed in the introduction or conclusion — never at a section boundary. Keep caveats that change what the reader should do (legal, security, financial, medical); drop the rest.

**Deletion pressure test.** For each section, identify its weakest sentence and delete it unless it carries information the reader cannot infer from the surrounding text.

## Banned constructions

Listed verbatim so they can be searched.

**False contrast frames** — the model's favourite way to fake authority:

- `It is not X, it is Y`
- `not just` / `not only ... but`
- `The useful question is not`
- `is not a` / `is not the` used to set up a reveal
- `not because`

**Filler transitions and closers:**

- `In today's`
- `Let's dive in`
- `The good news is`
- `That said`
- `At the end of the day`
- `from start to finish`
- `it is worth noting`
- `In other words` (when the previous sentence was already clear)

**Conceptual pleonasms** — asserting that something must be useful without supplying a criterion:

- "A plan does not need to be long. It needs to be usable."
- "A plan stored only inside a compromised account is not a useful plan."
- "A banner that appears after the scripts have already run is not controlling anything."

**Scare quotes used to manufacture contrast:**

- `"large enough"`, `"just in case"`, `"done"`

## Rewrite patterns

State the mechanism instead of the sentiment, and prefer a direct instruction to an impersonal declarative.

| Instead of                                                                                   | Write                                                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| A plan stored only inside a compromised account is not a useful plan.                        | Store the incident plan outside the systems it covers.                               |
| The question is not whether the business feels "large enough". It is what data it processes. | Applicability depends on the data processed and the risk involved, not company size. |
| Test the process from start to finish.                                                       | Place a real test order on a mobile device.                                          |
| It is not a technical problem. It is a revenue problem.                                      | Slow pages cost revenue on the pages that convert.                                   |

Two further habits worth breaking:

- **Repeated argument.** If a sentence restates the point made immediately before it, delete it instead of rephrasing it.
- **Hedged instruction.** `You may want to consider reviewing` becomes `Review`.

## Citations and sources

- Keep inline links **adjacent to** numeric, legal, regulatory, pricing, benchmark, and attributed claims, so each claim stays auditable.
- Cite the same authority inline **at most once per article**. Move further mentions to the sources block.
- Collect repeated or general background references into one `## Sources` section (`## Fontes` in PT) as a plain bullet list of linked titles. No annotations, no markdown tables.
- Never end a section with a sentence whose purpose is to name a source. Attach the link to the claim instead.

Before:

> Some obligations vary for smaller organisations, but "we are an SME" is not a general exemption. The European Commission's SME guidance explains those distinctions.

After:

> Some obligations vary for smaller organisations, though [the European Commission's SME guidance](https://example.com) confirms there is no general SME exemption.

## Rendering constraints

These come from `utils/post.utils.ts` and silently break content if ignored.

**FAQ extraction.** `extractArticleFaqs` finds the H2 titled exactly `Frequently Asked Questions` or `Perguntas Frequentes`, then consumes **every sibling until the next H2 or `hr`** and moves them into accordion dropdowns.

- `## Sources` must be its own H2 placed **after** the FAQ section. Anything between the FAQ heading and the next H2 is absorbed into the accordion and disappears from the body.
- Inside the FAQ section, never use a paragraph consisting only of bold text: `isFaqQuestion` treats it as a new question, so a bold-label list becomes stray accordion entries.

**Table of contents.** `extractHeadings` collects every H1-H3, so `Sources` appears in the article navigator. Keep the heading exactly `Sources` (EN) or `Fontes` (PT).

**No markdown tables in articles.** The renderer prints pipes and dashes as raw text. Use `- **Label** — description.` instead. (Tables are fine inside this skill's own documentation.)

## Exit checklist

Before leaving Phase 3, confirm:

- [ ] No banned construction remains, or each survivor is deliberate and justified.
- [ ] No section ends on a summary-only or attribution-only sentence.
- [ ] Sentence length varies within multi-sentence paragraphs.
- [ ] At most one qualification, placed in the intro or conclusion.
- [ ] No factual claim removed and no citation dropped.
- [ ] Article is still 800-1500 words; any shortfall was filled with substance, not filler.
- [ ] `## Sources` sits after the FAQ section, if present.
