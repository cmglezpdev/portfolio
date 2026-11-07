import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  // Public origin. SITE_URL overrides it, e.g. to test canonical URLs against a staging domain.
  site: process.env.SITE_URL || 'https://cmglezp.dev',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
