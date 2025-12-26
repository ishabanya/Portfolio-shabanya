import { SkillCategory } from '../types/skills';
import { portfolioData } from './portfolioData';

export const skillsData: SkillCategory[] = [
  {
    id: 'primary',
    name: 'Primary Technologies',
    description: 'Core languages and frameworks for backend development',
    color: 'indigo',
    bgColor: 'from-indigo-50 to-purple-50',
    skills: portfolioData.skills.primary.map(tech => {
      const skillMap: Record<string, any> = {
        'Java': {
          level: 95,
          yearsOfExperience: 4,
          icon: 'FaJava',
          description: 'Enterprise applications, Spring ecosystem, microservices',
          projects: ['Enterprise Backend Systems', 'Microservices Architecture']
        },
        'JavaScript': {
          level: 90,
          yearsOfExperience: 3,
          icon: 'FaJs',
          description: 'Modern ES6+, async programming, event-driven architecture',
          projects: ['PulsePay', 'Ford Analytics Dashboard']
        },
        'TypeScript': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'SiTypescript',
          description: 'Type-safe JavaScript, large-scale applications',
          projects: ['Ford Analytics Dashboard', 'Frontend Systems']
        },
        'Node.js': {
          level: 92,
          yearsOfExperience: 3,
          icon: 'FaNodeJs',
          description: 'Backend services, REST APIs, microservices',
          projects: ['PulsePay', 'API Services']
        },
        'SQL': {
          level: 85,
          yearsOfExperience: 4,
          icon: 'FaDatabase',
          description: 'Complex queries, optimization, database design',
          projects: ['Data Pipeline Monitoring', 'Analytics Systems']
        }
      };
      
      const skill = skillMap[tech] || {
        level: 80,
        yearsOfExperience: 2,
        icon: 'FaCode',
        description: 'Modern development technology',
        projects: ['Various Projects']
      };
      
      return {
        name: tech,
        ...skill
      };
    })
  },
  {
    id: 'backend',
    name: 'Backend & API Development',
    description: 'Frameworks and tools for building scalable backend systems',
    color: 'green',
    bgColor: 'from-green-50 to-emerald-50',
    skills: portfolioData.skills.backend.map(tech => {
      const skillMap: Record<string, any> = {
        'Spring Boot': {
          level: 92,
          yearsOfExperience: 3,
          icon: 'SiSpring',
          description: 'Microservices, REST APIs, enterprise Java applications',
          projects: ['Enterprise Systems', 'Java Backend Services']
        },
        'Express': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'SiExpress',
          description: 'Node.js framework, middleware, REST APIs',
          projects: ['PulsePay', 'API Gateway']
        },
        'REST APIs': {
          level: 90,
          yearsOfExperience: 3,
          icon: 'FaServer',
          description: 'API design, versioning, documentation',
          projects: ['All Backend Projects']
        },
        'Microservices': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'FaCubes',
          description: 'Distributed systems, service mesh, API gateway',
          projects: ['PulsePay', 'Enterprise Architecture']
        },
        'Stripe API': {
          level: 82,
          yearsOfExperience: 1,
          icon: 'SiStripe',
          description: 'Payment processing, webhooks, PCI compliance',
          projects: ['PulsePay']
        }
      };
      
      const skill = skillMap[tech] || {
        level: 75,
        yearsOfExperience: 2,
        icon: 'FaServer',
        description: 'Backend technology',
        projects: ['Backend Projects']
      };
      
      return {
        name: tech,
        ...skill
      };
    })
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & DevOps',
    description: 'Tools for deployment, monitoring, and system operations',
    color: 'orange',
    bgColor: 'from-orange-50 to-red-50',
    skills: portfolioData.skills.infrastructure.map(tool => {
      const skillMap: Record<string, any> = {
        'AWS (ECS)': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'FaAws',
          description: 'Container orchestration, high availability, auto-scaling',
          projects: ['PulsePay', 'Cloud Infrastructure']
        },
        'Docker': {
          level: 88,
          yearsOfExperience: 3,
          icon: 'FaDocker',
          description: 'Containerization, multi-stage builds, orchestration',
          projects: ['PulsePay', 'All Deployed Services']
        },
        'Kafka': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'SiApachekafka',
          description: 'Event streaming, distributed systems, real-time data',
          projects: ['Data Pipeline Monitoring']
        },
        'CI/CD': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'FaRocket',
          description: 'Automated pipelines, safe deployments, rollback strategies',
          projects: ['PulsePay', 'All Projects']
        },
        'GitHub Actions': {
          level: 82,
          yearsOfExperience: 2,
          icon: 'FaGithub',
          description: 'Workflow automation, deployment pipelines, testing',
          projects: ['PulsePay', 'Open Source Projects']
        }
      };
      
      const skill = skillMap[tool] || {
        level: 75,
        yearsOfExperience: 2,
        icon: 'FaTools',
        description: 'Infrastructure tool',
        projects: ['Various Projects']
      };
      
      return {
        name: tool,
        ...skill
      };
    })
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'Relational and NoSQL database technologies',
    color: 'teal',
    bgColor: 'from-teal-50 to-cyan-50',
    skills: portfolioData.skills.databases.map(db => {
      const skillMap: Record<string, any> = {
        'PostgreSQL': {
          level: 90,
          yearsOfExperience: 4,
          icon: 'SiPostgresql',
          description: 'ACID compliance, complex queries, performance tuning',
          projects: ['Data Pipeline Monitoring', 'Enterprise Systems']
        },
        'MongoDB': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'SiMongodb',
          description: 'Document store, aggregation pipelines, sharding',
          projects: ['Real-time Analytics', 'Web Applications']
        },
        'Redis': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiRedis',
          description: 'Caching, pub/sub, session management',
          projects: ['High-performance APIs', 'Session Store']
        },
        'Elasticsearch': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiElasticsearch',
          description: 'Full-text search, analytics, log aggregation',
          projects: ['Data Pipeline Monitoring', 'Search Systems']
        }
      };
      
      const skill = skillMap[db] || {
        level: 75,
        yearsOfExperience: 2,
        icon: 'FaDatabase',
        description: 'Database technology',
        projects: ['Database Projects']
      };
      
      return {
        name: db,
        ...skill
      };
    })
  },
  {
    id: 'languages',
    name: 'Additional Languages',
    description: 'Other programming languages in my toolkit',
    color: 'purple',
    bgColor: 'from-purple-50 to-pink-50',
    skills: portfolioData.skills.languages.map(lang => {
      const skillMap: Record<string, any> = {
        'Python': {
          level: 88,
          yearsOfExperience: 3,
          icon: 'FaPython',
          description: 'Data processing, automation, backend services',
          projects: ['Data Pipeline Monitoring', 'LLM Benchmark Dashboard']
        },
        'C/C++': {
          level: 75,
          yearsOfExperience: 3,
          icon: 'SiCplusplus',
          description: 'Systems programming, algorithms, performance',
          projects: ['Algorithm Implementations', 'System Tools']
        },
        'Go': {
          level: 70,
          yearsOfExperience: 1,
          icon: 'SiGo',
          description: 'Concurrent programming, microservices',
          projects: ['High-performance Services']
        }
      };
      
      const skill = skillMap[lang] || {
        level: 70,
        yearsOfExperience: 2,
        icon: 'FaCode',
        description: 'Programming language',
        projects: ['Various Projects']
      };
      
      return {
        name: lang,
        ...skill
      };
    })
  },
  {
    id: 'tools',
    name: 'Development Tools',
    description: 'Tools for development and collaboration',
    color: 'gray',
    bgColor: 'from-gray-50 to-slate-50',
    skills: portfolioData.skills.tools.map(tool => {
      const skillMap: Record<string, any> = {
        'Git': {
          level: 95,
          yearsOfExperience: 4,
          icon: 'FaGit',
          description: 'Version control, branching strategies, collaboration',
          projects: ['All Projects']
        },
        'Kubernetes': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiKubernetes',
          description: 'Container orchestration, deployments, scaling',
          projects: ['Cloud Native Applications']
        },
        'Jenkins': {
          level: 72,
          yearsOfExperience: 2,
          icon: 'SiJenkins',
          description: 'CI/CD pipelines, automation, plugins',
          projects: ['Enterprise CI/CD']
        },
        'Kibana': {
          level: 78,
          yearsOfExperience: 1,
          icon: 'SiKibana',
          description: 'Log analysis, monitoring dashboards, alerting',
          projects: ['Data Pipeline Monitoring']
        },
        'Postman': {
          level: 85,
          yearsOfExperience: 3,
          icon: 'SiPostman',
          description: 'API testing, documentation, collaboration',
          projects: ['All API Projects']
        }
      };
      
      const skill = skillMap[tool] || {
        level: 70,
        yearsOfExperience: 2,
        icon: 'FaTools',
        description: 'Development tool',
        projects: ['Various Projects']
      };
      
      return {
        name: tool,
        ...skill
      };
    })
  }
];