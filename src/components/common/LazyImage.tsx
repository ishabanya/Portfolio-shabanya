import { useState, useEffect, memo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo<LazyImageProps>(({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  width,
  height,
  sizes,
  srcSet,
  loading = 'lazy',
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  
  // Use intersection observer for better performance
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority // Skip intersection observer for priority images
  });

  // Load image when in view or if priority
  useEffect(() => {
    if (inView || priority) {
      setImageSrc(src);
    }
  }, [inView, priority, src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsError(true);
    onError?.();
  }, [onError]);

  // Generate optimized image attributes
  const imageProps = {
    src: imageSrc || '',
    alt,
    onLoad: handleLoad,
    onError: handleError,
    loading,
    ...(width && { width }),
    ...(height && { height }),
    ...(sizes && { sizes }),
    ...(srcSet && { srcSet }),
    className: `w-full h-full object-cover transition-all duration-500 ${
      isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
    }`,
    style: {
      filter: isLoaded ? 'none' : 'blur(4px)',
    }
  };

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={`${alt} placeholder`}
              className="w-full h-full object-cover opacity-50 blur-sm" 
            />
          ) : (
            <div className="text-gray-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
      
      {/* Main Image */}
      {imageSrc && !isError && (
        <img {...imageProps} />
      )}

      {/* Loading overlay */}
      {imageSrc && !isLoaded && !isError && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;