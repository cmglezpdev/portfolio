# Portfolio brief

## Latest interview notes

### Confirmed content structure

- Keep Dara as one employer with two separate career stages. Each stage has its own description, contributions, technologies, and dates: earlier backend/microservices work and later technical leadership on the new modular monolith. Do not blend both architectures into one project.
- The CI improvements belong to the transition around the beginning of technical leadership, before work on the new platform.
- Keep the current homepage hierarchy: professional experience, collapsed earlier experience, selected personal projects, workbench, and About.
- Dara's AI case study is linked from employment. It is not a featured personal project or the next item in personal-project navigation.
- Keep Nativo first, followed by Linkseek and OpenWhispr Proxy. Other tools and contributions receive compact workbench descriptions. QR Generator is at https://qr-generator.linkseek.app/.
- Revise summaries, project details, and About in place. No redesign is requested. Use the supplied project screenshots as WebP files under `public/images/projects/`.
- The local portfolio copy has been revised from the interviews. Nothing was posted or deployed publicly.

Follow-up interviews expanded the work inventory and surfaced discrepancies in earlier dates, usage counts, and Linkseek billing details. Resolve those discrepancies before publishing; do not silently choose one account.

- Primary target is AI application engineering backed by full-stack delivery. Keep international and Mexico-based opportunities open, with English public content and no compensation figures.
- Private-source projects can use general architecture and permitted screenshots as evidence. Public source code is unnecessary.
- Dara operations experience is principally self-hosted Docker/Dokploy, plus actual AWS S3 document storage configured through CDK. Azure at AOShield is an existing environment Carlos has not configured. AWS/Terraform projects are practical learning exercises.
- Carlos wants CI/CD improvements expressed as percentages, without spending amounts. Clarified build timings support approximately 60–70% shorter typical CI builds; the recalled ranges do not establish an 80% improvement. Keep build time, deployment time, and spending separate.
- Dara technical leadership was functional, not a formal title promotion: initially coordinated approximately five developers, then assumed broader implementation as staffing reduced. Final title wording remains open.
- Last actual work at Dara was in late August 2026. September in LinkedIn was chosen for duration display; use actual employment dates, pending contractual confirmation.
- AOShield contributions include production C# API refactoring across entities to adopt existing authorization patterns, related React changes, defect fixes, and smaller shared-package improvements.
- Dara's scheduled agent execution was internally tested and unfinished in its tool restriction controls; distinguish it from the interactive agent deployment.
- Nativo has a reported development evaluation workflow, but exact accuracy, cost savings, model names, and dataset size are unverified.

## Confirmed constraints

- All public portfolio content will be in English.
- Use Astro with HTML, Tailwind CSS, and TypeScript, producing a static website. React is unnecessary for the first version.
- Keep the presentation simple and minimal, with attention to detail.
- Use a precise, typographic grayscale interface with selective vivid color accents. The Balsamiq reference concerns restraint in color, not hand-drawn styling.
- Present professional experience and selected public or private projects.
- Project content may include descriptions, screenshots, source links when public, and live application links when available.
- Include GitHub, LinkedIn, and Twitter links.
- Keep core content accessible to search crawlers and AI agents.
- Prioritize employment opportunities with remote US/Canadian companies and Mexican companies serving foreign clients.
- Target software engineering, full-stack engineering, and applied AI engineering roles. Frontend-only work is not a target.
- Exclude articles and a writing section from the first release.
- Use Software Engineer and AI Engineer together in positioning, supported by descriptions and capability tags.
- Use a light grayscale base, an intense blue accent, and a subtle grid with a gradient. Include a portrait placeholder.
- Use a homepage plus static project detail pages. Enlarge project images in a modal.
- Order the homepage as introduction, experience, selected work, about, and contact.

## Professional context

- Professional work is the primary evidence of experience with real users, including B2B AI functionality at Dara.
- Carlos joined AOShield Solutions in September 2026 after leaving Dara in late August 2026. He works across frontend and a .NET backend on healthcare software for Canadian care teams. "Full-stack engineering" is an editorial role description; confirm the exact contractual title before publication.
- Existing AI functionality at the healthcare company predates Carlos's arrival and must not be presented as his contribution.
- Personal projects primarily serve Carlos, his wife, and a small number of other people. Do not imply large adoption.
- Compensation preferences are private interview context and are not public portfolio content.
- The new Dara agency platform had approximately three early users. Public customer-facing agents were not rolled out. Distinguish it from the separate remittance system with ongoing usage and the earlier commerce application that closed.
- Dara's agent implementation supported configurable system prompts, model selection, tools for business modules, approval flows, RAG over company documents, external MCPs, usage limits and budgets, and user-provided API keys.

