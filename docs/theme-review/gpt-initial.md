# Initial theme and presentation review

Branch: `feat/theme-selector`.
Reviewed HEAD: `14adb25715e6fb002722a7e158c59d1d0d489708`.
Date: 2026-11-06.
Repository changes: none. No server started; no agents spawned.

## Independent score: 8.5/10, provisional

This is a source-and-assets score, not a completed rendered desktop/mobile audit. The shared palette and basic component structure are strong. I found no verified critical contrast defect. Presentation labeling, reading hierarchy, and preview ergonomics need work. A 9.5 rating would require actual browser verification as well as addressing the findings below.

| Category | Weight | Score /10 | Weighted contribution |
| --- | ---: | ---: | ---: |
| Contrast | 30% | 9.2 | 2.76 |
| Theme consistency | 20% | 9.0 | 1.80 |
| Typography and hierarchy | 20% | 8.0 | 1.60 |
| Interaction and accessibility | 20% | 7.8 | 1.56 |
| Presentation and naming | 10% | 7.8 | 0.78 |
| Total | 100% | | 8.50 |

The lower interaction score reflects source-visible limitations and substantial unverified behavior, not a claim that keyboard or screen-reader tests failed. The score is independent of the requested 9.5 target.

## What was verified

- Read `global.css`, shared layout, theme initialization and selector, header/footer/404, homepage, dynamic project page, project cards/previews/dialog, interaction script, portfolio data, tag component, and font imports.
- Inspected actual image files for Nativo's reading screen, Linkseek's library, OpenWhispr Proxy's banner, and the published social-card PNG. Did not inspect every gallery slide.
- Calculated sRGB relative-luminance contrast directly from both palettes with a Python script. These are opaque token calculations, not computed browser styles or every translucent overlay.
- Browser sequence followed the requested isolation: `preview_status`, then `preview_open` on port 4321 with `reuseExistingTab=false`. Navigation failed with `ERR_CONNECTION_REFUSED`. The resulting review tab was closed.
- Working tree was clean before and after inspection.

Not verified: rendered homepage/project pages/404 in either theme; desktop/mobile wrapping and horizontal overflow; actual font loading; focus visibility and restoration; screen-reader output; persistence across navigation/reload; OS theme changes; touch controls; zoom/reflow; browser-specific details/dialog behavior; compiled Tailwind output. No build or server was run because this was a read-only initial review.

## Contrast findings

| Foreground / background | Light | Dark |
| --- | ---: | ---: |
| Ink / paper | 14.92:1 | 14.99:1 |
| Muted / paper | 5.53:1 | 7.63:1 |
| Accent / paper | 5.51:1 | 7.72:1 |
| On-accent / accent | 5.97:1 | 7.72:1 |
| Muted / surface | 4.90:1 | 6.23:1 |
| Line / paper | 1.25:1 | 1.59:1 |

All listed text pairs exceed 4.5:1. Dark accent buttons correctly use dark text, rather than white text on the pale blue accent. Primary CTA hover styles also switch foreground along with background. Muted text is comfortably readable by token calculation.

The line token is intentionally subtle. It is suitable for decoration; do not use it alone for a meaningful control boundary or state. Current theme and dialog controls also have high-contrast icons, so low border contrast alone is not a proven accessibility failure. Translucent screenshot captions require browser sampling before sign-off.

## Prioritized findings and concrete fixes

No verified P0/P1 blocker was found. P2 items are meaningful improvements; layout risks are explicitly identified as inferred.

1. **P2, confirmed: gallery descriptions misidentify the media.** `src/components/ProjectCard.astro:8,15` makes every supplied image a "Screenshot" and appends "3 photos" or "4 photos". `src/pages/work/[slug].astro:21` likewise labels any supplied image a "Project screenshot". The first OpenWhispr image is visibly a purple promotional banner, not its dashboard screenshot (`src/data/portfolio.ts:166-168`). This weakens trust in an otherwise precise portfolio. Use "images" for gallery counts and add a per-image kind/caption, so the banner is "Project banner" and subsequent dashboard slides are "Screenshot". Update the dialog caption on slide changes rather than holding the first category for the entire gallery. The simplest short-term fix is the neutral label "Project preview" and "images".

2. **P2, inferred from CSS: the mobile dialog reserves too much vertical space for wide images.** `src/components/PreviewDialog.astro:4,9-22` combines a 90dvh scrollable dialog with a fixed image region of 60dvh plus header, controls, description and CTA. The inspected screenshots and banner are landscape assets. On a narrow phone, object-contain makes the picture short while its image region remains tall, leaving substantial unused space and pushing context/actions below the initial dialog viewport. At 667px viewport height, the image region alone is about 400px. Use image-proportion-driven height with a cap, or a grid with auto-sized header/footer and a flexible image row. Keep the close button and gallery controls readily reachable. Verify at 320/375px widths and short landscape heights; no actual clipping was observed because the server was unavailable.

