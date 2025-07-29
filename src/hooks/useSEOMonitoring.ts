import { useEffect, useRef } from 'react';
import { trackSectionView, trackScrollDepth } from '../utils/analytics';

interface SEOMonitoringOptions {
  sectionName: string;
  trackVisibility?: boolean;
  trackScrollTime?: boolean;
  threshold?: number;
}

export const useSEOMonitoring = ({
  sectionName,
  trackVisibility = true,
  trackScrollTime = true,
  threshold = 0.5
}: SEOMonitoringOptions) => {
  const elementRef = useRef<HTMLElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!trackVisibility || !elementRef.current) return;

    const element = elementRef.current;

    // Intersection Observer for visibility tracking
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section became visible
            startTimeRef.current = Date.now();
            
            if (trackScrollTime) {
              const scrollY = window.scrollY;
              const windowHeight = window.innerHeight;
              const documentHeight = document.documentElement.scrollHeight;
              const scrollPercent = Math.round((scrollY + windowHeight) / documentHeight * 100);
              
              trackScrollDepth(scrollPercent);
            }
          } else {
            // Section became invisible
            if (startTimeRef.current) {
              const timeVisible = Date.now() - startTimeRef.current;
              trackSectionView(sectionName, timeVisible);
              startTimeRef.current = null;
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      // Track final time if still visible when component unmounts
      if (startTimeRef.current) {
        const timeVisible = Date.now() - startTimeRef.current;
        trackSectionView(sectionName, timeVisible);
      }
    };
  }, [sectionName, trackVisibility, trackScrollTime, threshold]);

  return elementRef;
};

// Hook for tracking Core Web Vitals on specific sections
export const useCoreWebVitalsTracking = (sectionName: string) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Track Largest Contentful Paint for this section
    const trackLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          // Check if LCP element is within our section
          if (lastEntry && (lastEntry as any).element && element.contains((lastEntry as any).element)) {
            console.log(`LCP for ${sectionName}:`, lastEntry.startTime);
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        return () => observer.disconnect();
      }
      
      return undefined;
    };

    // Track Cumulative Layout Shift for this section
    const trackCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Report CLS when page becomes hidden
        const reportCLS = () => {
          if (clsValue > 0) {
            console.log(`CLS for ${sectionName}:`, clsValue);
          }
        };
        
        document.addEventListener('visibilitychange', reportCLS);
        window.addEventListener('beforeunload', reportCLS);
        
        return () => {
          observer.disconnect();
          document.removeEventListener('visibilitychange', reportCLS);
          window.removeEventListener('beforeunload', reportCLS);
        };
      }
      
      return undefined;
    };

    const cleanupLCP = trackLCP();
    const cleanupCLS = trackCLS();

    return () => {
      cleanupLCP?.();
      cleanupCLS?.();
    };
  }, [sectionName]);

  return elementRef;
};

// Hook for tracking reading time and content engagement
export const useContentEngagement = (sectionName: string, wordCount?: number) => {
  const elementRef = useRef<HTMLElement>(null);
  const readingStartRef = useRef<number | null>(null);
  const hasBeenReadRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenReadRef.current) {
            readingStartRef.current = Date.now();
          } else if (!entry.isIntersecting && readingStartRef.current) {
            const readingTime = Date.now() - readingStartRef.current;
            
            // Calculate reading engagement
            if (wordCount) {
              const averageReadingSpeed = 200; // words per minute
              const expectedReadingTime = (wordCount / averageReadingSpeed) * 60 * 1000; // in ms
              const engagementRatio = readingTime / expectedReadingTime;
              
              console.log(`Reading engagement for ${sectionName}:`, {
                actualTime: readingTime,
                expectedTime: expectedReadingTime,
                engagementRatio: Math.round(engagementRatio * 100) / 100
              });
            }
            
            trackSectionView(`${sectionName}_reading`, readingTime);
            hasBeenReadRef.current = true;
            readingStartRef.current = null;
          }
        });
      },
      { threshold: 0.7 } // Higher threshold for reading
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      
      if (readingStartRef.current) {
        const readingTime = Date.now() - readingStartRef.current;
        trackSectionView(`${sectionName}_reading`, readingTime);
      }
    };
  }, [sectionName, wordCount]);

  return elementRef;
};

// Hook for tracking form conversion and SEO goals
export const useConversionTracking = (conversionName: string) => {
  const trackConversion = (value?: number, metadata?: Record<string, any>) => {
    // Track conversion event
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual values
        value: value || 1,
        currency: 'USD',
        conversion_name: conversionName,
        ...metadata
      });
    }
    
    // Track in GA4 as well
    if (window.gtag) {
      window.gtag('event', conversionName, {
        event_category: 'conversion',
        event_label: conversionName,
        value: value || 1,
        ...metadata
      });
    }
  };

  return { trackConversion };
};