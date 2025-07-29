import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Simple wrapper without router for basic component testing
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Simple render function for components that don't need routing
const renderWithRouter = (
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: { initialEntries?: string[] } = {}
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

// Mock intersection observer entry
export const createMockIntersectionObserverEntry = (
  isIntersecting: boolean = true
): IntersectionObserverEntry => ({
  boundingClientRect: {} as DOMRectReadOnly,
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: {} as DOMRectReadOnly,
  isIntersecting,
  rootBounds: null,
  target: document.createElement('div'),
  time: Date.now(),
});

// Mock framer-motion components for testing
export const mockFramerMotion = {
  motion: {
    div: 'div',
    section: 'section',
    button: 'button',
    a: 'a',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
};

// Helper to wait for animations
export const waitForAnimation = () => new Promise(resolve => setTimeout(resolve, 100));

// Mock media queries
export const mockMediaQuery = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Mock window.scrollTo
export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
  });
};

// Mock form data
export const mockFormData = {
  valid: {
    user_name: 'John Doe',
    user_email: 'john@example.com',
    subject: 'Test Subject',
    message: 'This is a test message',
  },
  invalid: {
    user_name: '',
    user_email: 'invalid-email',
    subject: '',
    message: 'short',
  },
};

// Mock project data
export const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'A test project description',
  longDescription: 'A longer test project description',
  technologies: ['React', 'TypeScript'],
  category: ['Full-Stack'] as const,
  image: '/test-image.jpg',
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/test/repo',
  featured: true,
  status: 'completed' as const,
  metrics: [
    { label: 'Performance', value: '95%' },
    { label: 'Coverage', value: '100%' },
  ],
};

// Mock skill data
export const mockSkill = {
  name: 'React',
  level: 90,
  yearsOfExperience: 3,
  icon: 'FaReact',
  description: 'Frontend library for building user interfaces',
  projects: ['Test Project 1', 'Test Project 2'],
};

// Mock experience data
export const mockExperience = {
  id: '1',
  title: 'Senior Developer',
  company: 'Test Company',
  location: 'Remote',
  period: '2022 - Present',
  type: 'work' as const,
  description: 'Working on amazing projects',
  technologies: ['React', 'Node.js'],
  achievements: ['Built awesome features'],
  metrics: [
    { label: 'Performance', value: '95%' },
  ],
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as render, renderWithRouter };