# Initial review: feat/theme-selector (portfolio)

Reviewer: Sonnet 5.5 (read-only). Branch HEAD 14adb25, working tree clean.

## Score: 7.8 / 10 (target 9.5 not met)

| Criterion | Weight | Score | Weighted |
|---|---|---|---|
| Contrast | 30% | 8.0 | 2.40 |
| Theme consistency | 20% | 8.5 | 1.70 |
| Typography / hierarchy | 20% | 7.5 | 1.50 |
| Interaction / accessibility | 20% | 7.5 | 1.50 |
| Presentation / naming | 10% | 7.5 | 0.75 |
| **Total** | | | **7.85, reported as 7.8** |

The score is capped by how much I could not verify. See "Verified vs inferred".

## Verified vs inferred

**Verified (source read, and numbers computed):**
- I read every file under src/ that carries theme or typography: global.css, Layout, ThemeScript, ThemeSelector, Header, Footer, index, [slug], 404, ProjectCard, ProjectPreview, PreviewDialog, Tag, interactions.ts, Icon, and the data file's relevant parts.
- I computed WCAG contrast ratios from the token hex values with a script.

**Not verified (browser work did not happen):**
- Nothing listens on port 4321. `curl localhost:4321` returned nothing, and `preview_status` showed no tabs.
- You told me not to start a server, so I opened no tab. There are no screenshots and no viewport checks at 375px or desktop widths.
- Everything about rendering is inferred from source: hover states, the popover position, dialog layout, mobile wrapping, image brightness in dark mode.
- I also did not run `astro check` or `astro build`.

## Contrast numbers (computed)

| Pair | Light | Dark |
|---|---|---|
| ink / paper | 14.9 | 15.0 |
| muted / paper (body copy) | 5.53 | 7.63 |
| accent / paper | 5.51 | 7.72 |
| muted / surface | 4.90 | 6.23 |
| accent / surface | 4.89 | 6.30 |
| muted on Tag bg (ink 3%) | 5.24 | 7.15 |
| on-accent / accent | 5.97 | 7.72 |
| paper / accent (hover state on bg-ink buttons) | 5.51 | 7.72 |
| **line / paper (borders)** | **1.25** | **1.59** |
| ink / accent (only if text-ink ever lands on bg-accent) | 2.71 | 1.94 |

Every text pair passes AA, including 13px mono meta text. The weak spot is non-text contrast and state signalling, covered below.

## Findings, most important first

### P1. Hover and current-page states differ only by hue, because muted and accent have the same luminance
- Where:
  - `Header.astro:14-16`: `text-muted` becomes `aria-[current=location]:text-accent` and `hover:text-accent`.
  - Many other `text-muted hover:text-accent` links: footer socials, "More on GitHub", "← Back to…", "Then, the side projects ↓".
- Problem:
  - Light: muted is 5.53, accent is 5.51. Dark: 7.63 versus 7.72. A colour-blind or low-vision user sees essentially no change.
  - Fails WCAG 1.4.1 (use of colour) for the current-section indicator.
  - These small 13px mono links also have no underline, so they don't look like links.
- Fix:
  - Add a non-colour cue to the active nav item, for example `aria-[current=location]:underline decoration-2 underline-offset-8` or a 2px bottom border.
  - Add `hover:underline` (the body already sets `decoration-1 underline-offset-4`) to the muted small links.
  - Alternative: use `hover:text-ink` plus underline. That gives a luminance change and fixes both problems.
  - Also set `aria-current="page"` on any nav item that links to the current page.

### P1. Control boundaries rely on `border-line`, which is 1.25:1 in light and 1.59:1 in dark
- Where:
  - Theme `<summary>` button (`ThemeSelector.astro:11`).
  - Preview close, previous and next buttons (`PreviewDialog.astro`).
  - Tags.
  - The theme popover, whose `bg-paper` is the same colour as the page and whose shadow is invisible in dark.
