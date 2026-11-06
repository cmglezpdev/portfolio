# Independent second theme review

Reviewed 2026-11-06 in `/home/omarchy/Dev/portfolio`, branch `fix/theme-review-polish`, HEAD `14adb25715e6fb002722a7e158c59d1d0d489708` with the uncommitted polish diff. This is an independent assessment, not acceptance of the requested 9.5 score.

## Score: 9.3/10, target 9.5 not met

| Criterion | Weight | Score /10 | Contribution |
| --- | ---: | ---: | ---: |
| Contrast | 30% | 9.7 | 2.91 |
| Theme consistency | 20% | 9.4 | 1.88 |
| Typography and hierarchy | 20% | 9.2 | 1.84 |
| Interaction and accessibility | 20% | 8.6 | 1.72 |
| Presentation and naming | 10% | 9.1 | 0.91 |
| Total | 100% | 9.26 before rounding | 9.26 |

The polish materially improves reading hierarchy, theme-choice discovery, control boundaries, media labeling, and mobile dialog layout. No P0/P1 defect was verified. The score reflects a polished portfolio with a few remaining issues and incomplete accessibility/cross-browser evidence. It is not a standards-conformance certification.

## Findings

1. **P2, reproduced: current-section feedback can remain stale on the hero.** `src/scripts/interactions.ts:55-64` ignores every nonintersecting entry, and observes only `section[id]`. The hero has no section ID. After visiting Work and returning to the top, Work can retain `aria-current="location"` and its new blue underline while the hero is visible. I also observed Experience remaining marked at the top after an earlier scroll. The underline fixes color-only feedback but makes an incorrect state more noticeable. Clear the current item when no matching section occupies the tracking region, or include the hero in a single section-selection calculation. Verify Work → top, Experience → top, and Back to top with normal and reduced motion.

2. **P3, source and rendered markup confirmed: mobile home-link text and accessible name differ.** `src/components/Header.astro:8-10` displays only `cm.` below the small breakpoint, while its accessible name is `Carlos Manuel, home`. The desktop name also excludes the visible `cm` monogram. A voice-control user following the visible label cannot rely on a matching accessible name. Include the visible label in the name, for example `cm. Carlos Manuel, home`, or make the monogram decorative and provide a visible matching mobile label. Screen-reader/voice-control software was not run, so this is a markup finding, not a recorded assistive-technology failure.

3. **P3, confirmed naming cleanup remains.** `src/data/portfolio.ts:49` still says `commerce, ai agents` despite using `AI agents` elsewhere. LinkSeek is now consistent with its UI. The neutral `Project preview` / `images` wording correctly handles the OpenWhispr banner. Fix the remaining lowercase acronym; it is minor and should not drive a large score deduction.

4. **P3, source-confirmed polish opportunity: project section navigation has no current state.** `src/pages/work/[slug].astro:40-45` provides useful section anchors but no active marker. The observer updates only `[data-nav]` in the homepage header. This is not a broken link or a mandatory accessibility failure, but the long Dara case study would benefit from the same clear location feedback as the homepage. Implement only if the state can be kept accurate; finding 1 takes priority.

## Gallery close/Escape investigation

**No persistent overflow lock was reproduced. Native Escape worked.** The initial observation is consistent with asynchronous dialog-close dispatch, not sufficient evidence of a product defect.

I instrumented only my own page with temporary listeners for `keydown`, `cancel`, and `close`. With the modal open, `preview_act` pressing Escape produced this trusted sequence:

| Event | performance.now ms | Inline html overflow |
| --- | ---: | --- |
| keydown, key Escape | 68554.5 | hidden |
| cancel | 68554.7 | hidden |
| close | 68555.0 | empty string |

The dialog was closed and overflow restored in the next evaluation. `document.visibilityState` was `visible` and `document.hasFocus()` was true during this investigation. The handler in `interactions.ts:108-112` only intercepts left/right arrows; it does not cancel Escape. ThemeScript's Escape listener also does not prevent the native default.

I reproduced the parent's immediate-close observation exactly using the actual close-button listener. In one evaluation, focus the Nativo trigger, open the modal, click `[data-close-preview]`, and inspect state immediately. Result: `dialog.open=false`, focus restored to the Nativo trigger, but inline html overflow still `hidden`, with no close event recorded yet. In the next evaluation, a trusted close event had fired and overflow was empty. `dialog.close()` changes open state and focus before the queued `close` event invokes `interactions.ts:145-146`. Reading overflow in the same synchronous evaluation therefore reads an intermediate state.

