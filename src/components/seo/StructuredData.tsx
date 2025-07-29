import React from 'react';
import { Helmet } from 'react-helmet-async';
import { portfolioData } from '../../data/portfolioData';

// Personal Profile Structured Data
export const PersonStructuredData: React.FC = () => {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": portfolioData.personal.name,
    "url": "https://shabanya123.github.io/portfolio-shabanya",
    "image": "https://shabanya123.github.io/portfolio-shabanya/logo512.png",
    "sameAs": [
      portfolioData.personal.linkedin,
      portfolioData.personal.github
    ],
    "jobTitle": portfolioData.personal.title,
    "email": portfolioData.personal.email,
    "telephone": portfolioData.personal.phone,
    "worksFor": {
      "@type": "Organization",
      "name": "Software Development"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "SRM Institute of Science & Technology"
    },
    "knowsAbout": [
      ...portfolioData.skills.languages,
      ...portfolioData.skills.backend,
      "Full-Stack Development",
      "Software Engineering"
    ],
    "nationality": "Indian",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personData)}
      </script>
    </Helmet>
  );
};

// Website Structured Data
export const WebsiteStructuredData: React.FC = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${portfolioData.personal.name} Portfolio`,
    "url": "https://shabanya123.github.io/portfolio-shabanya",
    "description": `Personal portfolio showcasing ${portfolioData.personal.roles.join(', ')} projects and full-stack engineering experience`,
    "author": {
      "@type": "Person",
      "name": portfolioData.personal.name
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "genre": "Technology Portfolio",
    "keywords": `${portfolioData.personal.roles.join(', ')}, Portfolio`,
    "mainEntity": {
      "@type": "Person",
      "name": portfolioData.personal.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shabanya123.github.io/portfolio-shabanya?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteData)}
      </script>
    </Helmet>
  );
};

// Professional Service Structured Data
export const ProfessionalServiceStructuredData: React.FC = () => {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Java Spring Boot Development Services",
    "description": "Professional Java Spring Boot development and full-stack engineering services",
    "provider": {
      "@type": "Person",
      "name": portfolioData.personal.name,
      "url": "https://shabanya123.github.io/portfolio-shabanya"
    },
    "areaServed": "Worldwide",
    "availableLanguage": "English",
    "serviceType": "Software Development",
    "category": "Technology Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Java Spring Boot Development",
            "description": "Enterprise-grade Java Spring Boot application development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Stack Development",
            "description": "Complete web application development with modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Microservices Architecture",
            "description": "Scalable microservices design and implementation"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>
    </Helmet>
  );
};

// Portfolio Project Structured Data
interface ProjectStructuredDataProps {
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    status: 'completed' | 'in-progress' | 'planned';
  };
}

export const ProjectStructuredData: React.FC<ProjectStructuredDataProps> = ({ project }) => {
  const projectData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "url": project.liveUrl,
    "codeRepository": project.githubUrl,
    "screenshot": project.image,
    "author": {
      "@type": "Person",
      "name": portfolioData.personal.name,
      "url": "https://shabanya123.github.io/portfolio-shabanya"
    },
    "programmingLanguage": project.technologies,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Cross-platform",
    "softwareVersion": "1.0",
    "dateCreated": new Date().toISOString(),
    "creativeWorkStatus": project.status === 'completed' ? 'Published' : 'Draft',
    "isAccessibleForFree": true,
    "license": "https://opensource.org/licenses/MIT"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(projectData)}
      </script>
    </Helmet>
  );
};

// Organization Structured Data
export const OrganizationStructuredData: React.FC = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `${portfolioData.personal.name} - Software Development`,
    "url": "https://shabanya123.github.io/portfolio-shabanya",
    "logo": "https://shabanya123.github.io/portfolio-shabanya/logo512.png",
    "description": `Professional software development services specializing in ${portfolioData.personal.roles.join(' and ')}`,
    "foundingDate": new Date().getFullYear().toString(),
    "founder": {
      "@type": "Person",
      "name": portfolioData.personal.name
    },
    "numberOfEmployees": 1,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Professional Inquiries",
      "email": portfolioData.personal.email,
      "telephone": portfolioData.personal.phone,
      "availableLanguage": "English"
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Java Development",
      "Spring Boot",
      "React Development",
      "Full-Stack Engineering",
      "Microservices"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Software Development Services",
        "description": "Professional Java Spring Boot and full-stack development services"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
};

// FAQ Structured Data for common questions
export const FAQStructuredData: React.FC = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What technologies does ${portfolioData.personal.name} specialize in?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${portfolioData.personal.name} specializes in ${portfolioData.skills.languages.slice(0, 4).join(', ')}, ${portfolioData.skills.backend.slice(0, 2).join(', ')}, and ${portfolioData.skills.frontend.slice(0, 2).join(', ')}.`
        }
      },
      {
        "@type": "Question",
        "name": `What type of projects has ${portfolioData.personal.name} worked on?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${portfolioData.personal.name} has worked on ${portfolioData.projects.slice(0, 3).map(p => p.title.toLowerCase()).join(', ')}, and other enterprise-grade applications.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I contact ${portfolioData.personal.name} for project collaboration?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can contact ${portfolioData.personal.name} at ${portfolioData.personal.email} or connect via LinkedIn and GitHub profiles.`
        }
      },
      {
        "@type": "Question",
        "name": `What is ${portfolioData.personal.name}'s experience level?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${portfolioData.personal.name} is an experienced ${portfolioData.personal.title} with expertise in ${portfolioData.personal.roles.join(' and ')}.`
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  );
};