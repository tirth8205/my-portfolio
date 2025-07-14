import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import styles from "../styles/Home.module.css";
import { Experience, PageInfo, Skill, Project, Social } from "../src/types";
import { fetchExperiences } from "../src/lib/fetchExperience";
import { fetchProjects } from "../src/lib/fetchProjects";
import { fetchSkills } from "../src/lib/fetchSkills";
import { fetchSocials } from "../src/lib/fetchSocials";
import About from "../src/components/About";
import WorkExperience from "../src/components/WorkExperience";
import Skills from "../src/components/Skills";
import Projects from "../src/components/Projects";
import ContactMe from "../src/components/ContactMe";
import Testimonials from "../src/components/Testimonials";
import ProgressIndicator from "../src/components/ProgressIndicator";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import Script from "next/script";
import { groq } from "next-sanity";
import { sanityClient } from "../src/lib/sanity";

const pageInfoQuery = groq`
    *[_type == 'pageInfo'][0]
`;

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  console.log("Socials:", socials);

  return (
    <ThemeProvider>
      <div
        className="bg-lightBackground dark:bg-darkBackground text-darkBlack dark:text-white min-h-screen snap-y snap-mandatory
        overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-primary/80 font-body"
      >
        <Head>
          <title>Tirth Kanani - Software & Machine Learning Engineer</title>
          <meta
            name="description"
            content="Tirth Kanani, a Software & Machine Learning Engineer in the UK, passionate about AI, HCI, and open-source. Seeking opportunities to drive innovative solutions."
          />
          <meta
            property="og:title"
            content="Tirth Kanani - Software & Machine Learning Engineer"
          />
          <meta
            property="og:description"
            content="Tirth Kanani, a Software & Machine Learning Engineer in the UK, passionate about AI, HCI, and open-source. Seeking opportunities to drive innovative solutions."
          />
          <meta
            property="og:image"
            content="https://www.tirthkanani.com/android-chrome-512x512.png"
          />
          <meta property="og:url" content="https://www.tirthkanani.com" />
          <meta property="og:type" content="website" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LV1LN9VBT0"
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-LV1LN9VBT0')`}
          ;
        </Script>

        <ProgressIndicator />
        <Header socials={socials} />

        <section id="hero" className="snap-start">
          <Hero pageInfo={pageInfo} />
        </section>

        <section id="about" className="snap-center">
          <About pageInfo={pageInfo} />
        </section>

        <section id="experience" className="snap-center">
          <WorkExperience experiences={experiences} />
        </section>

        <section id="skills" className="snap-start">
          <Skills skills={skills} />
        </section>

        <section id="projects" className="snap-start">
          <Projects projects={projects} />
        </section>

        <section id="testimonials" className="snap-start">
          <Testimonials />
        </section>

        <section id="contact" className="snap-start">
          <ContactMe />
        </section>

      </div>
    </ThemeProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(pageInfoQuery);
  const experiences = await fetchExperiences();
  const skills = await fetchSkills();
  const projects = await fetchProjects();
  const socials = await fetchSocials();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 10,
  };
};