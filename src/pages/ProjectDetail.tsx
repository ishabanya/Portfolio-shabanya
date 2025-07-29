import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  images: string[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching project data
    const fetchProject = async () => {
      try {
        // This would typically be an API call
        // For now, using mock data
        const mockProjects: Record<string, Project> = {
          'liquid-state-supply-chain': {
            id: 'liquid-state-supply-chain',
            title: 'Liquid State Supply Chain',
            description: 'Complete full-stack application for supply chain management',
            longDescription: 'A comprehensive supply chain management system built with modern web technologies. Features real-time tracking, inventory management, and analytics dashboard.',
            technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
            demoUrl: 'https://demo.example.com',
            githubUrl: 'https://github.com/example/project',
            images: ['/api/placeholder/800/400']
          }
        };

        const projectData = mockProjects[id || ''];
        if (projectData) {
          setProject(projectData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          ← Back to Portfolio
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{project.description}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View Code
                </a>
              )}
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
          <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;