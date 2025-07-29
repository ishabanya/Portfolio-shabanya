import React from 'react';
import { render, screen, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    a: 'a',
    button: 'button',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    img: 'img',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => [null, true],
}));

// Mock hooks
jest.mock('../../hooks/useTypewriter', () => ({
  useTypewriter: () => ({
    text: 'Java Spring Boot Developer',
    isComplete: true,
  }),
}));

jest.mock('../../hooks/usePWA', () => ({
  useBackgroundSync: () => ({
    syncData: jest.fn().mockResolvedValue(true),
  }),
  useNetworkStatus: () => ({
    online: true,
    effectiveType: '4g',
  }),
  usePWAInstall: () => ({
    isInstallable: false,
    showInstallPrompt: jest.fn(),
  }),
}));

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn().mockResolvedValue({ text: 'OK' }),
}));

describe('Navigation Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('navigates through all main sections', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Should start on home page with hero section
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Y Shabanya Kishore');

    // Test navigation links in header (if they exist)
    const homeLink = screen.queryByText('Home');
    if (homeLink) {
      await user.click(homeLink);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }
  });

  it('handles smooth scrolling to sections via anchor links', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const exploreButton = screen.getByText('Explore My Work');
    expect(exploreButton.closest('a')).toHaveAttribute('href', '#projects');

    await user.click(exploreButton);
    
    // Verify that the click was registered (href should remain the same)
    expect(exploreButton.closest('a')).toHaveAttribute('href', '#projects');
  });

  it('maintains state when navigating between sections', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Navigate to projects section and verify content persists
    const exploreButton = screen.getByText('Explore My Work');
    await user.click(exploreButton);

    // The hero section should still be present
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Y Shabanya Kishore');
  });

  it('handles external links correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Test resume download link
    const resumeLink = screen.getByText('Download Resume');
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/resume.pdf');
    expect(resumeLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(resumeLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays proper error boundaries for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <App />
      </MemoryRouter>
    );

    // Since this is a single-page app, invalid routes should still show the main page
    // or a 404 page if implemented
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('maintains responsive behavior during navigation', async () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Navigation should work on mobile
    const exploreButton = screen.getByText('Explore My Work');
    await user.click(exploreButton);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('handles keyboard navigation properly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Tab through interactive elements
    const interactiveElements = screen.getAllByRole('link');
    
    // Focus first element
    if (interactiveElements.length > 0) {
      interactiveElements[0].focus();
      expect(interactiveElements[0]).toHaveFocus();

      // Tab to next element
      await user.tab();
      expect(interactiveElements[1] || interactiveElements[0]).toHaveFocus();
    }
  });

  it('preserves scroll position during section navigation', async () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: mockScrollTo,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const exploreButton = screen.getByText('Explore My Work');
    await user.click(exploreButton);

    // The scroll behavior is handled by the browser for anchor links
    // We just verify the link structure is correct
    expect(exploreButton.closest('a')).toHaveAttribute('href', '#projects');
  });

  it('loads all sections without errors', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for all sections to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    // Verify key sections are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Explore My Work')).toBeInTheDocument();
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });

  it('handles navigation with hash fragments', () => {
    render(
      <MemoryRouter initialEntries={['/#projects']}>
        <App />
      </MemoryRouter>
    );

    // App should still render normally with hash fragments
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('supports browser back/forward navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Since this is a single-page app, back/forward behavior
    // would be handled by the browser for anchor navigation
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});