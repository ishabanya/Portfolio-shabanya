import { Project } from '../types/project';
import { portfolioData } from './portfolioData';

// Convert portfolio data to project format with proper typing
const getProjectDetails = (projectId: string) => {
  const projectDetailsMap: Record<string, any> = {
    'system-benchmark': {
      longDescription: 'Comprehensive benchmarking platform evaluating multiple systems across 75+ test cases with real-time performance metrics and detailed analytics visualization.',
      challenges: [
        'Standardizing evaluation metrics across different system architectures',
        'Handling rate limits and API costs for multiple service providers',
        'Creating intuitive visualizations for complex performance data'
      ],
      learnings: [
        'Deep understanding of system evaluation methodologies',
        'Advanced API integration and rate limiting strategies',
        'Data visualization best practices for performance metrics'
      ]
    },
    'payment-processing': {
      longDescription: 'Enterprise-grade payment processing system built for CitiBank handling 1M+ daily transactions with advanced fraud detection and 99.99% uptime.',
      challenges: [
        'Building fault-tolerant payment processing at scale',
        'Implementing real-time fraud detection algorithms',
        'Ensuring PCI DSS compliance and security standards'
      ],
      learnings: [
        'Enterprise-level Java Spring Boot architecture',
        'Real-time data processing with Apache Kafka',
        'Financial services security and compliance'
      ]
    },
    'microservices-migration': {
      longDescription: 'Led complete migration from monolithic architecture to microservices, achieving 300% scalability improvement with zero downtime deployment.',
      challenges: [
        'Decomposing monolithic applications into microservices',
        'Managing distributed data consistency',
        'Implementing service discovery and load balancing'
      ],
      learnings: [
        'Microservices design patterns and best practices',
        'Docker and Kubernetes orchestration',
        'CI/CD pipeline automation with Jenkins'
      ]
    },
    'data-pipeline': {
      longDescription: 'High-performance real-time data pipeline processing millions of events daily with Apache Kafka and Spark for analytics and reporting.',
      challenges: [
        'Handling schema evolution in streaming data',
        'Optimizing Spark jobs for cost efficiency',
        'Building fault-tolerant data processing workflows'
      ],
      learnings: [
        'Advanced Apache Spark and Kafka optimization',
        'Stream processing architecture patterns',
        'Data quality monitoring and alerting systems'
      ]
    },
    'react-dashboard': {
      longDescription: 'Interactive real-time analytics dashboard built with React and TypeScript, featuring 10+ chart types and mobile-responsive design.',
      challenges: [
        'Real-time data synchronization with WebSocket',
        'Optimizing React performance for large datasets',
        'Creating responsive charts for mobile devices'
      ],
      learnings: [
        'Advanced React patterns and performance optimization',
        'D3.js integration for custom visualizations',
        'Real-time data visualization techniques'
      ]
    },
    'api-gateway': {
      longDescription: 'High-performance API gateway service built with Go, handling 10k+ requests per second with sub-50ms latency and comprehensive monitoring.',
      challenges: [
        'Implementing efficient rate limiting algorithms',
        'Building JWT-based authentication system',
        'Ensuring high availability and fault tolerance'
      ],
      learnings: [
        'Go programming for high-performance applications',
        'API gateway design patterns',
        'Distributed system monitoring with Prometheus'
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