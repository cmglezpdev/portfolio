// Run after a build: node scripts/check-agent-readiness.mjs [dist-dir]
// Checks that the built site is readable without JavaScript and that its machine-readable
// files are consistent with the HTML. It verifies structure, not whether any AI provider
// will index or cite the site.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const dist = resolve(process.argv[2] ?? new URL('../dist', import.meta.url).pathname);
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };
const read = (path) => readFileSync(join(dist, path), 'utf8');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === '_astro' ? [] : htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" };
const decode = (text) => text.replace(/&(amp|lt|gt|quot|#39|#x27);/g, (match) => entities[match]);
const textOf = (html) => decode(html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const normalize = (text) => text.replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();

// --- Required files -------------------------------------------------------------------------
for (const file of ['llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap.xml', 'index.html.md']) {
  check(existsSync(join(dist, file)), `missing ${file}`);
}
if (failures.length) { report(); }

// --- llms.txt follows the llmstxt.org structure ---------------------------------------------
const llms = read('llms.txt');
const lines = llms.split('\n');
check(lines[0].startsWith('# '), 'llms.txt must start with an H1');
check(lines.filter((line) => /^# /.test(line)).length === 1, 'llms.txt must have exactly one H1');
check(/^> \S/m.test(lines.slice(1, 4).join('\n')), 'llms.txt needs a blockquote summary after the H1');
let section = null;
for (const line of lines.slice(1)) {
  if (/^#{3,} /.test(line)) check(false, `llms.txt may only use H2 below the H1: "${line}"`);
  else if (/^## /.test(line)) section = line;
  else if (section && line.trim() && !/^- \[[^\]]+\]\([^)]+\)/.test(line)) check(false, `llms.txt list line is not a markdown link: "${line}"`);
}

// Every link that points at this site must resolve to a built file.
const origin = (() => {
  const match = read('sitemap.xml').match(/<loc>(https?:\/\/[^/<]+)/);
  return match?.[1];
})();
function localTarget(href) {
  if (/^https?:\/\//.test(href)) {
    if (!origin || !href.startsWith(origin)) return null;
    href = href.slice(origin.length);
  }
  if (!href.startsWith('/')) return null;
  const path = href.split('#')[0];
  return path.endsWith('/') ? `${path}index.html` : path;
}
const resolves = (target) => existsSync(join(dist, target));
const linkTargets = (markdown) => [...markdown.matchAll(/\]\(([^)\s]+)\)/g)].map((match) => match[1]);
for (const href of linkTargets(llms)) {
  const target = localTarget(href);
  if (target) check(resolves(target), `llms.txt links to ${href}, which is not in the build`);
}

// --- Robots: policy is "search and user-initiated agents allowed, model training not" ---------
const groups = new Map();
for (const block of read('robots.txt').split(/\n\s*\n/)) {
  const agents = [...block.matchAll(/^User-agent:\s*(\S+)/gim)].map((match) => match[1].toLowerCase());
  const blocksAll = /^Disallow:\s*\/\s*$/im.test(block);
  for (const agent of agents) groups.set(agent, blocksAll);
}
check(groups.get('*') === false, 'robots.txt: the wildcard group must allow crawling');
for (const agent of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Googlebot']) {
  check(groups.get(agent.toLowerCase()) !== true, `robots.txt: ${agent} (search or user-initiated) must not be disallowed`);
}
for (const agent of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent']) {
  check(groups.get(agent.toLowerCase()) === true, `robots.txt: training crawler ${agent} must be disallowed`);
}
check(!origin || /^Sitemap:\s*https?:\/\//im.test(read('robots.txt')), 'robots.txt: missing Sitemap line');

// --- Per-page checks ------------------------------------------------------------------------
const full = normalize(read('llms-full.txt'));
const pages = htmlFiles(dist).filter((file) => !file.endsWith('404.html'));
check(pages.length > 1, 'expected the home page and project pages');

for (const file of pages) {
  const name = `/${relative(dist, file)}`;
  const html = readFileSync(file, 'utf8');
  check(/<html[^>]*\slang="[^"]+"/.test(html), `${name}: <html> needs a lang attribute`);
  check(/<title>[^<]+<\/title>/.test(html), `${name}: missing <title>`);
  check(/<meta name="description" content="[^"]+"/.test(html), `${name}: missing meta description`);
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${name}: expected exactly one <h1>`);
  check((html.match(/<main[\s>]/g) ?? []).length === 1, `${name}: expected exactly one <main>`);

  const alternate = html.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/)?.[1];
  check(Boolean(alternate), `${name}: missing <link rel="alternate" type="text/markdown">`);
  const target = alternate && localTarget(alternate);
  if (target) {
    check(resolves(target), `${name}: markdown alternate ${alternate} is not in the build`);
    if (resolves(target)) check(read(target).startsWith('# '), `${name}: ${alternate} must start with an H1`);
  }
  check(/<link rel="describedby"[^>]*href="[^"]*llms\.txt"/.test(html), `${name}: missing rel="describedby" link to llms.txt`);

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(jsonLd.length > 0, `${name}: missing JSON-LD`);
  for (const [, body] of jsonLd) {
    try { JSON.parse(body); } catch { check(false, `${name}: JSON-LD is not valid JSON`); }
  }

  // Content parity: list items and body paragraphs on the page must also be in llms-full.txt.
  const main = html.match(/<main[\s\S]*<\/main>/)?.[0] ?? '';
  const body = main.replace(/<script[\s\S]*?<\/script>/g, '');
  const blocks = [...body.matchAll(/<(li|p)\b[^>]*>([\s\S]*?)<\/\1>/g)]
    .map((match) => normalize(textOf(match[2])))
    .filter((text) => text.length > 60);
  for (const block of blocks) {
    // Durations such as "(1 year 2 months)" are computed at build time and differ by markup.
    check(full.includes(block), `${name}: text missing from llms-full.txt: "${block.slice(0, 70)}…"`);
  }
}

function report() {
  if (failures.length) {
    console.error(`Agent-readiness check failed (${failures.length}):\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
    process.exit(1);
  }
  console.log(`Agent-readiness check passed for ${dist}.`);
}
report();
