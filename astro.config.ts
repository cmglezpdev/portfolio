import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  // Set SITE_URL to the final public origin before deployment.
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
