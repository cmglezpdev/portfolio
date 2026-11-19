import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { posix } from 'node:path';

export type Article = CollectionEntry<'articles'>;

const WORDS_PER_MINUTE = 220;

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });

const images = import.meta.glob<{ default: ImageMetadata }>('/src/content/articles/**/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true });

export const articlePath = (article: Article): string => `/articles/${article.id}/`;

/** Size of the Open Graph / Twitter preview card, the 1.91:1 ratio social platforms crop to. */
export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const socialImagePath = (article: Article): string => `${articlePath(article)}social.png`;

export const formatArticleDate = (date: Date): string => dateFormat.format(date);

export const readingMinutes = (article: Article): number =>
  Math.max(1, Math.ceil((article.body ?? '').trim().split(/\s+/).length / WORDS_PER_MINUTE));

/** Published articles, newest first. Drafts are included only by the dev server. */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return articles.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

/** The article's Markdown with relative image paths replaced by their built URLs. */
export function articleMarkdown(article: Article, site?: URL): string {
  const folder = posix.dirname(`/${article.filePath}`);
  return (article.body ?? '').trim().replace(/(!\[[^\]]*\]\()([^)\s]+)/g, (match, prefix: string, path: string) => {
    const image = images[posix.join(folder, path)]?.default;
    if (!image) return match;
    return `${prefix}${site ? new URL(image.src, site).href : image.src}`;
  });
}
