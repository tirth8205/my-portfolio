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
  href: string;
}

const linkedInPost = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;

export const recent: RecentItem[] = [
  {
    when: 'Oct 2026',
    title: 'Built Gateway Check at the Future States Hackathon, No. 10',
    detail:
      'One of 35 engineers chosen from more than 1,500 applicants, run by 10DS and the Cabinet Office. Gateway Check reads domestic abuse evidence for legal aid against Schedule 1 before it is submitted, and every verdict rests on a quote found word for word in the letter.',
    href: 'https://github.com/tirth8205/No10_Hackathon',
  },
  {
    when: 'Sep 2026',
    title: 'Demoed code-review-graph at Claude Founder House',
    detail:
      'Live on stage at Anthropic’s day for founders and builders in London. Median 8.9× fewer tokens across 18 questions on six real repositories.',
    href: linkedInPost('7508887893927469056'),
  },
  {
    when: 'May 2026',
    title: 'Won the Build with AI Hack Night at Google I/O London',
    detail:
      'Solo, with CrumbleUX built in one night during my first week at Telana. Hosted by GDG London.',
    href: linkedInPost('7463224958392131584'),
  },
];

export const socialLinks = [
  { label: 'X', href: 'https://x.com/tirth_8205' },
  { label: 'GitHub', href: 'https://github.com/tirth8205' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tirthkanani' },
  { label: 'Email', href: 'mailto:tirthkanani18@gmail.com' },
];
