# Deployment Guide

This document provides comprehensive deployment instructions for the portfolio application.

## 🚀 Quick Deploy

### GitHub Pages (Recommended)
```bash
npm run deploy:github
```

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Netlify
1. Connect repository to Netlify
2. Build settings are in `netlify.toml`
3. Deploy automatically triggers on push

## 📦 Build Optimization

### Production Build
```bash
npm run build
```

**Build Output:**
- **Main Bundle**: ~116.79 kB (gzipped)
- **CSS**: ~7.7 kB (gzipped)  
- **Chunks**: Code-split for optimal loading
- **Service Worker**: PWA support enabled

### Bundle Analysis
```bash
npm run analyze
```

**Optimization Features:**
- ✅ Code splitting with React.lazy()
- ✅ Tree shaking for unused code
- ✅ CSS purging with Tailwind
- ✅ Image optimization and lazy loading
- ✅ Service worker caching
- ✅ Gzip compression

## 🌐 Deployment Platforms

### 1. GitHub Pages

**Setup:**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/repository-name"

# Deploy
npm run deploy:github
```

**Features:**
- ✅ Free hosting
- ✅ Custom domain support
- ✅ HTTPS enabled
- ✅ CI/CD with GitHub Actions

**Configuration:** `.github/workflows/deploy.yml`

### 2. Vercel

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Features:**
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Edge functions
- ✅ Preview deployments
- ✅ Custom domains

**Configuration:** `vercel.json`

### 3. Netlify

**Setup:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`

**Features:**
- ✅ Form handling
- ✅ Serverless functions
- ✅ Split testing
- ✅ Branch deploys
- ✅ Custom headers

**Configuration:** `netlify.toml` + `public/_redirects`

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**Stages:**
1. **Test** - Run unit tests with coverage
2. **Build** - Create optimized production build  
3. **Deploy** - Deploy to GitHub Pages

**Features:**
- ✅ Automated testing on PR
- ✅ Build verification
- ✅ Lighthouse CI performance testing
- ✅ Coverage reporting
- ✅ Security scanning

**Configuration:** `.github/workflows/deploy.yml`

### Environment Variables

**Required:**
```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxx  
REACT_APP_EMAILJS_PUBLIC_KEY=xxx
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Platform Setup:**
- **GitHub**: Repository Secrets
- **Vercel**: Environment Variables dashboard
- **Netlify**: Site Settings > Environment Variables

## 📊 Analytics & Monitoring

### Google Analytics 4

**Setup:**
1. Create GA4 property
2. Get Measurement ID
3. Set `REACT_APP_GA_MEASUREMENT_ID`

**Tracked Events:**
- ✅ Page views
- ✅ Contact form submissions
- ✅ Project views
- ✅ External link clicks
- ✅ Resume downloads
- ✅ PWA installs
- ✅ Core Web Vitals

### Performance Monitoring

**Lighthouse CI:**
- Automated performance testing
- Core Web Vitals tracking
- Accessibility compliance
- SEO optimization

**Web Vitals:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

## 🔒 Security & Performance

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [configured]
```

### Performance Optimizations
- ✅ Static asset caching (1 year)
- ✅ Service worker caching
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS/JS minification
- ✅ Gzip compression

### PWA Features
- ✅ Offline functionality
- ✅ Install prompts
- ✅ Background sync
- ✅ Push notifications ready

## 🌍 Custom Domain Setup

### GitHub Pages
```bash
# Add CNAME file
echo "yourdomain.com" > public/CNAME

# Configure DNS
# A Record: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
# CNAME: yourusername.github.io
```

### Vercel
```bash
# Add domain
vercel domains add yourdomain.com

# Configure DNS  
# CNAME: cname.vercel-dns.com
```

### Netlify
```bash
# Add domain in dashboard
# Configure DNS
# CNAME: your-site-name.netlify.app
```

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache
npm run build -- --reset-cache

# Check bundle size
npm run analyze
```

**Routing Issues:**
- ✅ SPA redirects configured
- ✅ `_redirects` file for Netlify
- ✅ `vercel.json` routing for Vercel

**Performance Issues:**
```bash
# Run Lighthouse audit
npm install -g @lhci/cli
lhci autorun
```

### Performance Targets
- **Performance Score**: > 90
- **Accessibility Score**: > 95  
- **Best Practices Score**: > 90
- **SEO Score**: > 90
- **PWA Score**: > 80

## 📈 Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor Core Web Vitals
- [ ] Review Lighthouse scores
- [ ] Update dependencies
- [ ] Security audit (`npm audit`)
- [ ] Performance regression testing

### Analytics Review
- [ ] Traffic patterns
- [ ] User engagement
- [ ] Conversion rates
- [ ] Technical metrics
- [ ] Error tracking

## 🎯 Deployment Checklist

**Pre-deployment:**
- [ ] Tests passing
- [ ] Build successful
- [ ] Environment variables set
- [ ] Performance audit completed
- [ ] Security review done

**Post-deployment:**
- [ ] Site loads correctly
- [ ] All routes working
- [ ] Forms functional
- [ ] Analytics tracking
- [ ] PWA features working
- [ ] Performance metrics good

---

## Quick Commands Reference

```bash
# Build & Deploy
npm run build                 # Production build
npm run analyze              # Bundle analysis
npm run deploy:github        # Deploy to GitHub Pages

# Testing & Quality
npm test                     # Run tests
npm run test -- --coverage  # Coverage report
lhci autorun                # Lighthouse audit

# Development
npm start                    # Development server
npm run build:analyze       # Build + analysis
```

For detailed platform-specific instructions, refer to the respective configuration files and platform documentation.