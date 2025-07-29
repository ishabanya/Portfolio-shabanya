import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { observeLongTasks, monitorFPS, sendToAnalytics } from './utils/performance';
import { registerServiceWorker, setupInstallPrompt } from './utils/pwa';
import { 
  initGA, 
  trackSearchEngineReferral, 
  trackPageLoad, 
  trackUserEngagement,
  trackCoreWebVitals 
} from './utils/analytics';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enable performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  observeLongTasks();
  monitorFPS();
}

// Initialize Google Analytics
initGA();

// Initialize SEO tracking
trackSearchEngineReferral();
trackPageLoad();
trackUserEngagement();
trackCoreWebVitals();

// Initialize PWA features
registerServiceWorker();
setupInstallPrompt();

// Initialize performance monitoring with analytics
reportWebVitals(sendToAnalytics);
