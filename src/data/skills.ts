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
          projects: ['Payment Processing System', 'Microservices Migration']
        },
        'Python': {
          level: 90,
          yearsOfExperience: 3,
          icon: 'FaPython',
          description: 'Data science, machine learning, web development, automation',
          projects: ['System Benchmark Dashboard', 'Data Pipeline']
        },
        'JavaScript': {
          level: 88,
          yearsOfExperience: 3,
          icon: 'FaJs',
          description: 'Modern ES6+, Node.js, full-stack development',
          projects: ['Analytics Dashboard', 'API Gateway']
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
          projects: ['Payment Processing System', 'Data Pipeline']
        },
        'Go': {
          level: 65,
          yearsOfExperience: 1,
          icon: 'FaGolang',
          description: 'Microservices, concurrent programming',
          projects: ['API Gateway']
        },
        'R': {
          level: 60,
          yearsOfExperience: 1,
          icon: 'SiR',
          description: 'Statistical analysis, data visualization',
          projects: ['Data Analysis Projects']
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
          projects: ['Payment Processing System', 'Microservices Migration']
        },
        'Spring Data': {
          level: 88,
          yearsOfExperience: 3,
          icon: 'SiSpring',
          description: 'JPA, repositories, database integration',
          projects: ['Payment Processing System']
        },
        'Hibernate': {
          level: 85,
          yearsOfExperience: 3,
          icon: 'SiHibernate',
          description: 'ORM mapping, caching, performance optimization',
          projects: ['Payment Processing System']
        },
        'FastAPI': {
          level: 88,
          yearsOfExperience: 2,
          icon: 'SiFastapi',
          description: 'High-performance Python APIs, async programming',
          projects: ['System Benchmark Dashboard', 'Data Pipeline']
        },
        'Node.js': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'FaNodeJs',
          description: 'Express.js, event-driven architecture',
          projects: ['Analytics Dashboard', 'API Gateway']
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
          projects: ['Analytics Dashboard', 'Portfolio']
        },
        'Angular': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'FaAngular',
          description: 'Component architecture, services, RxJS',
          projects: ['Enterprise Applications']
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
          projects: ['Analytics Dashboard', 'Portfolio']
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
          projects: ['Payment Processing System', 'Data Pipeline']
        },
        'Kubernetes': {
          level: 80,
          yearsOfExperience: 2,
          icon: 'SiKubernetes',
          description: 'Container orchestration, deployments, services',
          projects: ['Microservices Migration', 'API Gateway']
        },
        'Jenkins': {
          level: 70,
          yearsOfExperience: 2,
          icon: 'SiJenkins',
          description: 'CI/CD pipelines, automated testing',
          projects: ['Microservices Migration', 'Payment Processing System']
        },
        'Git': {
          level: 95,
          yearsOfExperience: 4,
          icon: 'FaGit',
          description: 'Version control, branching strategies, collaboration',
          projects: ['All Projects']
        },
        'AWS': {
          level: 82,
          yearsOfExperience: 3,
          icon: 'FaAws',
          description: 'EC2, S3, RDS, Lambda, CloudFormation',
          projects: ['Payment Processing System', 'Data Pipeline']
        },
        'Kafka': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiApachekafka',
          description: 'Event streaming, message queues, distributed systems',
          projects: ['Payment Processing System', 'Data Pipeline']
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
          projects: ['Payment Processing System', 'Data Pipeline']
        },
        'MySQL': {
          level: 85,
          yearsOfExperience: 3,
          icon: 'SiMysql',
          description: 'Database design, optimization, replication',
          projects: ['Payment Processing System', 'Analytics Dashboard']
        },
        'MongoDB': {
          level: 78,
          yearsOfExperience: 2,
          icon: 'SiMongodb',
          description: 'Document-based storage, aggregation pipelines',
          projects: ['Analytics Dashboard', 'API Gateway']
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