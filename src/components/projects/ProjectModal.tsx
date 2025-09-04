import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectModalProps } from '../../types/project';
import LazyImage from '../common/LazyImage';

// Technology icon mapping (same as ProjectCard)
const techIcons: Record<string, string> = {
  'Java': '☕', 'JavaScript': '🟨', 'TypeScript': '🔷', 'React': '⚛️',
  'Node.js': '🟢', 'Python': '🐍', 'Spring Boot': '🍃', 'Docker': '🐳',
  'Kubernetes': '⚙️', 'AWS': '☁️', 'PostgreSQL': '🐘', 'MySQL': '🗄️',
  'MongoDB': '🍃', 'Redis': '🔴', 'Git': '📝', 'FastAPI': '⚡',
  'Apache Kafka': '📊', 'Apache Spark': '⚡', 'Elasticsearch': '🔍',
  'TensorFlow': '🧠', 'Scikit-learn': '📊', 'Pandas': '🐼',
  'OpenAI API': '🤖', 'GitHub API': '📝', 'Terraform': '🏗️',
  'Ansible': '🔧', 'Nginx': '🌐', 'RabbitMQ': '🐰', 'Celery': '🌿',
  'NLTK': '📝', 'Kibana': '📊', 'Prometheus': '📈', 'Hugging Face': '🤗'
};

const ProjectModal = memo<ProjectModalProps>(({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-600 
                hover:text-gray-900 w-10 h-10 rounded-full flex items-center justify-center 
                transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80">
                <LazyImage
                  src={project.image || `https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=${encodeURIComponent(project.title)}`}
                  alt={project.title}
                  className="w-full h-full"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Project title overlay */}
                <div className="absolute bottom-6 left-6 right-16">
                  <div className="flex items-center gap-3 mb-2">
                    {project.featured && (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      project.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : project.status === 'in-progress'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {project.status === 'completed' ? '✅ Completed' : 
                       project.status === 'in-progress' ? '🚧 In Progress' : '📅 Planned'}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h1>
                  <p className="text-gray-200 text-lg">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.github && (
                    <button
                      onClick={() => handleExternalLink(project.github!)}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium 
                        transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <span>📝</span> View Code
                    </button>
                  )}
                  {project.demo && (
                    <button
                      onClick={() => handleExternalLink(project.demo!)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium 
                        transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <span>🚀</span> Live Demo
                    </button>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 
                            rounded-lg p-4 text-center"
                        >
                          <div className="text-lg font-bold text-blue-600">
                            {metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Description */}
                {project.longDescription && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {project.longDescription}
                    </p>
                  </div>
                )}

                {/* Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Challenges & Solutions</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span className="text-red-500 mt-1 text-sm">🔥</span>
                          <span className="leading-relaxed">{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learnings */}
                {project.learnings && project.learnings.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Learnings</h3>
                    <ul className="space-y-3">
                      {project.learnings.map((learning, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span className="text-green-500 mt-1 text-sm">💡</span>
                          <span className="leading-relaxed">{learning}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 
                          text-gray-700 px-4 py-2 rounded-full hover:from-blue-100 hover:to-blue-200 
                          hover:text-blue-700 transition-all duration-200 cursor-default shadow-sm"
                      >
                        <span>{techIcons[tech] || '🔧'}</span>
                        <span className="font-medium">{tech}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className="bg-purple-100 text-purple-700 font-medium px-4 py-2 rounded-full text-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;