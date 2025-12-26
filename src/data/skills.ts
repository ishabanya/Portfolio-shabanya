import { SkillCategory } from '../types/skills';
import { portfolioData } from './portfolioData';

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Core programming languages and their ecosystems',
    color: 'blue',
    bgColor: 'from-blue-50 to-indigo-50',
    skills: portfolioData.skills.languages.map(lang => {
      const skillMap: Record<string, any> = {
        'Java': {
          level: 90,
          yearsOfExperience: 2,
          icon: 'FaJava',
          description: 'Object-oriented programming, enterprise applications',
          projects: ['Backend Systems', 'Algorithms']
        },
        'Python': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'FaPython',
          description: 'Data analysis, automation, backend development',
          projects: ['LLM Benchmark Dashboard', 'Data Pipeline Monitoring', 'Ford Analytics']
        },
        'JavaScript': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'FaJs',
          description: 'Frontend and backend development, Node.js',
          projects: ['PulsePay', 'Ford Analytics Dashboard']
        },
        'TypeScript': {
          level: 83,
          yearsOfExperience: 1,
          icon: 'SiTypescript',
          description: 'Type-safe JavaScript, React applications',
          projects: ['Ford Analytics Dashboard']
        },
        'SQL': {
          level: 82,
          yearsOfExperience: 2,
          icon: 'FaDatabase',
          description: 'Database queries, optimization, analytics',
          projects: ['Data Pipeline Monitoring']
        },
        'C/C++': {
          level: 75,
          yearsOfExperience: 2,
          icon: 'SiCplusplus',
          description: 'Systems programming, algorithms',
          projects: ['Academic Projects']
        },
        'HTML/CSS': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'FaHtml5',
          description: 'Web development, responsive design',
          projects: ['Frontend Projects']
        }
      };
      
      const skill = skillMap[lang] || {
        level: 70,
        yearsOfExperience: 1,
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
    id: 'databases',
    name: 'Databases',
    description: 'Relational and NoSQL database technologies',
    color: 'teal',
    bgColor: 'from-teal-50 to-cyan-50',
    skills: portfolioData.skills.databases.map(db => {
      const skillMap: Record<string, any> = {
        'PostgreSQL': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'SiPostgresql',
          description: 'Relational database, complex queries, performance tuning',
          projects: ['Data Pipeline Monitoring', 'PulsePay']
        },
        'Firebase': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiFirebase',
          description: 'NoSQL database, real-time sync, authentication',
          projects: ['Web Applications']
        },
        'Elasticsearch': {
          level: 72,
          yearsOfExperience: 1,
          icon: 'SiElasticsearch',
          description: 'Search engine, analytics, log aggregation',
          projects: ['Data Pipeline Monitoring']
        },
        'MongoDB': {
          level: 78,
          yearsOfExperience: 1,
          icon: 'SiMongodb',
          description: 'Document database, aggregation framework',
          projects: ['Backend Applications']
        }
      };
      
      const skill = skillMap[db] || {
        level: 70,
        yearsOfExperience: 1,
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
    id: 'frameworks',
    name: 'Frameworks',
    description: 'Web frameworks and libraries',
    color: 'green',
    bgColor: 'from-green-50 to-emerald-50',
    skills: portfolioData.skills.frameworks.map(framework => {
      const skillMap: Record<string, any> = {
        'Spring Boot': {
          level: 80,
          yearsOfExperience: 1,
          icon: 'SiSpring',
          description: 'Java framework, REST APIs, microservices',
          projects: ['Java Backend Projects']
        },
        'Node.js': {
          level: 85,
          yearsOfExperience: 1,
          icon: 'FaNodeJs',
          description: 'JavaScript runtime, server-side development',
          projects: ['PulsePay', 'Backend APIs']
        },
        'Express': {
          level: 82,
          yearsOfExperience: 1,
          icon: 'SiExpress',
          description: 'Node.js framework, REST APIs',
          projects: ['PulsePay']
        },
        'React': {
          level: 83,
          yearsOfExperience: 1,
          icon: 'FaReact',
          description: 'Frontend framework, component-based UI',
          projects: ['Ford Analytics Dashboard']
        },
        'Flask': {
          level: 80,
          yearsOfExperience: 1,
          icon: 'SiFlask',
          description: 'Python web framework, REST APIs',
          projects: ['Ford Analytics Backend']
        },
        'Streamlit': {
          level: 78,
          yearsOfExperience: 1,
          icon: 'SiStreamlit',
          description: 'Python apps for data science',
          projects: ['LLM Benchmark Dashboard']
        },
        'Hibernate': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiHibernate',
          description: 'Java ORM framework',
          projects: ['Java Applications']
        }
      };
      
      const skill = skillMap[framework] || {
        level: 70,
        yearsOfExperience: 1,
        icon: 'FaCode',
        description: 'Framework',
        projects: ['Various Projects']
      };
      
      return {
        name: framework,
        ...skill
      };
    })
  },
  {
    id: 'tools',
    name: 'Tools/Technologies',
    description: 'Development tools and technologies',
    color: 'orange',
    bgColor: 'from-orange-50 to-red-50',
    skills: portfolioData.skills.tools.map(tool => {
      const skillMap: Record<string, any> = {
        'Docker': {
          level: 82,
          yearsOfExperience: 1,
          icon: 'FaDocker',
          description: 'Containerization, microservices deployment',
          projects: ['PulsePay', 'LLM Benchmark']
        },
        'AWS (ECS, ECR, Secrets Manager)': {
          level: 78,
          yearsOfExperience: 1,
          icon: 'FaAws',
          description: 'Cloud services, container orchestration',
          projects: ['PulsePay']
        },
        'Apache Kafka': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiApachekafka',
          description: 'Event streaming, real-time data processing',
          projects: ['Data Pipeline Monitoring']
        },
        'Kibana': {
          level: 73,
          yearsOfExperience: 1,
          icon: 'SiKibana',
          description: 'Data visualization, monitoring dashboards',
          projects: ['Data Pipeline Monitoring']
        },
        'Git/GitHub': {
          level: 90,
          yearsOfExperience: 2,
          icon: 'FaGithub',
          description: 'Version control, collaboration',
          projects: ['All Projects']
        },
        'Jenkins': {
          level: 70,
          yearsOfExperience: 1,
          icon: 'SiJenkins',
          description: 'CI/CD automation',
          projects: ['Enterprise Projects']
        },
        'CI/CD': {
          level: 78,
          yearsOfExperience: 1,
          icon: 'FaRocket',
          description: 'Continuous integration and deployment',
          projects: ['PulsePay']
        },
        'Postman': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'SiPostman',
          description: 'API testing and documentation',
          projects: ['All API Projects']
        },
        'Selenium': {
          level: 75,
          yearsOfExperience: 1,
          icon: 'SiSelenium',
          description: 'Automated testing',
          projects: ['LLM Benchmark Dashboard']
        },
        'Stripe API': {
          level: 80,
          yearsOfExperience: 1,
          icon: 'SiStripe',
          description: 'Payment processing integration',
          projects: ['PulsePay']
        }
      };
      
      const skill = skillMap[tool] || {
        level: 70,
        yearsOfExperience: 1,
        icon: 'FaTools',
        description: 'Development tool',
        projects: ['Various Projects']
      };
      
      return {
        name: tool,
        ...skill
      };
    })
  },
  {
    id: 'concepts',
    name: 'Core Concepts',
    description: 'Fundamental computer science concepts',
    color: 'purple',
    bgColor: 'from-purple-50 to-pink-50',
    skills: portfolioData.skills.concepts.map(concept => {
      const skillMap: Record<string, any> = {
        'Data Structures and Algorithms': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'FaProjectDiagram',
          description: 'Problem solving, optimization',
          projects: ['All Projects']
        },
        'Object Oriented Programming(OOP)': {
          level: 85,
          yearsOfExperience: 2,
          icon: 'FaCubes',
          description: 'Design patterns, SOLID principles',
          projects: ['Java Projects', 'Backend Development']
        },
        'Microservices': {
          level: 78,
          yearsOfExperience: 1,
          icon: 'FaServer',
          description: 'Distributed systems, service architecture',
          projects: ['PulsePay', 'Backend Projects']
        },
        'Operating Systems': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'FaDesktop',
          description: 'System design, process management',
          projects: ['Academic Projects']
        },
        'Computer Networks': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'FaNetworkWired',
          description: 'Network protocols, distributed computing',
          projects: ['Academic Projects']
        }
      };
      
      const skill = skillMap[concept] || {
        level: 75,
        yearsOfExperience: 1,
        icon: 'FaBook',
        description: 'Core concept',
        projects: ['Academic Projects']
      };
      
      return {
        name: concept,
        ...skill
      };
    })
  }
];