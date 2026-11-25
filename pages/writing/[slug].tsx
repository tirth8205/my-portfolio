import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PersonalFooter, PersonalHeader } from '../../src/components/PersonalShell';
import { articles, Article } from '../../src/data/writing';
import { parseInline } from '../../src/lib/inline';

interface Props { article: Article }
export const getStaticPaths: GetStaticPaths = async () => ({ paths: articles.map(article => ({ params: { slug: article.slug } })), fallback: false });
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const article = articles.find(entry => entry.slug === params?.slug);
  return article ? { props: { article } } : { notFound: true };
};

export default function ArticlePage({ article }: Props) {
  const headings = article.headings ?? {};
  const readableText = article.content.flatMap(paragraph => parseInline(paragraph).map(part => part.type === 'link' ? part.label : part.text)).join(' ');
  const readTime = Math.max(1, Math.ceil(readableText.split(/\s+/).length / 220));
  const updated = article.updatedAt && new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(article.updatedAt));
  const sections = Object.entries(headings)
    .filter(([index]) => Number(index) > 0 && Number(index) < article.content.length);
  const sectionHeadings = Object.fromEntries(sections);
  return <>
    <Head>
      <title>{`${article.title} — Tirth Kanani`}</title><meta name="description" content={article.description} /><meta name="author" content="Tirth Kanani" /><meta name="robots" content="index, follow" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#fdfdfc" />
      <link rel="canonical" href={`https://tirthkanani.com/writing/${article.slug}`} /><link rel="alternate" type="text/markdown" href={`/writing/${article.slug}.md`} />
      <meta property="og:type" content="article" /><meta property="og:title" content={article.title} /><meta property="og:description" content={article.description} /><meta property="og:url" content={`https://tirthkanani.com/writing/${article.slug}`} /><meta property="og:locale" content="en_GB" /><meta name="twitter:card" content="summary" /><meta name="twitter:creator" content="@tirth_8205" />
      <meta property="og:site_name" content="Tirth Kanani" /><meta property="article:author" content="Tirth Kanani" /><meta name="twitter:title" content={article.title} /><meta name="twitter:description" content={article.description} />
      {article.updatedAt && <meta property="article:modified_time" content={`${article.updatedAt}T00:00:00Z`} />}
    </Head>
    <div className="personal-site" id="top">
      <div className="personal-column">
        <PersonalHeader />
        <main id="main">
          <article className="personal-article">
            <header className="personal-article-header">
              <Link href="/" className="article-back">← Back home</Link>
              <h1>{article.title}</h1>
              <p className="article-description">{article.description}</p>
              <div className="article-meta">
                <time>{article.date}</time>
                {updated && <time dateTime={article.updatedAt}>Updated {updated}</time>}
                <span>{readTime} min read</span>
              </div>
              <nav className="article-resource-links" aria-label="Article resources">
                {article.links?.map(link => <a key={link.href} href={link.href} target={/^https?:\/\//.test(link.href) ? '_blank' : undefined} rel={/^https?:\/\//.test(link.href) ? 'noopener noreferrer' : undefined}>{link.label}</a>)}
                {article.mediumUrl && <a href={article.mediumUrl} target="_blank" rel="noopener noreferrer">Original on Medium</a>}
                <a href={`/writing/${article.slug}.md`}>Read as Markdown</a>
              </nav>
            </header>
            {article.proof && <p className="article-proof">{article.proof}</p>}
            {article.caveat && <p className="article-summary-note">{article.caveat}</p>}
            {sections.length >= 2 && <details className="article-contents">
              <summary>On this page</summary>
              <nav aria-label="Table of contents">{sections.map(([index, title]) => <a key={index} href={`#section-${index}`}>{title}</a>)}</nav>
            </details>}
            <div className="article-body">
              {article.content.map((paragraph, index) => <Fragment key={index}>
                {sectionHeadings[index] && <h2 id={`section-${index}`}>{sectionHeadings[index]}</h2>}
                <p>{parseInline(paragraph).map((part, partIndex) => part.type === 'link' ? <a key={partIndex} href={part.href} target={/^https?:\/\//.test(part.href) ? '_blank' : undefined} rel={/^https?:\/\//.test(part.href) ? 'noopener noreferrer' : undefined}>{part.label}</a> : <Fragment key={partIndex}>{part.text}</Fragment>)}</p>
              </Fragment>)}
            </div>
            <footer className="article-endnote">
              <p>Written by Tirth Kanani.</p>
              <Link href="/#writing">Back to all writing</Link>
            </footer>
          </article>
        </main>
        <PersonalFooter />
      </div>
    </div>
  </>;
}
