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

Store the profile portrait at `public/images/profile/`. Store project screenshots as WebP under `public/images/projects/<project>/`, then list their paths and short alt descriptions in the project's `images` field. Company marks live under `public/images/companies/`. Raw screenshots used during conversion stay in the local, ignored `projects-images/` folder.

The supplied PDF is preserved at the repository root. It is not offered as a current résumé because it predates AOShield and still lists Dara as current employment. Replace it with an updated version before adding a download link.

## Structure and behavior

- Experience comes before selected work. Dara's two career stages appear under one employer, each with its own description, contributions, and technologies.
- Dara's professional case study returns to experience. Personal-project navigation stays within Nativo, Linkseek, and OpenWhispr Proxy.
- Project pages include the problem, Carlos's contribution, decisions, outcome, and limitations.
- Real links use normal HTML anchors. The image dialog, entry animation, and scroll marker progressively enhance the static page.
- The native dialog supports Escape, focus containment, return to its trigger, and a close button.
- Reduced-motion preferences disable entry animations and the moving project marker.
- Fonts are bundled locally. There is no React dependency, external animation library, database, or runtime API requirement.

## Before publishing

The public origin is `https://cmglezp.dev`, set as the default `site` in `astro.config.ts`. It supplies canonical URLs, structured-data URLs, sitemap entries, and absolute links in `llms.txt`. Set `SITE_URL` at build time to override it, for example when testing another domain:

```sh
SITE_URL=https://staging.example pnpm build
```

Deploy `dist/` to a static host. Configure the host to serve `404.html` for unknown routes. No deployment was performed as part of the local design draft.

Review the job title at AOShield, public descriptions of company work, project copy, and the portrait before launch. Dara ends in August 2026; AOShield starts in September 2026. The interview's actual dates take precedence over the older CV.

## Search and machine readability

Agents and crawlers read the same static HTML as people; essential text does not require JavaScript. On top of that the build emits:

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, descriptive titles, meta descriptions, canonical URLs, Open Graph metadata, and Person/ProfilePage JSON-LD whose fields match visible text.
- `robots.txt` (RFC 9309) that allows search engines and user-initiated AI agents but disallows AI training crawlers, and `sitemap.xml`. See [docs/ai-crawler-access.md](docs/ai-crawler-access.md) for the policy, the Vercel firewall settings that back it up, and what to redo if the host changes.
- Markdown copies of every page at `<page URL>/index.html.md` (for example `/work/nativo/index.html.md`), advertised with `<link rel="alternate" type="text/markdown">`.
- `/llms.txt`, an index in the llmstxt.org format, and `/llms-full.txt`, the whole portfolio as one markdown document.

All of these are generated from `src/data/portfolio.ts` by `src/utils/markdown.ts`, so the HTML and markdown cannot drift. Edit copy in the data file, not in the page templates.

After `pnpm build`, run `pnpm check:agents` to verify the output: `llms.txt` structure and link resolution, a markdown alternate on every page, one `h1` and `main` per page, valid JSON-LD, and that every list item and paragraph in the HTML also appears in `llms-full.txt`.

What this does not do: these features make content available; they do not guarantee indexing, ranking, or inclusion in AI answers. Google states that it needs no `llms.txt`, AI text files, or special markup for AI Overviews and AI Mode, and that such files neither help nor harm Search. `llms.txt` is a community proposal, and no AI provider documents that it honors it. It is kept because it is cheap and may help tools that fetch it at inference time. Crawl and training controls belong in `robots.txt` and the host firewall.

LinkSeek's MCP integration is implemented but still being tested, so no public page describes it yet. Deliberately not implemented: MCP server cards, A2A agent cards, and WebMCP. They are for sites that expose actions to agents; this portfolio is read-only. Their specifications are still drafts.

Primary references:

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) and [optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Profile page structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [schema.org Person](https://schema.org/Person)
- [llmstxt.org: the /llms.txt proposal](https://llmstxt.org/)
- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html)
- Crawler documentation: [OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [W3C ARIA Authoring Practices: Landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)
- [Astro and Tailwind](https://docs.astro.build/en/guides/styling/#tailwind), [Tailwind's Astro integration](https://tailwindcss.com/docs/installation/framework-guides/astro)

Interview decisions and content sources are recorded in `docs/portfolio-brief.md`; domain vocabulary lives in `CONTEXT.md`. QR Generator is listed at https://qr-generator.linkseek.app/.

## Verification

The migration preserves the temporary draft's design, content, and interactions. `pnpm check` completes without diagnostics, and `pnpm build` generates six HTML pages plus `robots.txt`, `sitemap.xml`, and `llms.txt`. The local build has no public origin configured.

Output checks verified 100 internal links, assets, and fragment references, structured data, and five sitemap entries with a temporary origin. Browser checks covered desktop and 320px mobile layouts, all project previews, dialog dismissal and focus restoration, active navigation, scroll progress, reduced motion, the 404 page, and content without JavaScript.

The source draft remains in `../portforlio-temp` and is not needed to run or build this project. Content and visual changes can now be made here independently.
