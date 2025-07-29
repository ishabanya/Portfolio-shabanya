import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaJava, FaPython, FaJs, FaDatabase, FaReact, FaNodeJs, FaDocker, FaAws, FaVuejs 
} from 'react-icons/fa';
import { 
  SiTypescript, SiSpring, SiFastapi, SiApachekafka, SiApachespark, SiGraphql,
  SiTailwindcss, SiNextdotjs, SiRedux, SiMui, SiKubernetes, SiTerraform,
  SiApacheairflow, SiElasticsearch, SiJenkins, SiPostgresql, SiMysql,
  SiMongodb, SiRedis, SiApachecassandra, SiInfluxdb
} from 'react-icons/si';
import { SkillCardProps } from '../../types/skills';
import { 
  getSkillLevel, 
  getSkillLevelColor, 
  getProgressBarColor 
} from '../../types/skills';

// Icon mapping with proper typing
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaJava, FaPython, FaJs, FaDatabase, FaReact, FaNodeJs, FaDocker, FaAws, FaVuejs,
  SiTypescript, SiSpring, SiFastapi, SiApachekafka, SiApachespark, SiGraphql,
  SiTailwindcss, SiNextdotjs, SiRedux, SiMui, SiKubernetes, SiTerraform,
  SiApacheairflow, SiElasticsearch, SiJenkins, SiPostgresql, SiMysql,
  SiMongodb, SiRedis, SiApachecassandra, SiInfluxdb,
  FaGolang: FaDatabase // Fallback for missing icons
} as Record<string, React.ComponentType<{ className?: string }>>;

const SkillCard = memo<SkillCardProps>(({ skill, categoryColor, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(skill.level);
    }, 300 + index * 100);

    return () => clearTimeout(timer);
  }, [skill.level, index]);

  const IconComponent = (skill.icon && iconMap[skill.icon] ? iconMap[skill.icon] : FaDatabase) as React.ComponentType<{ className?: string }>;
  const skillLevel = getSkillLevel(skill.level);
  const levelColor = getSkillLevelColor(skill.level);
  const progressColor = getProgressBarColor(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
        overflow-hidden border border-gray-100 hover:border-gray-200 group cursor-pointer"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0 
              }}
              transition={{ duration: 0.2 }}
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                categoryColor === 'blue' ? 'from-blue-100 to-blue-200' :
                categoryColor === 'green' ? 'from-green-100 to-green-200' :
                categoryColor === 'purple' ? 'from-purple-100 to-purple-200' :
                categoryColor === 'orange' ? 'from-orange-100 to-orange-200' :
                'from-teal-100 to-teal-200'
              } flex items-center justify-center`}
            >
              <IconComponent className={`w-6 h-6 ${
                categoryColor === 'blue' ? 'text-blue-600' :
                categoryColor === 'green' ? 'text-green-600' :
                categoryColor === 'purple' ? 'text-purple-600' :
                categoryColor === 'orange' ? 'text-orange-600' :
                'text-teal-600'
              }`} />
            </motion.div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 
                transition-colors duration-200">
                {skill.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{skill.yearsOfExperience} years</span>
                <span>•</span>
                <span className={`font-medium ${levelColor}`}>
                  {skillLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${progressColor}`}>
            {skill.level}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Proficiency</span>
            <span className="text-sm font-medium text-gray-800">{skillLevel}</span>
          </div>
          
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${animatedLevel}%` }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${progressColor} rounded-full relative`}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: [-100, 200] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "linear",
                  delay: 1 + index * 0.1
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                  w-20 skew-x-12"
              />
            </motion.div>
          </div>
        </div>

        {/* Description */}
        {skill.description && (
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {skill.description}
          </p>
        )}

        {/* Projects */}
        {skill.projects && skill.projects.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Used in Projects
            </span>
            <div className="flex flex-wrap gap-1">
              {skill.projects.slice(0, 2).map((project) => (
                <span
                  key={project}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full 
                    hover:bg-gray-200 transition-colors duration-200"
                >
                  {project}
                </span>
              ))}
              {skill.projects.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{skill.projects.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
            pointer-events-none"
        />
      </div>

      {/* Bottom border accent */}
      <div className={`h-1 bg-gradient-to-r ${progressColor} transform scale-x-0 
        group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
    </motion.div>
  );
});

SkillCard.displayName = 'SkillCard';

export default SkillCard;