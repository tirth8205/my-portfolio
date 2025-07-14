# Tirth's Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Sanity CMS. This portfolio showcases my work as a Software/Machine Learning Engineer with an interactive UI, project showcase, and content management system.

## 🎯 About Me

Hey 👋🏼 I am a Software / Machine Learning Engineer currently based in the United Kingdom. I completed my undergraduate degree in Computer Science in India and later earned my Master's degree in Computer Science with Human-Computer Interaction (HCI) at the University of Birmingham in the United Kingdom.

I'm passionate about leveraging AI and machine learning to solve complex problems and crafting elegant code to build user-focused solutions. I'm also an active contributor to open-source projects in AI and HCI, collaborating with global communities to create impactful tools.

## ✨ Features

- **Interactive UI**: Smooth animations with Framer Motion and responsive design
- **Project Showcase**: Dynamic project display with technology tags and descriptions
- **Skills Section**: Visual representation of technical expertise with progress indicators
- **Experience Timeline**: Professional journey with company details and achievements
- **Contact Form**: Functional contact form integrated with EmailJS
- **Content Management**: Sanity CMS for easy content updates
- **SEO Optimized**: Automatic sitemap generation and meta tags
- **Analytics**: Google Analytics and Vercel Analytics integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom blue theme colors
- **Animation**: Framer Motion for smooth transitions
- **CMS**: Sanity (headless CMS for content management)
- **Email**: EmailJS for contact form functionality
- **Analytics**: Google Analytics, Vercel Analytics
- **Deployment**: Vercel

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── About.tsx       # About section
│   │   ├── ContactMe.tsx   # Contact form
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section with typewriter
│   │   ├── Projects.tsx    # Project showcase
│   │   ├── Skills.tsx      # Skills display
│   │   └── WorkExperience.tsx # Experience timeline
│   ├── lib/                # Utility functions
│   │   ├── sanity.ts       # Sanity client configuration
│   │   └── fetch*.ts       # Data fetching functions
│   └── types/              # TypeScript definitions
├── pages/                  # Next.js pages (Pages Router)
│   ├── index.tsx          # Main portfolio page
│   ├── _app.tsx           # App wrapper
│   └── api/               # API endpoints
├── sanity/                # Sanity CMS configuration
│   ├── schemas/           # Content schemas
│   └── tirths-portfolio/  # Updated Sanity project
├── public/                # Static assets
│   └── icons/             # Technology icons (100px)
└── styles/                # Global styles
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tirth8205/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Run linting**
   ```bash
   npm run lint
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run postbuild` - Generate sitemap (runs automatically after build)

## 🎨 Customization

### Content Management

This portfolio uses Sanity CMS for content management. To customize:

1. **Set up Sanity project** (if you want your own CMS):
   ```bash
   cd sanity/tirths-portfolio
   npm install
   npx sanity init
   ```

2. **Configure schemas** in `sanity/tirths-portfolio/schemaTypes/`:
   - `pageInfo.ts` - Personal information
   - `project.ts` - Project details
   - `skill.ts` - Technical skills
   - `experience.ts` - Work experience
   - `social.ts` - Social media links

3. **Update environment variables** with your Sanity project ID

### Styling

- **Theme colors**: Modify `tailwind.config.js` for custom color scheme
- **Components**: Update individual component styles in `src/components/`
- **Global styles**: Edit `styles/globals.css` for site-wide styling

### Technology Icons

Add new technology icons to `public/icons/` directory (recommended size: 100px).

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Yes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the application | Yes |

### Deployment

This project is optimized for Vercel deployment:

1. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Configure domains** and SSL certificates

## 📊 Performance Features

- **Static Site Generation (SSG)** with Incremental Static Regeneration
- **Image optimization** via Sanity image CDN
- **Lazy loading** for images and components
- **SEO optimization** with automatic sitemap generation
- **Analytics tracking** with Google Analytics and Vercel Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

A sincere thank you to [Mitchell Sparrow](https://github.com/MitchellSparrow) for the inspiration and guidance. Mitchell's portfolio structure and documentation approach greatly influenced the development of this project.

## 📞 Contact

- **Email**: tirthkanani18@gmail.com
- **LinkedIn**: [tirth8205](https://www.linkedin.com/in/tirthkanani/)
- **Location**: London, United Kingdom

---

⭐ Star this repository if you found it helpful!