Do not add an Escape workaround solely on the earlier failed automation result. That earlier run's missing event cannot be proven to be background scheduling from my run, but tab/event timing is a plausible explanation. A persistent bug requires a reproduction where the close event has had a chance to run and overflow is still wrong. A synchronous shared cleanup helper could make immediate state inspection deterministic, but this is not needed to fix a verified user-facing failure.

## Rendered assessment

- **Homepage hero, both themes.** Display tracking is more readable and the role title has enough weight. The grid, portrait, blue accent, and off-white/deep-green paper form a coherent design. Mobile naturally wraps `Building software.` into two lines. The portrait is intentionally hidden there. The long introduction places the primary CTA low on a phone; this is a content-density tradeoff, not clipping.
- **Experience.** Body copy is more distinct from dates and metadata. The 18px role headings read above the 17px body. Employer dates wrap below the company heading on phones without collision. The timeline remains visible and orderly. White employer artwork tiles are appropriate preserved assets, not a dark-theme regression.
- **Selected work.** The wide Nativo card and the two smaller cards hold together on desktop and stack on phones. Project imagery retains authentic product colors. LinkSeek's light UI and the purple OpenWhispr banner are deliberate image content. Caption wording and internal-arrow changes remove earlier misleading signals.
- **About/contact/footer.** Both themes maintain the same readable body/metadata hierarchy. Capabilities stack at phone widths. The long email wraps safely, and the large mail action remains recognizable. Generous vertical space is consistent with the rest of the page.
- **All four project routes.** Inspected Nativo, LinkSeek, OpenWhispr Proxy, and Dara at narrow and desktop sizes in both theme states, including header and prose captures. The content column measures approximately 634 CSS px on desktop with the new 65ch cap. Project titles, tags, external CTAs, source notes, section nav, prose, and next-project treatment share the palette. Long names wrap on mobile. Dara's text-only treatment is appropriate for a professional case study without public UI assets.
- **404.** A real missing URL renders the custom page, proper title, shared header/footer, readable copy, and matching rounded home CTA. Checked in both themes at desktop and phone settings. No horizontal overflow detected.
- **Dialog.** Reviewed the supplied mobile screenshot and source. The proportional mobile image region removes the earlier large empty-space problem. Header, close control, counter, full-size action, description, and project action have a coherent hierarchy. Additional runtime coverage is recorded below.

## Contrast and evidence

Read README, both initial reports, browser-checks.json, the working-tree diff, shared layout/theme/header/footer/dialog/card/preview components, pages, interaction script, palette, and portfolio data. Viewed all seven supplied screenshots, including the annotated images and mobile dialog.

Ran `node scripts/check-theme-contrast.mjs` read-only. All eight checked pairs pass. Light/dark respectively: ink/paper 14.92/14.99, body/paper 8.18/10.60, muted/paper 5.53/7.63, accent/paper 5.51/7.72, on-accent/accent 5.97/7.72, muted/surface 4.90/6.23, control/paper 3.64/4.30, control/surface 3.23/3.51. Decorative line contrast is intentionally weak; it is now separated from controls. These are token calculations, not a claim about every composited pixel or screenshot's internal UI.

Used `preview_status`, then `preview_open` with `reuseExistingTab=false, open=true`. Operated only returned tab `tab_8_7c4419a2-0756-4e68-a908-c82c9a6a9de2`. Started no server, edited no repository file, delegated nothing, and created no PR.

Actual evaluated desktop sizes included 1200×750 and 1440×900; narrow sizes included 312×677 and 375×812. The preview reports 1280×800 screenshot output for desktop and can change evaluated width between navigation and capture. I used `innerWidth` and document scroll width rather than trusting requested settings. All sampled routes/states had document scroll width at or below viewport width. Manrope loading was verified on the homepage. No failed completed image was found in sampled route checks.

Some immediate captures lagged a theme switch or image load and showed an earlier frame or an intermediate color transition. Subsequent captures and DOM values were used to distinguish that from persistent rendering defects. These artifacts limit any claim of pixel-exact frame synchronization.

Not rerun: Astro check/build, already reported by the parent. Not verified: screen-reader announcements, real touch/mobile browser behavior, Firefox/Safari, 200% browser zoom, OS theme changes, cross-tab preference sync, blocked storage, JavaScript-disabled browser session, every responsive breakpoint, or every composited hover/focus contrast pair. Source support for these does not establish runtime passage. The supplied report's checks are evidence read, not silently counted as my own executions.
