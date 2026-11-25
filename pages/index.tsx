import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { GetStaticProps } from 'next';
import { PersonalFooter } from '../src/components/PersonalShell';
import { bio, recent, socialLinks, summary, RecentItem } from '../src/data/profile';
import { articles, featuredProjects } from '../src/data/writing';
import { parseInline } from '../src/lib/inline';
import { fetchStarCount, FALLBACK_STARS } from '../src/lib/stars';

interface Props { initialStars: number }
export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { initialStars: (await fetchStarCount()) ?? FALLBACK_STARS },
  revalidate: 3600,
});

const essays = articles.filter(article => article.kind === 'essay');

function Paragraph({ source }: { source: string }) {
  return <p>{parseInline(source).map((segment, index) => segment.type === 'link' ? <Link key={index} href={segment.href}>{segment.label}</Link> : segment.text)}</p>;
}

function NewsItem({ item }: { item: RecentItem }) {
  return (
    <details className="personal-news">
      <summary>
        <time>{item.when}</time>
        <span>
          <span className="personal-news-title">{item.title}</span>
          {item.proof && <span className="personal-news-proof">{item.proof}</span>}
        </span>
      </summary>
      <div className="personal-news-body">
        <p>{item.detail}</p>
        {item.links.length > 0 && <nav aria-label={`Links for ${item.title}`}>
          {item.links.map(link => link.href.startsWith('/') ? (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ) : (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
          ))}
        </nav>}
      </div>
    </details>
  );
}

export default function Home({ initialStars }: Props) {
  const [stars, setStars] = useState(initialStars);
  useEffect(() => {
    let active = true;
    fetchStarCount().then(value => { if (active && value !== null) setStars(value); });
    return () => { active = false; };
  }, []);
  const starLabel = `${stars.toLocaleString('en-GB')}${stars === FALLBACK_STARS ? '+' : ''}`;
  const earlier = articles.filter(article => article.kind === 'project' && !featuredProjects.some(project => project.slug === article.slug));
  const currentNews = recent.filter(item => !item.archive);
  const olderNews = recent.filter(item => item.archive);

  return <>
    <Head>
      <title>Tirth Kanani</title>
      <meta name="title" content="Tirth Kanani" />
      <meta name="description" content={summary} />
      <meta name="author" content="Tirth Kanani" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#fdfdfc" />
      <link rel="canonical" href="https://tirthkanani.com" />
      <link rel="alternate" type="text/markdown" href="/index.md" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Tirth Kanani" />
      <meta property="og:description" content={summary} />
      <meta property="og:url" content="https://tirthkanani.com" />
      <meta property="og:site_name" content="Tirth Kanani" />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Tirth Kanani" />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:creator" content="@tirth_8205" />
    </Head>
    <div className="personal-site personal-home" id="top">
      <a className="personal-skip" href="#main">Skip to content</a>
      <div className="personal-column">
        <header className="personal-intro" id="about">
          <div className="personal-name-line"><h1>Tirth Kanani</h1><span>London, UK</span></div>
          <div className="personal-bio">{bio.map(paragraph => <Paragraph key={paragraph} source={paragraph} />)}</div>
          <nav className="personal-social" aria-label="Elsewhere">
            {socialLinks.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}
            <Link className="personal-story" href="/writing/about">More about me</Link>
          </nav>
        </header>
        <nav className="personal-contents" aria-label="On this page"><a href="#about">About</a><a href="#work">Work</a><a href="#writing">Writing</a><a href="#recently">Recently</a></nav>
        <main id="main">
          <section className="personal-section" id="work" aria-labelledby="work-title">
            <h2 id="work-title">Work</h2>
            <div className="personal-projects">
              {featuredProjects.map(project => <article className="personal-project" key={project.slug}>
                <span className="personal-year">{project.year}</span>
                <div>
                  <h3><Link href={`/writing/${project.slug}`}>{project.title}</Link></h3>
                  <p>{project.blurb}</p>
                  {project.proof && <p className="personal-note">{project.proof}</p>}
                  {project.slug === 'code-review-graph' && <p className="personal-note"><a href="https://github.com/tirth8205/code-review-graph" target="_blank" rel="noopener noreferrer">{starLabel} stars on GitHub</a></p>}
                </div>
              </article>)}
            </div>
            <details className="personal-earlier">
              <summary>Earlier work and experiments</summary>
              <div>{earlier.map(article => <article className="personal-project" key={article.slug}><span className="personal-year">{article.year}</span><div><h3><Link href={`/writing/${article.slug}`}>{article.title}</Link></h3><p>{article.blurb}</p></div></article>)}</div>
            </details>
          </section>
          <section className="personal-section" id="writing" aria-labelledby="writing-title">
            <h2 id="writing-title">Writing</h2>
            <div className="personal-writing">{essays.map(article => <Link key={article.slug} href={`/writing/${article.slug}`}><span>{article.title}</span><time>{article.date.replace(/^\d+ /, '')}</time></Link>)}</div>
          </section>
          <section className="personal-section" id="recently" aria-labelledby="recent-title">
            <h2 id="recent-title">Recently</h2>
            <div className="personal-updates">{currentNews.map(item => <NewsItem key={`${item.when}:${item.title}`} item={item} />)}</div>
            {olderNews.length > 0 && <details className="personal-older">
              <summary>A little earlier</summary>
              <div className="personal-older-items">{olderNews.map(item => <NewsItem key={`${item.when}:${item.title}`} item={item} />)}</div>
            </details>}
          </section>
          <p className="personal-contact">The best way to reach me is <a href="mailto:tirthkanani18@gmail.com">tirthkanani18@gmail.com</a>.</p>
        </main>
        <PersonalFooter />
      </div>
    </div>
  </>;
}
