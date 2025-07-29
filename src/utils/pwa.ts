// PWA Utilities for Portfolio Application

// Service Worker registration and management
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              showUpdateNotification();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Update service worker
export const updateServiceWorker = (registration: ServiceWorkerRegistration) => {
  if (registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
};

// Show update notification
const showUpdateNotification = () => {
  // Create update notification UI
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 400px;
      margin: 0 auto;
    ">
      <div>
        <strong>Update Available</strong><br>
        <small>A new version of the portfolio is ready!</small>
      </div>
      <div>
        <button id="pwa-update-btn" style="
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 8px;
        ">Update</button>
        <button id="pwa-dismiss-btn" style="
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          padding: 8px;
          cursor: pointer;
          margin-left: 8px;
        ">×</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Handle update button click
  const updateBtn = document.getElementById('pwa-update-btn');
  const dismissBtn = document.getElementById('pwa-dismiss-btn');
  
  updateBtn?.addEventListener('click', () => {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        updateServiceWorker(registration);
      }
    });
  });
  
  dismissBtn?.addEventListener('click', () => {
    document.body.removeChild(notification);
  });
  
  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      document.body.removeChild(notification);
    }
  }, 10000);
};

// Check if app is installed
export const isAppInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Install prompt management
let deferredPrompt: any = null;

export const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button
    showInstallButton();
  });
};

// Show install button
const showInstallButton = () => {
  // Only show if not already installed
  if (isAppInstalled()) return;
  
  const installBtn = document.createElement('button');
  installBtn.id = 'pwa-install-btn';
  installBtn.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 50px;
      box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 10000;
      transition: all 0.3s ease;
    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Install App
    </div>
  `;
  
  installBtn.addEventListener('click', handleInstallClick);
  document.body.appendChild(installBtn);
  
  // Hide after 30 seconds if not clicked
  setTimeout(() => {
    const btn = document.getElementById('pwa-install-btn');
    if (btn && btn.parentNode) {
      btn.parentNode.removeChild(btn);
    }
  }, 30000);
};

// Handle install button click
const handleInstallClick = async () => {
  if (!deferredPrompt) return;
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to install prompt: ${outcome}`);
  
  // Remove the install button
  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn && installBtn.parentNode) {
    installBtn.parentNode.removeChild(installBtn);
  }
  
  deferredPrompt = null;
};

// Network status detection
export const getNetworkStatus = (): { online: boolean; effectiveType?: string } => {
  const connection = (navigator as any).connection;
  return {
    online: navigator.onLine,
    effectiveType: connection?.effectiveType || 'unknown'
  };
};

// Background sync for forms
export const scheduleBackgroundSync = async (tag: string, data: any) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Store data in IndexedDB for later sync
      await storeFormSubmission(tag, data);
      
      // Register background sync with proper typing
      const syncRegistration = registration as any;
      if (syncRegistration.sync) {
        await syncRegistration.sync.register(tag);
        console.log('Background sync registered:', tag);
      } else {
        throw new Error('Background sync not available');
      }
    } catch (error) {
      console.error('Background sync registration failed:', error);
      throw error;
    }
  } else {
    throw new Error('Background sync not supported');
  }
};

// IndexedDB helpers for offline storage
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('portfolio-pwa', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for form submissions
      if (!db.objectStoreNames.contains('submissions')) {
        const store = db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('tag', 'tag', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// Store form submission for background sync
const storeFormSubmission = async (tag: string, data: any): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['submissions'], 'readwrite');
  const store = transaction.objectStore('submissions');
  
  const submission = {
    tag,
    data,
    timestamp: Date.now()
  };
  
  await store.add(submission);
};

// Get stored form submissions
export const getStoredSubmissions = async (tag?: string): Promise<any[]> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(['submissions'], 'readonly');
    const store = transaction.objectStore('submissions');
    
    if (tag) {
      const index = store.index('tag');
      const request = index.getAll(tag);
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } else {
      const request = store.getAll();
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
  } catch (error) {
    console.error('Error getting stored submissions:', error);
    return [];
  }
};

// Clear stored submissions
export const clearStoredSubmissions = async (tag?: string): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(['submissions'], 'readwrite');
    const store = transaction.objectStore('submissions');
    
    if (tag) {
      const index = store.index('tag');
      const request = index.getAllKeys(tag);
      request.onsuccess = () => {
        const keys = request.result;
        keys.forEach(key => store.delete(key));
      };
    } else {
      await store.clear();
    }
  } catch (error) {
    console.error('Error clearing stored submissions:', error);
  }
};

// PWA Analytics
export const trackPWAEvent = (event: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[PWA Event] ${event}:`, data);
  }
  
  // Here you could integrate with analytics services
  // Example: gtag('event', event, data);
};

// Check PWA capabilities
export const getPWACapabilities = () => {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
    installPrompt: 'beforeinstallprompt' in window,
    webShare: 'share' in navigator,
    geolocation: 'geolocation' in navigator,
    camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    storage: 'storage' in navigator && 'estimate' in navigator.storage
  };
};

// Share content via Web Share API
export const shareContent = async (shareData: { title?: string; text?: string; url?: string }) => {
  if ('share' in navigator) {
    try {
      await navigator.share(shareData);
      trackPWAEvent('content_shared', shareData);
    } catch (error) {
      console.error('Error sharing content:', error);
      // Fallback to clipboard
      await fallbackToCopyToClipboard(shareData.url);
    }
  } else {
    // Fallback for browsers without Web Share API
    await fallbackToCopyToClipboard(shareData.url);
  }
};

// Helper function to copy to clipboard with proper typing
const fallbackToCopyToClipboard = async (url?: string) => {
  if (!url) return;
  
  try {
    // Check if clipboard API is available
    if ('clipboard' in navigator && (navigator as any).clipboard) {
      await (navigator as any).clipboard.writeText(url);
      console.log('URL copied to clipboard');
    } else {
      // Legacy fallback using document.execCommand
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log('URL copied to clipboard (legacy method)');
    }
  } catch (clipboardError) {
    console.error('Failed to copy to clipboard:', clipboardError);
  }
};