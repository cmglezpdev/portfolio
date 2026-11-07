import { about, additionalWork, capabilities, earlierExperience, experience, profile, projects, sectionIntros } from '../data/portfolio';
import type { EmploymentPeriod, Project } from '../types/portfolio';
import { formatEmploymentPeriod } from './employment-period';

/**
 * Markdown renderings of the portfolio, generated from src/data/portfolio.ts so the
 * HTML pages, /llms.txt, /llms-full.txt and the per-page .md files cannot drift apart.
 */

export const MARKDOWN_TYPE = 'text/markdown; charset=utf-8';

/** Absolute URL when the public origin is known, otherwise a root-relative path. */
export const toUrl = (path: string, site?: URL): string => (site ? new URL(path, site).href : path);

/**
 * Location of the markdown copy of an HTML page, following llmstxt.org:
 * a URL without a filename gains `index.html.md`.
 */
export const markdownPath = (htmlPath: string): string => `${htmlPath.replace(/\/$/, '')}/index.html.md`;

export const projectPath = (project: Project): string => `/work/${project.slug}/`;

// Editorial caveats shown to agents so they do not overstate current capabilities.
// LinkSeek's MCP integration is implemented but still being tested; it is intentionally not described
// until there is verified information to publish.
const readingNotes = 'Personal projects have a small user base. Nativo\'s writing checker needs refinement. Dara\'s agent platform had a small early-user rollout. Public pages distinguish implemented work, limitations, and future ideas.';

const period = (value: EmploymentPeriod): string => formatEmploymentPeriod(value);
const bullets = (items: string[]): string => items.map((item) => `- ${item}`).join('\n');
const blocks = (...parts: (string | false | undefined)[]): string => `${parts.filter(Boolean).join('\n\n')}\n`;

export function renderProject(project: Project, site?: URL): string {
  const isCaseStudy = project.format === 'case-study';
  return blocks(
    `# ${project.name}`,
    `> ${project.headline}`,
    bullets([
      `Type: ${project.category}`,
      `Status: ${project.status}`,
      `Source: ${project.sourceNote}`,
      `Tags: ${project.tags.join(', ')}`,
      `Web page: ${toUrl(projectPath(project), site)}`,
      ...project.links.map((link) => `${link.label}: ${link.url}`),
    ]),
    `## ${isCaseStudy ? 'The product and its constraints' : 'Overview'}`,
    project.overview,
    project.format === 'case-study' && project.problem,
    project.format === 'case-study'
      ? `## My role\n\n${bullets(project.contributions)}`
      : `## How it works\n\n${project.howItWorks.join('\n\n')}`,
    project.decisions.length > 0 && [
      `## ${isCaseStudy ? 'Engineering decisions' : 'Technical decisions'}`,
      ...project.decisions.map((decision) => `### ${decision.title}\n\n${decision.text}`),
    ].join('\n\n'),
    project.format === 'case-study' && `## Early use and what I would simplify\n\n${project.outcome}\n\n${project.next}`,
    `Back to the portfolio: ${toUrl('/', site)}`,
  );
}

export function renderHome(site?: URL): string {
  const featured = projects.filter((project) => project.featured);
  const caseStudies = projects.filter((project) => !project.featured);
  const projectEntry = (project: Project): string => [
    `### [${project.name}](${toUrl(markdownPath(projectPath(project)), site)})`,
    `${project.category} · ${project.status}. ${project.summary}`,
    `Tags: ${project.tags.join(', ')}`,
    ...project.links.map((link) => `[${link.label}](${link.url})`),
  ].join('\n\n');

  return blocks(
    `# ${profile.name}`,
    `> ${profile.title} based in ${profile.location}. Open to remote software engineering, full-stack, and AI engineering opportunities.`,
    profile.description,
    bullets([
      `Website: ${toUrl('/', site)}`,
      `Email: ${profile.email}`,
      ...profile.socials.map((social) => `${social.label}: ${social.url}`),
      `CV (PDF): ${toUrl('/cv.pdf', site)}`,
    ]),
    '## Experience',
    sectionIntros.experience,
    ...experience.map((job) => [
      `### ${job.company}`,
      [job.context, period(job.period)].filter(Boolean).join(' · '),
      ...job.roles.map((role) => [
        `#### ${role.title}`,
        `${period(role.period)}`,
        role.description,
        bullets(role.points),
        `Technologies: ${role.tags.join(', ')}`,
        role.caseStudy && `Case study: ${toUrl(markdownPath(role.caseStudy), site)}`,
      ].filter(Boolean).join('\n\n')),
    ].join('\n\n')),
    '### Earlier experience',
    ...earlierExperience.map((job) => [
      `#### ${job.company} · ${job.title}`,
      period(job.period),
      job.description,
      bullets(job.points),
      `Technologies: ${job.tags.join(', ')}`,
    ].join('\n\n')),
    '## Selected work',
    sectionIntros.work.join(' '),
    ...featured.map(projectEntry),
    caseStudies.length > 0 && '## Case studies',
    ...caseStudies.map(projectEntry),
    '## Also on the workbench',
    bullets(additionalWork.map((item) => `${item.url ? `[${item.name}](${item.url})` : item.name} (${item.tag}): ${item.description}`)),
    '## About',
    ...about,
    bullets(capabilities.map((item) => `${item.title}: ${item.text}`)),
    '## Reading these projects',
    readingNotes,
  );
}

/** The /llms.txt index, structured as llmstxt.org describes: H1, blockquote, prose, then H2 link lists. */
export function renderLlmsIndex(site?: URL): string {
  const link = (label: string, path: string, notes: string) => `- [${label}](${toUrl(path, site)}): ${notes}`;
  return blocks(
    `# ${profile.name}`,
    `> ${profile.title} based in ${profile.location}. Portfolio of professional experience, selected projects, and case studies.`,
    profile.description,
    `Contact: ${profile.email}. ${readingNotes}`,
    '## Portfolio',
    [
      link('Profile, experience, and contact', markdownPath('/'), 'Roles, responsibilities, outcomes, skills, and contact details.'),
      ...projects.map((project) => link(project.name, markdownPath(projectPath(project)), project.summary)),
    ].join('\n'),
    '## Full content',
    link('Complete portfolio in one file', '/llms-full.txt', 'The profile, every project, and every case study concatenated, for agents that read one document.'),
    '## Optional',
    [
      link('Portfolio website', '/', 'The human-facing HTML version of this content.'),
      link('CV', '/cv.pdf', 'Printable curriculum vitae (PDF).'),
      ...profile.socials.map((social) => `- [${social.label}](${social.url})`),
    ].join('\n'),
  );
}

/** Everything in one document: the home markdown followed by each project page. */
export function renderLlmsFull(site?: URL): string {
  return [renderHome(site), ...projects.map((project) => renderProject(project, site))].join('\n---\n\n');
}
