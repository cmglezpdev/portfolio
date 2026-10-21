import type { APIRoute } from 'astro';
import { profile, projects } from '../data/portfolio';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string): string => site ? new URL(path, site).href : path;
  const text = `# ${profile.name}\n\n> ${profile.title} based in Mexico.\n\n${profile.description}\n\n## Portfolio\n\n- [Experience and contact](${url('/')}): Professional experience, skills, selected work, and contact information.\n${projects.map((project) => `- [${project.name}](${url(`/work/${project.slug}/`)}): ${project.summary}`).join('\n')}\n\n## Contact\n\n- Email: ${profile.email}\n${profile.socials.map((social) => `- [${social.label}](${social.url})`).join('\n')}\n\n## Reading these projects\n\nPersonal projects have a small user base. Linkseek's MCP integration is planned, not implemented. Nativo's writing checker needs refinement. Dara's agent platform had a small early-user rollout. Public pages distinguish implemented work, limitations, and future ideas.\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
