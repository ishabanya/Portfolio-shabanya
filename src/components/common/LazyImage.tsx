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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <svg className="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7v2H4V4h3.5l1-1h7l1 1H20zm-2 5H5v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9z"/>
            </svg>
            <div className="text-sm font-medium text-gray-700">Project Preview</div>
            <div className="text-xs text-gray-500 mt-1">Click to view details</div>
          </div>
        </div>
      )}
      
      {/* Main Image */}
      {imageSrc && !isError && (
        <img {...imageProps} alt={alt || 'Project image'} />
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