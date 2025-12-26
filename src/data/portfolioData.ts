// src/data/portfolioData.ts
export const portfolioData = {
  personal: {
    name: 'Y Shabanya Kishore',
    title: 'Software Engineer | Backend & Infrastructure | 2026 Grad',
    roles: ['Backend Engineer', 'Infrastructure Developer', 'Systems Engineer'],
    tagline: 'Building scalable systems and reliable infrastructure. Passionate about payments and developer tooling.',
    about: 'I enjoy dissecting complex backend challenges, from designing fair matchmaking algorithms to ensuring low-latency server infrastructure. My focus is on building robust systems that scale efficiently while maintaining reliability and performance.',
    email: 'yadaginishabanya@gmail.com',
    phone: '+91-8296281999',
    location: 'Chennai, Tamil Nadu',
    github: 'https://github.com/ishabanya',
    linkedin: 'https://www.linkedin.com/in/shabanya-kishore-yadagini-9a7a55249',
    twitter: 'https://x.com/shabanya123',
    instagram: 'https://www.instagram.com/shabanya_kishore/',
    resume: '/resume.pdf',
  },

  site: {
    url: 'https://portfolio-shabanya.vercel.app',
    title: 'Y Shabanya Kishore Portfolio',
    description:
      'Software Engineer specializing in backend systems and infrastructure. Building scalable payment solutions and developer tooling. 2026 Graduate.',
    image: '/logo512.png',
  },

  experience: [
    {
      id: 'ford',
      role: 'Software Engineer Intern',
      company: 'Ford Motor Company',
      period: 'August 2025 - Present',
      description: [
        'Collaborated directly with supply chain stakeholders to build an internal analytics dashboard, scaling to 100+ daily active users',
        'Owned the end-to-end development of data integration modules, improving reporting efficiency by 60%',
        'Engineered a weighted scoring algorithm that reduced workload analysis time by 80-90%, enabling data-driven resource allocation',
        'Built real-time data visualizations to identify system bottlenecks across 27+ categories, directly impacting operational decisions',
        'Partnered with cross-functional teams to gather requirements and iterate on features based on user feedback',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Python',
        'Flask',
        'Chart.js',
        'Data Analytics',
        'Dashboard Development',
      ],
      metrics: [
        { label: 'Users', value: '100' },
        { label: 'Workload Analysis Time Reduction', value: '80-90%' },
        { label: 'Reporting Time Reduction', value: '60%' },
        { label: 'Root Cause Categories', value: '27+' },
      ],
    },
  ],

  projects: [
    {
      id: 'pulsepay',
      title: 'PulsePay: Scalable Payment Infrastructure',
      description:
        'Engineered a fault-tolerant payment service using the Stripe API, handling secure webhooks and ensuring transaction reliability',
      technologies: ['Node.js', 'Stripe API', 'AWS ECS', 'Docker'],
      category: ['Backend', 'Infrastructure'],
      metrics: ['99% uptime', '60% deployment time reduction', 'Zero security incidents'],
      github: 'https://github.com/ishabanya/pulsepay',
      featured: true,
    },
    {
      id: 'data-pipeline-monitoring',
      title: 'Data Pipeline Monitoring System',
      description:
        'Built high-performance data ingestion system with real-time observability. Optimized database queries reducing latency by 15%',
      technologies: ['Python', 'Apache Kafka', 'PostgreSQL', 'Kibana', 'SQL'],
      category: ['Backend', 'Infrastructure'],
      metrics: ['15% latency reduction', '50% query optimization', 'Real-time monitoring'],
      github: 'https://github.com/ishabanya/data-pipeline-monitoring',
      featured: true,
    },
    {
      id: 'llm-benchmark',
      title: 'LLM Benchmark Dashboard',
      description:
        'Developed a benchmarking platform, evaluating the performance of GPT-4, Claude, and Ollama across 75+ test cases',
      technologies: ['Python', 'Streamlit', 'OpenAI/Anthropic APIs'],
      category: ['Python', 'Data Analysis'],
      metrics: ['75+ test cases', 'Sub-2s API response time', '90% test coverage'],
      github: 'https://github.com/ishabanya/llm-benchmark',
      featured: false,
    },
  ],

  skills: {
    primary: ['Java', 'JavaScript', 'TypeScript', 'Node.js', 'SQL'],
    backend: ['Spring Boot', 'Express', 'REST APIs', 'Microservices', 'Stripe API'],
    infrastructure: ['AWS (ECS)', 'Docker', 'Kafka', 'CI/CD', 'GitHub Actions'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
    languages: ['Python', 'C/C++', 'Go'],
    tools: ['Git', 'Kubernetes', 'Jenkins', 'Kibana', 'Postman'],
  },
};