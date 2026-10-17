import type { APIRoute } from 'astro';
import { projects } from '../data/portfolio';

export const GET: APIRoute = ({ site }) => {
  const routes = ['/', ...projects.map(({ slug }) => `/work/${slug}/`)];
  // Do not publish an invented or localhost origin before a domain is chosen.
  const entries = site ? routes.map((path) => `<url><loc>${new URL(path, site).href.replace(/&/g, '&amp;')}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
