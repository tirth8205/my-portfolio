import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import ArticleLinks from '../../src/components/ArticleLinks';
import { articles, Article } from '../../src/data/writing';

interface Props {
  article: Article;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: articles.map((article) => ({ params: { slug: article.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const article = articles.find((entry) => entry.slug === params?.slug);
  if (!article) return { notFound: true };

  return { props: { article } };
};

export default function ArticlePage({ article }: Props) {
  return (
    <>
      <Head>
        <title>{`${article.title} — Tirth Kanani`}</title>
        <meta name="description" content={article.description} />
        <meta name="author" content="Tirth Kanani" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fafaf8" />
        <link
          rel="canonical"
          href={`https://tirthkanani.com/writing/${article.slug}`}
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://tirthkanani.com/writing/${article.slug}`}
        />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />
        <meta property="article:author" content="Tirth Kanani" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:creator" content="@tirth_8205" />
      </Head>

      <main className="min-h-screen">
        <article className="mx-auto w-full max-w-[620px] px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <Link
            href="/"
            className="mb-12 inline-block text-sm text-[#6b6b65] underline decoration-[#d0cfc9] underline-offset-4 transition-colors hover:text-[#1c1c1a] hover:decoration-[#6b6b65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
          >
            Back home
          </Link>

          <header className="mb-11 border-b border-[#dddcd6] pb-10">
            <h1 className="mb-4 text-[1.8rem] font-semibold leading-[1.15] tracking-[-0.025em] text-[#1c1c1a] md:text-[2.15rem]">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#6b6b65]">
              <time>{article.date}</time>
              {article.mediumUrl && (
                <a
                  href={article.mediumUrl}
                  className="underline decoration-[#d0cfc9] underline-offset-4 transition-colors hover:text-[#1c1c1a] hover:decoration-[#6b6b65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
                >
                  Read on Medium
                </a>
              )}
            </div>

            {article.proof && (
              <p className="mt-6 text-sm leading-relaxed text-[#53534f]">
                {article.proof}
              </p>
            )}

            {article.links && article.links.length > 0 && (
              <div className="mt-5">
                <ArticleLinks links={article.links} />
              </div>
            )}
          </header>

          <div className="space-y-6 text-[15px] leading-[1.8] text-[#454541] md:text-base">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-16 border-t border-[#dddcd6]" />
        </article>
      </main>
    </>
  );
}
