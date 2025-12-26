import { SkillCategory } from '../types/skills';
import { portfolioData } from './portfolioData';

export const skillsData: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming Languages',
    description: 'Core programming languages and their ecosystems',
    color: 'blue',
    bgColor: 'from-blue-50 to-indigo-50',
    skills: portfolioData.skills.languages.map(lang => {
      const skillMap: Record<string, any> = {
        'Java': {
          level: 95,
          yearsOfExperience: 4,
          icon: 'FaJava',
          description: 'Enterprise applications, Spring ecosystem, microservices',
          projects: ['PulsePay', 'Data Pipeline Monitoring System']
        },
        'Python': {
          level: 90,
          yearsOfExperience: 3,
          icon: 'FaPython',
          description: 'Data science, API development, automation, analytics',
          projects: ['LLM Benchmark Dashboard', 'Data Pipeline Monitoring System', 'Ford Analytics Dashboard']
        },
        'JavaScript': {
          level: 88,
          yearsOfExperience: 3,
          icon: 'FaJs',
          description: 'Modern ES6+, Node.js, full-stack development',
          projects: ['PulsePay', 'Ford Analytics Dashboard']
        },
        'C/C++': {
          level: 75,
          yearsOfExperience: 3,
          icon: 'SiCplusplus',
          description: 'Systems programming, algorithms, performance optimization',
          projects: ['Performance Critical Systems']
        },
        'SQL': {
          level: 82,
          yearsOfExperience: 4,
          icon: 'FaDatabase',
          description: 'Complex queries, optimization, database design',
          projects: ['Data Pipeline Monitoring System', 'Ford Analytics Dashboard']
        },
        'HTML/CSS': {
          level: 85,
          yearsOfExperience: 3,
          icon: 'FaHtml5',
          description: 'Modern web development, responsive design',
          projects: ['Ford Analytics Dashboard', 'Portfolio']
        }
      };
      
      const skill = skillMap[lang] || {
        level: 70,
        yearsOfExperience: 2,
        icon: 'FaCode',
        description: 'Modern programming language',
        projects: ['Various Projects']
      };
      
      return {
        name: lang,
        ...skill
      };
    })
  },
  {
    id: 'backend',
    name: 'Backend Frameworks',
    description: 'Server-side frameworks and technologies',
    color: 'green',
    bgColor: 'from-green-50 to-emerald-50',
    skills: portfolioData.skills.backend.map(tech => {
      const skillMap: Record<string, any> = {
        'Spring Boot': {
          level: 92,
          yearsOfExperience: 3,
          icon: 'SiSpring',
          description: 'Microservices, REST APIs, security, data access',
          projects: ['Enterprise Applications']
        },
        'Node.js': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'FaNodeJs',
          description: 'Express.js, event-driven architecture, REST APIs',
          projects: ['PulsePay', 'Backend Services']
        },
        'Express': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'SiExpress',
          description: 'Web framework for Node.js, middleware, routing',
          projects: ['PulsePay']
        },
        'Flask': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'SiFlask',
          description: 'Python web framework, REST APIs, microservices',
          projects: ['Ford Analytics Dashboard', 'Data Pipeline Monitoring']
        },
        'Hibernate': {
          level: 85,
          yearsOfExperience: 3,
          icon: 'SiHibernate',
          description: 'ORM mapping, caching, performance optimization',
          projects: ['Enterprise Java Applications']
        },
        'Streamlit': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'SiStreamlit',
          description: 'Python web apps, data visualization, rapid prototyping',
          projects: ['LLM Benchmark Dashboard']
        }
      };
      
      const skill = skillMap[tech] || {
        level: 75,
        yearsOfExperience: 2,
        icon: 'FaServer',
        description: 'Backend framework and technologies',
        projects: ['Various Backend Projects']
      };
      
      return {
        name: tech,
        ...skill
      };
    })
  },
  {
    id: 'frontend',
    name: 'Frontend Technologies',
    description: 'User interface and client-side technologies',
    color: 'purple',
    bgColor: 'from-purple-50 to-pink-50',
    skills: portfolioData.skills.frontend.map(tech => {
      const skillMap: Record<string, any> = {
        'React': {
          level: 90,
          yearsOfExperience: 3,
          icon: 'FaReact',
          description: 'Hooks, Context API, component architecture',
          projects: ['Ford Analytics Dashboard', 'Portfolio']
        },
        'HTML/CSS': {
          level: 92,
          yearsOfExperience: 4,
          icon: 'FaHtml5',
          description: 'Semantic HTML, modern CSS, responsive design',
          projects: ['All Frontend Projects']
        },
        'TypeScript': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'SiTypescript',
          description: 'Type-safe JavaScript, React applications',
          projects: ['Ford Analytics Dashboard', 'Portfolio']
        }
      };
      
      const skill = skillMap[tech] || {
        level: 75,
        yearsOfExperience: 2,
        icon: 'FaCode',
        description: 'Frontend technology',
        projects: ['Frontend Projects']
      };
      
      return {
        name: tech,
        ...skill
      };
    })
  },
  {
    id: 'devops',
    name: 'Data & DevOps Tools',
    description: 'Infrastructure, deployment, and data processing tools',
    color: 'orange',
    bgColor: 'from-orange-50 to-red-50',
    skills: portfolioData.skills.tools.map(tool => {
      const skillMap: Record<string, any> = {
        'Docker': {
          level: 88,
          yearsOfExperience: 3,
          icon: 'FaDocker',
          description: 'Containerization, multi-stage builds, orchestration',
          projects: ['PulsePay', 'LLM Benchmark Dashboard']
        },
        'AWS (ECS, ECR, Secrets Manager)': {
          level: 82,
          yearsOfExperience: 2,
          icon: 'FaAws',
          description: 'ECS container orchestration, ECR registry, Secrets management',
          projects: ['PulsePay']
        },
        'Apache Kafka': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiApachekafka',
          description: 'Event streaming, message queues, distributed systems',
          projects: ['Data Pipeline Monitoring System']
        },
        'Kibana': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiKibana',
          description: 'Data visualization, dashboards, monitoring',
          projects: ['Data Pipeline Monitoring System']
        },
        'Git/GitHub': {
          level: 95,
          yearsOfExperience: 4,
          icon: 'FaGithub',
          description: 'Version control, GitHub Actions, collaboration',
          projects: ['All Projects']
        },
        'Jenkins': {
          level: 70,
          yearsOfExperience: 2,
          icon: 'SiJenkins',
          description: 'CI/CD pipelines, automated testing',
          projects: ['Enterprise Projects']
        },
        'CI/CD': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'FaRocket',
          description: 'GitHub Actions, automated deployments, pipeline automation',
          projects: ['PulsePay']
        },
        'Postman': {
          level: 85,
          yearsOfExperience: 3,
          icon: 'SiPostman',
          description: 'API testing, documentation, collaboration',
          projects: ['All API Projects']
        },
        'Selenium': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiSelenium',
          description: 'Automated testing, test coverage improvement',
          projects: ['LLM Benchmark Dashboard']
        },
        'Stripe API': {
          level: 80,
          yearsOfExperience: 1,
          icon: 'SiStripe',
          description: 'Payment processing, webhooks, secure transactions',
          projects: ['PulsePay']
        }
      };
      
      const skill = skillMap[tool] || {
        level: 70,
        yearsOfExperience: 2,
        icon: 'FaTools',
        description: 'Development and deployment tool',
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
          description: 'Advanced queries, indexing, performance tuning',
          projects: ['Data Pipeline Monitoring System', 'PulsePay']
        },
        'Firebase': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiFirebase',
          description: 'Realtime database, authentication, cloud functions',
          projects: ['Web Applications']
        },
        'Elasticsearch': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'SiElasticsearch',
          description: 'Search engine, analytics, real-time data',
          projects: ['Data Pipeline Monitoring System']
        },
        'MongoDB': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiMongodb',
          description: 'Document-based storage, aggregation pipelines',
          projects: ['Web Applications']
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
  }
];