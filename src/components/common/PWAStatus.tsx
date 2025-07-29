import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA, useInstallPrompt, useNetworkStatus, useWebShare } from '../../hooks/usePWA';

interface PWAStatusProps {
  className?: string;
}

const PWAStatus = memo<PWAStatusProps>(({ className = '' }) => {
  const { isInstalled } = usePWA();
  const { canInstall, promptInstall } = useInstallPrompt();
  const networkStatus = useNetworkStatus();
  const { share, canShare } = useWebShare();

  const handleInstall = async () => {
    const success = await promptInstall();
    if (success) {
      console.log('App installed successfully');
    }
  };

  const handleShare = async () => {
    await share({
      title: 'Y Shabanya Kishore - Portfolio',
      text: 'Check out my portfolio showcasing full-stack development projects and skills',
      url: window.location.href
    });
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
      {/* Network Status */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`mb-2 px-3 py-2 rounded-full text-xs font-medium ${
          networkStatus.online 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            networkStatus.online ? 'bg-green-500' : 'bg-red-500'
          } animate-pulse`} />
          {networkStatus.online ? 'Online' : 'Offline'}
          {networkStatus.effectiveType && networkStatus.effectiveType !== 'unknown' && (
            <span className="opacity-75">({networkStatus.effectiveType})</span>
          )}
        </div>
      </motion.div>

      {/* Install Prompt */}
      <AnimatePresence>
        {canInstall && !isInstalled && (
          <motion.button
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleInstall}
            className="mb-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full 
              text-sm font-medium flex items-center gap-2 shadow-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Install App
          </motion.button>
        )}
      </AnimatePresence>

      {/* Share Button */}
      {canShare && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="mb-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full 
            text-sm font-medium flex items-center gap-2 shadow-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share
        </motion.button>
      )}

    </div>
  );
});

PWAStatus.displayName = 'PWAStatus';

export default PWAStatus;