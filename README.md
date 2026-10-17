# Carlos Manuel's portfolio

A static English-language portfolio built with Astro 7, Tailwind CSS 4, and TypeScript. The first version presents professional experience, three selected personal projects, a professional AI case study, and contact details.

## Run locally

Requires Node.js 22.22 or newer and pnpm 11.23.0. Use pnpm and the committed `pnpm-lock.yaml` for dependencies.

```sh
pnpm install --frozen-lockfile
pnpm dev --background
```

Open the local URL printed by Astro. Use `pnpm astro dev status`, `pnpm astro dev logs`, and `pnpm astro dev stop` to manage the background server.

```sh
pnpm check
pnpm build
pnpm preview
```

In an environment that cannot write Astro's global telemetry configuration, prefix commands with `ASTRO_TELEMETRY_DISABLED=1`.

## Edit content

| Change | Location |
| --- | --- |
| Name, introduction metadata, email, social links | `src/data/portfolio.ts`, `profile` |
| Employment history and roles | `src/data/portfolio.ts`, `experience` and `earlierExperience` |
| Project summaries, tags, links, case studies | `src/data/portfolio.ts`, `projects` |
| Main introduction and about text | `src/pages/index.astro` |
| Palette and fonts | `src/styles/global.css`, Tailwind theme tokens |
| Homepage layout | `src/pages/index.astro` |
| Project page layout | `src/pages/work/[slug].astro` |
| Shared HTML shell, fonts, and metadata | `src/layouts/Layout.astro` |
| Reusable interface components | `src/components/` |
| Preview dialog, animations, scroll marker, active navigation | `src/scripts/interactions.ts` |
| Content types | `src/types/portfolio.ts` |
| Static crawlability files | `src/pages/robots.txt.ts`, `sitemap.xml.ts`, `llms.txt.ts` |

The Astro configuration is `astro.config.ts`. Content, browser interactions, and static endpoints use TypeScript, with Astro's strict configuration and JavaScript source disabled. Run `pnpm check` separately from `pnpm build`; building alone does not check types.

Add a portrait under `public/images/`, then set `profile.portrait` to its site path, for example `/images/carlos.webp`. The initial version uses a monogram placeholder. Add a real screenshot under the same directory and set a project's `image` field to its site path. Nativo and Linkseek currently use explicitly labeled interface illustrations; the other projects use integration diagrams.

The supplied PDF is preserved at the repository root. It is not offered as a current résumé because it predates AOShield and still lists Dara as current employment. Replace it with an updated version before adding a download link.

## Structure and behavior

- Experience comes before selected work. Dara's two roles appear under one employer.
- Project pages include the problem, Carlos's contribution, decisions, outcome, and limitations.
- Real links use normal HTML anchors. The image dialog, entry animation, and scroll marker progressively enhance the static page.
- The native dialog supports Escape, focus containment, return to its trigger, and a close button.
- Reduced-motion preferences disable entry animations and the moving project marker.
- Fonts are bundled locally. There is no React dependency, external animation library, database, or runtime API requirement.

## Before publishing

Set the actual public origin when building:

```sh
SITE_URL=https://your-domain.example pnpm build
```

The example is a placeholder, not a configured domain. `SITE_URL` supplies canonical URLs, structured-data URLs, and sitemap entries. Without it, the local build deliberately omits canonical URLs and produces an empty sitemap rather than publishing a made-up origin.

Deploy `dist/` to a static host. Configure the host to serve `404.html` for unknown routes. No deployment was performed as part of the local design draft.

Review the job title at AOShield, public descriptions of company work, project copy, and the portrait before launch. Dara ends in August 2026; AOShield starts in September 2026. The interview's actual dates take precedence over the older CV.

## Search and machine readability

The build includes ordinary static HTML, descriptive page titles, descriptions, semantic headings, internal project links, Person/ProfilePage JSON-LD, `robots.txt`, a sitemap, and a convenience `llms.txt` index. Essential text does not require JavaScript. Project tags describe implemented capabilities; Linkseek's proposed MCP integration is not labeled as a current capability.

These features make content available for crawling; they do not guarantee indexing, ranking, or inclusion in AI answers. `llms.txt` is a supplementary index, not a requirement or certification. No external AI-accessibility score has been claimed.

References: [Astro and Tailwind](https://docs.astro.build/en/guides/styling/#tailwind), [Tailwind's Astro integration](https://tailwindcss.com/docs/installation/framework-guides/astro), [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

Interview decisions and content sources are recorded in `docs/portfolio-brief.md`; domain vocabulary lives in `CONTEXT.md`.

## Verification

The migration preserves the temporary draft's design, content, and interactions. `pnpm check` completes without diagnostics, and `pnpm build` generates six HTML pages plus `robots.txt`, `sitemap.xml`, and `llms.txt`. The local build has no public origin configured.

Output checks verified 100 internal links, assets, and fragment references, structured data, and five sitemap entries with a temporary origin. Browser checks covered desktop and 320px mobile layouts, all project previews, dialog dismissal and focus restoration, active navigation, scroll progress, reduced motion, the 404 page, and content without JavaScript.

The source draft remains in `../portforlio-temp` and is not needed to run or build this project. Content and visual changes can now be made here independently.
