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
    slug: 'intelligence-import-bill',
    title: 'The Coming Intelligence Import Bill',
    year: '2026',
    date: '27 July 2026',
    description: 'Why access to frontier AI is becoming a strategic trade relationship, and what countries should build before the API gateway acquires a toll.',
    mediumUrl: 'https://tirthkanani18.medium.com/the-coming-intelligence-import-bill-520186a5c7d2',
    content: [
      'On 30 March 2026, a 28-year assumption about digital trade expired. Since 1998, members of the World Trade Organization had repeatedly agreed not to impose customs duties on electronic transmissions. At the Fourteenth Ministerial Conference in Yaoundé, they failed to renew that moratorium. No customs officer began inspecting software downloads or AI prompts the next morning, but the assumption that digital trade stays duty-free is now exactly that, an assumption.',

      'When a company sends data to a model operating abroad and receives software, analysis, product designs or operational decisions in return, nothing physical crosses a port. Productive capability has crossed a border all the same. Today the payment appears as an API charge, an enterprise licence or a cloud bill. Tomorrow the intelligence import bill may contain more lines.',

      'In July, Demis Hassabis proposed a US-led standards body for frontier AI, modelled partly on FINRA, the industry-funded organisation that oversees American securities brokerages. Laboratories would submit their most capable models for testing against dangerous cyber, biological and deceptive capabilities before release. The proposal deserves to be taken seriously, and it raises a question it does not answer. Who will build the models being tested? Standards can make imported intelligence safer. They cannot guarantee it remains affordable, available or under the importing country’s control. A country with excellent regulators and no capability of its own does not have sovereignty. It has well-managed dependency.',

      'Countries have depended on foreign technology for decades, so it is fair to ask why AI should be treated differently. Three reasons. Advanced AI is becoming an input into decisions rather than a tool executing a specified process. The dependency compounds, because organisations redesign their data, workflows and security practices around a particular model until replacing it means rebuilding the institution rather than installing a substitute. And every model embodies choices about acceptable behaviour and tolerable risk that were made under another jurisdiction’s laws and political pressures.',

      'The coming friction will arrive from both directions. Importing governments may tax intelligence to protect their revenue bases, which is part of what the dispute in Yaoundé was about. Producing countries may condition access through export licences, restrictions on model weights, or priority for domestic customers when capacity is scarce. Not every condition will be unreasonable. The point is that a supposedly borderless market is acquiring borders, and dependency does not always appear as a tariff. Sometimes it appears as a capability that is unavailable precisely when it is most valuable.',

      'That would matter less if frontier capability were widely distributed. It is not. The Stanford AI Index reports that industry produced more than 90 per cent of notable models in 2025, with American organisations producing 50 and Chinese organisations 30. Private AI investment in the United States reached $285.9 billion, more than twenty times the recorded figure for China. None of this is evidence of wrongdoing. Concentration creates leverage regardless of how fairly it arose.',

      'The strongest counterargument is open-weight AI. The UK’s AI Security Institute found that the most capable open model it tested performed similarly on its cyber evaluations to closed systems released only four to seven months earlier. Open weights weaken pricing power and blunt the threat of sudden withdrawal, and countries should use them. But operating today’s generation is not the same as being able to build tomorrow’s, and there is no guarantee the most capable future systems will be released openly. Open weights are a route towards capability, not an excuse to avoid building it.',

      'Not every country can reproduce Silicon Valley, and pretending otherwise turns sovereignty into branding. Britain’s £500 million Sovereign AI programme and £1.1 billion hardware plan illustrate what a serious beginning looks like without approaching parity with the largest American laboratories. For most countries, minimum viable sovereignty will mean domestic expertise, competitive open weights, national or pooled allied computing, and dependable partners. Every country does not need to build everything. Every country needs a strategy for what it must be able to do without asking another country’s permission.',

      'This is also why standards bodies and capability building belong together. Countries that bring models, computing and evaluation expertise to a standards regime participate as technical peers. Countries that bring only demand participate as customers.',

      'There may never be a single universal tariff called an AI duty. Some of the coming cost will be importer taxation, some producer conditioning, some ordinary pricing power in a concentrated market. The name of the mechanism matters less than the position of the country facing it. Countries that can train, adapt and evaluate competitive systems will keep using foreign models from a position of choice. The next customs frontier may have no ports or cargo ships. It may be an API gateway, and the time to build an alternative is before that gateway acquires a toll.',
    ],
  },
  {
    slug: 'code-review-graph',
    title: 'code-review-graph',
    year: '2026',
    date: '12 March 2026',
    description: 'A local knowledge graph that maps codebases using tree-sitter, reducing Claude Code token usage by up to 49x on daily coding tasks.',
    mediumUrl: 'https://tirthkanani18.medium.com/i-built-a-knowledge-graph-that-cuts-claude-codes-token-usage-by-49x-ca73ef078981',
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
    mediumUrl: 'https://tirthkanani18.medium.com/building-a-brain-computer-interface-how-i-decoded-speech-from-brain-waves-using-deep-learning-91fb86074cbf',
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
    mediumUrl: 'https://tirthkanani18.medium.com/graphminds-unlocking-transparent-secure-ai-with-knowledge-graphs-and-llms-711b9a7c64b8',
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
    slug: 'agentic-ai',
    title: 'From rule-based algorithms to agentic AI',
    year: '2025',
    date: '8 May 2025',
    description: 'How software went from fixed rules to language models to agents that plan and act, and what that shift asks of the people building it.',
    mediumUrl: 'https://tirthkanani18.medium.com/from-rule-based-algorithms-to-agentic-ai-how-automation-got-smart-9b232d839a6e',
    content: [
      'When you ask Google Maps for the fastest route to a restaurant, nobody at Google plans the journey for you. When a suspicious prize draw lands in your spam folder, nobody at Gmail read it first. For decades this was what automation meant: software following rules written in advance, doing one job well and nothing else. The spam filter could not plan a route. The route planner could not read an email. Neither could learn a new trick without an engineer shipping it.',

      'Large language models broke that pattern. Trained on billions of words, they could answer questions, draft documents, translate, and help debug code, all through plain conversation. One system could suddenly do many jobs. But the first generation had sharp limits. Their knowledge stopped at a training cutoff, they could not act on the world, and they could not check anything new without a person wiring them to it.',

      'Agentic AI is the next step: systems that plan, decide and act with far less step-by-step instruction. An agent that notices traffic building before your meeting does not just warn you. It suggests an earlier departure, books the ride, and messages the people waiting. In a hospital, an agent can watch patient data against the latest studies and flag a doctor when something looks wrong.',

      'The early deployments cluster where work is high-volume and structured. Customer service agents now resolve the majority of routine queries on their own. Security teams use agents to scan network activity continuously and surface intrusions faster than human review could. Supply chains, drug discovery pipelines and manufacturing lines are picking up agents that order, schedule and adjust without waiting to be asked.',

      'The caveats are real. Agents make mistakes, their reasoning can be hard to inspect, and in hospitals and courtrooms those properties are not acceptable quirks. Many organisations trialling agents report exactly this worry. The direction of travel is towards multi-agent systems, where separate agents coordinate on traffic, energy and public services across a city, and eventually towards systems general enough to raise harder questions about safety and control.',

      'The story from Google Maps to agentic AI is a story about software gradually acquiring initiative. Rules did one job. Language models did many, when asked. Agents act before being asked. Making that initiative reliable and accountable is now the interesting part of the work.',
    ],
  },
  {
    slug: 'research-web-graph',
    title: 'ResearchWebGraph',
    year: '2025',
    date: '4 May 2025',
    description: 'An open-source tool for exploring academic papers through knowledge graph visualisation and AI-grounded question answering.',
    mediumUrl: 'https://tirthkanani18.medium.com/researchwebgraph-my-journey-building-an-ai-powered-research-tool-3647b613dfa0',
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
    mediumUrl: 'https://tirthkanani18.medium.com/my-journey-into-ai-and-cognitive-research-chasing-the-code-of-the-human-mind-4b391a9c65c1',
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
