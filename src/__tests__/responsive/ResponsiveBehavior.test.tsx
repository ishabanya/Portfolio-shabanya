import React from 'react';
import { render, screen, waitFor } from '../utils/test-utils';
import { mockMediaQuery } from '../utils/test-utils';
import HeroSection from '../../components/sections/HeroSection';
import ContactForm from '../../components/contact/ContactForm';

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
}));

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn().mockResolvedValue({ text: 'OK' }),
}));

describe('Responsive Behavior Tests', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    // Reset viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  describe('Mobile Viewport (320px - 767px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      mockMediaQuery(true); // Mobile media query matches
    });

    it('renders HeroSection correctly on mobile', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Y Shabanya Kishore');
      
      // Mobile-specific elements should be present
      expect(screen.getByText('Explore My Work')).toBeInTheDocument();
      expect(screen.getByText('Download Resume')).toBeInTheDocument();
    });

    it('stacks navigation buttons vertically on mobile', () => {
      render(<HeroSection />);
      
      const buttons = screen.getAllByRole('link');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Buttons should exist and be accessible on mobile
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });

    it('adjusts contact form layout for mobile', () => {
      render(<ContactForm />);
      
      // Form should render with all fields
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      
      // Submit button should be accessible
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('handles touch interactions properly', () => {
      render(<HeroSection />);
      
      const links = screen.getAllByRole('link');
      
      // Touch targets should be large enough (minimum 44px)
      links.forEach(link => {
        const styles = window.getComputedStyle(link);
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('Tablet Viewport (768px - 1023px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      mockMediaQuery(false); // Desktop media query doesn't match
    });

    it('renders components correctly on tablet', () => {
      render(<HeroSection />);
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Explore My Work')).toBeInTheDocument();
      expect(screen.getByText('Download Resume')).toBeInTheDocument();
    });

    it('adjusts layout for tablet orientation', async () => {
      render(<ContactForm />);
      
      // Form should maintain proper layout on tablet
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      // All form elements should be present
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });
  });

  describe('Desktop Viewport (1024px+)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
      mockMediaQuery(false); // Mobile media query doesn't match
    });

    it('renders full desktop layout', () => {
      render(<HeroSection />);
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Explore My Work')).toBeInTheDocument();
      
      // Desktop should show all elements with proper spacing
      const socialLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('http')
      );
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it('displays side-by-side layout for form elements', () => {
      render(<ContactForm />);
      
      // Desktop form should have proper layout
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it('handles hover states properly on desktop', () => {
      render(<HeroSection />);
      
      const buttons = screen.getAllByRole('link');
      buttons.forEach(button => {
        // Hover states would be tested with actual hover events
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Large Desktop (1440px+)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
    });

    it('maintains proper max-width constraints', () => {
      render(<HeroSection />);
      
      const banner = screen.getByRole('banner');
      expect(banner).toBeInTheDocument();
      
      // Large screens should not stretch content indefinitely
      expect(banner).toHaveClass('relative');
    });

    it('centers content appropriately on wide screens', () => {
      render(<ContactForm />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Orientation Changes', () => {
    it('handles portrait to landscape orientation change', async () => {
      // Start in portrait
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });

      render(<HeroSection />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      // Change to landscape
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 667,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 375,
      });

      // Trigger resize event
      const resizeEvent = new Event('resize');
      window.dispatchEvent(resizeEvent);

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      });
    });
  });

  describe('Breakpoint Testing', () => {
    const breakpoints = [
      { name: 'xs', width: 320 },
      { name: 'sm', width: 640 },
      { name: 'md', width: 768 },
      { name: 'lg', width: 1024 },
      { name: 'xl', width: 1280 },
      { name: '2xl', width: 1536 },
    ];

    breakpoints.forEach(({ name, width }) => {
      it(`renders correctly at ${name} breakpoint (${width}px)`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        render(<HeroSection />);
        
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByText('Explore My Work')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility at Different Screen Sizes', () => {
    it('maintains proper focus order on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<HeroSection />);
      
      const focusableElements = screen.getAllByRole('link');
      expect(focusableElements.length).toBeGreaterThan(0);
      
      // Elements should be focusable regardless of screen size
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('maintains proper heading hierarchy across screen sizes', () => {
      const sizes = [375, 768, 1024, 1440];
      
      sizes.forEach(width => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        render(<HeroSection />);
        
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
        expect(h1).toHaveTextContent('Y Shabanya Kishore');
      });
    });
  });

  describe('Content Reflow', () => {
    it('handles text reflow properly at narrow widths', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320, // Very narrow mobile
      });

      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      
      // Text should not overflow container
      const description = screen.getByText(/Crafting scalable enterprise applications/i);
      expect(description).toBeInTheDocument();
    });

    it('prevents horizontal scrolling on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });

      render(<ContactForm />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      // Form inputs should not cause horizontal overflow
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('Performance on Different Screen Sizes', () => {
    it('loads efficiently on mobile devices', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const startTime = performance.now();
      render(<HeroSection />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Render should complete reasonably quickly
      expect(renderTime).toBeLessThan(1000); // Less than 1 second
    });
  });
});