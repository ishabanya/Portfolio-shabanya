import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillsSectionProps } from '../../types/skills';
import SkillCard from './SkillCard';

const SkillsSection = memo<SkillsSectionProps>(({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter skills based on active category and search term
  const getFilteredSkills = () => {
    let filteredCategories = categories;
    
    if (activeCategory !== 'all') {
      filteredCategories = categories.filter(cat => cat.id === activeCategory);
    }

    if (searchTerm) {
      filteredCategories = filteredCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.skills.length > 0);
    }

    return filteredCategories;
  };

  const filteredCategories = getFilteredSkills();
  const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const filteredSkillsCount = filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
            bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise across different domains, 
            built through years of hands-on experience and continuous learning.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6 text-sm text-gray-500">
            <span>{totalSkills} Total Skills</span>
            <span>•</span>
            <span>{categories.length} Categories</span>
            <span>•</span>
            <span>4+ Years Experience</span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 
                focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all
                bg-white/80 backdrop-blur-sm shadow-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                  hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            All Skills
            <span className="ml-2 text-xs opacity-75">({totalSkills})</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${
                      category.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      category.color === 'green' ? 'from-green-500 to-green-600' :
                      category.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      category.color === 'orange' ? 'from-orange-500 to-orange-600' :
                      'from-teal-500 to-teal-600'
                    } text-white shadow-lg transform scale-105`
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.skills.length})</span>
            </button>
          ))}
        </motion.div>

        {/* Results Info */}
        {(searchTerm || activeCategory !== 'all') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              Showing {filteredSkillsCount} skill{filteredSkillsCount !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
              {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            </p>
          </motion.div>
        )}

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchTerm}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No skills found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or select a different category
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full 
                    font-medium transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <div className="space-y-16">
                {filteredCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    {/* Category Header (only show when not filtering to single category) */}
                    {activeCategory === 'all' && (
                      <div className={`bg-gradient-to-r ${category.bgColor} rounded-2xl p-8 mb-8`}>
                        <div className="text-center">
                          <h3 className="text-3xl font-bold text-gray-800 mb-2">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            {category.description}
                          </p>
                          <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-500">
                            <span>{category.skills.length} Skills</span>
                            <span>•</span>
                            <span>
                              Avg: {Math.round(
                                category.skills.reduce((acc, skill) => acc + skill.level, 0) / 
                                category.skills.length
                              )}% Proficiency
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          categoryColor={category.color}
                          index={skillIndex}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {categories.filter(cat => cat.skills.some(skill => skill.level >= 90)).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Expert Level Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {categories.reduce((acc, cat) => 
                    acc + cat.skills.filter(skill => skill.level >= 80).length, 0
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">Advanced+ Skills</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(
                    categories.reduce((acc, cat) => 
                      acc + cat.skills.reduce((skillAcc, skill) => skillAcc + skill.yearsOfExperience, 0), 0
                    ) / totalSkills * 10
                  ) / 10}
                </div>
                <div className="text-sm text-gray-600 mt-1">Avg Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">
                  {categories.reduce((acc, cat) => 
                    acc + cat.skills.reduce((skillAcc, skill) => 
                      skillAcc + (skill.projects?.length || 0), 0
                    ), 0
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">Project Applications</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;