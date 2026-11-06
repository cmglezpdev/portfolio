# Final acceptance review: fix/theme-review-polish (Sonnet 5.5, read-only)

**HEAD reviewed: `434988f005fea50100c70d80505e358128196a25`** (diff from `dd93b42` covers Header, PreviewDialog, index, work/[slug], interactions.ts, global.css, docs). Working tree clean at the start. I made no edits, started no servers, delegated nothing and did no PR work. I used my own incognito tabs and closed all of them. Server :4321 was already running.

## Score: 9.5 / 10 (raw 9.46). The target is met, but only just.

| Criterion | Weight | Score | Weighted |
|---|---|---|---|
| Contrast | 30% | 9.7 | 2.91 |
| Theme consistency | 20% | 9.5 | 1.90 |
| Typography / hierarchy | 20% | 9.5 | 1.90 |
| Interaction / accessibility | 20% | 9.1 | 1.82 |
| Presentation / naming | 10% | 9.3 | 0.93 |
| **Total** | | | **9.46, reported as 9.5** |

Previous: Sonnet 9.3 and GPT 9.5 on `dd93b42`. The rise comes from D1 (the active-section indicator is now actually visible). The remaining deductions are small and listed below.

## Verification of the D1–D4 fixes (rendered, current HEAD)

**D1: sticky header and anchors. FIXED.**
- Desktop (1280 wide, light and dark): the header computes `position: sticky; top: 0` with an opaque `bg-paper`, `rgb(246,246,243)` light and `rgb(23,26,25)` dark. Its height is 85px.
- At scrollY≈3824 (dark) the header was still at top 0 and bottom 85. "Work" showed `aria-current="location"` with an underline and the accent colour `rgb(145,168,255)`. I viewed both screenshots (dark and light): the header is readable and nothing bleeds through.
- Real mouse click on "Work" (desktop) landed at scrollY 3190, with `#work` at exactly 104px, leaving a 19px gap under the 85px header. Direct hash navigation to `/#about` landed at exactly 104px. Programmatic smooth scroll also landed exactly.
- Mobile (360 wide): the header is sticky and wraps to 141px. Real click on "About" landed with `#about` at 160px, 19px below the header. The computed `scroll-margin-top` is 160px mobile and 104px desktop. `#contact` also computes 160px, so the unlayered rule beats the `scroll-mt-10` utility as intended. On mobile the "About" underline was visible and correct.
- Project page `/work/nativo/`: desktop aside is `position: sticky`, top 112px, below the 85px header and not overlapping it. On `#decisions` the link "Technical decisions" got `aria-current` with an underline, and in dark its colour is `rgb(236,238,232)`. Mobile aside is static (by design), and all three project sections compute scroll-margin 160px.
- Horizontal overflow: none at 360 (scrollWidth ≤ viewport).

**D2: modified clicks. FIXED.** I dispatched cancelable click events on the first `[data-preview]` link, with a capture-free recorder on `document` to read `defaultPrevented` without navigating. Ctrl, Meta, Shift and Alt: not prevented and the dialog stayed closed. Plain click: prevented and the dialog opened. The `href` is the real image URL and `aria-haspopup="dialog"` is present. A button≠0 `click` is not normally dispatched by browsers (they use `auxclick`), so that branch is defensive only.

**D3: hero lead. FIXED.** The class is `text-lead text-copy`. Computed colour in dark is `rgb(197,203,195)`. `check-theme-contrast.mjs` passes all eight pairs (`copy/paper` 8.18:1 light, 10.60:1 dark).

**D4: dialog height. FIXED.** The description has `min-h-28 sm:min-h-14`; computed 112px at 360 and 56px at 1536.
- Desktop (light): dialog height 841px for all three Nativo slides, with description lengths 78, 62 and 67 characters.
- Mobile 360×700 (dark): dialog height 630px for all three slides, top 35 and bottom 665. It fits with no scrolling.
- Close path on mobile: focus returned to "Enlarge Nativo project preview" (real focus plus click) and `html` overflow was reset to `""`.

## Regressions
No new regressions found in what I exercised. The theme menu works in both themes (Light and Dark buttons, `aria-label` "Color theme: …"). The Work heading, cards and project images render correctly in both themes. I did not re-run the full rendered-contrast audit script. I checked only the changed colour (`copy`) and the repo contrast script.

## Remaining actionable issues (all small)

1. **P3: tall sticky header on phones.** At 360px the sticky header is 141px: 20% of a 700px viewport and 25% of a 568px viewport. It is the cost of the wrapped nav row. Consider a smaller vertical padding on `max-sm`, or hiding the header on scroll-down. The current behaviour is acceptable and not a defect on its own.
2. **P3: dialog on very short phones.** At 360×568 the dialog scrolls (`scrollHeight` 582 > `clientHeight` 509), so "Read project" sits about 23px below the fold until scrolled. The 112px mobile min-height also leaves roughly one blank line under 3-line descriptions at 360×700. Reachable, not broken. Consider `min-h-24` or `dvh`-based sizing.
3. **P3 (unreproduced): first click on a header link from scrollY 0 on a cold page overshot.** Twice, a *synthetic* `el.click()` on "Work" and "About" at desktop ended 357–634px past the target (for example scrollY 3824 instead of 3190). The same jump via real mouse click, hash navigation, and `scrollTo({behavior:'smooth'})` landed exactly. I believe it comes from the hidden, throttled harness tab, but I could not prove it. I'm flagging it for manual confirmation in a foreground browser.

## Untested limitations (not claimed as passing)

- The preview tab reports `visible: false`. After clicks that start long smooth scrolls at mobile sizes, the harness stalled: snapshots timed out and scrollY stopped advancing. I replaced the tab three times. No app error was observed, but I could not capture every mobile frame.
- Not re-run by me: the full rendered contrast audit across all routes, 404, and all four project pages. I did not check hover, focus-ring and forced-colors states beyond screenshots, nor screen readers, 200% zoom, or Safari and Firefox.
- Escape-key close and native `cancel` behaviour on the dialog were not re-established.
- I paged only Nativo's three slides in the gallery, and only on `/`. Only `/work/nativo/` was checked on project pages.
- I did not run `astro build` or `astro check`.
- The viewport reported 300×583 once after a resize (harness scaling), and mobile numbers above come from the tabs where it reported 360 wide.
- A synthetic `a.click()` open leaves the previously active element focused, and the dialog restored focus to that element on close. This is expected, not a defect: focus restores to the opener when the real opener had focus, as the real-focus run confirmed.
