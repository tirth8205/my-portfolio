import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import SocialLinks from '../src/components/SocialLinks';
import LondonClock from '../src/components/LondonClock';
import Kodama from '../src/components/Kodama';
import ModeSwitch from '../src/components/ModeSwitch';
import { articles, featuredProjects } from '../src/data/writing';
import { bio, recent } from '../src/data/profile';
import { FALLBACK_STARS, fetchStarCount, starsProof } from '../src/lib/stars';
import { markdownUrl, parseInline } from '../src/lib/markdown';

const essays = articles.filter((article) => article.kind === 'essay');

interface HomeProps {
  initialStars: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const stars = await fetchStarCount();

  return {
    props: { initialStars: stars ?? FALLBACK_STARS },
    revalidate: 3600,
  };
};

const inlineLink =
  'text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900';

function Prose({ source }: { source: string }) {
  return (
    <p>
      {parseInline(source).map((segment, index) =>
        segment.type === 'link' ? (
          <a key={index} href={segment.href} className={inlineLink}>
            {segment.label}
          </a>
        ) : (
          segment.text
        ),
      )}
    </p>
  );
}

export default function Home({ initialStars }: HomeProps) {
  const [stars, setStars] = useState(initialStars);

  useEffect(() => {
    let cancelled = false;

    fetchStarCount().then((count) => {
      if (!cancelled && count !== null) setStars(count);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tirth Kanani</title>
        <meta name="title" content="Tirth Kanani" />
        <meta
          name="description"
          content="AI engineer and researcher building context systems, developer tools and auditable agents in London."
        />
        <meta name="author" content="Tirth Kanani" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fafaf8" />
        <link rel="canonical" href="https://tirthkanani.com" />
        <link rel="alternate" type="text/markdown" href={markdownUrl()} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tirthkanani.com" />
        <meta property="og:title" content="Tirth Kanani" />
        <meta
          property="og:description"
          content="AI engineer and researcher building context systems, developer tools and auditable agents in London."
        />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tirth Kanani" />
        <meta
          name="twitter:description"
          content="AI engineer and researcher building context systems, developer tools and auditable agents in London."
        />
        <meta name="twitter:creator" content="@tirth_8205" />
      </Head>

      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-[620px] px-6 pb-16 pt-14 md:pb-20 md:pt-20">
          <header className="mb-12 md:mb-16">
            <h1 className="mb-6 text-[2rem] font-semibold leading-none tracking-[-0.035em] text-[#1c1c1a] md:mb-8 md:text-[2.35rem]">
              Tirth Kanani
            </h1>

            <div className="space-y-4 text-[15px] leading-[1.72] text-[#53534f] [text-wrap:pretty] md:text-base">
              {bio.map((paragraph) => (
                <Prose key={paragraph} source={paragraph} />
              ))}
            </div>

            <div className="mt-8">
              <SocialLinks />
            </div>
          </header>

          <section aria-labelledby="recently" className="mb-12 md:mb-16">
            <h2 id="recently" className="mb-4 text-[15px] font-medium text-[#1c1c1a]">
              Recently
            </h2>

            <ul className="border-y border-[#dddcd6]">
              {recent.map((item) => (
                <li key={item.href} className="border-b border-[#dddcd6] last:border-b-0">
                  <a
                    href={item.href}
                    title={item.detail}
                    className="group flex items-baseline justify-between gap-6 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
                  >
                    <span className="text-[15px] leading-snug text-[#53534f] decoration-neutral-400 underline-offset-4 group-hover:text-[#1c1c1a] group-hover:underline">
                      {item.title}
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-[#6b6b65]">
                      {item.when}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="selected-work" className="mb-12 md:mb-16">
            <h2
              id="selected-work"
              className="mb-4 text-[15px] font-medium text-[#1c1c1a]"
            >
              Selected work
            </h2>

            <ul className="border-y border-[#dddcd6]">
              {featuredProjects.map((project) => {
                const proof =
                  project.slug === 'code-review-graph'
                    ? starsProof(stars)
                    : project.proof;

                return (
                  <li
                    key={project.slug}
                    className="border-b border-[#dddcd6] last:border-b-0"
                  >
                    <Link
                      href={`/writing/${project.slug}`}
                      className="group block py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
                    >
                      <div className="mb-1 flex items-baseline justify-between gap-6">
                        <h3 className="text-[15px] font-medium text-[#1c1c1a] decoration-neutral-400 underline-offset-4 group-hover:underline md:text-base">
                          {project.title}
                        </h3>
                        <span className="shrink-0 text-xs tabular-nums text-[#6b6b65]">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#62625d]">
                        {project.blurb}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#6b6b65]">
                        {proof}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="writing">
            <h2 id="writing" className="mb-4 text-[15px] font-medium text-[#1c1c1a]">
              Writing
            </h2>

            <ul className="border-y border-[#dddcd6]">
              {essays.map((article) => (
                <li
                  key={article.slug}
                  className="border-b border-[#dddcd6] last:border-b-0"
                >
                  <Link
                    href={`/writing/${article.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
                  >
                    <span className="text-[15px] leading-snug text-[#53534f] decoration-neutral-400 underline-offset-4 group-hover:text-[#1c1c1a] group-hover:underline">
                      {article.title}
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-[#6b6b65]">
                      {article.year}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="mx-auto flex w-full max-w-[620px] items-end justify-between gap-6 px-6 pb-20 text-xs text-[#6b6b65] md:pb-8">
          <div className="flex min-w-0 flex-col gap-1.5 md:w-full md:flex-row md:items-center md:justify-between">
            <LondonClock />
            <span className="tabular-nums">51.5°N, 0.1°W</span>
          </div>
          <Kodama />
        </footer>
      </div>

      <ModeSwitch mode="human" />
    </>
  );
}
