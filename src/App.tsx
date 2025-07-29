import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navigation from './components/common/Navigation';
import PageLoader from './components/common/PageLoader';
import PWAStatus from './components/common/PWAStatus';
import SEOHead from './components/seo/SEOHead';
import { WebsiteStructuredData, OrganizationStructuredData } from './components/seo/StructuredData';
import './App.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            {/* Global SEO and Structured Data */}
            <SEOHead />
            <WebsiteStructuredData />
            <OrganizationStructuredData />
            
            <Navigation />
            <Suspense fallback={<PageLoader text="Loading page..." fullScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route 
                  path="*" 
                  element={
                    <>
                      <SEOHead 
                        title="404 - Page Not Found"
                        description="The page you're looking for doesn't exist on Y Shabanya Kishore's portfolio website."
                        url="https://shabanya123.github.io/portfolio-shabanya/404"
                      />
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                          <a
                            href="/"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Back to Home
                          </a>
                        </div>
                      </div>
                    </>
                  } 
                />
              </Routes>
            </Suspense>
            
            {/* PWA Status Indicator */}
            <PWAStatus />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
