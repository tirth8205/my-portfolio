import type { NextApiRequest, NextApiResponse } from 'next';
import { llmsTxt } from '../../src/lib/markdown';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.send(llmsTxt());
}
