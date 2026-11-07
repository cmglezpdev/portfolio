import type { APIRoute } from 'astro';
import { renderLlmsFull } from '../utils/markdown';

export const GET: APIRoute = ({ site }) =>
  new Response(renderLlmsFull(site), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
