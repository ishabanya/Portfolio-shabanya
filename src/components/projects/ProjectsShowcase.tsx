import { memo, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectsShowcaseProps, ProjectCategory } from '../../types/project';
import { Project } from '../../types/project';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const ProjectsShowcase = memo<ProjectsShowcaseProps>(({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter categories
  const categories: ProjectCategory[] = ['All', 'Java', 'Python', 'Data Engineering', 'ML/AI', 'Full-Stack', 'DevOps'];

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      'All': projects.length,
      'Java': 0,
      'Python': 0,
      'Data Engineering': 0,
      'ML/AI': 0,
      'Full-Stack': 0,
      'DevOps': 0
    };

    projects.forEach(project => {
      project.category.forEach(cat => {
        if (cat in counts) {
          counts[cat as ProjectCategory]++;
        }
      });
    });

    return counts;
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter(project => 
      project.category.includes(selectedCategory)
    );
  }, [projects, selectedCategory]);

  // Separate featured and regular projects
  const featuredProjects = useMemo(() => 
    filteredProjects.filter(p => p.featured), [filteredProjects]
  );
  
  const regularProjects = useMemo(() => 
    filteredProjects.filter(p => !p.featured), [filteredProjects]
  );

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  const handleCategoryChange = useCallback((category: ProjectCategory) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A collection of projects showcasing my expertise in full-stack development, 
            machine learning, data engineering, and modern software architecture.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 
                hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {categoryCounts[category]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2"
              >
                <span>⭐</span> Featured Projects
              </motion.h3>
              
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProjectCard
                        project={project}
                        onSelect={handleProjectSelect}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 && (
            <div>
              {featuredProjects.length > 0 && (
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2"
                >
                  <span>💼</span> All Projects
                </motion.h3>
              )}
              
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {regularProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: (featuredProjects.length > 0 ? 0.3 : 0) + index * 0.1 
                      }}
                    >
                      <ProjectCard
                        project={project}
                        onSelect={handleProjectSelect}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* No Projects Found */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-6">
                No projects match the selected category. Try a different filter.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                  font-medium transition-colors duration-200"
              >
                Show All Projects
              </button>
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {projects.length}
            </div>
            <div className="text-gray-600">Total Projects</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-gray-600">Featured</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
            </div>
            <div className="text-gray-600">Technologies</div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
});

ProjectsShowcase.displayName = 'ProjectsShowcase';

export default ProjectsShowcase;