import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import SocialLinks from '../src/components/SocialLinks';
import LondonClock from '../src/components/LondonClock';
import Kodama from '../src/components/Kodama';
import { articles } from '../src/data/writing';

const fade = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.35 + i * 0.06, duration: 0.5, ease: 'easeOut' },
  }),
};

const GITHUB_REPO = 'tirth8205/code-review-graph';
const FALLBACK_STARS = 27750;

const projects = articles.filter((a) => a.kind === 'project');
const essays = articles.filter((a) => a.kind === 'essay');

async function fetchStarCount(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.stargazers_count === 'number'
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

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

export default function Home({ initialStars }: HomeProps) {
  const [stars, setStars] = useState(initialStars);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchStarCount().then((count) => {
      if (cancelled) return;
      if (count !== null) setStars(count);
      setRefreshing(false);
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
          content="I build tools that give AI systems the right context: less of it, better chosen. Creator of code-review-graph, founder of CrumbleUX, based in London."
        />
        <meta name="author" content="Tirth Kanani" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fafafb" />
        <link rel="canonical" href="https://tirthkanani.com" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tirthkanani.com" />
        <meta property="og:title" content="Tirth Kanani" />
        <meta
          property="og:description"
          content="I build tools that give AI systems the right context: less of it, better chosen. Creator of code-review-graph, founder of CrumbleUX, based in London."
        />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://tirthkanani.com" />
        <meta name="twitter:title" content="Tirth Kanani" />
        <meta
          name="twitter:description"
          content="I build tools that give AI systems the right context: less of it, better chosen. Creator of code-review-graph, founder of CrumbleUX, based in London."
        />
        <meta name="twitter:creator" content="@tirth_8205" />
      </Head>

      <Kodama />

      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="w-full max-w-xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-0">
            <motion.h1
              className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-8"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5 }}
            >
              Tirth Kanani
            </motion.h1>

            <motion.div
              className="space-y-4 text-[15px] md:text-base leading-relaxed text-neutral-700 mb-8"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p>
                I build tools that give AI systems the right context: less of
                it, better chosen.
              </p>
              <p>
                Most recently I built{' '}
                <a
                  href="https://github.com/tirth8205/code-review-graph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  code-review-graph
                </a>
                , a local knowledge graph that helps coding agents work in
                large repositories without reading the whole codebase.
              </p>
              <p>
                It parses source code with Tree-sitter, maps dependencies, and
                hands the agent only the files and symbols a change touches.
                On big repositories that cuts token usage by up to 49 times.
                The open-source Claude Code plugin has picked up{' '}
                <span className="relative whitespace-nowrap inline-block px-1.5 -mx-1.5">
                  <span className={refreshing ? 'shimmer-text' : undefined}>
                    {stars.toLocaleString('en-GB')} stars
                  </span>
                  <motion.svg
                    className="absolute pointer-events-none"
                    style={{
                      left: '-4px',
                      top: '-6px',
                      width: 'calc(100% + 8px)',
                      height: 'calc(100% + 12px)',
                    }}
                    viewBox="0 0 200 50"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 20,25 C 15,8 55,2 100,3 C 145,2 185,10 183,25 C 185,42 148,48 100,47 C 52,48 15,42 18,25 C 19,18 40,12 60,10"
                      stroke="#d97706"
                      strokeWidth={2}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      opacity={0.45}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
                    />
                  </motion.svg>
                </span>{' '}
                on GitHub.
              </p>
              <p>
                I also run{' '}
                <a
                  href="https://crumbleux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  CrumbleUX
                </a>
                , an AI product that watches your screen and critiques the UX
                aloud, like a designer sitting beside you. I build and operate
                it end-to-end: Python for inference, TypeScript and Next.js
                for the product. The difficult part is not streaming live
                audio and video to a model. It is getting critiques back that
                hold up.
              </p>
              <p>
                Previously I was a research assistant in the University of
                Birmingham&apos;s HCI &amp; AI Lab. My MSc thesis,{' '}
                <a
                  href="https://github.com/tirth8205/GraphMinds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  GraphMinds
                </a>
                , used knowledge graphs to help a local language model show
                where its answers come from. I graduated as valedictorian.
              </p>
              <p>
                Based in London. Interested in agents that use less context,
                show their sources and fail more safely.
              </p>
            </motion.div>

            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SocialLinks />
            </motion.div>

            <motion.div
              className="border-t border-neutral-200 mb-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.h2
              className="flex items-baseline gap-2.5 text-sm font-medium tracking-wide text-neutral-600 uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span className="font-mono text-xs text-neutral-400 tabular-nums">
                01
              </span>
              Selected work
            </motion.h2>

            <div className="space-y-4 mb-12">
              {projects.map((post, i) => (
                <motion.div
                  key={post.slug}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={fade}
                >
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group flex items-baseline gap-2 md:gap-4 py-1.5 px-3 -mx-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200 ease-link"
                  >
                    <span className="font-mono text-[13px] text-neutral-500 shrink-0 tabular-nums">
                      {post.year}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[15px] text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200 ease-link">
                        {post.title}
                      </span>
                      {post.blurb && (
                        <span className="block text-[13px] text-neutral-500">
                          {post.blurb}
                        </span>
                      )}
                    </span>
                    <span className="text-neutral-300 group-hover:text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 ease-link text-sm shrink-0 hidden md:inline">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.h2
              className="flex items-baseline gap-2.5 text-sm font-medium tracking-wide text-neutral-600 uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <span className="font-mono text-xs text-neutral-400 tabular-nums">
                02
              </span>
              Writing
            </motion.h2>

            <div className="space-y-4 mb-8">
              {essays.map((post, i) => (
                <motion.div
                  key={post.slug}
                  custom={i + projects.length}
                  initial="hidden"
                  animate="show"
                  variants={fade}
                >
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group flex items-baseline gap-2 md:gap-4 py-1.5 px-3 -mx-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200 ease-link"
                  >
                    <span className="font-mono text-[13px] text-neutral-500 shrink-0 tabular-nums">
                      {post.year}
                    </span>
                    <span className="text-[15px] text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200 ease-link flex-1">
                      {post.title}
                    </span>
                    <span className="text-neutral-300 group-hover:text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 ease-link text-sm shrink-0 hidden md:inline">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <motion.footer
          className="px-6 py-6 flex flex-col items-center gap-1.5 md:flex-row md:justify-between max-w-xl mx-auto w-full text-xs text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <LondonClock />
          <span className="font-mono text-neutral-400 tabular-nums">
            51.5°N, 0.1°W
          </span>
        </motion.footer>
      </div>
    </>
  );
}
