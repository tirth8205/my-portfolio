export const SITE_URL = 'https://tirthkanani.com';

export const name = 'Tirth Kanani';

export const summary =
  'AI engineer and researcher building context systems, developer tools and auditable agents in London.';

// Paragraphs use markdown links so the human and machine views share one source.
export const bio = [
  'I am an engineer and researcher in London. Much of my work concerns how a language model can be given exactly the information a task demands, and nothing more.',
  'That question led me to build [code-review-graph](https://github.com/tirth8205/code-review-graph), an open-source tool that maps a codebase so that a coding assistant reads only what a change requires. I am also building [CrumbleUX](https://crumbleux.com), which watches a product in use and critiques it from six distinct points of view, much as a good design team would.',
  'I work as an AI and automation engineer at Telana and hold the UK’s Global Talent visa. My MSc at the University of Birmingham asked whether a model running on one’s own machine could answer questions about private documents and show where each answer came from. Since then my interests have widened to graph theory, to the factors that shape a decision, and to machine learning models sound enough to generalise from one domain to another. People grasp unfamiliar situations quickly and from very little evidence, and I want to understand how a machine might reason as capably when matters are ambiguous. To that end I am building agents whose every decision can be examined afterwards, and testing them against the ARC-AGI-3 benchmark.',
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
