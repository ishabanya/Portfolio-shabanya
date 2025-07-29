import { Experience } from '../types/experience';
import { portfolioData } from './portfolioData';

export const experiencesData: Experience[] = [
  {
    id: portfolioData.experience[0]?.id || 'citibank',
    role: portfolioData.experience[0]?.role || 'Java Developer Intern',
    company: portfolioData.experience[0]?.company || 'CitiBank',
    period: portfolioData.experience[0]?.period || 'September 2023 - December 2023',
    location: portfolioData.personal.location,
    type: 'work',
    description: portfolioData.experience[0]?.description || [],
    technologies: portfolioData.experience[0]?.technologies || [],
    metrics: portfolioData.experience[0]?.metrics || []
  },
  {
    id: 'education-srm',
    role: 'Bachelor of Technology - Computer Science',
    company: 'SRM Institute of Science & Technology',
    period: '2021 - 2025',
    location: portfolioData.personal.location,
    type: 'education',
    description: [
      'Pursuing B.Tech in Computer Science with focus on software engineering',
      'Specialized in Data Structures, Algorithms, and Full-Stack Development',
      'Active in coding competitions and technical projects',
      'Hands-on experience with modern development technologies'
    ],
    technologies: [
      'Java', 'Python', 'C++', 'JavaScript', 'SQL', 
      'Data Structures', 'Algorithms', 'Software Engineering'
    ],
    metrics: [
      { label: 'Expected Graduation', value: '2025' },
      { label: 'Major Projects', value: '10+' },
      { label: 'Focus Area', value: 'Full-Stack Dev' }
    ]
  }
];