export interface Article {
  slug: string;
  title: string;
  year: string;
  date: string;
  updatedAt?: string;
  kind: 'project' | 'essay';
  blurb?: string;
  featured?: boolean;
  proof?: string;
  caveat?: string;
  description: string;
  mediumUrl?: string;
  links?: {
    label: string;
    href: string;
  }[];
  content: string[];
  headings?: Record<number, string>;
}

export const articles: Article[] = [
  {
    "slug": "intelligence-import-bill",
    "title": "The Coming Intelligence Import Bill",
    "year": "2026",
    "date": "27 July 2026",
    "kind": "essay",
    "description": "Why access to frontier AI is becoming a strategic trade relationship, and what countries should build before the API gateway acquires a toll.",
    "mediumUrl": "https://tirthkanani18.medium.com/the-coming-intelligence-import-bill-520186a5c7d2",
    "content": [
      "On 30 March 2026, a 28-year assumption about digital trade expired. Since 1998, members of the World Trade Organization had repeatedly agreed not to impose customs duties on electronic transmissions. At the Fourteenth Ministerial Conference in Yaoundé, they failed to renew that moratorium. [The WTO records the lapse](https://www.wto.org/english/tratop_e/ecom_e/ecom_work_programme_e.htm). No universal AI tariff appeared the next morning. The assumption that digital trade would remain duty-free had nevertheless become harder to make.",
      "When a company sends data to a model abroad and receives software, analysis or product designs in return, nothing physical crosses a port. Productive capability has crossed a border all the same. Today the payment appears as an API charge, an enterprise licence or a cloud bill. Tomorrow the intelligence import bill may contain more lines.",
      "In July, Demis Hassabis proposed a US-led standards body for frontier AI, modelled partly on FINRA, the industry-funded organisation that oversees American securities brokerages. Laboratories would submit their most capable models for testing against dangerous cyber, biological and deceptive capabilities before release. The proposal deserves to be taken seriously, and it raises a question it does not answer. Who will build the models being tested? Standards can make imported intelligence safer. They cannot ensure that it remains affordable, available or under the importing country’s control. A country may become excellent at evaluating models while depending entirely on someone else to build them. I think capability building belongs alongside the work on standards: countries need the technical means to participate in the decisions that will shape their dependence.",
      "Foreign technology is hardly a new dependency. AI makes the question sharper because it increasingly contributes to decisions, and organisations build workflows around the behaviour of particular models. Changing providers can then mean rebuilding evaluations and operating practices as well as replacing an endpoint. The model also carries choices about acceptable behaviour and risk, made under another jurisdiction’s laws and political pressures.",
      "Friction could arrive from either direction. Importing governments may impose taxes. Producing countries may condition access through export licences, restrictions on model weights or priority for domestic customers when capacity is scarce. These are possible mechanisms, not a prediction that every one will arrive. A dependency can become costly through a higher bill or through a capability becoming unavailable when it is needed.",
      "The concentration of resources makes alternatives harder to assemble. [Stanford’s 2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report) reports that industry produced over 90 per cent of notable models in 2025, and records $285.9 billion in US private AI investment. The question remains: how much freedom does a customer retain when the most capable suppliers are concentrated elsewhere?",
      "Open-weight AI is the strongest counterargument. Countries can operate and adapt a model without depending on its developer for every request. Competition, partnerships and imported technology can be sensible choices; reproducing every layer domestically would be expensive and often unnecessary. Open weights still need computing, expertise and evaluation to become a dependable alternative. Nor is there a guarantee that the most capable future models will be released openly.",
      "Britain’s [£500 million Sovereign AI programme](https://www.gov.uk/government/news/ai-firms-pioneering-drug-discovery-cheaper-supercomputing-and-more-get-first-backing-through-uks-sovereign-ai) and [£1.1 billion AI Hardware Plan](https://www.gov.uk/government/news/a-decisive-shift-to-power-british-ai-new-11-billion-plan-to-back-chip-firms-boost-computing-power-and-skills-for-the-ai-revolution) are attempts to build some of that capacity. The budgets do not establish whether they will succeed. For most countries, a credible strategy will combine domestic expertise, competitive open weights, national or pooled allied computing and dependable partners. Every country does not need to build everything. It does need to decide what it must be able to sustain without another country’s permission.",
      "There may never be a single charge called an AI duty. The cost may arrive through taxation, access conditions or ordinary pricing power. Countries able to train, adapt and evaluate competitive systems will have more room to choose how they use foreign models. They can also enter a standards regime as technical peers, bringing more than demand to the discussion. That is the distinction I care about when the next customs frontier could be an API gateway."
    ],
    "headings": {
      "2": "Standards need capability",
      "4": "Where the cost could appear",
      "6": "The open-weight counterargument"
    },
    "updatedAt": "2026-11-25"
  },
  {
    "slug": "code-review-graph",
    "title": "code-review-graph",
    "year": "2026",
    "date": "12 March 2026",
    "kind": "project",
    "blurb": "Local codebase context for coding agents",
    "featured": true,
    "proof": "8.9× fewer tokens (median, 18 questions, six repositories)",
    "description": "A local knowledge graph that follows code dependencies and gives coding agents a smaller, more relevant context for a change.",
    "mediumUrl": "https://tirthkanani18.medium.com/i-built-a-knowledge-graph-that-cuts-claude-codes-token-usage-by-49x-ca73ef078981",
    "links": [
      {
        "label": "Source code",
        "href": "https://github.com/tirth8205/code-review-graph"
      },
      {
        "label": "Release 2.4",
        "href": "https://github.com/tirth8205/code-review-graph/releases/tag/v2.4.0"
      },
      {
        "label": "Astra Recall",
        "href": "https://cerebralvalley.ai/e/openai-gpt-6-astra-london/hackathon/gallery/9"
      }
    ],
    "content": [
      "A pull request changes a few functions. Finding the context for those functions can still send a coding assistant through thousands of lines. Broad searches return files, while the relationships that explain the change are scattered across them. I built code-review-graph to follow those relationships directly.",
      "The graph is local and persistent. Tree-sitter parses the source into syntax trees without requiring compilation, and the tool extracts functions, classes, imports and call sites. Their dependencies become a directed graph, stored in one SQLite file. File saves trigger incremental updates; the next question does not have to start from an empty map.",
      "When a diff arrives, the system finds the changed symbols and walks outwards. How far to walk was a question I kept returning to. Too few hops and a relevant caller disappears from view. Too many and the assistant is back to reading half the repository. Two hops is the default, with an override when the task needs more.",
      "The Model Context Protocol connects that graph to the coding assistant. A query returns the relevant code and its relationships, leaving the model to reason about the change. Version 2.4 also records confidence in the calls it links. Static analysis has limits, and the context should carry those limits with it.",
      "At Claude Founder House in London in September 2026, I demonstrated the difference with a question about how FastAPI builds a route handler. A grep match returned routing.py: 4,912 lines. The graph returned the eight lines of the relevant function. Across 18 questions on six real repositories, an agent using the graph needed a median of 8.9× fewer tokens to reach the same answer as the baseline. The saving belongs to that evaluation, not every possible task.",
      "The project is open source under the MIT licence. Version 2.4, released in November 2026, installs into 18 coding platforms. Astra Recall, an experiment from the GPT-6 Astra Hackathon in London, adds a memory the user can see, correct and forget. It learns only from what the user writes and remains separate from the code graph. For now, that work sits in an open pull request."
    ],
    "headings": {
      "1": "Following a change through the graph",
      "4": "Eight lines instead of 4,912"
    },
    "updatedAt": "2026-11-25",
    "caveat": "Results depend on the task and repository. This is a reported benchmark, not a guarantee for every codebase."
  },
  {
    "slug": "gateway-check",
    "title": "Gateway Check",
    "year": "2026",
    "date": "6 October 2026",
    "kind": "project",
    "blurb": "Checking legal aid evidence before it is submitted",
    "featured": true,
    "proof": "Prototype · no false approvals in a mostly synthetic evaluation",
    "description": "A prototype that checks domestic abuse documents for legal aid before submission, with each finding tied to the exact words in the letter.",
    "links": [
      {
        "label": "Source code",
        "href": "https://github.com/tirth8205/No10_Hackathon"
      },
      {
        "label": "Test results",
        "href": "https://github.com/tirth8205/No10_Hackathon/blob/master/eval/RESULTS.md"
      }
    ],
    "content": [
      "A doctor writes that an injury might be consistent with abuse. The letter can describe a real experience and still fall short of a requirement for legal aid. In England and Wales, Schedule 1 of the Civil Legal Aid (Procedure) Regulations 2012 sets out 22 forms of domestic abuse evidence. A document has to meet every requirement of one of them.",
      "That gap often becomes visible only when a caseworker reviews the application. By then, the solicitor has lost time and the client has waited. Gateway Check moves the check forward. We built it in two days at the Future States Hackathon in October 2026, at 10 Downing Street, alongside the civil servants who work with these problems. I was one of 35 engineers chosen from more than 1,500 applicants.",
      "There are three views of the same document. The client uploads a letter or photograph through a one-off link. Their solicitor sees which requirements it meets, the sentences behind that assessment, what is missing and a drafted request to the letter’s author. The caseworker sees those marks on the letter, an independent second check, and makes the decision.",
      "A requirement cannot pass on the model’s word alone. The engine must return a quotation, and code checks that it occurs word for word in the document. Three independent checks must agree. Names are matched against the application in code. Anything unclear goes to a person; economic-abuse cases always do in this prototype.",
      "We tested 146 synthetic cases, another 35 rewritten in unfamiliar styles, and 12 example letters supplied by the Ministry of Justice. The letters were held out, then run again as 24 PDFs. There were no false approvals on any set. One of the 12 letters was falsely rejected: it had no signature or registration number identifying the author in the text.",
      "Most of those cases are synthetic, and Legal Aid Agency staff have not yet checked the labels. The prototype is not in service. It also keeps open questions that only the department can answer.",
      "A teammate built the first version of the interface; I built the checking engine and back end. Much of my work lay around the model: matching names, checking quotations and setting the point where the system stops and asks a person."
    ],
    "headings": {
      "2": "One document, three people",
      "4": "What we tested"
    },
    "updatedAt": "2026-11-25",
    "caveat": "A hackathon prototype, not in service. Most test cases are synthetic; Legal Aid Agency staff have not verified the labels."
  },
  {
    "slug": "hfm-arc-agi-3",
    "title": "Harmonic Flow Models for ARC-AGI-3",
    "year": "2026",
    "date": "2 July 2026",
    "kind": "project",
    "blurb": "Exploration and failure analysis for interactive reasoning",
    "featured": true,
    "proof": "Presented at Pre-ICML @ London 2026",
    "description": "An HFM-inspired exploration layer for ARC-AGI-3, with state memory, action scoring and a record of where the approach failed.",
    "links": [
      {
        "label": "ARC-AGI-3 benchmark",
        "href": "https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/overview"
      },
      {
        "label": "Benchmark report",
        "href": "https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf"
      },
      {
        "label": "ls20 scorecard · seed 0",
        "href": "https://three.arcprize.org/scorecards/62ab10ce-f3bf-407f-8bc3-168bba5f6359"
      },
      {
        "label": "ls20 scorecard · seed 1",
        "href": "https://three.arcprize.org/scorecards/e23e521f-aa5b-4e8b-8ebc-7ea74c11dca6"
      }
    ],
    "content": [
      "ARC-AGI-3 asks an agent to explore a small visual world and infer its rules from feedback. There is an action budget, and no correct move supplied in advance. The agent has to make sense of a state while deciding what to try next.",
      "The recorded runs reached two levels on the public game ls20. Three harder games, m0r0, ft09 and vc33, remained unsolved. Both results belong in the account of this project.",
      "I implemented an HFM-inspired exploration layer inside the official agent scaffold. It gives observed states canonical keys, extracts connected components as possible objects and proposes legal coordinate actions. Each resulting transition goes into memory. The runner and surrounding toolkit come from the official scaffold; the exploration layer is my contribution.",
      "Actions are scored online using novelty, frontier value, penalties for repeated states and no-op detection. When the agent gets stuck in a loop, a detector changes the exploration policy. The run retains the provenance of each decision, so I can trace how it arrived at a move.",
      "The ls20 scorecards covered two seeds with a cap of 120 actions. They used an explicitly configured route for that public game. Reaching two levels under those conditions does not show route-free generalisation to unfamiliar games.",
      "The failed runs exposed weaknesses in the component heuristics. Objects can change identity, rewards can arrive late, and an action can make sense only as part of a longer sequence. A claim audit and experiment log sit alongside the agent so those failures stay attached to the work.",
      "A poster describing the project was externally selected and presented at Pre-ICML @ London 2026 at UCL. The work is ongoing. The scorecards show the progress; the unsolved games set the limits of what I can claim."
    ],
    "headings": {
      "2": "The exploration layer",
      "4": "Reading the scorecards"
    },
    "updatedAt": "2026-11-25",
    "caveat": "The run used a configured public-game route. Three harder games remained unsolved; this is not evidence of generalisation."
  },
  {
    "slug": "jailbreak-eval",
    "title": "Jailbreak-Eval",
    "year": "2025",
    "date": "18 September 2025",
    "kind": "project",
    "blurb": "Adversarial testing for language models",
    "featured": true,
    "proof": "Five attack generators · reproducible pilot baselines",
    "description": "A defensive testing framework for language models, combining five attack generators, coordinated agents and ensemble scoring.",
    "links": [
      {
        "label": "Source code",
        "href": "https://github.com/tirth8205/Jailbreak-Eval"
      },
      {
        "label": "Pilot results",
        "href": "https://github.com/tirth8205/Jailbreak-Eval/tree/main/results"
      }
    ],
    "content": [
      "If I am going to deploy a language model, I want to know where it breaks. Jailbreak-Eval puts that question into a repeatable test: generate adversarial prompts, run them against models and compare the responses.",
      "The public release has five generators: templates, mutation, GCG, PAIR and a coordinated multi-agent swarm. Multi-turn escalation can wrap them to test a conversation as well as a single prompt. Changing the generator changes the kind of pressure applied to the model.",
      "The swarm is the part I find most interesting. Five specialised agents share a memory pool. If one finds a phrasing that partly bypasses a safety filter, the others can build on it in later rounds. The attack develops through that shared context, so the sequence of attempts matters as much as the final prompt.",
      "Scoring uses three methods. Keyword matching catches familiar refusal language, pretrained classifiers handle subtler cases, and an LLM judge assesses responses that fall into grey areas. Their scores form a weighted rating for each test case. The rating depends on those judges; it is not an objective measure of everything a model might do.",
      "I built support for OpenAI, Anthropic, OpenRouter and Hugging Face models. The Streamlit dashboard shows results as attacks run, with breakdowns by generator, severity and model. Reproducible pilot baselines are included in the public release.",
      "The purpose is defensive: find a failure, keep the conditions that produced it and make it possible to run again. A clean result only covers the attacks and scoring methods in that run. It cannot guarantee that the model is safe to deploy."
    ],
    "headings": {
      "2": "What the agents share",
      "4": "Running the comparison"
    },
    "updatedAt": "2026-11-25",
    "caveat": "A structured evaluation can reveal failures; it cannot guarantee a model is safe."
  },
  {
    "slug": "crumbleux",
    "title": "CrumbleUX",
    "year": "2026",
    "date": "3 September 2026",
    "kind": "project",
    "blurb": "Product critique while a session is still happening",
    "featured": true,
    "proof": "Side project · won the Build with AI Hack Night at Google I/O London",
    "description": "A side project that watches a product session, listens to the person using it and responds through six UX perspectives while the interaction is still visible.",
    "links": [
      {
        "label": "Live product",
        "href": "https://crumbleux.com"
      }
    ],
    "content": [
      "A product session is recorded. Someone watches it later. By the time the feedback reaches the team, the moment that prompted it is long gone. I built CrumbleUX to bring that feedback into the session itself.",
      "It watches the screen, listens to the person using the product and responds through six UX perspectives. Each follows a different concern, from hierarchy and accessibility to hesitation, trust and conversion friction. The aim is to give the team something specific to change while the interaction is still in front of them.",
      "The first version came together in one night. I built it solo at the Build with AI Hack Night, a Google I/O event hosted by GDG London in May 2026, and it won. Since then, I have been doing the slower work of turning that prototype into a dependable application, in my own time.",
      "I built the system end to end: TypeScript and Next.js for the application, Python for inference, and the handling of live screen and audio streams. Accounts, teams, billing, privacy and reliability are part of the same job.",
      "Streaming is only part of the difficulty. A model can describe almost anything on a screen. Deciding which observation matters, avoiding repetition and tying a comment to the action that caused it takes more work. Otherwise, a fluent response becomes another interruption in the session.",
      "CrumbleUX remains a side project for early critique. It does not replace watching real users or talking to them. I am working on that shorter feedback loop: a comment arrives while a team can still connect it to what happened and change the product cheaply."
    ],
    "headings": {
      "2": "One night, then the longer work",
      "4": "Knowing what to say"
    },
    "updatedAt": "2026-11-25",
    "caveat": "A side project for early critique. It does not replace research with real users."
  },
  {
    "slug": "eegspeech",
    "title": "EEGSpeech",
    "year": "2025",
    "date": "14 June 2025",
    "kind": "project",
    "blurb": "Classifying imagined speech sounds from EEG",
    "description": "A CNN-LSTM research prototype for classifying imagined phonemes from scalp EEG, with 92.67% accuracy in a controlled, limited-phoneme evaluation.",
    "mediumUrl": "https://tirthkanani18.medium.com/building-a-brain-computer-interface-how-i-decoded-speech-from-brain-waves-using-deep-learning-91fb86074cbf",
    "content": [
      "EEGSpeech asks a small question within a much larger problem: can a model tell which speech sound someone is imagining from a recording made at the scalp? The motivation was communication for people who cannot speak. The experiment used a limited set of phonemes, rather than attempting to recover unrestricted speech.",
      "The recordings need considerable work before they reach the model. I filtered the signals between 8 and 30 Hz and rejected trials affected by eye blinks or jaw movement. Each remaining trial is a multichannel time series, a few seconds of measurements while someone imagines a particular sound. Noise and the small dataset constrain almost every decision that follows.",
      "I used a CNN-LSTM hybrid to handle two structures in the same input. Convolutional layers learn patterns across electrode channels. The LSTM follows how those patterns develop over time. A trial contains both, so reducing it to a static set of measurements would discard part of what the model has to work with.",
      "Training combined stratified cross-validation, time-shift augmentation, noise injection and a weighted loss for the class imbalance. The final model reached 92.67% phoneme-classification accuracy. The scope of that number matters: controlled conditions, coached participants and a limited phoneme set. It is not a measure of everyday communication performance or clinical effectiveness.",
      "Grad-CAM adds a view of the channels and time windows associated with a prediction. It helps show which parts of a recording the model relied on. A vision-language model also produces plain-language descriptions of the output. Both sit beside the prediction so a researcher can review more than a class label.",
      "The pipeline runs locally in Docker through a Streamlit interface. A researcher can load a recording, run the preprocessing and model, and review the output in one place. EEGSpeech remains a research prototype. The distance between recognising a phoneme in a controlled experiment and supporting a person’s communication is still substantial."
    ],
    "headings": {
      "2": "Two structures in one recording",
      "4": "Looking beyond the class label"
    },
    "updatedAt": "2026-11-25",
    "proof": "92.67% accuracy on phoneme classification in the reported controlled evaluation.",
    "caveat": "Controlled conditions, a limited phoneme set and coached participants. The research prototype is not ready for clinical use."
  },
  {
    "slug": "graphminds",
    "title": "GraphMinds",
    "year": "2025",
    "date": "8 May 2025",
    "kind": "project",
    "blurb": "Knowledge graphs and language models, kept local",
    "description": "My MSc thesis at Birmingham, combining knowledge graphs and local language models to answer questions about documents without sending them to the cloud.",
    "mediumUrl": "https://tirthkanani18.medium.com/graphminds-unlocking-transparent-secure-ai-with-knowledge-graphs-and-llms-711b9a7c64b8",
    "content": [
      "GraphMinds was my MSc thesis at the University of Birmingham, supervised by Professor Christopher Baber. I wanted to ask a language model questions about sensitive documents without sending those documents to the cloud. I also wanted to be able to follow its answer back to the material it had used. Running locally solved only the first part.",
      "The system extracts entities and relationships from unstructured text using sentence transformers and named entity recognition, then builds a graph in NetworkX. When a question arrives, it retrieves a relevant subgraph and passes that context to a language model running through Ollama. The model receives connected facts rather than only a collection of text fragments.",
      "Answers carry a citation trail through the documents, entities and relationships involved. PyVis makes the graph available to explore directly. A reader can follow a connection and ask whether it belongs there. The system is designed to acknowledge missing support; the graph can still contain a bad extraction, and the model can still misunderstand what it is given.",
      "The full pipeline runs offline: document ingestion, graph construction and language-model inference. No cloud processing or telemetry is needed. Keeping that boundary around the documents was a requirement of the thesis, not an optional mode added afterwards.",
      "In comparisons with plain retrieval-augmented generation, straightforward factual recall produced similar results. The difference appeared on multi-hop questions, where an answer depends on joining information across documents. The graph gives retrieval those relationships explicitly. The result supports that use case; it does not establish that graph retrieval is the better choice for every question.",
      "This is the combination that kept my attention after the thesis. Graphs give me a way to represent relationships precisely. Language models handle the language around them. Bringing the two together lets me build a system whose answers can be checked against a path through the original documents."
    ],
    "headings": {
      "2": "A path back to the documents",
      "4": "Where the graph made a difference"
    },
    "updatedAt": "2026-11-25",
    "proof": "MSc thesis at the University of Birmingham, supervised by Professor Christopher Baber.",
    "caveat": "The difference appeared on multi-hop questions; straightforward factual recall was similar to plain RAG."
  },
  {
    "slug": "agentic-ai",
    "title": "From rule-based algorithms to agentic AI",
    "year": "2025",
    "date": "8 May 2025",
    "kind": "essay",
    "description": "How software moved from fixed tasks to language models and agents that plan and act, and why that growing initiative needs care.",
    "mediumUrl": "https://tirthkanani18.medium.com/from-rule-based-algorithms-to-agentic-ai-how-automation-got-smart-9b232d839a6e",
    "content": [
      "Ask Google Maps for the fastest route to a restaurant and nobody at Google plans the journey for you. A suspicious prize draw reaches your spam folder without someone at Gmail reading it first. Familiar tasks like these made automation ordinary. For a long time, its ambition was narrow: define a job, give the software a procedure and let it repeat the work. A route planner had its task. A spam filter had another.",
      "Rule-based systems make that arrangement explicit. Their decisions follow conditions written in advance. Within a well-defined problem they can be predictable and effective, but a new kind of task requires new instructions. The jump to large language models changed what a single system could attempt. The same model could answer a question, draft a document, translate a passage or help debug code, with the request expressed in ordinary language.",
      "That versatility came with limits. A model’s training cutoff restricts what it knows, and generating an answer does not by itself give it a way to check current information or act outside the conversation. Someone still has to connect it to the systems where work happens. This is where agentic AI begins: a system uses what it learns to plan a sequence, choose actions and adjust as results come back.",
      "Consider the difference in a morning commute. A routing tool can show that traffic is getting worse. An agent connected to the relevant services could suggest an earlier departure, book a ride and notify the people waiting. The underlying shift is from completing an individual request to coordinating several steps towards a goal. In healthcare, the analogous possibility is a system that follows patient information and flags a concern for a doctor to assess. These examples depend on the tools, access and oversight surrounding the model.",
      "The early applications fit work with repeated decisions and a recognisable workflow: customer service, network security, supply chains and manufacturing. An agent can bring several operations into one loop, whether that means handling a query, reviewing activity or adjusting a schedule. The attraction is the amount of step-by-step coordination a person might no longer have to supply.",
      "The mistakes matter just as much. A bad answer can become a bad action, and it may be difficult to reconstruct why the system took it. Hospitals and courtrooms leave little room to treat that as an acceptable quirk. Multi-agent systems extend the idea further, with separate agents coordinating different jobs, but coordination brings its own questions about responsibility and control. More participants do not make those questions disappear.",
      "The progression from rules to language models to agents is a story about software acquiring initiative. A fixed procedure carries out a defined job. A language model can attempt many jobs when asked. An agent can organise actions around a goal. Making that initiative reliable and accountable is the part of the work I find most interesting."
    ],
    "headings": {
      "2": "From answers to actions",
      "4": "Where the work begins"
    },
    "updatedAt": "2026-11-25"
  },
  {
    "slug": "research-web-graph",
    "title": "ResearchWebGraph",
    "year": "2025",
    "date": "4 May 2025",
    "kind": "project",
    "blurb": "Exploring connections between research papers",
    "description": "An open-source tool for literature reviews that connects arXiv papers through a knowledge graph and answers questions with citations to the original passages.",
    "mediumUrl": "https://tirthkanani18.medium.com/researchwebgraph-my-journey-building-an-ai-powered-research-tool-3647b613dfa0",
    "content": [
      "Reading papers is slow. Finding the right ones can take longer, especially when the question depends on how several papers relate to each other. I built ResearchWebGraph for my own literature reviews, to keep those connections somewhere other than my head.",
      "It searches arXiv, downloads papers and extracts entities and relationships into a growing graph. A question triggers vector search in Qdrant for relevant passages and a graph traversal for connected entities. The combined context goes to a language model, which produces an answer with citations back to papers and passages.",
      "The graph construction is the part I found most interesting. Concepts, methods, datasets and results become nodes; extracted relationships describe how they connect. A result might say that method A outperformed B on dataset C. The dataset belongs in that relationship. Strip it away and a narrow comparison starts to look like a general conclusion.",
      "This structure takes part in answering the question. It gives the retrieval system another route through the papers, alongside similarity search. The application is designed to say when support is missing. Citations then give me a direct way back to the source, where I can check whether the generated answer kept the qualifications in the original passage.",
      "FastAPI handles the back end, Streamlit the interface, and Docker Compose runs the application locally. I add papers as I read, follow a connection and ask a more specific question. The graph develops with the review; I do not need to decide the shape of the whole field before starting.",
      "Extraction remains the weak point. It misses nuances, and a collection of loosely related papers can produce a noisy graph. The code is open source. I use the tool to organise the next part of the reading, then return to the papers themselves."
    ],
    "headings": {
      "2": "Keeping the context in a connection",
      "4": "A graph that grows with the reading"
    },
    "updatedAt": "2026-11-25",
    "proof": "Open source · FastAPI, Streamlit and Qdrant",
    "caveat": "Entity extraction misses nuances, and loosely related papers can make the graph noisy."
  },
  {
    "slug": "about",
    "title": "How I got here",
    "year": "2025",
    "date": "22 April 2025",
    "kind": "essay",
    "description": "From taking apart radios in Ahmedabad to research in Birmingham and engineering in London: the questions that have followed me between them.",
    "mediumUrl": "https://tirthkanani18.medium.com/my-journey-into-ai-and-cognitive-research-chasing-the-code-of-the-human-mind-4b391a9c65c1",
    "content": [
      "I did not set out to become an AI engineer. I wanted to understand how the human mind works. Growing up in Ahmedabad, I took things apart to see what made them work: radios, old phones, anything with a mechanism. The brain was the one machine I could not open.",
      "At Ahmedabad University, computer science gave me a way into some of those questions. My first real project brought the two interests together: a neural network trained to classify emotional states from physiological signals. It was crude, but it worked well enough to keep me going.",
      "I moved to Birmingham deliberately. Professor Christopher Baber’s work on human factors sat where I wanted to be, between AI and cognitive science. My MSc thesis, GraphMinds, grew from the idea that a system should show enough of its working for another person to question it. I built it around local language models and knowledge graphs, with a route from an answer back to the documents behind it.",
      "EEGSpeech took me towards imagined speech and the problem of communication for people who cannot speak. It remained a controlled research experiment, well short of a clinical system. The motivation made the gap between a promising result and something a person could rely on feel particularly important.",
      "At Inzeitech, I worked on deploying models that served more than 150,000 users. Production brought a different set of lessons. Latency matters. Edge cases multiply. A model that behaves well in a notebook still has to become part of a system that can cope with the rest of the world. Jailbreak-Eval grew from the same practical concern: I wanted to find where a model broke before relying on it.",
      "Knowledge graphs keep appearing in my projects because I keep returning to problems where structured reasoning meets messy information. The applications vary, from reading papers to helping a coding assistant find context. The connection between the pieces is often where the difficult part of the problem sits.",
      "I now live in London and work on AI and automation at Telana. I hold the UK’s Global Talent visa. Outside work, I build code-review-graph and work on CrumbleUX as a side project. Winning the Epiminds multi-agent hackathon was gratifying because ideas from my other work held up under a different kind of pressure. Most of my time still goes into building, writing and reading papers."
    ],
    "headings": {
      "2": "Birmingham",
      "4": "Lessons from production",
      "6": "London"
    },
    "updatedAt": "2026-11-25"
  }
];

export const featuredProjects = articles.filter(
  (article) => article.kind === 'project' && article.featured,
);