## Candidate projects

The current GitHub profile README provides the canonical public names below. Final selection and project claims still require review.

- Nativo: language learning through formatted content import, generated audio, assisted reading, word familiarity tracking, idiom/phrasal-verb detection, and writing feedback. Writing feedback needs refinement. Stripe subscriptions are implemented. Vocabulary summaries and Anki export are future ideas. Website: https://soundlikenative.com.
- Linkseek: bookmark management with editable titles, descriptions, images, and relationships. Naming was confirmed in the earlier interview. Payment configuration is unverified; latest recollection is a one-time payment, possibly optional, without active charges. Do not claim subscriptions or a functioning checkout until checked. MCP integration is a future idea. Automatic AI descriptions and MCP access are not current capabilities. Website: https://linkseek.app.
- veta: CLI that extracts YouTube transcripts into Markdown with chapters, timestamps, and agent prompts. It does not call an LLM or generate summaries itself. Repository: https://github.com/cmglezpdev/veta.
- openwhispr-proxy: compatibility proxy between OpenWhispr and Vercel AI Gateway. Repository: https://github.com/cmglezpdev/openwhispr-proxy.
- AWS/Terraform learning projects: deployed and destroyed to explore services; repository identification pending.
- link-shortener-scalability-lab and commerce-lab: additional candidates linked in the GitHub profile README, not yet evaluated.
- Open-source contributions: possible supporting evidence. Supabase PR #35600 was verified merged; it corrects a documentation SQL example with security definer and an empty search_path. Describe its actual scope. Other PR statuses require verification before publication.

## Ideas to evaluate

- Portrait and a short personal introduction.
- Subtle grid background with a gradient.
- Scroll animation connecting projects, with a visual element to be chosen. A rocket is not a requirement.
- Image enlargement and project details in a modal.
- A writing section in a later release when articles exist.

These ideas are proposals, not settled requirements.

## First implementation

- Astro 7 and Tailwind 4, with fonts served locally and no React.
- Homepage plus case-study pages for Nativo, Linkseek, OpenWhispr Proxy, and the Dara platform.
- Earlier employment uses a native details disclosure. Core content remains in generated HTML.
- Native image dialog, subtle project entry animation, and a blue geometric marker following scroll through selected work.
- Nativo and Linkseek have labeled vector interface illustrations, not fabricated product screenshots. Proxy and Dara use explanatory diagrams.
- Local-only design draft; no hosting or public publication.
- No ADR was added: the current layout and stack choices are straightforward to reverse and do not meet the ADR criteria.

## Remaining launch inputs

- Final review of drafted English copy and public descriptions of company work.
- Exact AOShield job title.
- Final review of the portrait and project screenshots.
- An updated résumé PDF, if a download link is desired.
- Final public domain and deployment host.
- The specific AI-accessibility scoring tool mentioned by the user was not identified or run. The first draft uses static HTML and standard crawlability metadata instead.

## Migration to the Astro starter

- `portfolio` is the working project. Copy the complete draft from `../portforlio-temp` without modifying or deleting the source directory.
- Preserve the draft's design, English copy, pages, illustrations, metadata, and every interaction. Content review and redesign happen later in this project.
- Replace the starter welcome page and styles with the portfolio. Keep Astro's standard pages, layouts, and components structure.
- Use TypeScript for configuration, content, browser scripts, and static endpoints, with shared content types and strict checking.
- Use Tailwind 4 through its Vite plugin, retain locally served fonts, and use pnpm with one lockfile.
- Check types and build the static site before considering the migration complete.

## Source material

- Carlos_M_Gonzalez_CV.pdf, supplied in the workspace.
- Initial user interview, October 16, 2026.
- Follow-up interview, October 16, 2026.
- Design confirmation and detailed project interview, October 16, 2026. Explicit preference changed from plain CSS to Tailwind.
- Current profile README: https://github.com/cmglezpdev/cmglezpdev/blob/main/README.md. The web search snapshot of the profile was stale; use the fetched README for project discovery.

## Working method

Resolve the design questions with the user before implementation. Record agreed terminology in CONTEXT.md. Add ADRs only for consequential trade-offs that warrant a lasting explanation.
