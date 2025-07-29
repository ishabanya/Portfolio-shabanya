import { memo } from 'react';
import { motion } from 'framer-motion';
import { ProjectCardProps } from '../../types/project';
import LazyImage from '../common/LazyImage';

// Technology icon mapping
const techIcons: Record<string, string> = {
  'Java': '☕',
  'JavaScript': '🟨',
  'TypeScript': '🔷',
  'React': '⚛️',
  'Node.js': '🟢',
  'Python': '🐍',
  'Spring Boot': '🍃',
  'Docker': '🐳',
  'Kubernetes': '⚙️',
  'AWS': '☁️',
  'PostgreSQL': '🐘',
  'MySQL': '🗄️',
  'MongoDB': '🍃',
  'Redis': '🔴',
  'Git': '📝',
  'FastAPI': '⚡',
  'Apache Kafka': '📊',
  'Apache Spark': '⚡',
  'Elasticsearch': '🔍',
  'TensorFlow': '🧠',
  'Scikit-learn': '📊',
  'Pandas': '🐼',
  'OpenAI API': '🤖',
  'GitHub API': '📝',
  'Terraform': '🏗️',
  'Ansible': '🔧',
  'Nginx': '🌐',
  'RabbitMQ': '🐰',
  'Celery': '🌿',
  'NLTK': '📝',
  'Kibana': '📊',
  'Prometheus': '📈',
  'Hugging Face': '🤗'
};

const ProjectCard = memo<ProjectCardProps>(({ project, onSelect }) => {
  const handleClick = () => {
    onSelect(project);
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className={`group relative cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl 
        transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200
        ${project.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold 
            px-3 py-1 rounded-full shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          project.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : project.status === 'in-progress'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {project.status === 'completed' ? '✅ Completed' : 
           project.status === 'in-progress' ? '🚧 In Progress' : '📅 Planned'}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={project.image || '/api/placeholder/600/400'}
          alt={project.title}
          className="w-full h-full"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2">
              {project.github && (
                <button
                  onClick={(e) => handleExternalLink(e, project.github!)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm 
                    font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  <span>📝</span> Code
                </button>
              )}
              {project.demo && (
                <button
                  onClick={(e) => handleExternalLink(e, project.demo!)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm 
                    font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  <span>🚀</span> Demo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 
            transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.metrics.slice(0, 2).map((metric, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 
                    text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {metric}
                </span>
              ))}
              {project.metrics.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{project.metrics.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs 
                  px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <span>{techIcons[tech] || '🔧'}</span>
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded-full">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Click to view more indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 3l3.5 3.5-10 10H3v-4l10-10z"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;