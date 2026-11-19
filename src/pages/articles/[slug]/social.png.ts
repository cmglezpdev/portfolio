import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { SOCIAL_IMAGE_SIZE, getArticles } from '../../../utils/articles';

// Link-preview card for an article: its cover, centered on a 1200x630 canvas. The covers are
// wider than 1.91:1, so they are letterboxed instead of cropped and nothing gets cut off.
export const getStaticPaths = (async () => {
  const articles = await getArticles();
  return articles.filter((article) => article.data.cover).map((article) => ({ params: { slug: article.id }, props: { article } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ article: Awaited<ReturnType<typeof getArticles>>[number] }> = async ({ props }) => {
  const { src, background } = props.article.data.cover!;
  const { width, height } = SOCIAL_IMAGE_SIZE;
  // The build adds the source file's location to the image metadata, but Astro does not type it.
  const { fsPath } = src as typeof src & { fsPath: string };
  const card = await sharp(fsPath)
    .resize({ width, height, fit: 'contain', background })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(card), { headers: { 'Content-Type': 'image/png' } });
};
