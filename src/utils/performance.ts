// Performance monitoring utilities for CRA
import { useEffect, useCallback } from 'react';
import { trackPerformance } from './analytics';

// Web Vitals reporting
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

// Performance measurement decorator
export const measurePerformance = (name: string) => {
  return function <T extends (...args: any[]) => any>(
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value;

    if (originalMethod) {
      descriptor.value = (function (this: any, ...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        
        if (result instanceof Promise) {
          return result.finally(() => {
            const end = performance.now();
            console.log(`${name} took ${end - start} milliseconds`);
          });
        } else {
          const end = performance.now();
          console.log(`${name} took ${end - start} milliseconds`);
          return result;
        }
      } as any) as T;
    }

    return descriptor;
  };
};

// Component render time measurement
export const measureRenderTime = (componentName: string) => {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`);
    }
  };
};

// Memory usage tracking
export const trackMemoryUsage = (label: string) => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log(`${label} Memory Usage:`, {
      used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024 * 100) / 100} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024 * 100) / 100} MB`
    });
  }
};

// Bundle size analysis helpers
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('To analyze bundle size, run: npm run analyze');
    console.log('Bundle optimization tips:');
    console.log('- Use React.lazy() for code splitting');
    console.log('- Implement tree shaking');
    console.log('- Optimize images and assets');
    console.log('- Remove unused dependencies');
  }
};

// Performance observer for long tasks
export const observeLongTasks = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration}ms`, entry);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observation not supported');
    }
  }
};

// FPS monitoring
export const monitorFPS = () => {
  let lastTime = performance.now();
  let frameCount = 0;

  const measureFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`FPS: ${fps}`);
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  };

  requestAnimationFrame(measureFPS);
};

// Image loading performance
export const trackImageLoading = (src: string, startTime: number) => {
  return (_event: Event) => {
    const loadTime = performance.now() - startTime;
    if (process.env.NODE_ENV === 'development') {
      console.log(`Image loaded: ${src} in ${loadTime.toFixed(2)}ms`);
    }
  };
};

// React component performance hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderStart = performance.now();
  
  useEffect(() => {
    const renderEnd = performance.now();
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} mount time: ${(renderEnd - renderStart).toFixed(2)}ms`);
    }
  }, [componentName, renderStart]);
  
  return useCallback(() => {
    trackMemoryUsage(componentName);
  }, [componentName]);
};

// Send performance metrics to analytics
export const sendToAnalytics = (metric: Metric) => {
  // Track performance metrics to Google Analytics
  trackPerformance(metric.name, metric.value);
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
};