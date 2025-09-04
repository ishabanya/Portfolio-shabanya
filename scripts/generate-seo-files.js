const fs = require('fs');
const path = require('path');

// Sitemap generation
const generateSitemap = (baseUrl, urls) => {
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

// Portfolio sitemap URLs
const getPortfolioSitemapUrls = (baseUrl) => {
  const now = new Date().toISOString().split('T')[0];

  return [
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}#about`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}#experience`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}#projects`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}#skills`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}#contact`,
      lastmod: now,
      changefreq: 'yearly',
      priority: 0.6
    }
  ];
};

// Robots.txt generator
const generateRobotsTxt = (baseUrl) => {
  return `# Robots.txt for Y Shabanya Kishore Portfolio
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /
Allow: /static/
Allow: /manifest.json
Allow: /favicon.ico

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

// Main execution
const main = () => {
  const baseUrl = 'https://shabanya123.github.io/portfolio-shabanya';
  const buildDir = path.join(__dirname, '..', 'build');
  const publicDir = path.join(__dirname, '..', 'public');

  // Ensure directories exist
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  // Generate sitemap
  const urls = getPortfolioSitemapUrls(baseUrl);
  const sitemap = generateSitemap(baseUrl, urls);
  
  // Generate robots.txt
  const robotsTxt = generateRobotsTxt(baseUrl);

  // Write to build directory (for production)
  fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(buildDir, 'robots.txt'), robotsTxt);

  // Also write to public directory (for development)
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  
  console.log('✅ SEO files generated successfully:');
  console.log(`   - ${path.join(buildDir, 'sitemap.xml')}`);
  console.log(`   - ${path.join(buildDir, 'robots.txt')}`);
  console.log(`   - ${path.join(publicDir, 'sitemap.xml')}`);
  console.log(`   - Robots.txt updated in ${path.join(publicDir, 'robots.txt')}`);
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, generateRobotsTxt, getPortfolioSitemapUrls };