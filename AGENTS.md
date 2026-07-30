# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

A minimal, typography-driven personal site built with Next.js. Inspired by benji.org and borischerny.com, the design prioritises prose and restraint over visual noise. An interactive canvas-based knowledge graph fills the background, responding to cursor movement and clicks.

### Tech Stack
- Next.js 14, React 18, TypeScript
- Tailwind CSS (minimal config, no plugins)
- Framer Motion (page-load animations only)
- Sanity CMS (configured, not yet connected to frontend)
- Deployment: Vercel

### Directory Structure
```
pages/
├── index.tsx          # Main page (bio, writing list, footer)
├── writing/[slug].tsx # Individual article pages
├── _app.tsx           # App wrapper
└── _document.tsx      # Document head (system font stack, no webfonts)

src/
├── components/
│   ├── KnowledgeGraph.tsx   # Full-screen interactive canvas background
│   ├── LondonClock.tsx      # Live London time display
│   └── SocialLinks.tsx      # Social media icon links
├── data/
│   └── writing.ts           # Articles rendered at /writing/[slug]

styles/
└── globals.css        # Tailwind base, scrollbar, selection

public/
├── icons/             # Technology icons (for future Sanity integration)
└── ...                # Favicons, manifest, sitemap

sanity/                # Sanity CMS project (schemas, config)
```

### Key Patterns

The main page is a single column of prose with inline project links, a curated writing list, and a footer showing London time. The bio is hardcoded in index.tsx; article content lives in src/data/writing.ts. The GitHub star count for code-review-graph is fetched live from the GitHub API, statically at build time with hourly revalidation and again on the client after mount. Sanity schemas exist for pageInfo, skill, experience, project, and social types but are not yet wired to the frontend.

The KnowledgeGraph component renders a full-screen canvas with animated nodes and edges. Nodes brighten and attract toward the cursor. Clicking triggers a ripple that propagates through connected nodes. Touch events are supported for mobile.

### Environment Variables
```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Writing Style

All copy on this site uses British English spelling and conventions. No bullet points in prose. No AI formatting patterns. Direct, confident tone with varied sentence structure.
