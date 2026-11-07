# AI crawler access

Policy for cmglezp.dev: **search engines and AI agents that answer a user's question may read the site; crawlers that collect content to train models may not.** This document records how that policy is enforced and what to redo if the hosting provider changes.

Last verified against the vendors' documentation: November 2026. Bot names and dashboards change; recheck the links before relying on them.

## Two layers

| Layer | Where it lives | What it does | Survives a host change? |
| --- | --- | --- | --- |
| `robots.txt` | `src/pages/robots.txt.ts` (served at `/robots.txt`) | Asks well-behaved crawlers not to fetch the site. Voluntary. | Yes. It is part of the build. |
| Host firewall | Vercel project settings (not in this repository) | Refuses requests from known AI bots, whatever `robots.txt` says. | **No.** Recreate it at the new host. |

`robots.txt` cannot stop a crawler that ignores it. User-initiated fetchers (`ChatGPT-User`, `Perplexity-User`, `Meta-ExternalFetcher`) may also ignore it by design, because a person asked for the page.

## What `robots.txt` does

Allowed (wildcard group): Googlebot and other search engines, `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`.

Disallowed (training):

| User agent | Operator | Notes |
| --- | --- | --- |
| `GPTBot` | OpenAI | Independent of `OAI-SearchBot`. Blocking it does not remove the site from ChatGPT search. |
| `ClaudeBot` | Anthropic | Independent of `Claude-SearchBot` and `Claude-User`. |
| `Google-Extended` | Google | A token, not a separate crawler. Covers Gemini training and grounding. Does not affect Google Search. Google says sites that allow it are eligible to appear in Gemini grounded answers, so blocking it gives that up. |
| `Applebot-Extended` | Apple | Opts out of foundation-model training. Does not affect Apple search. |
| `CCBot` | Common Crawl | Public dataset reused by many trainers. Common Crawl says blocking also removes the site from its search index. |
| `meta-externalagent` | Meta | Training and indexing crawler. `Meta-ExternalFetcher` is separate and may ignore robots.txt. |

Changes can take about 24 hours to take effect (OpenAI, Perplexity and Meta all say so). Crawlers that already collected the site keep what they have.

`pnpm check:agents` fails if a search or user-initiated bot is disallowed or a training bot is not.

### Planned standard signal

Google announced support for a shared AI-training token based on the IETF AIPREF work, expected in early 2027. The syntax is still a draft. Revisit when it is final; the named `Disallow` rules above keep working in the meantime.

## Vercel (current host)

Check this once after each deployment-setting change, and again if bot traffic looks wrong.

1. Project → **Security** → **Firewall** → **Rules** → **Bot Management** → **AI Bots**. It is off by default.
2. The ruleset has two categories you can set separately:
   - **AI Crawlers** (collect content for training): set to **Deny** to back up `robots.txt`.
   - **AI Assistants** (fetch pages when a user asks or searches): leave on **Allow** (or Log), otherwise ChatGPT, Claude and Perplexity cannot read the site.
3. Start with **Log**, open the Firewall activity view, and confirm that `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `ChatGPT-User` and `Claude-User` are not in the denied category before switching training categories to Deny. Vercel maintains the list of bots, and which category a given bot falls in is Vercel's decision.
4. Make sure **Bot Protection** (a different feature) is not set to Challenge in a way that blocks the AI assistants you want to allow. It normally exempts verified bots, but confirm.
5. CLI alternative: `vercel firewall rules edit ai-bots --category ai-crawlers --action deny --yes`, then `vercel firewall diff`, then `vercel firewall publish`.

Verify from outside:

```sh
curl -sI -A "Mozilla/5.0 (compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot)" https://cmglezp.dev/ | head -1
curl -sI -A "Mozilla/5.0 (compatible; GPTBot/1.4; +https://openai.com/gptbot)" https://cmglezp.dev/ | head -1
```

The first should return `200`. The second returns `200` if only `robots.txt` is protecting you, and `403` once the firewall denies AI crawlers. A spoofed user agent is only a rough test: some hosts verify bots by IP range, which this does not exercise.

## If the hosting provider changes

1. Keep `robots.txt`: it ships with the build and needs no change.
2. Set `SITE_URL=https://cmglezp.dev` in the new host's build environment if it differs from the default in `astro.config.ts`. Canonical URLs, the sitemap, JSON-LD and `llms.txt` links depend on it.
3. Recreate the firewall rules: block AI training crawlers, allow AI assistants and search bots. Look for the new provider's equivalent of Vercel's AI Bots ruleset (Cloudflare calls its version AI Crawl Control). Defaults vary, and some hosts block AI bots unless you opt in.
4. Serve `/llms.txt`, `/llms-full.txt` and `*.html.md` as plain text or markdown without redirecting them to HTML. Serve `404.html` for unknown routes.
5. Run `pnpm build && pnpm check:agents`, then repeat the `curl` checks above against the live domain.

## Open items

- LinkSeek's MCP integration is implemented but still being tested. It is deliberately not described on the site or in `llms.txt`. Once there is verified information (what it exposes, how it is used), add it to the LinkSeek project in `src/data/portfolio.ts`; the HTML and every markdown output pick it up from there.

## References

- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Google common crawlers (Google-Extended)](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) and [shared AI training control](https://developers.google.com/search/blog/2026/10/ai-training-control)
- [Apple: About Applebot](https://support.apple.com/en-us/119829)
- [Common Crawl: CCBot](https://commoncrawl.org/ccbot)
- [Meta web crawlers](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)
- [Vercel Bot Management](https://vercel.com/docs/bot-management), [WAF managed rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets), [AI crawlers and assistants controlled separately](https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules)
- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html)
