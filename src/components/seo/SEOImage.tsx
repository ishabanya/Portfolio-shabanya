import React, { useState, useRef, useEffect } from 'react';

interface SEOImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  blurDataURL?: string;
}

const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  srcSet,
  onLoad,
  onError,
  placeholder,
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload important images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (srcSet) link.setAttribute('imagesrcset', srcSet);
      if (sizes) link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
    
    return undefined;
  }, [priority, src, srcSet, sizes]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcSet if not provided
  const generateSrcSet = (baseSrc: string): string => {
    if (srcSet) return srcSet;
    
    // Simple responsive image generation (would be better with actual image processing)
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  };

  // Generate sizes attribute if not provided
  const generateSizes = (): string => {
    if (sizes) return sizes;
    
    return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  const imageStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Placeholder */}
      {!isLoaded && (placeholder || blurDataURL) && (
        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            backgroundImage: placeholder ? `url(${placeholder})` : blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        srcSet={generateSrcSet(src)}
        sizes={generateSizes()}
        onLoad={handleLoad}
        onError={handleError}
        style={imageStyle}
        className="absolute inset-0 w-full h-full object-cover"
        // SEO attributes
        itemProp="image"
        // Accessibility attributes
        role="img"
        aria-describedby={alt ? undefined : 'image-description'}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

// Higher-order component for automatic image optimization
export const withSEOImage = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = React.forwardRef<any, P>((props, _ref) => (
    <Component {...(props as P)} />
  ));
  
  WrappedComponent.displayName = `withSEOImage(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for image performance monitoring
export const useImagePerformance = (imageName: string) => {
  const trackImageLoad = (loadTime: number, imageSize?: number) => {
    // Track image loading performance
    if (window.gtag) {
      window.gtag('event', 'image_load_time', {
        event_category: 'performance',
        event_label: imageName,
        value: Math.round(loadTime),
        custom_parameter_size: imageSize
      });
    }
    
    console.log(`Image ${imageName} loaded in ${loadTime}ms`, { imageSize });
  };

  const trackImageError = (errorType: string) => {
    if (window.gtag) {
      window.gtag('event', 'image_error', {
        event_category: 'error',
        event_label: imageName,
        custom_parameter_error_type: errorType
      });
    }
  };

  return { trackImageLoad, trackImageError };
};

// Component for hero images with SEO optimization
export const SEOHeroImage: React.FC<SEOImageProps & { 
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}> = ({ priority = true, fetchPriority = 'high', ...props }) => {
  return (
    <SEOImage
      {...props}
      priority={priority}
      loading="eager"
      className={`hero-image ${props.className || ''}`}
      // Add fetchpriority for modern browsers
      {...(fetchPriority && { 'data-fetchpriority': fetchPriority })}
    />
  );
};

// Component for lazy-loaded images with intersection observer
export const LazySSEOImage: React.FC<SEOImageProps> = (props) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isInView ? (
        <SEOImage {...props} />
      ) : (
        <div 
          className={`bg-gray-200 ${props.className || ''}`}
          style={{ width: props.width, height: props.height }}
        >
          {/* Placeholder content */}
        </div>
      )}
    </div>
  );
};

export default SEOImage;