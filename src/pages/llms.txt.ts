import type { APIRoute } from 'astro';
import { renderLlmsIndex } from '../utils/markdown';

export const GET: APIRoute = ({ site }) =>
  new Response(renderLlmsIndex(site), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
