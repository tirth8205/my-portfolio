import Head from 'next/head';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import ModeSwitch from '../src/components/ModeSwitch';
import { FALLBACK_STARS, fetchStarCount } from '../src/lib/stars';
import { homeMarkdown, markdownUrl, parseInline } from '../src/lib/markdown';

interface MachineProps {
  markdown: string;
}

export const getStaticProps: GetStaticProps<MachineProps> = async () => {
  const stars = await fetchStarCount();

  return {
    props: { markdown: homeMarkdown(stars ?? FALLBACK_STARS) },
    revalidate: 3600,
  };
};

function Line({ source }: { source: string }) {
  if (source.startsWith('#')) {
    return <span className="text-[#f4f4ef]">{source}</span>;
  }

  return (
    <>
      {parseInline(source).map((segment, index) =>
        segment.type === 'link' ? (
          <a
            key={index}
            href={segment.href}
            className="group focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#f4f4ef]"
          >
            <span className="bg-[#2a2a27] text-[#f4f4ef] transition-colors group-hover:bg-[#f4f4ef] group-hover:text-[#0c0c0b]">
              [{segment.label}]
            </span>
            <span className="text-[#6f6f68]">({segment.href})</span>
          </a>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  );
}

export default function Machine({ markdown }: MachineProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Head>
        <title>Tirth Kanani · Machine</title>
        <meta
          name="description"
          content="The plain-text version of tirthkanani.com, as a language model reads it."
        />
        <meta name="robots" content="noindex, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0c0c0b" />
        <link rel="canonical" href="https://tirthkanani.com" />
        <link rel="alternate" type="text/markdown" href={markdownUrl()} />
      </Head>

      <div data-mode="machine" className="min-h-screen font-mono text-[#bdbdb5]">
        <main className="mx-auto w-full max-w-[680px] border-x border-[#232321] px-5 pb-32 pt-10 md:px-8 md:pt-16">
          <div className="mb-10 flex items-center justify-between gap-4 text-[11px] text-[#6f6f68]">
            <a
              href={markdownUrl()}
              className="truncate transition-colors hover:text-[#f4f4ef] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#f4f4ef]"
            >
              GET /index.md · text/markdown
            </a>
            <button
              type="button"
              onClick={copy}
              className="shrink-0 border border-[#2c2c29] px-2 py-1 uppercase tracking-[0.08em] transition-colors hover:text-[#f4f4ef] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#f4f4ef]"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <pre className="whitespace-pre-wrap text-[12.5px] leading-[1.75] [overflow-wrap:anywhere] md:text-[13px]">
            {markdown.split('\n').map((line, index) => (
              <span key={index} className="block min-h-[1.75em]">
                <Line source={line} />
              </span>
            ))}
          </pre>
        </main>

        <ModeSwitch mode="machine" />
      </div>
    </>
  );
}
