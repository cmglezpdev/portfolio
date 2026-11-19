import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  // Public origin. SITE_URL overrides it, e.g. to test canonical URLs against a staging domain.
  site: process.env.SITE_URL || 'https://cmglezp.dev',
  trailingSlash: 'always',
  // Markdown images get a responsive srcset. The site's other images are plain <img> tags.
  image: { layout: 'constrained' },
  // Code blocks expose both palettes as CSS variables; global.css picks one for the active theme.
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false } },
  vite: { plugins: [tailwindcss()] },
});
