---
name: André Rodrigo
description: Dark-first, modern glass portfolio and services site for a senior software engineer, lit by a single magenta signature.
colors:
  signature-pink: "#ff56cd"
  violet-current: "#8b5afe"
  deep-violet: "#6e54f0"
  ink-black: "#111111"
  studio-black: "#161616"
  button-black: "#0a0a0a"
  glass-slate: "#1f2937"
  muted-silver: "#d1d5db"
  steel-gray: "#9ca3af"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Jost, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 5rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Jost, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Jost, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Jost, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Jost, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  gutter: "clamp(20px, 5vw, 70px)"
components:
  button-primary:
    backgroundColor: "{colors.button-black}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  button-minimal:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  button-icon:
    backgroundColor: "{colors.button-black}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "12px"
  card-glass:
    backgroundColor: "{colors.glass-slate}"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "48px"
  nav-pill:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.muted-silver}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 16px"
---

# Design System: André Rodrigo

## 1. Overview

**Creative North Star: "The Neon Atelier"**

This is a craftsman's workshop rendered in the dark, built in a **modern glass** style. The surface is a deep, near-black studio (`#111111`) where the work itself is the light source, and a single magenta signature (`#ff56cd`) marks the maker's hand. Everything else stays quiet so that emphasis, when it appears, is unmistakable. The system is confident without being cold: it reads as a senior engineer who ships, not a faceless agency, because it earns attention through crafted glass surfaces and purposeful motion rather than through noise.

Modern glass is the defining material of the system, not an occasional decoration. Panels, cards, and the navigation float as semi-transparent slate layers (`bg-gray-800` at ~10% opacity) over the dark ground, softened by `backdrop-blur`, edged with hairline borders, and generously rounded. Depth is atmospheric, not shadowed: things sit *in front of* the dark rather than *casting onto* it, and the blur is what makes the layering read. This is deliberate, restrained glass — clarity and legibility first — never the frosted-everything overload where the whole page turns to mush. Type is set in Jost at light weights with airy line-height, so long-form copy stays calm and legible on the glass.

This system explicitly rejects the generic "AI landing page" (Inter on white, clichéd purple gradients) and the cheap template / site-builder look. The site is itself the strongest argument for hiring a custom developer, so nothing may look like something a builder could produce. When in doubt, the answer is more restraint and better craft, not more decoration.

**Key Characteristics:**
- Modern glass as the primary surface language: translucent slate panels with `backdrop-blur` and hairline borders.
- Dark-first: deep near-black ground, white primary text, magenta used sparingly for emphasis.
- Pill and generously-rounded geometry (`rounded-full`, `rounded-2xl`, `rounded-3xl`).
- Light-weight Jost typography with roomy line-height.
- Purposeful Framer Motion: blur-in reveals, staggered fades, one `ease-smooth` curve.

## 2. Colors

A monochrome dark canvas carrying white text, punctuated by one saturated magenta accent and its violet companion.

### Primary
- **Signature Pink** (`#ff56cd`): the single accent and the maker's mark. Reserved for emphasis, links, key CTAs, pricing figures, the spinning button border, active states, and confirmation icons. Its rarity is the point.

### Secondary
- **Violet Current** (`#8b5afe`): a supporting cool accent, paired with Signature Pink for gradient sweeps and secondary emphasis.
- **Deep Violet** (`#6e54f0`): the darker gradient partner (exposed as `--color-primary-dark`), used where the pink→violet blend needs a deeper anchor.

### Neutral
- **Ink Black** (`#111111`): the body background and the base of the whole experience (`--color-dark`).
- **Studio Black** (`#161616`): the token-level dark used by the JS/SCSS palette; the same near-black family as Ink Black.
- **Button Black** (`#0a0a0a`): the solid interior of primary buttons (`neutral-950`), a touch darker than the ground so pills read as objects.
- **Glass Slate** (`#1f2937`): the surface tint (`gray-800`) used at ~10% opacity for glass panels and as the hairline border color.
- **Muted Silver** (`#d1d5db`): inactive nav links and secondary text (`gray-300`).
- **Steel Gray** (`#9ca3af`): subtle outlines such as the Minimal button border (`gray-400`).
- **Pure White** (`#ffffff`): all primary text (headings, body, labels) and the default foreground.

