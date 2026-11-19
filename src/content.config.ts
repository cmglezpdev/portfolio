import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each article is a folder: src/content/articles/<slug>/index.md, with its images beside it.
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '*/index.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Banner on the home page card and at the top of the article, ideally 5:2.
    // `background` fills the bars when the cover is letterboxed into the 1200x630 social preview; match the cover's edge color.
    cover: z.object({ src: image(), alt: z.string().min(1), background: z.string().default('#141414') }).optional(),
    // Drafts appear in `astro dev` and are left out of production builds.
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
