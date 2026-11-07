import type { APIRoute } from 'astro';
import { MARKDOWN_TYPE, renderHome } from '../utils/markdown';

// Markdown copy of the home page, advertised by <link rel="alternate" type="text/markdown">.
export const GET: APIRoute = ({ site }) =>
  new Response(renderHome(site), { headers: { 'Content-Type': MARKDOWN_TYPE } });
