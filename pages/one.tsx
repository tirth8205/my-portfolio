import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function One() {
  return (
    <>
      <Head>
        <title>{'One — Tirth Kanani'}</title>
        <meta name="title" content={'One — Tirth Kanani'} />
        <meta
          name="description"
          content="An open call. I am looking for one curious person to build something with."
        />
        <meta name="author" content="Tirth Kanani" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://tirthkanani.com/one" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tirthkanani.com/one" />
        <meta property="og:title" content={'One — Tirth Kanani'} />
        <meta
          property="og:description"
          content="An open call. I am looking for one curious person to build something with."
        />
        <meta property="og:site_name" content="Tirth Kanani" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={'One — Tirth Kanani'} />
        <meta
          name="twitter:description"
          content="An open call. I am looking for one curious person to build something with."
        />
        <meta name="twitter:creator" content="@tirth_8205" />
      </Head>

      <div className="min-h-screen bg-white">
        <article className="max-w-xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
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

          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
              Open call
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 leading-snug">
              I need one person.
            </h1>
          </motion.header>

          <motion.div
            className="space-y-5 text-[15px] md:text-base leading-[1.75] text-neutral-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              I&apos;m building something and I need one person.
            </p>
            <p>
              Not a co-founder. Not an employee. A collaborator. Someone who
              pulls threads until the thing comes apart. Who reads the
              footnotes. Who can&apos;t help asking why, and then why again,
              and then once more for good measure.
            </p>
            <p>
              You probably already know if this is you. You keep folders of
              half-finished ideas on your machine. You think about a problem in
              the queue at the post office, in the shower, at three in the
              morning on a Tuesday. The phrase &lsquo;good enough&rsquo; sits
              badly with you in a way you cannot quite articulate.
            </p>
            <p>
              You build things, and you build by feel. The thing you sketched
              on a Tuesday afternoon is on a friend&apos;s machine by the
              weekend. Your tools changed three times this year and you found
              that thrilling rather than exhausting. The first draft is rarely
              yours these days, and the second is rarely the machine&apos;s.
              You don&apos;t write as much code as you used to. You ship more
              software than ever.
            </p>
            <p>
              Your CV, what you&apos;ve shipped, where you studied. I&apos;ll
              get to all of that, if we meet. None of it is what I&apos;m
              filtering on. I&apos;m filtering on the kind of curiosity that
              builds things, the sort that won&apos;t switch off.
            </p>
            <p>
              I won&apos;t describe the project on this page. If you write to
              me, I&apos;ll tell you over a long coffee in London.
            </p>
            <p>
              Send a note to{' '}
              <span className="text-neutral-900 font-medium select-all whitespace-nowrap">
                {'tirthkanani{2⁴+2}@gmail.com'}
              </span>
              . Put{' '}
              <span className="text-neutral-900 font-medium select-all whitespace-nowrap">
                {'‘the eighteenth footnote’'}
              </span>
              {' '}in the subject line, exactly like that, so it lands in the
              right place. Then tell me about something you cannot stop
              thinking about. The shape of clouds. A bug in a compiler. An
              autocomplete that surprised you. Why your grandmother says
              certain words the way she does. Anything, so long as it is true.
            </p>
            <p>
              Look at the address twice before you send it. If it still looks
              broken, sit with it a little longer.
            </p>
            <p className="pt-6 text-neutral-500">
              {'— Tirth'}
            </p>
          </motion.div>

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
