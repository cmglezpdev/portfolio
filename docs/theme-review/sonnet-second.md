# Second review: fix/theme-review-polish (Sonnet 5.5, read-only)

Scope: working tree on `fix/theme-review-polish` (base `feat/theme-selector` 14adb25). Dev server on :4321 was running. I read `docs/theme-review/README.md`, both initial reports, the full diff, the screenshots, and the source. I made no repository edits, started no server, and delegated nothing. I used own preview tabs only: first a default-profile tab, later an incognito tab. Both are closed.

## Score: 7.7 / 10. The 9.5 target is NOT met.

| Criterion | Weight | Score | Weighted |
|---|---|---|---|
| Contrast | 30% | 6.8 | 2.04 |
| Theme consistency | 20% | 7.8 | 1.56 |
| Typography / hierarchy | 20% | 7.3 | 1.46 |
| Interaction / accessibility | 20% | 8.8 | 1.76 |
| Presentation / naming | 10% | 8.3 | 0.83 |
| **Total** | | | **7.65, reported as 7.7** |

This is lower than the first Sonnet score (7.8) because rendering the page exposed a regression that the token-only contrast script cannot see. It is also below the GPT 8.5, because that review was source-only. The design intent in the diff is good. One root-cause bug (P1 below) undoes much of it. Fixing P1 should lift the score substantially, to roughly 9.0–9.3, but I will not credit that until it is rendered again.

## P1 (verified in the browser): new colour tokens collide with the Tailwind text-size utilities

Cause: `src/styles/global.css` adds `--color-body` and `--color-control`. In Tailwind v4, `--color-X` generates `text-X`, which is the same utility name as the existing `--text-X` font-size role. In the compiled CSS served by the dev server, only the colour rule exists:

```
.text-body    { color: var(--color-body); }      /* no font-size / line-height rule at all */
.text-control { color: var(--color-control); }   /* no font-size / line-height rule at all */
```

By contrast, `.text-meta`, `.text-role`, `.text-lead` and `.text-company` still emit `font-size`. I inspected the stylesheet rules in the page directly.

### Effect 1: `text-body` and `text-control` lost their size roles

| Class | Computed (measured) | Intended |
|---|---|---|
| `text-body`, 44 elements on `/` | 16px / 24px | 17px / 28px |
| `text-control`, links and buttons | 16px | 15px / 22px |

- Body copy sits at the inherited size. The README claims "18px role titles sit above 17px body". In reality, body is 16px.
- The README's typography claims are therefore false as shipped.

### Effect 2: `text-control` now sets the colour `#7d8277` (light) / `#758176` (dark) on every element that uses it

- Because `text-accent` sorts before `text-control`, the control colour wins where an element carries both.
- Where an element had no other colour class (links that formerly inherited ink), it is now muted grey-green.

Contrast measured on rendered elements, using my own walk of computed colour against effective background:

| | Light | Dark |
|---|---|---|
| Contrast of the affected 16px text | 3.64:1 | 4.30:1 |
| AA requirement | 4.5:1 | 4.5:1 |
| Result | **fails** | **fails** |

Affected elements. The count differs per route, between 7 on `/` and 3 to 5 on each project page, in both themes at 1280px and 360px:
- Header wordmark text `carlos manuel.` (ink before, grey now).
- Hero "Get in touch" and "Download CV". These were ink and semibold before. After, they are grey and regular weight.
- "Explore project: Nativo / LinkSeek / OpenWhispr". Compare "Nativo →" beside it, which stays ink.
- The "Inside the AI platform" link. It was authored `text-accent` and now renders grey.
- The gallery "Open full size" link. It is authored `text-accent` and renders `rgb(117,129,118)`. The mobile screenshot shows it grey.
- Project page side-nav: Overview, How it works, Technical decisions, Context, My role and the others.
- The 404 eyebrow "404 / A WRONG TURN". It is authored `text-accent` and now renders grey.