3. **P2, source-confirmed structure, rendered effect inferred: long prose lacks a reading-width limit.** `src/pages/work/[slug].astro:37,47-62` lets all case-study paragraphs fill the approximately 737px right column at maximum page width. The homepage experience column also carries many long bullets (`src/pages/index.astro:81-85`). At 17px this can create long, tiring lines. Add a prose width around 65-75ch, then inspect with the real font. Preserve generous body leading. Role headings are 16px while body text is 17px (`global.css:15-18`), so weight and spacing do all the hierarchy work. Consider an 18px role heading if the rendered job sections feel flat; do not reduce readable body text to solve hierarchy.

4. **P2, confirmed: the theme selector has no visible option labels.** `src/components/ThemeSelector.astro:15-19` renders only sun/moon/monitor icons. ARIA labels and title attributes are useful, but a touch user cannot rely on hover titles to discover that the monitor means "System theme". This is a discoverability issue, not a missing accessible-name claim. Render short visible labels "Light", "Dark", "System", retaining the 44px minimum targets and aria-pressed state. Keep the native disclosure approach unless testing demonstrates a need to replace it.

5. **P3, confirmed: external-link iconography is used for internal navigation and email.** `src/components/ProjectCard.astro:19` adds the external icon to internal project pages. `src/components/Header.astro:17` uses it for the in-page contact link. Hero/footer email actions use it too (`index.astro:37`, `Footer.astro:13`). Reserve the northeast external arrow for outgoing destinations, use a forward arrow for a case study, and a mail icon for email. The code already announces actual new-tab links to screen readers, which is good.

6. **P3, confirmed: product naming differs from the product image.** `src/data/portfolio.ts:135` and following copy use "Linkseek"; the inspected library screenshot displays "LinkSeek". Choose the canonical product spelling and apply it to heading, visit link, alt text and body. Also capitalize "AI agents" in `portfolio.ts:49`. Nativo versus `soundlikenative.com` is not automatically a defect, but an explanatory domain label could help users recognize the destination if the product was renamed.

7. **P3, source-confirmed: preview buttons remain interactive-looking without their enhancement.** `ProjectCard.astro:12` and `work/[slug].astro:34` are buttons whose action exists only in `interactions.ts:114-135`. With JavaScript unavailable, they offer a zoom cursor and enlarge label but do nothing. Project text links still work, so navigation is not blocked. Prefer an image URL anchor progressively enhanced into the dialog, or enable the button affordance only after initialization. Theme options have the same no-JavaScript limitation; either hide unavailable options or clearly scope the fallback to the OS theme.

8. **P3, source-confirmed: reduced-motion treatment is uneven.** Main project reveal animations honor reduced motion and preview scaling uses motion-safe. Several arrow transforms still run on hover, including `index.astro:36,119`, `ProjectCard.astro:19`, `Footer.astro:13`, and `work/[slug].astro:65`. Apply motion-safe to decorative transforms/transitions consistently. These small movements are a polish/accessibility preference issue, not a claimed automatic standards failure.

## Strengths to preserve

- One semantic palette covers homepage, project pages, footer/header, dialog and 404. No duplicate light-only page theme was found.
- Theme preference is applied in the head before paint; storage errors are caught; system changes, cross-tab changes, metadata color, selected-state ARIA and Escape handling have explicit code paths.
- Manrope and IBM Plex Mono provide a coherent text/display versus metadata split. Body text is 17px with 28px leading, rather than tiny portfolio copy.
- Header adapts into a separate navigation row below lg; theme choices and dialog controls have 44px targets; layout uses wrapping and responsive columns.
- Native dialog, labeled controls, skip link, global focus-visible styling, meaningful image alternatives, and external-tab announcements establish a useful accessibility baseline. Their runtime behavior still needs testing.
- The 404 uses the same layout and theme tokens and has a clear home action. Employer logos deliberately use white backing to preserve their source artwork; authentic light/dark product screenshots should likewise retain their own colors. Do not invert screenshots to force theme uniformity.
- The actual social PNG matches the palette and main headline. It uses generic rendered fonts rather than proving the website's font loading. Its light background is appropriate for a static share image and is not a dark-theme defect.

## Browser acceptance checks before a 9.5 sign-off

Once an authorized server is available, inspect `/`, `/work/nativo/`, `/work/linkseek/`, `/work/openwhispr-proxy/`, `/work/dara-platform/`, and a missing route. Cover light/dark at 1440x900, 375x812, and 320px width, plus 200% zoom and a short landscape viewport. Exercise all gallery slides, full-size links, close/Escape/backdrop, focus containment/return, theme selection and persistence, system setting changes, cross-page navigation, reduced motion, and font loading. Sample computed text/overlay/focus contrast. Confirm headings wrap naturally and contact/footer do not overflow. These checks are pending, not passed.
