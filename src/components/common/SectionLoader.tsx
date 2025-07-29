import { memo } from 'react';
import { motion } from 'framer-motion';

interface SectionLoaderProps {
  text?: string;
  height?: string;
  className?: string;
}

const SectionLoader = memo<SectionLoaderProps>(({ 
  text = 'Loading section...', 
  height = 'h-64',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className={`flex items-center justify-center ${height} ${className}`}
    >
      <div className="text-center space-y-4">
        {/* Skeleton Animation */}
        <div className="space-y-3">
          <motion.div
            className="h-4 bg-gray-200 rounded-lg w-48"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-4 bg-gray-200 rounded-lg w-32"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-4 bg-gray-200 rounded-lg w-24"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
});

SectionLoader.displayName = 'SectionLoader';

export default SectionLoader;