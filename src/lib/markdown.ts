import { articles, featuredProjects, Article } from '../data/writing';
import { SITE_URL, bio, name, recent, socialLinks, summary } from '../data/profile';
import { starsProof } from './stars';

export type InlineSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; label: string; href: string };

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(source: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let cursor = 0;

  for (const match of Array.from(source.matchAll(LINK))) {
    const start = match.index ?? 0;
    if (start > cursor) segments.push({ type: 'text', text: source.slice(cursor, start) });
    segments.push({ type: 'link', label: match[1], href: match[2] });
    cursor = start + match[0].length;
  }

  if (cursor < source.length) segments.push({ type: 'text', text: source.slice(cursor) });
  return segments;
}

export const markdownUrl = (slug?: string) =>
  slug ? `${SITE_URL}/writing/${slug}.md` : `${SITE_URL}/index.md`;

const absolute = (href: string) => (href.startsWith('/') ? `${SITE_URL}${href}` : href);

const articleItem = (article: Article, detail?: string) =>
  `- [${article.title}](${markdownUrl(article.slug)}) (${article.year})${detail ? `: ${detail}` : ''}`;

const essays = articles.filter((article) => article.kind === 'essay');
const earlierProjects = articles.filter(
  (article) => article.kind === 'project' && !article.featured,
);

export function homeMarkdown(stars: number): string {
  return [
    `# ${name}`,
    '',
    `> ${summary}`,
    '',
    ...bio.flatMap((paragraph) => [paragraph, '']),
    '## Recently',
    '',
    ...recent.map((item) => {
      const title = item.slug ? `[${item.title}](${markdownUrl(item.slug)})` : item.title;
      return `- ${item.when}: ${title}. ${item.detail} ${item.note}.`;
    }),
    '',
    '## Selected work',
    '',
    ...featuredProjects.map((project) =>
      articleItem(
        project,
        `${project.blurb}. ${project.slug === 'code-review-graph' ? starsProof(stars) : project.proof}.`,
      ),
    ),
    '',
    '## Writing',
    '',
    ...essays.map((essay) => articleItem(essay, essay.description)),
    '',
    '## Earlier projects',
    '',
    ...earlierProjects.map((project) => articleItem(project, project.description)),
    '',
    '## Elsewhere',
    '',
    ...socialLinks.map((link) => `- [${link.label}](${link.href})`),
    '',
    '## For agents',
    '',
    `This page is the plain-text twin of ${SITE_URL}. Every article has one too: add .md to its address. A short index for language models lives at ${SITE_URL}/llms.txt.`,
    '',
  ].join('\n');
}

export function articleMarkdown(article: Article): string {
  const meta = [article.date, article.mediumUrl && `[Read on Medium](${article.mediumUrl})`]
    .filter(Boolean)
    .join(' · ');

  return [
    `# ${article.title}`,
    '',
    `> ${article.description}`,
    '',
    meta,
    ...(article.proof ? ['', article.proof] : []),
    ...(article.links?.length
      ? ['', article.links.map((link) => `[${link.label}](${absolute(link.href)})`).join(' · ')]
      : []),
    '',
    ...article.content.flatMap((paragraph) => [paragraph, '']),
    '---',
    '',
    `By [${name}](${markdownUrl()}). Human version: ${SITE_URL}/writing/${article.slug}`,
    '',
  ].join('\n');
}

export function llmsTxt(): string {
  return [
    `# ${name}`,
    '',
    `> ${summary}`,
    '',
    bio
      .map((paragraph) => parseInline(paragraph).map((s) => (s.type === 'text' ? s.text : s.label)).join(''))
      .join(' '),
    '',
    '## Start here',
    '',
    `- [Home](${markdownUrl()}): Bio, recent news, selected work and writing in one page.`,
    '',
    '## Projects',
    '',
    ...featuredProjects.map((project) => articleItem(project, project.description)),
    '',
    '## Writing',
    '',
    ...essays.map((essay) => articleItem(essay, essay.description)),
    '',
    '## Optional',
    '',
    ...earlierProjects.map((project) => articleItem(project, project.description)),
    ...socialLinks.map((link) => `- [${link.label}](${link.href})`),
    '',
  ].join('\n');
}
