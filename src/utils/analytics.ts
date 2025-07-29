// Google Analytics 4 Configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// GA4 Measurement ID from environment variables
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    // Privacy settings
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track contact form submissions
export const trackContactForm = (status: 'submit' | 'success' | 'error') => {
  trackEvent('contact_form', 'engagement', status);
};

// Track project interactions
export const trackProjectView = (projectTitle: string) => {
  trackEvent('project_view', 'engagement', projectTitle);
};

// Track external link clicks
export const trackExternalLink = (url: string, label: string) => {
  trackEvent('external_link', 'outbound', label);
  
  // Allow navigation after tracking
  setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, 100);
};

// Track resume downloads
export const trackResumeDownload = () => {
  trackEvent('resume_download', 'engagement', 'pdf_download');
};

// Track PWA install
export const trackPWAInstall = () => {
  trackEvent('pwa_install', 'engagement', 'app_install');
};

// Track performance metrics
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance', 'core_web_vitals', metric, Math.round(value));
};

// SEO and Content Performance Tracking
export const trackSEOEvent = (action: string, label?: string, value?: number) => {
  trackEvent('seo', 'optimization', action, value);
  
  if (label) {
    trackEvent(action, 'seo_content', label, value);
  }
};

// Track scroll depth for content engagement
export const trackScrollDepth = (depth: number) => {
  const milestones = [25, 50, 75, 90, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 5);
  
  if (milestone) {
    trackEvent('scroll_depth', 'engagement', `${milestone}%`, milestone);
  }
};

// Track time on page for SEO insights
export const trackTimeOnPage = (seconds: number) => {
  const timeRanges = [
    { min: 0, max: 30, label: '0-30s' },
    { min: 30, max: 60, label: '30-60s' },
    { min: 60, max: 180, label: '1-3min' },
    { min: 180, max: 300, label: '3-5min' },
    { min: 300, max: Infinity, label: '5min+' }
  ];
  
  const range = timeRanges.find(r => seconds >= r.min && seconds < r.max);
  if (range) {
    trackEvent('time_on_page', 'engagement', range.label, Math.round(seconds));
  }
};

// Track section visibility for content optimization
export const trackSectionView = (sectionName: string, timeVisible: number) => {
  trackEvent('section_view', 'content_engagement', sectionName, Math.round(timeVisible));
};

// Track search engine referrals
export const trackSearchEngineReferral = () => {
  const referrer = document.referrer;
  const searchEngines = [
    { domain: 'google.com', name: 'Google' },
    { domain: 'bing.com', name: 'Bing' },
    { domain: 'duckduckgo.com', name: 'DuckDuckGo' },
    { domain: 'yahoo.com', name: 'Yahoo' },
    { domain: 'baidu.com', name: 'Baidu' }
  ];
  
  const searchEngine = searchEngines.find(se => referrer.includes(se.domain));
  if (searchEngine) {
    trackEvent('search_referral', 'acquisition', searchEngine.name);
  }
};

// Track Core Web Vitals for SEO
export const trackCoreWebVitals = () => {
  if ('web-vitals' in window) {
    // This will be called by the performance monitoring
    return;
  }
  
  // Fallback performance tracking
  if (window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const fcp = navigation.loadEventEnd - navigation.fetchStart;
      const ttfb = navigation.responseStart - navigation.fetchStart;
      
      trackPerformance('FCP_fallback', fcp);
      trackPerformance('TTFB_fallback', ttfb);
    }
  }
};

// Track page load performance for SEO
export const trackPageLoad = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.fetchStart;
        
        trackEvent('page_load_time', 'performance', 'full_load', Math.round(loadTime));
        trackEvent('dom_load_time', 'performance', 'dom_ready', Math.round(domContentLoaded));
      }
    }, 0);
  });
};

// Track user engagement patterns for SEO
export const trackUserEngagement = () => {
  const startTime = Date.now();
  let scrollDepth = 0;
  let maxScroll = 0;
  
  // Track scroll depth
  const trackScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
    maxScroll = Math.max(maxScroll, scrollDepth);
    
    trackScrollDepth(scrollDepth);
  };
  
  // Track time on page when leaving
  const trackTimeBeforeLeave = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeSpent);
    trackEvent('max_scroll_depth', 'engagement', `${maxScroll}%`, maxScroll);
  };
  
  window.addEventListener('scroll', trackScroll, { passive: true });
  window.addEventListener('beforeunload', trackTimeBeforeLeave);
  
  // Clean up
  return () => {
    window.removeEventListener('scroll', trackScroll);
    window.removeEventListener('beforeunload', trackTimeBeforeLeave);
  };
};

// Privacy-friendly user consent
export const setAnalyticsConsent = (granted: boolean) => {
  if (!window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied', // We don't use ads
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  });
};