### Named Rules
**The One Signature Rule.** Signature Pink appears on ≤10% of any screen. It is the maker's mark, not a theme color; if two pink things compete for attention on the same view, one of them is wrong.

**The Glass-Tint Rule.** Surface separation is achieved with a translucent Glass Slate tint plus a hairline border, never with a solid opaque panel. If a panel looks flat and card-like on the dark, add blur and drop the opacity, don't add a shadow.

## 3. Typography

**Display Font:** Jost (with `sans-serif` fallback)
**Body Font:** Jost (with `sans-serif` fallback)
**Accent Display Faces:** Blacker Sans Light and Moniqa (loaded locally as `--font-blacker` and `--font-moniqa`), reserved for occasional display/editorial accents.

**Character:** Jost is a geometric sans with a light, modern, slightly editorial feel. Used almost exclusively at weights 200–300, it keeps the interface calm and premium; the entire hierarchy is built from *size and space*, not from heavy weights. Blacker (a serif) and Moniqa are the contrast faces available when a heading needs an editorial voice; pair on the serif↔sans axis, never introduce a second geometric sans.

### Hierarchy
- **Display** (300, `clamp(3.5rem, 10vw, 5rem)`, line-height 1): hero and page-defining statements. Set on `--fs-xxl`.
- **Headline** (300, up to ~`3.75rem` / `text-6xl`, line-height 1.1): major section headings ("About me", rebrand hero).
- **Title** (300, `2.25rem` / `text-4xl`, line-height 1.2): card titles and sub-section headers.
- **Body** (300, `1.25rem`, line-height 1.6): all long-form copy. Keep measure to ~65–75ch for readability on the dark.
- **Label** (400, `1rem`, letter-spacing 0.05em): navigation links and small UI. The hero name is a deliberate exception: uppercase, `tracking-wider`, in Signature Pink.

### Named Rules
**The Light-Weight Rule.** Headings are light (300), never bold. Hierarchy comes from scale and whitespace. Reaching for weight 600+ to make something "pop" is prohibited; make it bigger or give it more room instead.

## 4. Elevation

This system is shadow-averse and depth-rich, and depth is carried by modern glass. Instead of drop shadows, it layers translucent glass over the dark ground: `backdrop-blur` (from `blur-[20px]` on the navbar up to `blur-3xl` on hero panels), a ~10% Glass Slate fill, and a hairline `gray-800` border. The single exception is the navigation pill, which carries a soft ambient `shadow-lg` to lift it off scrolling content. Interactive depth is expressed through motion (scale, the 3D card tilt) rather than through resting shadow.

### Named Rules
**The Modern Glass Rule.** Every elevated surface is glass, assembled from the same recipe: a translucent Glass Slate fill (~10% opacity), a real `backdrop-blur`, and a hairline `gray-800` border, on generous rounding. This is the house material; a raised surface that isn't glass is off-system.

**The Blur-Not-Shadow Rule.** Surfaces earn separation through blur, translucency, and a hairline border, not through a dark drop shadow. If a card looks like a 2014 material card, the blur is missing and the shadow is doing work it shouldn't.

**The Legible-Glass Rule.** Glass serves legibility, never the reverse. Keep enough blur and contrast that text on a glass panel stays readable, and never stack glass on glass until the page turns to mush — restraint is what separates modern glass from the glassmorphism cliché.

## 5. Components