Evidence is in the review's own screenshots.
- `docs/theme-review/afterLight.png` shows the washed-out "Get in touch", "Download CV" and wordmark. `beforeLight.png` shows them dark and semibold.
- The contrast script cannot catch this. It only tests token pairs, so every pair "passes".
- The README's browser-evidence section claims nothing about link colour, so this was missed.

Note: other classes that happen to use `text-body` still render in the correct body colour, because the collision happens to resolve to colour. That is a coincidence. `text-(--color-body)` repeated on the same elements is redundant: the colour already arrived via `text-body`, and the size never did.

### Fix (minimal)

1. Rename the colour tokens so no `--color-X` equals an existing `--text-X`.
   - Example: `--color-copy` for long-form body colour, and `--color-edge` (or `--color-outline`) for control borders.
   - Use `text-copy` for body colour and `border-edge` for control borders.
2. Drop the redundant `text-(--color-body)` classes.
3. Update the contrast script's token names.
4. After the rename, re-run the audit. Body will return to 17px/28px and control text to 15px/22px, so re-check wrapping, the 65ch cap, and the dialog height.
5. Add a computed-style check to the evidence: "no text element below 4.5:1".

## Gallery close / Escape / `html` overflow: root cause

The parent saw two things:
- `dialog.close()` returned focus, but `document.documentElement.style.overflow` stayed `"hidden"` in `preview_evaluate`.
- `preview_act` Escape appeared not to close the dialog.

Both are the preview harness, not the app. Reproduced and isolated:

1. The preview tab reports `visible:false`. `requestAnimationFrame` never ran. I measured a 1 s timeout with `document.visibilityState==="visible"` and `hasFocus()===true`, so the page itself looks visible while no frames are produced.
2. In that state:
   - After `dialog.close()`, `d.open` is `false` immediately.
   - The `close` event never fired over more than 2 s of waiting. A once-listener registered before the call and a second one registered after both stayed at 0.
   - `document.activeElement` stayed on the (now closed) Close button.
   - `html.style.overflow` stayed `"hidden"`.
3. The `close` handler in `src/scripts/interactions.ts` restores overflow. Chromium dispatches the `close` event only when the next frame is produced, and focus fix-up also waits for a frame.
4. I called `preview_snapshot` with `save:true`, which forces a frame. The next evaluate showed overflow `""`, and `requestAnimationFrame` worked again.
5. Frame-dependent automation actions (scroll-into-view, click) also timed out in this state, and succeeded right after a snapshot.
6. Lazy images in the first dialog and work cards were blank in the first screenshot. They had `complete:true` and a real `naturalWidth` afterwards, and rendered in the next screenshot. Same frame-throttle cause.

### Real Escape tested

I used the real `preview_act` key press, with the focus on the dialog's Close button after a real click on the trigger. Results:

- Escape closed the dialog and `html.style.overflow` was `""`.
- Focus returned to the trigger `Enlarge Nativo project preview`.
- ArrowRight advanced to `2 / 3`. The description text and the "Open full size" `href` changed to the second image.
- Mobile 360×740: the dialog fit (`328×453`, image `326×108` for the wide banner). Slide 2, a tall dashboard, made the dialog taller: it scrolled and the "Read project" button fell below the fold. The dialog height jumps between slides.
- Escape also worked in that mobile dialog, with the same results.

### Conclusion

The gallery code is correct. No code change is needed for this symptom. The README's claim "Native Escape automation did not close the dialog … requires further verification" should be restated:
- Escape was verified here, with a forced frame.
- Preview-tab frame throttling delays `close`, the overflow restore, and focus fix-up.

Optional hardening, not a defect: restore overflow from a `cancel`/`close` pair and a `pagehide` guard. Limit: I could not test in a genuinely visible browser tab, so "no delay in a normal visible tab" is an inference from the spec and my results, not an observation.

## What is verified working (rendered, both themes)

- Theme selector, keyboard path:
  - Enter on the summary opens the menu.
  - Tab moves to the first option.
  - Escape closes it and focus returns to the summary.
  - Selecting Dark with Enter applied the theme.