- Problem:
  - WCAG 1.4.11 wants 3:1 for the boundary of an interactive control unless the icon or label alone identifies it.
  - Icons are muted at 5.5:1, so this is borderline-pass for the summary and dialog buttons.
  - The popover is a real legibility problem in dark: border 1.59:1, shadow invisible, same fill as the page.
- Fix:
  - Add a `--color-line-strong` token, about light #9a9d94 and dark #5d675f (roughly 3:1). Use it for interactive controls and popover borders; keep `line` for dividers.
  - Give the popover `bg-surface` so it separates from the page in both themes.

### P2. The external-link icon is used for internal and mailto links
- Where:
  - `Header.astro:17`: "Let's talk" is an in-page anchor with an arrow-out icon.
  - `ProjectCard.astro:19`: the project title links internally with the external icon.
  - `index.astro:37`: "Get in touch" is a mailto.
  - Footer: the circular email button.
- Problem: it signals "leaves the site", while the real external links also carry `target=_blank` and an sr-only "opens in a new tab". The visual language is inconsistent.
- Fix: use the `arrow` icon (or none) for internal links. Reserve `external` for `target=_blank`. Use the existing `mail` icon for mailto.

### P2. Muted text at body size carries all the reading content
- Where: nearly every `text-body` paragraph in experience, about, case studies and project detail is `text-muted`.
- Problem:
  - Light muted is 5.5:1 (passes) on 17px text, but long paragraphs in grey are tiring.
  - The 13px mono labels are also muted, so label and body have the same colour. The hierarchy then leans on size alone.
- Fix: set long-form text on project detail and case study pages (the `.space-y-12` column) to `text-ink/85` or to a new `--color-body`. Reserve `muted` for metadata. Alternatively darken light muted to about #55574f (about 7:1).

### P2. The type scale has inversions and off-scale values
- Problems:
  - The custom roles put `text-body` at 17px above `text-role` at 16px, which is used for `h4` role titles and `h3` decisions. Hierarchy depends on semibold only.
  - Many off-scale sizes bypass the documented roles: `text-xl sm:text-2xl` for the project headline, `text-2xl` for h2 on project pages (same as the headline), `text-lg` for the dialog title, `text-3xl` for Next project, and `text-4xl`/`text-5xl`/`text-6xl`/`text-7xl` for display headings.
  - Tracking is very tight: `-.065em` at 5xl to 7xl and the hero clamp, `-.06em` on the footer h2, `-.055em` at 4xl. At 24px (`text-company`, `-.04em`) letters begin to crowd, and for Manrope bold this hurts legibility.
- Fix:
  - Make role at least 1.0625rem with a semibold weight, or move body to 1rem.
  - Add `--text-display` and `--text-title` tokens.
  - Clamp tracking to about -.03em below 40px and -.045em above.

### P2. The theme popover's semantics and keyboard behaviour are incomplete
- Where: `ThemeSelector.astro:11` and `ThemeScript.astro`.
- Problems:
  - `role="button"` on `<summary>` overrides the native disclosure role, so some AT lose the expanded state. `tabindex=0` is redundant.
  - `aria-label="Color theme"` overrides the visible state, so the current choice is not announced on the trigger. Only the aria-pressed children say it.
  - Tab out of the menu does not close it, and there are no arrow-key controls.
  - The popover opens without moving focus.
- Fix:
  - Make the trigger a real `<button aria-haspopup="true" aria-expanded>`, or keep the details and drop `role` and `tabindex`.
  - Make the label dynamic: "Color theme: System".
  - Close on `focusout` leaving the details.

