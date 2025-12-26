import { Experience } from '../types/experience';
import { portfolioData } from './portfolioData';

export const experiencesData: Experience[] = [
  {
    id: portfolioData.experience[0]?.id || 'ford',
    role: portfolioData.experience[0]?.role || 'Software Engineer Intern',
    company: portfolioData.experience[0]?.company || 'Ford Motor Company',
    period: portfolioData.experience[0]?.period || 'August 2025 - Present',
    location: portfolioData.personal.location,
    type: 'work',
    description: portfolioData.experience[0]?.description || [],
    technologies: portfolioData.experience[0]?.technologies || [],
    metrics: portfolioData.experience[0]?.metrics || [],
  },
  {
    id: 'education-srm',
    role: 'M.tech(Integrated), Computer Science with Specialization in Data Science',
    company: 'SRM University',
    period: 'September 2021 - June 2026',
    location: 'Chennai, Tamil Nadu',
    type: 'education',
    description: [
      'Pursuing Integrated M.Tech in Computer Science with specialized focus on Data Science',
      'Core coursework: Data Structures and Algorithms, Object Oriented Programming, Microservices, Operating Systems, Computer Networks',
      'Hands-on experience with full-stack development, data processing frameworks, and enterprise applications',
      'Active involvement in software engineering projects and technical implementations',
    ],
    technologies: [
      'Data Structures and Algorithms',
      'Object Oriented Programming',
      'Microservices',
      'Operating Systems',
      'Computer Networks',
      'Full-Stack Development',
    ],
    metrics: [
      { label: 'Expected Graduation', value: 'June 2026' },
      { label: 'Specialization', value: 'Data Science' },
      { label: 'Degree Type', value: 'Integrated M.Tech' },
    ],
  },
];
