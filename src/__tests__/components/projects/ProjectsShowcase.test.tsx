import React from 'react';
import { render, screen, waitFor, fireEvent } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectsShowcase from '../../../components/projects/ProjectsShowcase';
import { mockProject } from '../../utils/test-utils';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    button: 'button',
    img: 'img',
    h3: 'h3',
    p: 'p',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => [null, true],
}));

// Mock LazyImage component
jest.mock('../../../components/common/LazyImage', () => {
  return function MockLazyImage({ src, alt, className }: any) {
    return <img src={src} alt={alt} className={className} data-testid="lazy-image" />;
  };
});

// Mock projects data
const mockProjects = [
  {
    ...mockProject,
    id: '1',
    title: 'E-commerce Platform',
    category: ['Full-Stack', 'E-commerce'],
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    ...mockProject,
    id: '2',
    title: 'Task Management App',
    category: ['Frontend'],
    technologies: ['Vue.js', 'TypeScript'],
  },
  {
    ...mockProject,
    id: '3',
    title: 'API Gateway',
    category: ['Backend'],
    technologies: ['Java', 'Spring Boot', 'Redis'],
  },
  {
    ...mockProject,
    id: '4',
    title: 'Mobile Banking App',
    category: ['Mobile'],
    technologies: ['React Native', 'Firebase'],
  },
];

// Mock the projects data import
jest.mock('../../../data/projects', () => ({
  projects: mockProjects,
}));