### P3. Theme-inconsistent leftovers
- `Layout.astro:49` has a static `theme-color` `#f6f6f3`. It is only corrected after JS runs. Use two media-queried metas for first paint, and keep the script override for an explicit user choice.
- Company logos sit on a hard-coded `bg-white` tile (`index.astro:77,92`). In dark these are bright squares. The white inner dot on the scroll marker (`bg-white`, index.astro:72,111) should be `bg-on-accent`.
- Portrait is `grayscale` with no dark dimming. The screenshots (nativo, linkseek, openwhispr) are very likely light UIs and will glare in dark. I could not check this. Consider `dark:brightness-90`, or a note that dark-mode screenshots are not available. Use `[[data-theme=dark]_&]:` or `@variant`; note there is no `dark:` variant configured against `data-theme`. Add `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.
- `--color-surface` is only used in the portrait fallback, which is dead code now that `portrait` is set. Either use it for the Tag, popover and dialog header, or remove it.
- `light-dark()` palette: browsers without `light-dark()` (before Chrome 123, Safari 17.5, Firefox 120) get no colour at all. If that is acceptable, fine. Otherwise add plain fallbacks.

### P3. Interaction and accessibility polish
- Each project card exposes three tab stops to the same destination (preview button, title link, "Explore project"). Several links are named "Explore project". Give the link an sr-only project name, or mark the title link as primary and drop the duplicate.
- The header CTA is `min-h-10` (40px) while other controls are 44 to 48px. Padding is `px-2` on mobile.
- Small 13px mono links such as "More on GitHub", "Back to top" and the social links have `min-h-8` to `min-h-9` (32 to 36px). That passes 2.5.8, but it is tight on mobile.
- `group-hover:translate-*` is not guarded by `motion-safe`, while the image scale is.
- The 404 CTA lacks `rounded-sm`, unlike every other filled button.
- The project page side nav (`[slug].astro:36`) has no active or scroll-spy state, and its links are ink while the home nav is muted.

### P3. Naming and presentation
- ProjectCard shows "Screenshot · 3 photos" (`ProjectCard.astro:15`). They are screenshots, not photos. Use "3 screenshots".
- Caption logic is duplicated and inconsistent:
  - ProjectCard: `Screenshot` / `Integration diagram` (proxy only) / `Interface illustration`.
  - `[slug].astro`: `Project screenshot` / diagram for `proxy` and `agents` / illustration.
  - ProjectPreview: its own `caption` variable.
  - OpenWhispr's first image is a banner and gets "Screenshot".
  - Move this to one helper.
- Identity is shown five ways: "cm.", "carlos manuel.", "Carlos Manuel", "Carlos Manuel González" and the aria-label "Carlos Manuel, home". Pick one wordmark and one full name. `aria-label` should contain the visible text, for example "Carlos Manuel, home".
- The nav CTA "Let's talk" leads to a section titled "Let's build something." Match them.
- The hero title is "AI Software Engineer", while the og:image alt says "Software Engineer and AI Engineer" and the footer says "software engineering, full-stack, and AI engineering".
- `ProjectPreview` falls back to `/images/<visual>.svg`, and no such SVGs exist under public/images. It is currently unreachable, because all featured projects have images and the Dara case study skips the preview, but it is a latent 404.

## What is good (do not regress)
- The pre-paint theme script, the `light-dark()` token palette, and `color-scheme` set for all three modes. This is a clean architecture.
- The theme choice is persisted, synced across tabs through `storage`, and follows OS changes. Escape closes the menu and returns focus.
- Text contrast passes AA in both themes everywhere I computed.
- There is a skip link, focus-visible outlines in the accent colour, and mostly 44px+ targets.
- Reduced motion is respected in the animations and the scroll marker.
- The sr-only "opens in a new tab" text is correct on genuine external links.
- The heading order is correct.

## Path to 9.5
- P1 items fixed, which adds roughly 0.8 to 1.0.
- The type scale and body-colour cleanup (P2), which adds roughly 0.4.
- The popover semantics, the logo and screenshot dark treatment and the naming consistency, which add roughly 0.4.
- Then a real browser pass at 375px and desktop in both themes, covering the dialog and the 404, to confirm and reach 9 or more.
