import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SocialLinks from '../src/components/SocialLinks';
import LondonClock from '../src/components/LondonClock';
import Kodama from '../src/components/Kodama';
import { articles } from '../src/data/writing';

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.35 + i * 0.06, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Tirth Kanani</title>
        <meta name="title" content="Tirth Kanani" />
        <meta
          name="description"
          content="AI engineer based in London. I build knowledge graph systems, developer tools, and brain-computer interfaces."
        />
        <meta name="author" content="Tirth Kanani" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://tirthkanani.com" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tirthkanani.com" />
        <meta property="og:title" content="Tirth Kanani" />
        <meta
          property="og:description"
          content="AI engineer based in London. I build knowledge graph systems, developer tools, and brain-computer interfaces."
        />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://tirthkanani.com" />
        <meta name="twitter:title" content="Tirth Kanani" />
        <meta
          name="twitter:description"
          content="AI engineer based in London. I build knowledge graph systems, developer tools, and brain-computer interfaces."
        />
        <meta name="twitter:creator" content="@tirth_8205" />
      </Head>

      <Kodama />

      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="w-full max-w-xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-0">
            <motion.h1
              className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tirth Kanani
            </motion.h1>

            <motion.div
              className="space-y-4 text-[15px] md:text-base leading-relaxed text-neutral-600 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p>
                I build things where AI meets systems that need to work properly. Most
                recently I created{' '}
                <a
                  href="https://github.com/tirth8205/code-review-graph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  code-review-graph
                </a>
                , a local knowledge graph for Claude Code that cuts token usage by 49x.
                It has picked up over{' '}
                <span className="relative whitespace-nowrap inline-block px-1.5 -mx-1.5">
                  ten thousand stars
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
                on GitHub. I am also the
                founder of{' '}
                <a
                  href="https://crumbleux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  Crumble
                </a>
                , an AI-powered UX auditor that watches your screen and speaks design
                feedback aloud.
              </p>
              <p>
                Before that I spent time decoding imagined speech from brain waves with{' '}
                <a
                  href="https://github.com/tirth8205/GraphMinds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  GraphMinds
                </a>{' '}
                as part of my MSc at the University of Birmingham, where I graduated as
                valedictorian. I have also built adversarial testing frameworks for{' '}
                <a
                  href="https://github.com/tirth8205/Jailbreak-Eval"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-2 hover:decoration-blue-400"
                >
                  LLM safety
                </a>{' '}
                and took first place at the Epiminds multi-agent hackathon with
                SupplyMinds.
              </p>
              <p>
                I am based in London and generally thinking about knowledge graphs,
                AI safety, and how to make language models more useful without burning
                through tokens.
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
              className="text-sm font-medium tracking-wide text-neutral-600 uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Writing
            </motion.h2>

            <div className="space-y-4 mb-8">
              {articles.map((post, i) => (
                <motion.div
                  key={post.slug}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={fade}
                >
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group flex items-baseline gap-2 md:gap-4 py-1.5"
                  >
                    <span className="text-sm text-neutral-700 shrink-0 tabular-nums">
                      {post.year}
                    </span>
                    <span className="text-[15px] text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200 flex-1">
                      {post.title}
                    </span>
                    <span className="text-neutral-300 group-hover:text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-sm shrink-0 hidden md:inline">
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
          <span className="text-neutral-400 tabular-nums">51.5°N, 0.1°W</span>
        </motion.footer>
      </div>
    </>
  );
}