describe('ProjectsShowcase', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ProjectsShowcase />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('displays the correct section title', () => {
    render(<ProjectsShowcase />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Featured Projects');
  });

  it('displays all projects initially', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
      expect(screen.getByText('Task Management App')).toBeInTheDocument();
      expect(screen.getByText('API Gateway')).toBeInTheDocument();
      expect(screen.getByText('Mobile Banking App')).toBeInTheDocument();
    });
  });

  it('displays category filter buttons', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Full-Stack')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('Mobile')).toBeInTheDocument();
    });
  });

  it('filters projects by category', async () => {
    render(<ProjectsShowcase />);
    
    // Click on Frontend filter
    const frontendFilter = screen.getByText('Frontend');
    await user.click(frontendFilter);
    
    await waitFor(() => {
      expect(screen.getByText('Task Management App')).toBeInTheDocument();
      expect(screen.queryByText('E-commerce Platform')).not.toBeInTheDocument();
      expect(screen.queryByText('API Gateway')).not.toBeInTheDocument();
      expect(screen.queryByText('Mobile Banking App')).not.toBeInTheDocument();
    });
  });

  it('shows all projects when "All" filter is selected', async () => {
    render(<ProjectsShowcase />);
    
    // First filter by Frontend
    const frontendFilter = screen.getByText('Frontend');
    await user.click(frontendFilter);
    
    // Then click All
    const allFilter = screen.getByText('All');
    await user.click(allFilter);
    
    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
      expect(screen.getByText('Task Management App')).toBeInTheDocument();
      expect(screen.getByText('API Gateway')).toBeInTheDocument();
      expect(screen.getByText('Mobile Banking App')).toBeInTheDocument();
    });
  });

  it('highlights active filter button', async () => {
    render(<ProjectsShowcase />);
    
    const backendFilter = screen.getByText('Backend');
    await user.click(backendFilter);
    
    // Active filter should have different styling
    expect(backendFilter).toHaveClass('bg-blue-600', 'text-white');
  });

  it('displays project information correctly', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      // Check for project title
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
      
      // Check for description
      expect(screen.getByText(/test project description/i)).toBeInTheDocument();
      
      // Check for technologies
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('MongoDB')).toBeInTheDocument();
    });
  });

  it('has working project links', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      const liveLinks = screen.getAllByText('Live Demo');
      const githubLinks = screen.getAllByText('GitHub');
      
      expect(liveLinks[0].closest('a')).toHaveAttribute('href', 'https://example.com');
      expect(liveLinks[0].closest('a')).toHaveAttribute('target', '_blank');
      expect(liveLinks[0].closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
      
      expect(githubLinks[0].closest('a')).toHaveAttribute('href', 'https://github.com/test/repo');
      expect(githubLinks[0].closest('a')).toHaveAttribute('target', '_blank');
    });
  });

  it('displays project images with lazy loading', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      const images = screen.getAllByTestId('lazy-image');
      expect(images.length).toBeGreaterThan(0);
      
      images.forEach(img => {
        expect(img).toHaveAttribute('src');
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  it('opens project modal when image is clicked', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      const projectImages = screen.getAllByTestId('lazy-image');
      expect(projectImages[0]).toBeInTheDocument();
    });
    
    const projectImage = screen.getAllByTestId('lazy-image')[0];
    await user.click(projectImage);
    
    // Modal should open with project details
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes modal when close button is clicked', async () => {
    render(<ProjectsShowcase />);
    
    // Open modal
    await waitFor(() => {
      const projectImages = screen.getAllByTestId('lazy-image');
      expect(projectImages[0]).toBeInTheDocument();
    });
    
    const projectImage = screen.getAllByTestId('lazy-image')[0];
    await user.click(projectImage);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Close modal
    const closeButton = screen.getByLabelText(/close modal/i);
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes modal when clicking outside', async () => {
    render(<ProjectsShowcase />);
    
    // Open modal
    await waitFor(() => {
      const projectImages = screen.getAllByTestId('lazy-image');
      expect(projectImages[0]).toBeInTheDocument();
    });
    
    const projectImage = screen.getAllByTestId('lazy-image')[0];
    await user.click(projectImage);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Click outside modal
    const modalOverlay = screen.getByRole('dialog').parentElement;
    if (modalOverlay) {
      fireEvent.click(modalOverlay);
    }
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles keyboard navigation in filters', async () => {
    render(<ProjectsShowcase />);
    
    const allFilter = screen.getByText('All');
    const frontendFilter = screen.getByText('Frontend');
    
    // Tab to filter buttons
    allFilter.focus();
    expect(allFilter).toHaveFocus();
    
    await user.tab();
    expect(frontendFilter).toHaveFocus();
    
    // Press Enter to activate filter
    await user.keyboard('{Enter}');
    
    await waitFor(() => {
      expect(screen.getByText('Task Management App')).toBeInTheDocument();
      expect(screen.queryByText('E-commerce Platform')).not.toBeInTheDocument();
    });
  });

  it('displays project metrics when available', async () => {
    render(<ProjectsShowcase />);
    
    await waitFor(() => {
      expect(screen.getByText('Performance')).toBeInTheDocument();
      expect(screen.getByText('95%')).toBeInTheDocument();
      expect(screen.getByText('Coverage')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  it('shows loading state for images', async () => {
    render(<ProjectsShowcase />);
    
    // Images should be present (mocked to load immediately)
    await waitFor(() => {
      const images = screen.getAllByTestId('lazy-image');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('handles empty project list gracefully', () => {
    // Mock empty projects array
    jest.doMock('../../../data/projects', () => ({
      projects: [],
    }));
    
    render(<ProjectsShowcase />);
    
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Featured Projects');
  });

  it('maintains filter state during interactions', async () => {
    render(<ProjectsShowcase />);
    
    // Filter by Backend
    const backendFilter = screen.getByText('Backend');
    await user.click(backendFilter);
    
    await waitFor(() => {
      expect(screen.getByText('API Gateway')).toBeInTheDocument();
      expect(screen.queryByText('Task Management App')).not.toBeInTheDocument();
    });
    
    // Open and close a modal
    const projectImage = screen.getAllByTestId('lazy-image')[0];
    await user.click(projectImage);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    const closeButton = screen.getByLabelText(/close modal/i);
    await user.click(closeButton);
    
    // Filter should still be active
    await waitFor(() => {
      expect(screen.getByText('API Gateway')).toBeInTheDocument();
      expect(screen.queryByText('Task Management App')).not.toBeInTheDocument();
      expect(backendFilter).toHaveClass('bg-blue-600', 'text-white');
    });
  });

  it('should be accessible', async () => {
    const { container } = render(<ProjectsShowcase />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA labels and roles', async () => {
    render(<ProjectsShowcase />);
    
    // Check for proper section role
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // Check for proper button roles on filters
    const filterButtons = screen.getAllByRole('button');
    expect(filterButtons.length).toBeGreaterThan(0);
    
    // Check for proper link roles
    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it('supports screen readers with proper announcements', async () => {
    render(<ProjectsShowcase />);
    
    const frontendFilter = screen.getByText('Frontend');
    await user.click(frontendFilter);
    
    // The filter change should be announced via aria-live regions
    // This would be implemented in the actual component
    expect(frontendFilter).toHaveAttribute('aria-pressed', 'true');
  });
});