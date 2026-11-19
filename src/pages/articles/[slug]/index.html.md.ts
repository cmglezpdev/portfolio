import type { APIRoute, GetStaticPaths } from 'astro';
import { getArticles, type Article } from '../../../utils/articles';
import { MARKDOWN_TYPE, renderArticle } from '../../../utils/markdown';

export const getStaticPaths = (async () =>
  (await getArticles()).map((article) => ({ params: { slug: article.id }, props: { article } }))) satisfies GetStaticPaths;

// Markdown copy of /articles/<slug>/, advertised by <link rel="alternate" type="text/markdown">.
export const GET: APIRoute<{ article: Article }> = ({ props, site }) =>
  new Response(renderArticle(props.article, site), { headers: { 'Content-Type': MARKDOWN_TYPE } });
