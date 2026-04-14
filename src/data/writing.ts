export interface Article {
  slug: string;
  title: string;
  year: string;
  date: string;
  description: string;
  mediumUrl?: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: 'code-review-graph',
    title: 'code-review-graph',
    year: '2026',
    date: '12 March 2026',
    description: 'A local knowledge graph that maps codebases using tree-sitter, reducing Claude Code token usage by up to 49x on daily coding tasks.',
    mediumUrl: 'https://medium.com/@tirthkanani18/i-built-a-knowledge-graph-that-cuts-claude-codes-token-usage-by-49x-b67bff8b0be3',
    content: [
      'When Claude Code reviews a pull request, it reads your entire codebase to understand context. Every function, every import, every file gets serialised into tokens. For anything beyond a small project, this is wasteful. Most of the code has nothing to do with the change being reviewed. I built code-review-graph to fix that.',

      'The tool creates a persistent, local knowledge graph of your codebase. It uses tree-sitter for static analysis, parsing source files into syntax trees without needing compilation. From those trees it extracts every function definition, class, import statement, and call site, then stores the dependency relationships between them as a directed graph.',

      'When a diff arrives, the system identifies which symbols changed and walks the graph outward, typically two or three hops. That walk produces a focused set of code that is genuinely relevant to the change. Only that set gets fed to Claude as context. Everything else is left out.',

      'The graph sits in memory using adjacency lists and rarely needs a full rebuild. File saves trigger incremental updates. On real pull requests, this reduced token usage by 6.8x for code reviews and up to 49x for routine daily tasks. The savings are largest on big repositories, which is precisely where costs hurt most.',

      'Integration works through the Model Context Protocol. code-review-graph registers as an MCP server, and Claude Code queries it whenever it needs codebase context. The graph decides what is relevant. The model does the reasoning. Each handles what it is good at.',

      'A question I kept returning to was how many hops to traverse. Too few and you miss a function three calls deep where the bug actually lives. Too many and you are back to feeding in half the codebase. Two hops with a configurable override covers the vast majority of real changes.',

      'The project is open source under an MIT licence and has picked up over five thousand stars on GitHub. That response suggests the problem resonates. If you use any LLM-based coding tool, the core idea applies: less context, more relevant context, better results.',
    ],
  },
  {
    slug: 'jailbreak-eval',
    title: 'Jailbreak-Eval',
    year: '2025',
    date: '18 September 2025',
    description: 'A multi-agent adversarial testing framework for LLM safety, with five attack strategies and ensemble evaluation.',
    content: [
      'If you deploy a language model in production, you need to know where it breaks. Jailbreak-Eval is a framework I built for systematic adversarial testing of LLMs. It throws structured attacks at a model and measures how well it holds up.',

      'The framework implements five distinct attack strategies. GCG generates adversarial suffixes through gradient-based optimisation. PAIR uses an attacker LLM to iteratively refine prompts that bypass the target model\u2019s safety training. The remaining three strategies use mutation, persona injection, and multi-turn escalation. Each approach targets a different class of vulnerability.',

      'Evaluation uses an ensemble of three methods. A keyword classifier catches obvious failures. A fine-tuned safety classifier handles subtler cases. An LLM judge assesses responses that fall into grey areas where neither automated method is confident. The three scores are combined into a weighted safety rating for each test case.',

      'The multi-agent swarm is the part I find most interesting architecturally. Five specialised agents share a memory pool and coordinate their attacks. One agent might discover that a particular phrasing partially bypasses a safety filter, and the others can build on that discovery in subsequent rounds. This mimics how real adversaries work: iteratively, adaptively, and with shared context.',

      'I built the system to work across multiple LLM providers: OpenAI, Anthropic, Groq, and locally-hosted models through Ollama. The Streamlit dashboard shows results in real time as attacks run, with breakdowns by strategy, severity, and model.',

      'The purpose is defensive. You cannot patch what you have not measured. Running Jailbreak-Eval against a model before deployment surfaces the specific failure modes that need attention. It is not a guarantee of safety, but it is a structured alternative to guessing.',
    ],
  },
  {
    slug: 'eegspeech',
    title: 'EEGSpeech',
    year: '2025',
    date: '14 June 2025',
    description: 'A brain-computer interface that decodes imagined speech from EEG signals using a CNN-LSTM model, achieving over 92% accuracy.',
    mediumUrl: 'https://medium.com/@tirthkanani18/building-a-brain-computer-interface-how-i-decoded-speech-from-brain-waves-using-deep-learning-3d8e29a39e74',
    content: [
      'For people living with ALS or locked-in syndrome, the gap between thinking a word and speaking it can be permanent. EEGSpeech is a brain-computer interface I built to narrow that gap. It decodes which speech sound a person is imagining, not speaking aloud, from their brain activity recorded through EEG electrodes on the scalp.',

      'EEG signals are noisy and low-resolution compared to invasive recordings. Band-pass filtering isolates the mu and beta bands between 8 and 30 Hz, the frequency ranges most associated with speech imagery. Artefact rejection strips out trials contaminated by eye blinks or jaw movement. What remains is a multichannel time series for each trial: a few seconds of someone imagining a specific phoneme.',

      'The model is a CNN-LSTM hybrid. Convolutional layers learn which electrode combinations carry discriminative information for each phoneme. LSTM layers capture the temporal dynamics as the imagined sound unfolds. Speech imagery has both spatial structure, certain brain regions contribute more, and temporal structure, the signal evolves over the utterance. The architecture needs to handle both.',

      'Training on small, class-imbalanced EEG datasets required stratified cross-validation, time-shift augmentation, noise injection, and a weighted loss function. The final model reached 92.67% accuracy on phoneme classification. That number comes with caveats: controlled lab conditions, a limited phoneme set, and coached participants. But for non-invasive EEG, it is competitive.',

      'I applied Grad-CAM to make the model interpretable. The visualisations highlight which time windows and electrode channels drove each prediction. Motor cortex and Broca\u2019s area showed the strongest contributions, which aligns with their known role in speech planning. A vision-language model generates clinical summaries of each prediction in plain language, so a clinician does not need to read raw model outputs.',

      'The system runs locally in Docker with a Streamlit frontend. A researcher can load an EEG recording, run the full pipeline, and see predictions with explanations within seconds. Patient data stays on-premises. The technology is not ready for everyday clinical use, but each increment in accuracy opens the door a little wider for people who need it.',
    ],
  },
  {
    slug: 'graphminds',
    title: 'GraphMinds',
    year: '2025',
    date: '8 May 2025',
    description: 'An MSc thesis project that combines knowledge graphs with local LLMs for private, transparent analysis of unstructured documents.',
    mediumUrl: 'https://medium.com/@tirthkanani18/graphminds-unlocking-transparent-secure-ai-with-knowledge-graphs-and-llms-4ad7df4d6c2a',
    content: [
      'This was my MSc thesis at the University of Birmingham, supervised by Professor Christopher Baber. The question was straightforward: can you get useful answers from a language model about sensitive documents without sending those documents to the cloud, and can you verify where each answer comes from?',

      'GraphMinds extracts entities and relationships from unstructured text using sentence transformers and named entity recognition, then builds a knowledge graph in NetworkX. When a user asks a question, the system queries the graph first, retrieves the most relevant subgraph, and feeds that subgraph as grounding context to a locally-running LLM through Ollama.',

      'Every answer includes a citation trail: which documents contributed, which entities and relationships were used, and how the graph was traversed. The PyVis visualisation lets you see the graph structure directly and judge whether the reasoning holds up. Transparency was a core design goal. If the system cannot find supporting evidence, it says so.',

      'Nothing leaves the local machine. No API calls, no cloud processing, no telemetry. The full pipeline from document ingestion to graph construction to LLM inference runs offline. This matters for legal, medical, and proprietary contexts where data confidentiality is not negotiable.',

      'Testing against plain RAG pipelines showed similar performance on straightforward factual recall. The difference appeared on multi-hop questions, where the answer depends on connecting information across several documents. The graph gives the system a structured map of how facts relate to each other. That structure is exactly what multi-hop reasoning demands.',

      'The project convinced me that knowledge graphs and language models are complementary. Graphs are precise, verifiable, and efficient at structured relationships. Language models handle ambiguity and reason in natural language. Combining them produces something more trustworthy than either alone.',
    ],
  },
  {
    slug: 'research-web-graph',
    title: 'ResearchWebGraph',
    year: '2025',
    date: '4 May 2025',
    description: 'An open-source tool for exploring academic papers through knowledge graph visualisation and AI-grounded question answering.',
    mediumUrl: 'https://medium.com/@tirthkanani18/researchwebgraph-my-journey-building-an-ai-powered-research-tool-f3e4b5c6d7a8',
    content: [
      'Reading academic papers is slow. Finding the right ones is slower. Building a mental model of how ideas connect across a research area takes weeks. I built ResearchWebGraph to compress that process without losing the depth.',

      'The tool searches arXiv, downloads papers, extracts entities and relationships from each one, and builds a knowledge graph that grows with every paper added. When you ask a question, it retrieves relevant passages through vector search in Qdrant and traverses the graph for connected entities. The combined context goes to an LLM that generates an answer with citations back to specific papers and passages.',

      'Graph construction is the interesting part. Named entity recognition pulls out concepts, methods, datasets, and results. Relationship extraction identifies how they connect: method A outperforms B on dataset C, concept X extends Y. These triples form the graph\u2019s nodes and edges. The graph is not just a visualisation. It is a structured index that the question-answering system queries before generating any response.',

      'If the system cannot find supporting evidence in the graph, it says so. A research tool that fabricates claims is worse than no tool at all. Every assertion in an answer links back to a source.',

      'The backend is FastAPI, the frontend is Streamlit, and the whole thing runs locally with Docker Compose. I built it because I needed it for my own literature reviews. Instead of reading linearly and holding connections in my head, I build a graph incrementally and query it as questions arise. The graph becomes an externalised version of the mental model that forms during deep reading.',

      'The code is open source. Entity extraction misses nuances and the graph gets noisy with loosely related papers. But as a starting point for structured literature exploration, it does the job.',
    ],
  },
  {
    slug: 'about',
    title: 'How I got here',
    year: '2025',
    date: '22 April 2025',
    description: 'From taking apart radios in Ahmedabad to building AI systems in London, via a brain-computer interface and a hackathon win.',
    content: [
      'I did not set out to become an AI engineer. The path started with a question that had nothing to do with code: how does the human mind work? Growing up in Ahmedabad, I was the sort of person who took things apart to understand them. Radios, old phones, anything with a mechanism. The brain was the one machine I could not open.',

      'My undergraduate degree in computer science at Ahmedabad University was where the two interests met. Programming gave me tools for modelling complex systems. Cognitive science gave me the most complex system of all. My first real project combined them: a simple neural network trained to classify emotional states from physiological signals. It was crude, but it worked well enough to commit.',

      'I moved to Birmingham deliberately. The university has strong groups in both AI and cognitive science. Professor Christopher Baber\u2019s work on human factors sat exactly where I wanted to be. My thesis, GraphMinds, grew from a conviction that AI systems should show their working the way a good researcher does.',

      'EEGSpeech brought me closer to clinical work. When you build a system designed to help people with locked-in syndrome communicate, every percentage point of accuracy matters differently. It is not a metric on a leaderboard. It is the difference between someone expressing a thought and not being able to.',

      'Alongside the academic work, I spent time at Inzeitech deploying models that served over 150,000 users. Production taught lessons that research alone does not. Latency matters. Edge cases multiply. The gap between a model that works in a notebook and a system that works in the real world is vast.',

      'The safety work came from a growing awareness that the systems I was building had become genuinely capable. Jailbreak-Eval, my adversarial testing framework, grew from a practical need: if you deploy these models, you should know where they break.',

      'I keep returning to problems where structured reasoning meets unstructured data. Knowledge graphs appear in nearly everything I build because they sit at that boundary. They impose structure on messy information, make reasoning traceable, and pair well with language models that handle the ambiguity rigid schemas cannot.',

      'London suits the work. The city has a dense concentration of AI labs, research groups, and startups. I spend most of my time building, writing, and reading papers. Winning the Epiminds multi-agent hackathon was gratifying less for the prize and more for the confirmation that the ideas I had been developing translated well under pressure.',
    ],
  },
];
