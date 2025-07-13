# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run postbuild` - Generate sitemap (runs automatically after build)

## Architecture Overview

This is a **Next.js portfolio website** with TypeScript, using **Sanity CMS** as a headless backend for content management. The project follows a component-based architecture with static site generation and an improved directory structure.

### Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom blue theme colors
- **Animation**: Framer Motion
- **CMS**: Sanity (headless CMS for dynamic content)
- **Email**: EmailJS for contact form
- **Analytics**: Google Analytics, Vercel Analytics
- **Deployment**: Vercel

### Directory Structure
```
src/
├── components/     # All React components
├── lib/           # Utilities and shared functions (formerly utils/)
│   ├── sanity.ts  # Sanity client configuration
│   └── fetch*.ts  # Data fetching functions
├── types/         # TypeScript type definitions
│   └── index.ts   # All interface definitions
└── ...

pages/             # Next.js pages (Pages Router)
├── index.tsx      # Main portfolio page
├── _app.tsx       # App wrapper
└── api/           # API endpoints (simplified)

public/
├── icons/         # Organized technology icons (100px)
└── ...            # Static assets
```

### Key Architecture Patterns

**Static Site Generation (SSG)**:
- Main page uses `getStaticProps` with ISR (revalidate: 10 seconds)
- Data fetched directly from Sanity CMS at build time
- API routes removed in favor of direct fetch functions in `getStaticProps`

**Content Management**:
- All dynamic content (projects, skills, experience, page info) managed via Sanity CMS
- Sanity client configured in `src/lib/sanity.ts` with environment variables
- Separate Sanity project in `/sanity/` directory with its own schemas

**Component Structure**:
- All components in `src/components/`: Header, Hero, About, Skills, WorkExperience, Projects, ContactMe
- Utility functions in `src/lib/` for fetching data from Sanity
- TypeScript interfaces in `src/types/index.ts` define data structure

**Data Flow**:
1. Sanity CMS → Direct fetch in `getStaticProps` → Component props
2. Main page aggregates all data via `getStaticProps` and passes to individual components

### Environment Variables Required
```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Custom Styling
- Blue-themed color palette defined in `tailwind.config.js`
- Custom scrollbar styling using `tailwind-scrollbar` plugin
- Responsive design with snap-scroll sections
- Organized technology icons in `public/icons/` (consistent 100px size)

### Content Sections
- Hero section with typewriter animation
- About section with background info
- Work experience timeline with company details
- Skills showcase with progress indicators
- Projects portfolio with technology tags
- Contact form with EmailJS integration

## Important Implementation Notes

- Uses Sanity image optimization via `@sanity/image-url`
- Implements scroll-snap behavior for smooth section navigation
- Google Analytics tracking integrated
- SEO optimized with meta tags and sitemap generation
- Mobile-responsive design throughout
- Error handling for missing Sanity data
- Simplified architecture: removed redundant API routes, direct fetch in `getStaticProps`
- Clean asset organization: technology icons consolidated in `public/icons/`