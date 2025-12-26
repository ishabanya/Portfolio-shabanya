import { useEffect, Suspense, lazy } from 'react';
import HeroSection from '../components/sections/HeroSection';
import ExperienceTimeline from '../components/experience/ExperienceTimeline';
import SectionLoader from '../components/common/SectionLoader';
import SEOHead from '../components/seo/SEOHead';
import { PersonStructuredData, ProfessionalServiceStructuredData, FAQStructuredData } from '../components/seo/StructuredData';
import { experiencesData } from '../data/experiences';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { portfolioData } from '../data/portfolioData';

// Lazy load heavy components
const ProjectsShowcase = lazy(() => import('../components/projects/ProjectsShowcase'));
const SkillsSection = lazy(() => import('../components/skills/SkillsSection'));
const ContactSection = lazy(() => import('../components/contact/ContactSection'));

const Home = () => {
  useEffect(() => {
    // Smooth scroll behavior for hash links
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags and Structured Data */}
      <SEOHead 
        title="Y Shabanya Kishore - Java Spring Boot Developer & Full-Stack Engineer"
        description="Experienced Java Spring Boot Developer and Full-Stack Engineer specializing in scalable enterprise applications, microservices, and modern web technologies. View my portfolio and projects."
        keywords={['Java Developer', 'Spring Boot', 'Full-Stack Developer', 'Software Engineer', 'React Developer', 'Microservices', 'Portfolio']}
        url={portfolioData.site.url}
        type="website"
      />
      <PersonStructuredData />
      <ProfessionalServiceStructuredData />
      <FAQStructuredData />

      {/* Hero Section */}
      <HeroSection />

      {/* Experience Timeline Section */}
      <ExperienceTimeline experiences={experiencesData} />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
            <p className="mb-6">
              {portfolioData.personal.about || `Software Engineering student at SRM University (graduating June 2026) with a focus on backend 
              development and infrastructure. Currently interning at Ford Motor Company, building analytics 
              dashboards and data integration systems.`}
            </p>
            <p>
              {`I enjoy dissecting complex backend challenges, from designing fair matchmaking algorithms to 
              ensuring low-latency server infrastructure. My focus is on building robust systems that scale 
              efficiently while maintaining reliability and performance.`}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Suspense fallback={<SectionLoader text="Loading projects..." height="h-96" />}>
        <ProjectsShowcase projects={projectsData} />
      </Suspense>

      {/* Skills Section */}
      <Suspense fallback={<SectionLoader text="Loading skills..." height="h-96" />}>
        <SkillsSection categories={skillsData} />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<SectionLoader text="Loading contact form..." height="h-96" />}>
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Home;