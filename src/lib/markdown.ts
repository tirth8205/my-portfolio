import { articles, featuredProjects, Article } from '../data/writing';
import { SITE_URL, bio, name, recent, socialLinks, summary } from '../data/profile';
import { starsProof } from './stars';
import { INLINE_LINK as LINK, parseInline } from './inline';
export { parseInline } from './inline';
export type { InlineSegment } from './inline';

export const markdownUrl = (slug?: string) =>
  slug ? `${SITE_URL}/writing/${slug}.md` : `${SITE_URL}/index.md`;

const absolute = (href: string) => (href.startsWith('/') ? `${SITE_URL}${href}` : href);

// Pages on this site are linked by their markdown twins in the machine view.
const twin = (href: string) => (href.startsWith('/') ? `${SITE_URL}${href}.md` : href);

const withTwins = (source: string) =>
  source.replace(LINK, (_, label: string, href: string) => `[${label}](${twin(href)})`);

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
    ...bio.flatMap((paragraph) => [withTwins(paragraph), '']),
    '## Recently',
    '',
    ...recent.map((item) => {
      const links = item.links.map((link) => `[${link.label}](${twin(link.href)})`).join(' · ');
      return `- ${item.when}: ${item.title}. ${[item.proof, item.detail].filter(Boolean).join(' ')} ${links}`;
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
  const meta = [article.date, article.updatedAt && `Updated ${article.updatedAt}`, article.mediumUrl && `[Original on Medium](${article.mediumUrl})`]
    .filter(Boolean)
    .join(' · ');

  return [
    `# ${article.title}`,
    '',
    `> ${article.description}`,
    '',
    meta,
    ...(article.proof ? ['', article.proof] : []),
    ...(article.caveat ? ['', article.caveat] : []),
    ...(article.links?.length
      ? ['', article.links.map((link) => `[${link.label}](${absolute(link.href)})`).join(' · ')]
      : []),
    '',
    ...article.content.flatMap((paragraph, index) => [
      ...(article.headings?.[index] ? [`## ${article.headings[index]}`, ''] : []),
      paragraph,
      '',
    ]),
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
