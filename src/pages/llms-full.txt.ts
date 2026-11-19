import type { APIRoute } from 'astro';
import { getArticles } from '../utils/articles';
import { renderLlmsFull } from '../utils/markdown';

export const GET: APIRoute = async ({ site }) =>
  new Response(renderLlmsFull(await getArticles(), site), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
