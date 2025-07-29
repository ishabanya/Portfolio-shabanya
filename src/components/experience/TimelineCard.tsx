import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineCardProps } from '../../types/experience';

// Technology icon mapping (using emojis for simplicity)
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
  'HTML/CSS': '🎨',
  'Bootstrap': '🅱️',
  'Apache Kafka': '📊',
  'Apache Spark': '⚡',
  'Elasticsearch': '🔍',
  'Jenkins': '👷',
  'Machine Learning': '🧠',
  'C++': '➕',
  'SQL': '📊',
  'Express': '🚀',
  'Postman': '📮',
  'Data Structures': '🏗️',
  'Algorithms': '🔢'
};

const TimelineCard = memo<TimelineCardProps>(({ 
  experience, 
  index, 
  isExpanded, 
  onToggle 
}) => {
  const isLeft = index % 2 === 0;
  const isWork = experience.type === 'work';
  const isEducation = experience.type === 'education';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} 
        items-start group mb-12 last:mb-0`}
    >
      {/* Timeline Line & Dot */}
      <div className="hidden md:flex flex-col items-center mx-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className={`w-4 h-4 rounded-full border-4 ${
            isWork 
              ? 'bg-blue-500 border-blue-200' 
              : isEducation 
              ? 'bg-green-500 border-green-200'
              : 'bg-purple-500 border-purple-200'
          } shadow-lg z-10`}
        />
        <div className={`w-0.5 h-24 ${
          isWork 
            ? 'bg-gradient-to-b from-blue-200 to-transparent' 
            : isEducation
            ? 'bg-gradient-to-b from-green-200 to-transparent'
            : 'bg-gradient-to-b from-purple-200 to-transparent'
        } last:hidden`} />
      </div>

      {/* Card Content */}
      <motion.div
        whileHover={{ y: -4 }}
        className={`flex-1 max-w-lg ${isLeft ? 'mr-auto' : 'ml-auto'}`}
      >
        <div
          onClick={onToggle}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
            cursor-pointer border border-gray-100 overflow-hidden group-hover:border-gray-200"
        >
          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {experience.role}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span className="font-semibold">{experience.company}</span>
                  {experience.location && (
                    <>
                      <span>•</span>
                      <span className="text-sm">{experience.location}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>📅</span>
                  <span>{experience.period}</span>
                  {experience.type && (
                    <>
                      <span>•</span>
                      <span className="capitalize bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {experience.type}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Expand/Collapse Arrow */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </motion.div>
            </div>

            {/* Metrics Preview */}
            {experience.metrics && experience.metrics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {experience.metrics.slice(0, 2).map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 
                      rounded-lg px-3 py-1 text-sm"
                  >
                    <span className="font-bold text-blue-600">{metric.value}</span>
                    <span className="text-gray-600 ml-1">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technology Preview */}
            <div className="flex flex-wrap gap-1">
              {experience.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 
                    text-xs px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span>{techIcons[tech] || '🔧'}</span>
                  {tech}
                </span>
              ))}
              {experience.technologies.length > 4 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{experience.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100"
              >
                <div className="p-6 pt-4">
                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {experience.description.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-blue-500 mt-1 text-xs">▶</span>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* All Metrics */}
                  {experience.metrics && experience.metrics.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {experience.metrics.map((metric, idx) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 
                              rounded-lg p-3 text-center"
                          >
                            <div className="text-2xl font-bold text-blue-600">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {metric.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Technologies */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-gray-100 to-gray-200 
                            text-gray-700 text-sm px-3 py-1 rounded-full hover:from-blue-100 
                            hover:to-blue-200 hover:text-blue-700 transition-all duration-200 cursor-default"
                        >
                          <span>{techIcons[tech] || '🔧'}</span>
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
});

TimelineCard.displayName = 'TimelineCard';

export default TimelineCard;