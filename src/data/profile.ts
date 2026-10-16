export const SITE_URL = 'https://tirthkanani.com';

export const name = 'Tirth Kanani';

export const summary =
  'AI engineer and researcher building context systems, developer tools and auditable agents in London.';

// Paragraphs use markdown links so the human and machine views share one source.
export const bio = [
  'I build tools that help AI systems find the right context: less of it, better chosen.',
  'I created [code-review-graph](https://github.com/tirth8205/code-review-graph) and I am building [CrumbleUX](https://crumbleux.com). Both turn messy signals into useful decisions.',
  'By day I am an AI and automation engineer at Telana in London, endorsed by the UK as Global Talent. My MSc research at Birmingham explored traceable local language models; now I am testing auditable agents against ARC-AGI-3.',
];

export interface RecentItem {
  when: string;
  title: string;
  detail: string;
  note: string;
  slug?: string;
}

export const recent: RecentItem[] = [
  {
    when: 'Oct 2026',
    title: 'Future States Hackathon, 10 Downing Street',
    detail:
      'One of 35 engineers picked from more than 1,500 applicants to spend two days building with civil servants on real problems across government.',
    note: 'Run by 10DS and the Cabinet Office',
  },
  {
    when: 'Sep 2026',
    title: 'Claude Founder House, London',
    detail:
      'Demoed code-review-graph live on stage at Anthropic’s day for founders and builders.',
    note: 'Median 8.9× fewer tokens across 18 questions on six real repositories',
    slug: 'code-review-graph',
  },
  {
    when: 'May 2026',
    title: 'Build with AI Hack Night, Google I/O London',
    detail:
      'Won solo with CrumbleUX, built in one night during my first week at Telana.',
    note: 'Hosted by GDG London',
    slug: 'crumbleux',
  },
];

export const socialLinks = [
  { label: 'X', href: 'https://x.com/tirth_8205' },
  { label: 'GitHub', href: 'https://github.com/tirth8205' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tirthkanani' },
  { label: 'Email', href: 'mailto:tirthkanani18@gmail.com' },
];
