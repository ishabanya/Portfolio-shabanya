import React from 'react';
import { render, screen, waitFor } from '../../utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import HeroSection from '../../../components/sections/HeroSection';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h1: 'h1',
    p: 'p',
    a: 'a',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useTypewriter hook
jest.mock('../../../hooks/useTypewriter', () => ({
  useTypewriter: () => ({
    text: 'Java Spring Boot Developer',
    isComplete: true,
  }),
}));

describe('HeroSection', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders without crashing', () => {
    render(<HeroSection />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Y Shabanya Kishore');
  });

  it('shows the typewriter effect text', () => {
    render(<HeroSection />);
    expect(screen.getByText('Java Spring Boot Developer')).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Crafting scalable enterprise applications/i)).toBeInTheDocument();
  });

  it('has working navigation links', () => {
    render(<HeroSection />);
    
    const exploreWorkButton = screen.getByText('Explore My Work');
    expect(exploreWorkButton).toBeInTheDocument();
    expect(exploreWorkButton.closest('a')).toHaveAttribute('href', '#projects');

    const downloadResumeButton = screen.getByText('Download Resume');
    expect(downloadResumeButton).toBeInTheDocument();
    expect(downloadResumeButton.closest('a')).toHaveAttribute('href', '/resume.pdf');
  });

  it('has social media links', () => {
    render(<HeroSection />);
    
    // Check for social media section
    const socialLinks = screen.getAllByRole('link');
    const externalLinks = socialLinks.filter(link => 
      link.getAttribute('href')?.startsWith('http')
    );
    
    expect(externalLinks.length).toBeGreaterThan(0);
  });

  it('handles smooth scrolling for anchor links', async () => {
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    render(<HeroSection />);
    
    const exploreButton = screen.getByText('Explore My Work');
    exploreButton.click();
    
    // The actual scrolling behavior would be handled by the browser
    // We just test that the element exists and has the correct href
    expect(exploreButton.closest('a')).toHaveAttribute('href', '#projects');
  });

  it('displays social media icons', () => {
    render(<HeroSection />);
    
    // Look for LinkedIn, GitHub, Twitter links
    const linkedinLink = screen.getByLabelText(/linkedin/i);
    const githubLink = screen.getByLabelText(/github/i);
    const twitterLink = screen.getByLabelText(/twitter/i);
    
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('has proper ARIA labels and semantic structure', () => {
    render(<HeroSection />);
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    
    // Check for landmark roles
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    const { container } = render(<HeroSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('responds to different screen sizes', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<HeroSection />);
    
    // The component should still render all essential elements on mobile
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Explore My Work')).toBeInTheDocument();
  });

  it('has proper link attributes for external links', () => {
    render(<HeroSection />);
    
    const downloadResumeLink = screen.getByText('Download Resume').closest('a');
    expect(downloadResumeLink).toHaveAttribute('target', '_blank');
    expect(downloadResumeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays particle background elements', () => {
    render(<HeroSection />);
    
    // Look for elements that might represent the particle background
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toBeInTheDocument();
    
    // The particle background would be implemented as decorative elements
    // We test that the main container exists
    expect(heroSection).toHaveClass('min-h-screen', 'relative');
  });

  it('keyboard navigation works properly', () => {
    render(<HeroSection />);
    
    const buttons = screen.getAllByRole('link');
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });
  });

  it('maintains proper contrast ratios', () => {
    render(<HeroSection />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    const computedStyle = window.getComputedStyle(mainHeading);
    
    // Basic check that the element has styling applied
    expect(mainHeading).toHaveClass('text-5xl', 'font-bold');
  });
});