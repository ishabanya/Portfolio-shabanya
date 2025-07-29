import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExperienceTimelineProps } from '../../types/experience';
import TimelineCard from './TimelineCard';

const ExperienceTimeline = memo<ExperienceTimelineProps>(({ experiences }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (expandedCards.size === experiences.length) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(experiences.map(exp => exp.id)));
    }
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            My journey in software development, from education to professional experience,
            building scalable solutions and learning cutting-edge technologies.
          </p>
          
          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg 
                font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              {expandedCards.size === experiences.length ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 
            bg-gradient-to-b from-blue-200 via-green-200 to-purple-200 h-full opacity-30" />
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-8 w-0.5 bg-gradient-to-b from-blue-200 
            via-green-200 to-purple-200 h-full opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-0">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Mobile Timeline Dot */}
                <div className="md:hidden absolute left-6 top-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    className={`w-4 h-4 rounded-full border-4 ${
                      experience.type === 'work' 
                        ? 'bg-blue-500 border-blue-200' 
                        : experience.type === 'education'
                        ? 'bg-green-500 border-green-200'
                        : 'bg-purple-500 border-purple-200'
                    } shadow-lg z-10`}
                  />
                </div>

                {/* Timeline Card */}
                <div className="md:hidden pl-16">
                  <TimelineCard
                    experience={experience}
                    index={index}
                    isExpanded={expandedCards.has(experience.id)}
                    onToggle={() => toggleCard(experience.id)}
                  />
                </div>

                {/* Desktop Timeline Card */}
                <div className="hidden md:block">
                  <TimelineCard
                    experience={experience}
                    index={index}
                    isExpanded={expandedCards.has(experience.id)}
                    onToggle={() => toggleCard(experience.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600">Technologies</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ExperienceTimeline.displayName = 'ExperienceTimeline';

export default ExperienceTimeline;