export const SITE_URL = 'https://tirthkanani.com';

export const name = 'Tirth Kanani';

export const summary =
  'AI engineer and researcher building context systems, developer tools and auditable agents in London.';

// Paragraphs use markdown links so the human and machine views share one source.
export const bio = [
  'I’m an engineer and researcher based in London, working on AI and automation at Telana. I grew up in Ahmedabad and studied for an MSc at the University of Birmingham. I hold the UK’s Global Talent visa.',
  'I’m interested in how people and machines reason when the information is incomplete. That curiosity began with taking apart radios and old phones; these days it takes me into knowledge graphs, language models and auditable agents.',
  'Outside work, I build [code-review-graph](/writing/code-review-graph) and other open-source tools. As a side project, I’m working on [CrumbleUX](/writing/crumbleux).',
];

export interface RecentItem {
  when: string;
  title: string;
  detail: string;
  proof?: string;
  archive?: boolean;
  // Shown once the item is opened, so that nobody leaves the site by accident.
  links: { label: string; href: string }[];
}

const linkedInPost = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;

export const recent: RecentItem[] = [
  {
    when: 'Nov 2026',
    title: 'Took part in Dubai Future Week',
    detail:
      'Held at Emirates Towers and the Museum of the Future, under the theme “for the human of the future”. I saw the Big Stage talks and the Prototypes for Humanity floor, and entered the Metal Monsters robot battles.',
    links: [{ label: 'Event site', href: 'https://www.dubaifutureweek.com/en' }],
  },
  {
    when: 'Nov 2026',
    title: 'Released code-review-graph 2.4',
    proof: 'Around 330,000 PyPI downloads in the month to 25 November.',
    detail:
      'It now installs into 18 coding platforms and records how sure it is of every call it links.',
    links: [
      { label: 'About the project', href: '/writing/code-review-graph' },
      { label: 'Release notes', href: 'https://github.com/tirth8205/code-review-graph/releases/tag/v2.4.0' },
    ],
  },
  {
    when: 'Oct 2026',
    title: 'Built Gateway Check at the Future States Hackathon, No. 10',
    proof: 'I was one of 35 engineers chosen from more than 1,500 applicants.',
    detail:
      'The event was run by 10DS and the Cabinet Office. Gateway Check reads domestic abuse evidence for legal aid against Schedule 1 before it is submitted, and every verdict rests on a quote found word for word in the letter.',
    links: [
      { label: 'Case study', href: '/writing/gateway-check' },
      { label: 'Source code', href: 'https://github.com/tirth8205/No10_Hackathon' },
    ],
  },
  {
    when: 'Oct 2026',
    title: 'Built Astra Recall at the GPT-6 Astra Hackathon, London',
    detail:
      'A memory for code-review-graph that people can see, correct and forget. It learns only from what the user writes, never from the assistant’s replies.',
    links: [
      { label: 'Project page', href: 'https://cerebralvalley.ai/e/openai-gpt-6-astra-london/hackathon/gallery/9' },
    ],
  },
  {
    when: 'Sep 2026',
    title: 'Demoed code-review-graph at Claude Founder House',
    archive: true,
    detail:
      'Live on stage at Anthropic’s day for founders and builders in London. The graph needed a median of 8.9× fewer tokens across 18 questions on six real repositories.',
    links: [
      { label: 'About the project', href: '/writing/code-review-graph' },
      { label: 'LinkedIn post', href: linkedInPost('7508887893927469056') },
    ],
  },
  {
    when: 'May 2026',
    title: 'Won the Build with AI Hack Night at Google I/O London',
    archive: true,
    detail:
      'I built CrumbleUX alone in one night, during my first week at Telana. GDG London hosted the event.',
    links: [
      { label: 'About the project', href: '/writing/crumbleux' },
      { label: 'LinkedIn post', href: linkedInPost('7463224958392131584') },
    ],
  },
];

export const socialLinks = [
  { label: 'X', href: 'https://x.com/tirth_8205' },
  { label: 'GitHub', href: 'https://github.com/tirth8205' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tirthkanani' },
  { label: 'Email', href: 'mailto:tirthkanani18@gmail.com' },
];
