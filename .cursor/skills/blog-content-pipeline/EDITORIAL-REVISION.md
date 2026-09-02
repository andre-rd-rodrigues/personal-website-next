# Editorial Revision Reference

Read this during **Phase 3: Editorial Revision (EN)** and again when naturalizing PT-PT in Phase 5.

Every rule below is checkable. If a rule cannot be applied to a specific sentence, leave the sentence alone rather than inventing a fix.

## Why the draft needs this

Language models default to a small set of shapes: uniform sentence rhythm, transitions that add volume instead of meaning, generic source attributions at the end of sections, injected disclaimers, and restatements of what the reader already understood. Each pattern is individually harmless and collectively makes an article read as machine-written.

## Structural rules

**Vary paragraph shape.** No two consecutive paragraphs may follow the same `[claim] + [explanation] + [advice]` sequence. Rotate the opening move between a direct instruction, a concrete example, and a short declarative.

**Vary sentence length.** In any paragraph of three or more sentences, the longest and shortest sentence should differ by at least 8 words. Three consecutive 15-to-20-word sentences are the strongest signal of generated prose; `No. HTTPS protects data in transit. Access controls, storage, and backups still matter.` is the shape to aim for.

**Limit the em-dash in running prose.** The em-dash (`—`) as a parenthetical or appositive, as in `an app—the kind that…` or `uma aplicação — daquelas que…`, is a signature of generated text. In body paragraphs prefer a comma, parentheses, or a full stop. Allow at most one em-dash per article, and only where the break genuinely needs more weight than a comma. The em-dash stays fine in the `- **Label** — description.` list format. In PT-PT the travessão apositivo is even less idiomatic than in English, so reach for a vírgula first. The prose check flags every em-dash that lands inside a paragraph.

**End sections on substance.** No section may close with a sentence whose only job is to summarize, reassure, or attribute a source. Either end on the last real point or delete the sentence.

**One qualification per article.** At most one disclaimer or scope caveat, one sentence long, placed in the introduction or conclusion, never at a section boundary. Keep caveats that change what the reader should do (legal, security, financial, medical); drop the rest.

**Deletion pressure test.** For each section, identify its weakest sentence and delete it unless it carries information the reader cannot infer from the surrounding text.

**Write for the reader's profession, not for developers.** In a niche article, assume the reader understands their work but not web-development terminology. Describe what a technical choice changes for the business before naming the technology, and omit names such as frameworks, rendering methods, markup formats, or programming languages when they do not help the reader decide. `The page loads quickly on an ordinary phone` is useful to a therapist; `the server-rendered Next.js bundle hydrates early` is not.

**Earn authority through detail, not posture.** Delete sentences that announce that the reader asks the wrong question, promise an honest answer, or introduce the part others supposedly ignore. These phrases imitate confidence without adding evidence. Begin with the real situation, cost, decision, or observation instead.

**Break symmetrical case-study prose.** AI drafts often introduce two clients in the same grammatical shape, list their similarities, then reveal a tidy contrast. Rewrite this as a natural account of the actual work: identify each person, describe the relevant difference, and state the consequence. Do not use a client merely as a rhetorical prop.

**Prefer the author's natural PT-PT voice.** For a Portuguese-first niche article, edit the PT version as original prose rather than as a translation. Favour ordinary professional wording (`programa de marcações`, `dados de contacto`, `aparecer no Google`) over translated marketing language (`solução robusta`, `funil`, `proposta de valor`) unless the audience genuinely uses the term.

**Keep headings short, direct, and in sentence case.** Applies to the frontmatter `title` (H1) and every H2/H3. Capitalize only the first word plus proper nouns and acronyms: `How SEO works`, not `How SEO Works`; `O seu website protege os dados dos clientes?`, not `O Seu Website Protege Os Dados Dos Clientes?`; `Quando faz sentido pedir ajuda`, not `Quando Faz Sentido Pedir Ajuda`. A section heading should name its topic in roughly two to six words. Cut colon-subtitle padding, filler verbs (`Understanding`, `Enhancing`, `Elevate`, `Leveraging`), and trailing qualifiers. Prefer a plain noun phrase or a question. Never stack a subsection heading that merely restates its parent; merge the content instead.

| Instead of                                           | Write                              |
| ---------------------------------------------------- | ---------------------------------- |
| Understanding SEO: The Basics and Beyond             | How SEO works                      |
| Practical Tips: Enhancing Your SEO Strategy          | Practical tips to improve your SEO |
| The Revenue-Boosting Potential of SEO                | How SEO grows revenue              |
| Elevate Your SEO Strategy with Specialized Expertise | When to ask for help               |

**Make the contact invitation specific.** A closing CTA should follow from the problem the article helps diagnose. Name the signal that makes outside help useful, ask for one low-effort input, and explain the immediate next outcome. Delete generic invitations, self-promotional credentials, pressure disclaimers, and fear-based lines. The reader should understand why to contact you and what the first conversation will clarify.

## Banned constructions

Listed verbatim so they can be searched.

**False contrast frames**, the model's favourite way to fake authority:

- `It is not X, it is Y`
- `not just` / `not only ... but`
- `The useful question is not`
- `is not a` / `is not the` used to set up a reveal
- `not because`
- `the wrong question` / `a pergunta errada`
- `the sharper/real/more important question` / `a pergunta mais afiada/importante`

**Filler transitions and closers:**

- `In today's`
- `Let's dive in`
- `The good news is`
- `That said`
- `At the end of the day`
- `from start to finish`
- `it is worth noting`
- `In other words` (when the previous sentence was already clear)
- `the honest answer` / `a resposta honesta`
- `here is the part` / `here's the part` / `aqui está a parte` / `eis a parte`
- `this is where` used to announce a predictable reveal
- `to be fair` / `para ser justo`
- `two cases illustrate` / `dois casos ilustram`
- generic `The takeaway`, `In summary`, or `Em resumo` headings

