# Third independent theme review

Reviewed 2026-11-06, branch `fix/theme-review-polish`, commit `dd93b42`, against base `feat/theme-selector` at `14adb25`. The parent committed the reviewed polish during this review. Additional concurrent edits appeared after the rendered checks; see the scope note below. Read README.md, gpt-second.md, sonnet-second.md, computed-checks.json, scripts/audit-rendered-theme.js, and the implementation diff. No repository edits, server starts, delegation, or PR operations were performed.

## Score: 9.5/10

| Criterion | Weight | Score /10 | Weighted contribution |
| --- | ---: | ---: | ---: |
| Contrast | 30% | 9.8 | 2.94 |
| Theme consistency | 20% | 9.6 | 1.92 |
| Typography and hierarchy | 20% | 9.5 | 1.90 |
| Interaction and accessibility | 20% | 9.1 | 1.82 |
| Presentation and naming | 10% | 9.4 | 0.94 |
| Total | 100% | 9.52 before rounding | 9.52 |

The requested target is met. No remaining P0, P1, or P2 defect was reproduced. I found no concrete P3 change that is necessary within this polish scope. This is a design review score, not accessibility certification. The interaction score is more conservative because several input and assistive-technology paths remain unverified.

## Fix verification

- **Color/size collision resolved.** Computed browser styles confirm body 17px/28px, control 15px/22px, and role 18px/28px wherever those roles occur. Copy is rgb(72,75,70) in light and rgb(197,203,195) in dark. Controls inherit the intended ink or authored accent rather than the old border color. `copy` and `edge` are separate from typography roles. The static script now rejects a color name shared with a declared font-size name.
- **Contrast restored on rendered elements.** Ran `node scripts/check-theme-contrast.mjs`; all eight pairs pass in both palettes. Independently reran the supplied computed audit on homepage samples, Nativo desktop in both themes, all three other project routes at 312px in both themes, and the custom `/404/` at 312px in both themes. All returned zero text failures and no horizontal overflow. The supplied full 24-state matrix was read and agrees with these samples; I did not independently repeat all 24 states.
- **Navigation clears at the hero.** At 1200px, Work was current in Work; returning to scrollY=0 cleared all current markers after a forced frame. At mobile width, Experience and Work selected appropriately in sampled positions. On Dara, the project section marker selected Engineering decisions when that section occupied the reading point, then cleared at the project top. No stale state was reproduced. This was not an exhaustive sweep of every boundary and scroll speed.
- **Mobile gallery image area is stable.** At actual 375×812, Nativo slides 1 and 2 both measured 284.1875px, matching 35dvh below the 18rem cap. The modal fit with its Read project action visible. Total modal height changed from 641.1875px to 613.1875px because the descriptions have different line counts. This modest content-driven change does not reproduce the former image-aspect-ratio jump and does not warrant another layout requirement.
- **Gallery semantics and behavior.** Trigger has aria-haspopup=dialog. Slide 2 updated the counter to 2 / 3, description, and full-size URL. Trusted Escape closed the mobile dialog, restored focus to Enlarge Nativo project preview, and cleared inline overflow after a saved snapshot. Desktop dark Escape also closed and cleared overflow. Desktop dark dialog text passed the computed audit.
- **Hover scope corrected.** Source limits the added hover underline to a.text-muted. A real hover on the filled Back to home CTA returned computed text-decoration-line:none. Active navigation retains its explicit underline independently.
- **Names corrected.** Rendered wordmark accessible name is cm. Carlos Manuel, home. Rendered experience copy includes commerce, AI agents. The diff standardizes LinkSeek and uses neutral Project preview/images labels.
- **Theme menu works by click.** The dark mobile menu visibly separates Light, Dark, and System, with a surface background, readable labels, border, and selected fill. A real click on Light applied light, stored light, closed the menu, and returned focus to SUMMARY. The summary name and pressed states matched the chosen preference. Choice text computes to 15px.

The light desktop hero, dark desktop work section, dark mobile case-study prose, dark mobile 404/menu, and light mobile dialog retain the same palette and type hierarchy. Product screenshots keeping their original colors is appropriate. No unrelated visual redesign is needed.

## Remaining actionable defects

None substantiated in this pass. Do not reopen the earlier color collision, hero-state, broad-hover, wordmark-name, acronym, or image-area findings based on the superseded reports.

## Limits and evidence quality

Used preview_status first, then preview_open with reuseExistingTab=false and profileId=incognito. Operated only my returned tab and closed it before handback. Requested and actual viewport sizes differed. Recorded actual widths included 312, 375, 1000, 1200, and 1440px. Saved snapshots forced frames before frame-dependent checks.

The background preview still occasionally captured blank lazy images and intermediate reveal animations. The mobile gallery image did render; the first desktop dark gallery capture was blank. I did not establish that every image on every slide rendered. These captures alone are not evidence of persistent missing-image defects.

One Enter-on-summary attempt did not leave the menu open, despite programmatic focus and a subsequent forced frame. Clicking opened it normally, and no app handler suppresses Enter in the inspected source. I did not isolate the cause, so I do not count keyboard opening as independently passed or call this a confirmed product bug. The prior reviewers' passing keyboard results remain separate evidence. A foreground browser retest of Enter/Space, Tab through options, and Escape is the specific follow-up check.

Not independently verified: screen-reader output, voice control, 200% zoom, real touch hardware, Safari/Firefox, short landscape layouts, OS theme changes, storage failures, JavaScript disabled, cross-tab synchronization, every hover/focus pair, every section boundary, every gallery slide, or reduced-motion runtime behavior. The audit excludes hidden/decorative text and does not resolve image pixels, gradients, pseudo-elements, or opacity of whole ancestor groups. Build and Astro check were reported by the parent and were not rerun here.

## Concurrent changes outside the scored snapshot

At final handback, `git diff` against dd93b42 showed additional parent changes: sticky header with an opaque paper background, desktop sticky project sidebar, navigation scroll offsets, reserved gallery description height, stronger hero description color, and a modified-click guard for preview links. These were read but not rendered again. The 9.5 score applies to the tested dd93b42 implementation described above, not blanket approval of those later additions.

Specific follow-up checks for that new diff: verify sticky-header anchor clearance at desktop/mobile and keyboard focus visibility; check that the desktop project sidebar clears the header; remeasure dialog fit and slide changes at narrow/short heights after reserving description space; verify Ctrl/Meta-click preserves normal image-link behavior. Documentation and screenshot files were also being changed concurrently, so this review does not attest their final state. These are verification tasks for later edits, not defects reproduced in the scored snapshot.
