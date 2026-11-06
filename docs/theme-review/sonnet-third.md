# Third independent review: fix/theme-review-polish (Sonnet 5.5, read-only)

Reviewed commit `dd93b42` (the work is now committed on top of `14adb25`). The server on :4321 was running. I read README, `sonnet-second.md`, `gpt-second.md`, `computed-checks.json`, `scripts/audit-rendered-theme.js` and the full source diff. I made no edits, started no server, delegated nothing and opened no PR. I used my own incognito tab and closed it afterwards.

## Score: 9.3 / 10. The 9.5 target is NOT met.

| Criterion | Weight | Score | Weighted |
|---|---|---|---|
| Contrast | 30% | 9.6 | 2.88 |
| Theme consistency | 20% | 9.3 | 1.86 |
| Typography / hierarchy | 20% | 9.4 | 1.88 |
| Interaction / accessibility | 20% | 8.6 | 1.72 |
| Presentation / naming | 10% | 9.3 | 0.93 |
| **Total** | | | **9.27, reported as 9.3** |

This is up from 7.7 in my second review. The P1 colour/font-size collision is fixed. I do not inflate the score: one interaction feature is nearly invisible in real use (D1), and a few small items remain.

## Verified fixes (real rendered artifact)

- **P1 collision fixed.**
  - `.text-body` renders at 17px/28px and `.text-control` at 15px/22px, measured on `/`.
  - Control text colour is ink again: `rgb(32,33,32)` in light.
  - Header wordmark, "Get in touch" and "Download CV" are ink again.
  - The old `body`/`control` colour tokens are gone from `global.css`. `copy`/`edge` replace them, and the contrast script reports `copy` and `edge` pairs.
- **Rendered contrast audit.** I re-ran the repo's own audit logic (a copy of `scripts/audit-rendered-theme.js` logic, injected) myself, with transitions settled.
  - Routes: `/`, `/work/nativo/`, `/work/linkseek/`, `/work/openwhispr-proxy/`, `/work/dara-platform/`, `/404/`.
  - Themes: light and dark, switched through the real theme-menu buttons.
  - Widths: about 1200 (desktop) and 300–360 (mobile) CSS px.
  - Result: **0 failures and no horizontal overflow in every combination I ran.** I ran the desktop width on `/` only. The minimum text ratio was 5.21:1 in light and 7.13:1 in dark. The 404 minimum was 5.51:1 in light and 7.63:1 in dark.
- **Theme persistence.** Dark and light both persist across navigation. Early in the session one navigation showed light after I set dark; I could not reproduce it in two later attempts, so I treat it as test noise (vite reconnects) but did not prove the cause.
- **Theme selector.** Looked correct in both themes at 1200px.
  - Visible Light/Dark/System labels on a surface fill; the selected row uses accent background with on-accent text and stays readable.
  - Summary accessible name reads `Color theme: light` / `dark`.
  - It is hidden without JS (progressive enhancement, by design).
- **Header brand.** The accessible name is `cm. Carlos Manuel, home`, so it contains the visible `cm.` label (confirmed in the accessibility tree on desktop and mobile).
- **Gallery on mobile (360×700).** Dialog opens, focus lands on Close, and the image area is a stable **245px** across all three slides. Dialog height changes only with the description length (602px ↔ 574px). Nothing overflows or needs scrolling, and the "Open full size" link and the next/previous buttons stay reachable. The `aria-haspopup="dialog"` link markup is present, and cards are real `<a href>` images.
- **Close path.** After clicking Close and letting the close event flush: `open=false`, `html` inline overflow reset to `""`, focus back on "Enlarge Nativo project preview".
- **Source-level fixes.** `AI agents` capitalisation, `LinkSeek` spelling, `Project preview` / `images` wording, the mail icon, scoped `a.text-muted:hover` underline, and reduced-motion guards are present in the diff.

## Remaining actionable defects

**D1 (P2, geometry-verified): the active-section indicator is almost never visible.**
- `header` is `position: relative`, not sticky. The only fixed or sticky element on the page is the skip link and the dialog.
- On `/` at a 667px viewport, "Experience" becomes active at scrollY ≥ ~682 (the 35% line is ~233px). The header's bottom edge is at 141px − scrollY, so the header is already scrolled away. The same holds for Work (~3019) and About (~5118), and for any realistic viewport height (the header would need a viewport over ~2200px tall to overlap).
- On project pages the "Project sections" aside is `position: static` at the top of the article. It is visible only briefly for the first section.
- So the underline plus `aria-current` work and the stale-state bug is genuinely fixed, but users rarely see the result. The README implies visible feedback ("underline the current section"). Either make the header (or the project side-nav) sticky, or state that the indicator is mostly an accessibility-tree signal.
- I verified the logic after a rendered frame: on `/work/nativo/`, "How it works" got `aria-current=location` with computed `underline 2px`. My first read returned empty because the throttled tab had not produced a frame yet; that was the preview limitation, not a code bug.
- Side-nav links on project pages get the underline but not the accent colour, since only the header links carry `aria-[current=location]:text-accent`. That is acceptable, just inconsistent.

**D2 (P3, source-confirmed): preview links swallow modified clicks.** In `interactions.ts` the click handler calls `event.preventDefault()` unconditionally, although the anchor now has a real image `href`. Ctrl/Cmd/Shift-click and middle-click-equivalent gestures will open the modal instead of the image. Return early when `event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0`.

**D3 (P3, observed): hero lead is lighter than the body copy.** `src/pages/index.astro:34` uses `text-lead text-muted` (18px, 5.53:1 light) while all body paragraphs use `text-copy` (8.18:1). The lead paragraph is larger but visually weaker than the 17px prose below it. This passes AA and is only a consistency nit. Use `text-copy` if the hierarchy is meant to read top-down.

**D4 (P3, observed): the dialog height shifts between slides.** The image box is stable, but description length changes the modal's overall height (28px difference at 360px), so a centred dialog nudges when paging. Optional: give the description a fixed `min-h`.

## Untested limitations (not claimed as passing)

- **Escape on the dialog.** My `press Escape` attempt returned `ECONNRESET` and the dialog stayed open. This is harness/transport noise (the tab is background-throttled and reports `visible:false`), not evidence of an app bug. The second review saw the native `keydown→cancel→close` sequence work. I did not re-establish native Escape myself.
- Hover and focus states beyond the ones seen in screenshots. The audit script excludes hover, gradients, pseudo-elements and image pixels.
- Screen readers, voice control, 200% zoom, forced-colors, and Safari/Firefox rendering.
- Every gallery slide on every project. I paged only Nativo's three slides and confirmed one of them (slide 2) loaded.
- I did not run `astro build` or `astro check` myself. I re-ran `node scripts/check-theme-contrast.mjs`: it passes all eight pairs (`copy/paper` 8.18:1 light and 10.60:1 dark, `edge/paper` 3.64:1 and 4.30:1).
- Background preview throttling can delay frames, lazy images and IntersectionObserver callbacks. A screenshot taken immediately after an action can show a blank image or stale state.

Parent-owned PR work is out of scope for me and needs no action from this review.