### Buttons
- **Shape:** fully rounded pills (`rounded-full`, 9999px). All three variants share the pill geometry.
- **Primary (`Button.Text`):** a solid Button Black (`#0a0a0a`) interior wrapped by an animated conic-gradient border that sweeps Signature Pink around the pill (a 2s linear spin). White light-weight label with optional leading icon; interior uses `backdrop-blur`. Padding ~`12px 20px`.
- **Icon (`Button.Icon`):** same spinning-pink-border pill, icon-only, square padding (`12px`).
- **Minimal (`Button.Minimal`):** transparent pill with a hairline Steel Gray (`gray-400`) border; on hover a `white/10` fill slides up from the bottom. The quiet, secondary action.
- **Hover / Focus:** primary and icon scale to 1.1 on hover and 0.9 on tap; minimal scales ~1.03. Focus shows a slate focus ring (`focus:ring-2`). Motion uses the `ease-smooth` feel.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) for standard cards; hero/feature panels go `rounded-3xl` (24px).
- **Background:** Glass Slate at ~10% opacity (`bg-gray-800 bg-opacity-10`) with `backdrop-blur-2xl`.
- **Border:** hairline `gray-800`.
- **Internal Padding:** generous, `p-8` to `p-12` (32–48px).
- **Behavior:** `Card.Basic` uses a subtle 3D tilt (layered `translateZ` on inner items) and reveals imagery from grayscale to full color on hover (grayscale is disabled on small screens). `Card.Pricing` sets its title and price in Signature Pink and marks features with pink check icons.

### Navigation
- **Style:** a fixed, floating pill (`rounded-full`) of Ink Black at ~10% opacity with `backdrop-blur-[20px]` and a soft `shadow-lg`, inset from the viewport edges.
- **Typography:** Label role; active link is Pure White, inactive links are Muted Silver and transition to white on hover (300ms).
- **Mobile:** collapses to a hamburger that opens a blurred glass sheet sliding down with a fade; includes the language selector.

### Signature Component: The Spinning-Border CTA
The primary button's rotating conic-gradient pink border is the site's signature interaction. It signals "this is the important action" through motion rather than color area, keeping Signature Pink usage minimal while still drawing the eye. Use it for the single primary action on a view; never place two spinning-border buttons side by side.

## 6. Do's and Don'ts

### Do:
- **Do** commit to the modern glass style: every elevated surface is a translucent glass panel, not a solid card. It is the primary surface language of the site.
- **Do** keep the ground deep near-black (`#111111`) and let white text and crafted glass surfaces carry the design.
- **Do** reserve Signature Pink (`#ff56cd`) for a single point of emphasis per view (link, primary CTA, price, active state).
- **Do** build surfaces from the glass recipe: `bg-gray-800/10` + `backdrop-blur` + hairline `gray-800` border, on `rounded-2xl`/`rounded-3xl`.
- **Do** set type in Jost at weights 200–300 and build hierarchy from size and whitespace.
- **Do** animate with the `ease-smooth` curve (`cubic-bezier(0.35, 0, 0, 1)`), `whileInView`, and staggered children; add a `prefers-reduced-motion` fallback for heavy reveals.
- **Do** keep body measure to ~65–75ch and line-height ~1.6 for readable long-form copy on dark.

### Don't:
- **Don't** produce the generic "AI landing page" look — Inter on white with clichéd purple gradients. This is a named anti-reference.
- **Don't** produce a cheap template / site-builder aesthetic (generic Wix/Squarespace). The site must never look buildable-in-a-builder.
- **Don't** replace a glass surface with a flat, opaque panel; solid cards on the dark ground are off-system.
- **Don't** overload the glass either — no stacking glass on glass, no blur so heavy the content behind turns to mush. Modern glass is restrained and legible, not the glassmorphism cliché.
- **Don't** use drop shadows to separate surfaces; use blur, translucency, and a hairline border instead.
- **Don't** bold headings to create emphasis; scale and space do that work.
- **Don't** let Signature Pink spread across large areas or compete with itself; the accent's power is its scarcity.
- **Don't** introduce a second geometric sans alongside Jost; contrast only via the serif faces (Blacker / Moniqa).
- **Don't** break locale parity — English and EU Portuguese must share identical layout, quality, and motion.
