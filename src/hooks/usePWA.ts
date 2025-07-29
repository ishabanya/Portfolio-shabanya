import { useState, useEffect, useCallback } from 'react';
import { 
  registerServiceWorker, 
  setupInstallPrompt, 
  isAppInstalled, 
  getNetworkStatus,
  scheduleBackgroundSync,
  getPWACapabilities,
  shareContent
} from '../utils/pwa';

// Main PWA hook
export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Initialize PWA features
    const initPWA = async () => {
      // Register service worker
      const reg = await registerServiceWorker();
      setRegistration(reg);

      // Setup install prompt
      setupInstallPrompt();

      // Check if app is installed
      setIsInstalled(isAppInstalled());
    };

    initPWA();

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const capabilities = getPWACapabilities();

  return {
    isInstalled,
    isOnline,
    updateAvailable,
    registration,
    capabilities
  };
};

// Network status hook
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState(getNetworkStatus());

  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus(getNetworkStatus());
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Listen for connection changes if available
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
};

// Install prompt hook
export const useInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(isAppInstalled());

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!installPrompt) return false;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstallPrompt(null);
      return true;
    }
    
    return false;
  }, [installPrompt]);

  return {
    canInstall: !!installPrompt && !isInstalled,
    isInstalled,
    promptInstall
  };
};

// Background sync hook
export const useBackgroundSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const syncData = useCallback(async (tag: string, data: any) => {
    setIsSyncing(true);
    setSyncError(null);

    try {
      await scheduleBackgroundSync(tag, data);
      return true;
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : 'Sync failed');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    syncData,
    isSyncing,
    syncError
  };
};

// Web Share hook
export const useWebShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const canShare = 'share' in navigator;

  const share = useCallback(async (shareData: { title?: string; text?: string; url?: string }) => {
    setIsSharing(true);
    setShareError(null);

    try {
      await shareContent(shareData);
      return true;
    } catch (error) {
      setShareError(error instanceof Error ? error.message : 'Share failed');
      return false;
    } finally {
      setIsSharing(false);
    }
  }, []);

  return {
    share,
    canShare,
    isSharing,
    shareError
  };
};

// Service Worker update hook
export const useServiceWorkerUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        setRegistration(reg);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      }
    });
  }, []);

  const applyUpdate = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }, [registration]);

  return {
    updateAvailable,
    applyUpdate
  };
};

// Offline storage hook
export const useOfflineStorage = (key: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load data from localStorage
    try {
      const stored = localStorage.getItem(`offline_${key}`);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (err) {
      setError('Failed to load offline data');
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const saveData = useCallback((newData: any) => {
    try {
      localStorage.setItem(`offline_${key}`, JSON.stringify(newData));
      setData(newData);
      setError(null);
    } catch (err) {
      setError('Failed to save offline data');
    }
  }, [key]);

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(`offline_${key}`);
      setData(null);
      setError(null);
    } catch (err) {
      setError('Failed to clear offline data');
    }
  }, [key]);

  return {
    data,
    saveData,
    clearData,
    isLoading,
    error
  };
};

// PWA metrics hook
export const usePWAMetrics = () => {
  const [metrics, setMetrics] = useState({
    isStandalone: false,
    displayMode: 'browser',
    orientation: 'portrait',
    connectionType: 'unknown'
  });

  useEffect(() => {
    const updateMetrics = () => {
      const connection = (navigator as any).connection;
      
      setMetrics({
        isStandalone: window.matchMedia('(display-mode: standalone)').matches,
        displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser',
        orientation: window.screen.orientation?.type || 'unknown',
        connectionType: connection?.effectiveType || 'unknown'
      });
    };

    updateMetrics();

    // Listen for orientation changes
    window.addEventListener('orientationchange', updateMetrics);
    
    // Listen for connection changes
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateMetrics);
    }

    return () => {
      window.removeEventListener('orientationchange', updateMetrics);
      if (connection) {
        connection.removeEventListener('change', updateMetrics);
      }
    };
  }, []);

  return metrics;
};