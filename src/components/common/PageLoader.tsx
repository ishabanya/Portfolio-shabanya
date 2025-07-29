import { memo } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const PageLoader = memo<PageLoaderProps>(({ 
  text = 'Loading page...', 
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white z-50' 
    : 'py-20';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center ${containerClasses}`}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
        
        {/* Animated dots */}
        <motion.div
          className="flex justify-center space-x-1 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});

PageLoader.displayName = 'PageLoader';

export default PageLoader;