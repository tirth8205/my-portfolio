import Head from 'next/head';
import { useEffect, useState } from 'react';

const aiVerbs = [
  'Training models',
  'Deploying systems',
  'Building pipelines',
  'Fine-tuning LLMs',
  'Shipping products',
  'Exploring research',
  'Optimizing inference',
  'Crafting prompts',
  'Scaling infrastructure',
  'Iterating fast',
];

export default function Home() {
  const [currentVerb, setCurrentVerb] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentVerb((prev) => (prev + 1) % aiVerbs.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Tirth Kanani | AI & Machine Learning Engineer</title>
        <meta name="title" content="Tirth Kanani | AI & Machine Learning Engineer" />
        <meta name="description" content="AI Engineer with 3+ years building ML products. Expertise in Python, PyTorch, LLMs, MLOps, and Full-Stack development. Open to new opportunities in London, UK." />
        <meta name="keywords" content="Tirth Kanani, AI Engineer, Machine Learning Engineer, Python Developer, PyTorch, LLMs, Large Language Models, MLOps, Full-Stack Developer, Software Engineer, Deep Learning, NLP, Natural Language Processing, Computer Vision, Data Science, London, UK" />
        <meta name="author" content="Tirth Kanani" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tirthkanani.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tirthkanani.com" />
        <meta property="og:title" content="Tirth Kanani | AI & Machine Learning Engineer" />
        <meta property="og:description" content="AI Engineer with 3+ years building ML products. Expertise in Python, PyTorch, LLMs, MLOps, and Full-Stack development." />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://tirthkanani.com" />
        <meta name="twitter:title" content="Tirth Kanani | AI & Machine Learning Engineer" />
        <meta name="twitter:description" content="AI Engineer with 3+ years building ML products. Expertise in Python, PyTorch, LLMs, MLOps, and Full-Stack development." />
        <meta name="twitter:creator" content="@tirthkanani" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">

        {/* Accent line - top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <main className="text-center relative z-10">
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Tirth Kanani
          </h1>

          {/* Experience tagline */}
          <p className="text-neutral-600 text-sm md:text-base mb-2 tracking-wide">
            3+ years turning ideas into AI products that ship
          </p>
          <p className="text-neutral-700 text-xs md:text-sm mb-6">
            Python · PyTorch · LLMs · MLOps · Full-Stack
          </p>

          {/* Animated AI verb */}
          <div className="h-10 md:h-12 flex items-center justify-center mb-6">
            <p
              className={`text-xl md:text-2xl transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <span className="text-neutral-500">{aiVerbs[currentVerb]}</span>
              <span className="text-neutral-400 animate-blink">_</span>
            </p>
          </div>

          {/* Looking for roles badge */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 text-sm text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to new tech roles
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            <a
              href="https://linkedin.com/in/tirthkanani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-blue-400 transition-all duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://github.com/tirthkanani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-purple-400 transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
              href="https://x.com/tirthkanani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="X"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              href="mailto:tirthkanani18@gmail.com"
              className="text-neutral-600 hover:text-rose-400 transition-all duration-200 hover:scale-110"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </main>

        {/* Accent line - bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      </div>

      <style jsx global>{`
        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </>
  );
}