- After that selection:
  - The summary label became `Color theme: dark`.
  - `aria-pressed` was dark=true.
  - `localStorage` was `dark`.
  - `meta[theme-color]` became `#171a19`.
  - Focus returned to the summary.
- The menu was readable on a surface fill with a stronger border at 360px.
- Layout: no horizontal overflow or off-screen element detected on `/`, the 4 project routes, in both themes, at 1280px and 360px. The 404 route was checked separately (below).
- Real 404 is at `/404/`. In dev, `/404` shows Astro's trailing-slash hint and `/nope` shows Astro's dev 404, not the project's page. The project's 404 audit had only the `text-accent`→grey eyebrow failure (P1).
- Visual checks, screenshots:
  - Light hero.
  - Dark work cards (images loaded after a frame).
  - Dark side-projects list.
  - About and footer in dark.
  - Dark Nativo page.
  - Dialog on desktop dark and mobile light.
- Footer mail icon, hero mail icon, forward arrows and the "Project preview · 3 images" wording are present as the diff states.
- Contrast script output matches the README (all eight token pairs pass), but it is blind to usage, as shown by P1.

## Other findings (lower severity)

- **P2, source-derived, not hover-tested:** `a:hover { text-decoration-line: underline }` is unlayered, so it beats utilities. It applies to filled buttons and the circular email button as well as small text links. The README says "small links underline on hover". Scope it with `a:where(...)`, or to the `.text-muted` link set.
- **P2:** Header nav active state. The underline appears in `[data-nav][aria-current=location]`. I saw it via source only; the observer is `IntersectionObserver` and does not update without frames. Treat as unverified rendered.
- **P3:** Gallery dialog height jumps between wide and tall slides (453px vs near-90dvh), and the primary "Read project" CTA can fall below the fold on a 740px-tall phone. A stable image box with `object-contain` would avoid the jump.
- **P3:** The preview trigger is now an `<a href>` to the image, named "Enlarge …". A screen reader announces a link, but activation opens a dialog. Acceptable progressive enhancement. Consider `aria-haspopup="dialog"`.
- **P3:** Theme-menu choice buttons have `aria-label` and a visible label with matching words, so label-in-name is fine. The summary label uses the raw value (`dark`) rather than "Dark".
- **P3, unchanged from the first review:** the screenshots in dark mode keep their own colours (LinkSeek/Nativo light UI blocks). The README states this is intentional. I agree.
- Harness note: viewport reported by `preview_status` (for example 300×617 after a 360×740 resize, and 1280×800 vs 1536×960 on a default tab) differs from `window.innerWidth`. I used `innerWidth` in page, as the README did.
- Harness note: on the default profile, the stored theme changed from dark to light between two of my calls without my action. I assume another session shares that profile's `localStorage`. I switched to an incognito tab to avoid affecting others, and closed the default tab.

## Verified limits (not tested; do not read as passed)

- Screen-reader output, 200% zoom, short-landscape height, touch behaviour, other browsers, and a truly visible tab.
- Backdrop-click close and Close-button click: not re-tested by me (the parent reported the Close button).
- Hover and focus-visible rendering: not checked. The tab never gets pointer hover frames reliably.
- Reduced-motion: I did not toggle the media query. Source shows `motion-safe` guards and a transition-duration override.
- Gallery slides: I checked Nativo slides 1 to 2 and OpenWhispr slides 1 to 2. I did not open every slide in every project.
- Contrast audit is my own computed-style walk on text nodes, with opaque and alpha backgrounds blended but without images or gradients. I filtered out decorative divider "/" (1.25:1 light, 1.59:1 dark).
- `astro check` and `astro build` were not re-run by me.

## What would earn 9.5

1. Fix P1 and re-render. Expect most of the score recovery.
2. Re-measure computed contrast for every text node on all routes, in both themes. Target: no failing text.
3. Reconcile the README's typography claims with measured sizes, or retake the screenshots.
4. Scope the global hover underline, and stabilize the gallery height.
5. Record the Escape result as verified, with the frame-throttle explanation above.
