import { Project } from '../types/project';
import { portfolioData } from './portfolioData';

// Convert portfolio data to project format with proper typing
const getProjectDetails = (projectId: string) => {
  const projectDetailsMap: Record<string, any> = {
    'llm-benchmark': {
      longDescription: 'Developed a benchmarking platform, evaluating the performance of GPT-4, Claude, and Ollama across 75+ test cases, identifying key performance bottlenecks and areas for model optimization in production.',
      challenges: [
        'Managing legacy Python code and implementing asynchronous processing',
        'Reducing API response times from 5 seconds to under 2 seconds',
        'Automating end-to-end testing of critical application modules'
      ],
      learnings: [
        'Asynchronous programming with asyncio for API optimization',
        'Selenium automation for comprehensive test coverage',
        'Real-time cost tracking and performance monitoring'
      ]
    },
    'data-pipeline-monitoring': {
      longDescription: 'Established comprehensive monitoring tools and interactive Kibana dashboards, displaying key performance indicators and ingestion rates, empowering data engineers to optimize data pipeline performance and reduce errors by 15%.',
      challenges: [
        'Optimizing database queries using SQL analytics and indexing strategies',
        'Reducing database server CPU usage while improving performance',
        'Creating intuitive dashboards for complex data pipeline metrics'
      ],
      learnings: [
        'SQL profiling and query optimization techniques',
        'Kibana dashboard development for data visualization',
        'Performance monitoring and alerting best practices'
      ]
    },
    'pulsepay': {
      longDescription: 'Architected a scalable payment processing application using Node.js, Express, and Stripe API, processing 500-1,000 test transactions with secure webhooks and containerized microservices on AWS ECS.',
      challenges: [
        'Orchestrating containerized microservices with Application Load Balancer',
        'Ensuring high availability and 99% uptime through rolling updates',
        'Implementing secure payment processing with Stripe webhooks'
      ],
      learnings: [
        'CI/CD pipeline automation with GitHub Actions',
        'Docker containerization and AWS ECS deployment',
        'Stripe API integration for payment processing'
      ]
    }
  };

  return projectDetailsMap[projectId] || {
    longDescription: 'Advanced software project showcasing modern development practices and scalable architecture design.',
    challenges: [
      'Implementing scalable architecture for high performance',
      'Optimizing system performance and reliability',
      'Ensuring robust error handling and monitoring'
    ],
    learnings: [
      'Modern software development best practices',
      'System design and architecture patterns',
      'Performance optimization techniques'
    ]
  };
};

export const projectsData: Project[] = portfolioData.projects.map(project => {
  const details = getProjectDetails(project.id);
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    longDescription: details.longDescription,
    technologies: project.technologies,
    category: project.category,
    metrics: Array.isArray(project.metrics) ? project.metrics : [],
    github: project.github || '',
    demo: project.github ? `${project.github}#demo` : '',
    image: `https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=${encodeURIComponent(project.title)}`,
    featured: project.featured || false,
    status: 'completed' as const,
    challenges: details.challenges,
    learnings: details.learnings
  };
});