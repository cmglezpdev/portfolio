import type { APIRoute, GetStaticPaths } from 'astro';
import { projects } from '../../../data/portfolio';
import { MARKDOWN_TYPE, renderProject } from '../../../utils/markdown';

export const getStaticPaths = (() =>
  projects.map((project) => ({ params: { slug: project.slug }, props: { project } }))) satisfies GetStaticPaths;

// Markdown copy of /work/<slug>/, advertised by <link rel="alternate" type="text/markdown">.
export const GET: APIRoute<{ project: (typeof projects)[number] }> = ({ props, site }) =>
  new Response(renderProject(props.project, site), { headers: { 'Content-Type': MARKDOWN_TYPE } });
