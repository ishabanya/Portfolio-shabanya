// Sitemap generation utility
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (_baseUrl: string, urls: SitemapUrl[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlEntries = urls.map(url => {
    const urlOpen = '  <url>';
    const urlClose = '  </url>';
    const loc = `    <loc>${url.loc}</loc>`;
    const lastmod = url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : '';
    const changefreq = url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : '';
    const priority = url.priority !== undefined ? `    <priority>${url.priority}</priority>` : '';

    return [urlOpen, loc, lastmod, changefreq, priority, urlClose]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  return [xmlHeader, urlsetOpen, urlEntries, urlsetClose].join('\n');
};

// Default sitemap URLs for the portfolio
export const getPortfolioSitemapUrls = (baseUrl: string): SitemapUrl[] => {
  const now = new Date().toISOString().split('T')[0] || new Date().toISOString().substring(0, 10); // YYYY-MM-DD format

  const sitemap: SitemapUrl[] = [
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: 'weekly' as const,
      priority: 1.0
    },
    {
      loc: `${baseUrl}#about`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.8
    },
    {
      loc: `${baseUrl}#experience`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.8
    },
    {
      loc: `${baseUrl}#projects`,
      lastmod: now,
      changefreq: 'weekly' as const,
      priority: 0.9
    },
    {
      loc: `${baseUrl}#skills`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    {
      loc: `${baseUrl}#contact`,
      lastmod: now,
      changefreq: 'yearly' as const,
      priority: 0.6
    }
  ];
  
  return sitemap;
};

// Generate sitemap for build process
export const generatePortfolioSitemap = (baseUrl: string = 'https://shabanya123.github.io/portfolio-shabanya'): string => {
  const urls = getPortfolioSitemapUrls(baseUrl);
  return generateSitemap(baseUrl, urls);
};

// Function to save sitemap to public directory during build
export const saveSitemap = async (sitemap: string, filePath: string): Promise<void> => {
  if (typeof window === 'undefined') {
    // Node.js environment (build time)
    const fs = await import('fs');
    const path = await import('path');
    
    const fullPath = path.resolve(filePath);
    fs.writeFileSync(fullPath, sitemap, 'utf8');
    console.log(`Sitemap generated at: ${fullPath}`);
  }
};

// Robots.txt content generator
export const generateRobotsTxt = (baseUrl: string): string => {
  return `# Robots.txt for Y Shabanya Kishore Portfolio
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /
Allow: /static/
Allow: /manifest.json
Allow: /favicon.ico

# Disallow private/admin areas (none in this portfolio)
# Disallow: /admin/
# Disallow: /private/

# Crawl-delay (optional, in seconds)
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Additional directives for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Performance note: This portfolio is optimized for fast loading
# Last updated: ${new Date().toLocaleDateString()}
`;
};

// SEO utility functions
export const generateCanonicalUrl = (baseUrl: string, path: string = ''): string => {
  return `${baseUrl}${path}`.replace(/\/+$/, '') || baseUrl;
};

export const generateMetaDescription = (section?: string): string => {
  const descriptions = {
    about: 'Learn about Y Shabanya Kishore, an experienced Java Spring Boot developer and full-stack engineer with expertise in enterprise applications.',
    experience: 'Explore Y Shabanya Kishore\'s professional experience in Java Spring Boot development, microservices, and full-stack engineering.',
    projects: 'View Y Shabanya Kishore\'s portfolio of Java Spring Boot projects, React applications, and full-stack development work.',
    skills: 'Discover Y Shabanya Kishore\'s technical skills in Java, Spring Boot, React, TypeScript, and modern web development technologies.',
    contact: 'Get in touch with Y Shabanya Kishore for Java Spring Boot development projects and full-stack engineering collaboration.'
  };

  return section && descriptions[section as keyof typeof descriptions] 
    ? descriptions[section as keyof typeof descriptions]
    : 'Y Shabanya Kishore - Java Spring Boot Developer & Full-Stack Engineer. Experienced in building scalable enterprise applications and modern web solutions.';
};

export const generatePageTitle = (section?: string): string => {
  const titles = {
    about: 'About - Y Shabanya Kishore',
    experience: 'Experience - Y Shabanya Kishore',
    projects: 'Projects - Y Shabanya Kishore', 
    skills: 'Skills - Y Shabanya Kishore',
    contact: 'Contact - Y Shabanya Kishore'
  };

  return section && titles[section as keyof typeof titles]
    ? titles[section as keyof typeof titles]
    : 'Y Shabanya Kishore - Java Spring Boot Developer & Full-Stack Engineer';
};