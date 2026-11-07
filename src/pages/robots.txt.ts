import type { APIRoute } from 'astro';

// Crawlers whose purpose is training generative AI models. Policy: this site's content is not
// offered for model training. Search and user-initiated agents (OAI-SearchBot, ChatGPT-User,
// Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot) stay allowed by the
// wildcard group. See docs/ai-crawler-access.md before changing this list.
const trainingCrawlers = [
  'GPTBot', // OpenAI
  'ClaudeBot', // Anthropic
  'Google-Extended', // Google: Gemini training and grounding; does not affect Google Search
  'Applebot-Extended', // Apple: foundation-model training; does not affect Apple search
  'CCBot', // Common Crawl: public dataset widely used for training
  'meta-externalagent', // Meta
];

export const GET: APIRoute = ({ site }) => {
  const training = trainingCrawlers.map((agent) => `User-agent: ${agent}\nDisallow: /`).join('\n\n');
  const sitemap = site ? `\nSitemap: ${new URL('/sitemap.xml', site).href}\n` : '';
  const body = `# Search engines and user-initiated AI agents are welcome.\nUser-agent: *\nAllow: /\n\n# AI model training crawlers are not.\n${training}\n${sitemap}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
