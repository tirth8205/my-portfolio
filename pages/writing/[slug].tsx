import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { articles, Article } from '../../src/data/writing';

interface Props {
  article: Article;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: articles.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const article = articles.find((a) => a.slug === params?.slug);
  if (!article) return { notFound: true };
  return { props: { article } };
};

export default function ArticlePage({ article }: Props) {
  return (
    <>
      <Head>
        <title>{`${article.title} \u2014 Tirth Kanani`}</title>
        <meta name="description" content={article.description} />
        <meta name="author" content="Tirth Kanani" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href={`https://tirthkanani.com/writing/${article.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tirthkanani.com/writing/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />
        <meta property="article:author" content="Tirth Kanani" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:creator" content="@tirth_8205" />
      </Head>

      <div className="min-h-screen bg-white">
        <article className="max-w-xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-400 transition-colors mb-12 py-1.5 -my-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 leading-snug mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <time>{article.date}</time>
              {article.mediumUrl && (
                <>
                  <span>{'\u00b7'}</span>
                  <a
                    href={article.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-400 transition-colors"
                  >
                    Also on Medium
                  </a>
                </>
              )}
            </div>
          </motion.header>

          {/* Body */}
          <motion.div
            className="space-y-5 text-[15px] md:text-base leading-[1.75] text-neutral-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-16 border-t border-neutral-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
        </article>
      </div>
    </>
  );
}
