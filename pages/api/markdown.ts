import type { NextApiRequest, NextApiResponse } from 'next';
import { articles } from '../../src/data/writing';
import { articleMarkdown, homeMarkdown } from '../../src/lib/markdown';
import { FALLBACK_STARS, fetchStarCount } from '../../src/lib/stars';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = typeof req.query.slug === 'string' ? req.query.slug : null;
  let body: string;

  if (slug) {
    const article = articles.find((entry) => entry.slug === slug);
    if (!article) {
      res.status(404).setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send('Not found\n');
      return;
    }
    body = articleMarkdown(article);
  } else {
    body = homeMarkdown((await fetchStarCount()) ?? FALLBACK_STARS);
  }

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Vary', 'Accept');
  res.send(body);
}
