import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  canonical?: string;
}

const defaultSEO = {
  title: 'Y Shabanya Kishore - Java Spring Boot Developer & Full-Stack Engineer',
  description: 'Experienced Java Spring Boot Developer and Full-Stack Engineer specializing in scalable enterprise applications, microservices, and modern web technologies. View my portfolio and projects.',
  keywords: [
    'Java Developer',
    'Spring Boot',
    'Full-Stack Developer', 
    'Software Engineer',
    'React Developer',
    'Microservices',
    'Enterprise Applications',
    'Portfolio',
    'Y Shabanya Kishore'
  ],
  image: 'https://shabanya123.github.io/portfolio-shabanya/logo512.png',
  url: 'https://shabanya123.github.io/portfolio-shabanya',
  type: 'website' as const,
  author: 'Y Shabanya Kishore'
};

const SEOHead: React.FC<SEOHeadProps> = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  section,
  canonical
}) => {
  const fullTitle = title === defaultSEO.title ? title : `${title} | Y Shabanya Kishore`;
  const keywordsString = keywords.join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Y Shabanya Kishore Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@shabanya123" />
      <meta name="twitter:site" content="@shabanya123" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="application-name" content="Y Shabanya Kishore Portfolio" />
      
      {/* Language and Geographic Tags */}
      <meta name="language" content="en" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Professional Tags */}
      <meta name="category" content="technology" />
      <meta name="coverage" content="worldwide" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": url
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;