**Conceptual pleonasms**, asserting that something must be useful without supplying a criterion:

- "A plan does not need to be long. It needs to be usable."
- "A plan stored only inside a compromised account is not a useful plan."
- "A banner that appears after the scripts have already run is not controlling anything."

**Scare quotes used to manufacture contrast:**

- `"large enough"`, `"just in case"`, `"done"`

**Audience fan-out and throat-clearing openers:**

- `whether you're a [X] or a [Y]` audience segmentation / `seja um [X] ou um [Y]` / `quer seja`
- `no matter if` / `no matter whether`
- `In this article/post/guide`, `by the end of this`, `we'll explore/cover/dive into`, `let's take a look`
- `Neste artigo/post/guia`, `ao longo deste artigo`, `vamos explorar/ver/analisar`

**Reveal and closer tics (advisory):**

- Demonstrative closers: `That's the real cost`, `That is the whole point`, `É este o verdadeiro custo`
- Colon reveals: `The problem:`, `The result:`, `The catch:`, `O problema:`, `O resultado:`
- Standalone rhetorical-question paragraphs used to open a section
- Filler adverbs: `simply`, `essentially`, `basically`, `arguably`, `literally` / `simplesmente`, `basicamente`, `essencialmente`

**Rule of three (triads):** avoid reflexive three-item lists, especially adjective triads (`fast, secure, and scalable` / `rápido, seguro e escalável`). Use two items, or four, or rewrite as a sentence. The prose check flags `X, Y, and Z` and `X, Y e Z` inside paragraphs as advisory.

## Slop lexicon

Inflated vocabulary that signals generated text. Prefer the plain word, or delete it. The prose check flags these as advisory findings.

- **EN:** leverage, utilize, delve, realm, testament, underscore, pivotal, seamless(ly), cutting-edge, game-changer, foster, harness, streamline, elevate, empower, myriad, plethora, tapestry, bustling, ever-evolving; and the phrases `in the realm of`, `at the forefront`, `in today's fast-paced world`, `needless to say`.
- **PT:** de ponta, sem esforço, mergulhar, plétora, miríade, potenciar, impulsionar, revolucionar, transformador, de forma transparente, sem falhas, num piscar de olhos; and the phrases `num mundo cada vez mais`, `quando se trata de`, `escusado será dizer`.

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

**FAQ extraction.** `extractArticleFaqs` matches the H2 case-insensitively; standardize it as `Frequently asked questions` or `Perguntas frequentes`. It then consumes **every sibling until the next H2 or `hr`** and moves them into accordion dropdowns.

- `## Sources` must be its own H2 placed **after** the FAQ section. Anything between the FAQ heading and the next H2 is absorbed into the accordion and disappears from the body.
- Inside the FAQ section, never use a paragraph consisting only of bold text: `isFaqQuestion` treats it as a new question, so a bold-label list becomes stray accordion entries.

**Table of contents.** `extractHeadings` collects every H1-H3, so `Sources` appears in the article navigator. Keep the heading exactly `Sources` (EN) or `Fontes` (PT).

**No markdown tables in articles.** The renderer prints pipes and dashes as raw text. Use `- **Label** — description.` instead. (Tables are fine inside this skill's own documentation.)

## Pruning pass (deletion only)

Run this as a distinct pass after the rewrite, in a different mode: you may only cut, not rewrite. Rewriting and pruning use opposite instincts, and when they share a pass the rewrite instinct wins and nothing gets removed.

- Delete the weakest sentence in each section unless it carries information the reader cannot infer from the rest.
- Delete any paragraph that only restates a point already made, including intro/conclusion echoes and FAQ answers that repeat the body.
- Delete scene-setting, throat-clearing, and reassurance that survived the rewrite.
- Do not replace what you cut. If a section collapses to nothing, it was filler.
- Stop when every remaining sentence would be missed if removed. Expect to lose 5-15% of the words; if you cut nothing, you did not prune.

## Exit checklist

Before leaving Phase 3, confirm:

- [ ] No banned construction remains, or each survivor is deliberate and justified.
- [ ] No section ends on a summary-only or attribution-only sentence.
- [ ] Sentence length varies within multi-sentence paragraphs.
- [ ] At most one qualification, placed in the intro or conclusion.
- [ ] The frontmatter `title` (H1) and every H2/H3 use sentence case, except for proper nouns and acronyms.
- [ ] No em-dash used as a parenthetical or appositive in body prose (at most one per article, and only when a comma would be too weak).
- [ ] No audience fan-out or throat-clearing opener (`whether you're a… or a…`, `in this article…`, `neste artigo…`).
- [ ] No reflexive triads / rule-of-three lists where two or four items would read better.
- [ ] No inflated slop-lexicon word where a plain word works.
- [ ] A deletion-only pruning pass ran; no paragraph merely restates an earlier point, and the intro and conclusion do not echo each other.
- [ ] The closing CTA names a concrete need, next action, and immediate outcome without self-praise.
- [ ] The opening contains a concrete reader situation, not an authority pose such as “you are asking the wrong question” or “the honest answer”.
- [ ] Technical terms appear only when they help this specific audience make a decision; every necessary term is explained in plain language.
- [ ] Case studies describe real differences between clients without a symmetrical “both X, but Y” reveal.
- [ ] The PT-PT version reads as original Portuguese prose rather than a sentence-by-sentence translation.
- [ ] No factual claim removed and no citation dropped.
- [ ] Article is still within the **800-1500 word** target; any shortfall was filled with substance, not filler.
- [ ] `## Sources` sits after the FAQ section, if present.
