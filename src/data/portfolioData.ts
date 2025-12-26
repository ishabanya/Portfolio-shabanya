// src/data/portfolioData.ts
export const portfolioData = {
  personal: {
    name: 'Y Shabanya Kishore',
    title: 'Software Engineer',
    roles: ['Software Engineer', 'Full-Stack Developer', 'Data Science Student'],
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
    url: 'https://portfolio-shabanya.vercel.app', // Will be updated when deployed
    title: 'Y Shabanya Kishore Portfolio',
    description:
      'Personal portfolio showcasing software engineering projects with expertise in full-stack development, data science, and enterprise applications',
    image: '/logo512.png',
  },

  experience: [
    {
      id: 'ford',
      role: 'Software Engineer Intern',
      company: 'Ford Motor Company',
      period: 'August 2025 - Present',
      description: [
        'Developed an analytics dashboard with React/TypeScript and Python Flask to track analyst workload, resulting in 100 users',
        'Implemented a weighted scoring algorithm, reducing workload analysis time by 80-90% through data-driven resource allocation',
        'Designed interactive data visualizations using Chart.js to display trends, enabling identification of bottlenecks across 27+ root cause categories',
        'Designed a data integration system that reduced reporting time by 60% by consolidating analyst performance data from August to November',
        'Collaborated with supply chain analysts to define severity weightings for 50+ root cause categories, incorporating stakeholder feedback',
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
      id: 'llm-benchmark',
      title: 'LLM Benchmark Dashboard',
      description:
        'Developed a benchmarking platform, evaluating the performance of GPT-4, Claude, and Ollama across 75+ test cases',
      technologies: ['Python', 'Streamlit', 'OpenAI/Anthropic APIs'],
      category: ['Python', 'Data Analysis'],
      metrics: ['75+ test cases', 'Sub-2s API response time', '90% test coverage'],
      github: 'https://github.com/ishabanya/llm-benchmark',
      featured: true,
    },
    {
      id: 'data-pipeline-monitoring',
      title: 'Data Pipeline Monitoring System',
      description:
        'Established comprehensive monitoring tools and interactive Kibana dashboards for data pipeline optimization',
      technologies: ['Python', 'Apache Kafka', 'PostgreSQL', 'Kibana', 'SQL'],
      category: ['Data Engineering', 'Backend'],
      metrics: ['50% query performance improvement', '15% error reduction', '15% CPU usage reduction'],
      github: 'https://github.com/ishabanya/data-pipeline-monitoring',
      featured: true,
    },
    {
      id: 'pulsepay',
      title: 'PulsePay - Payment Processing Platform',
      description:
        'Architected a scalable payment processing application using Node.js and Stripe API, processing 500-1,000 test transactions',
      technologies: ['Node.js', 'Express', 'Stripe API', 'AWS ECS', 'Docker', 'GitHub Actions'],
      category: ['Backend', 'Full-Stack'],
      metrics: ['500-1,000 test transactions', '99% uptime', '60% deployment time reduction'],
      github: 'https://github.com/ishabanya/pulsepay',
      featured: true,
    },
  ],

  skills: {
    languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'C/C++', 'HTML/CSS'],
    backend: ['Spring Boot', 'Node.js', 'Express', 'Flask', 'Streamlit', 'Hibernate'],
    frontend: ['React', 'HTML/CSS', 'TypeScript'],
    databases: ['PostgreSQL', 'Firebase', 'Elasticsearch', 'MongoDB'],
    tools: ['Docker', 'AWS (ECS, ECR, Secrets Manager)', 'Apache Kafka', 'Kibana', 'Git/GitHub', 'Jenkins', 'CI/CD', 'Postman', 'Selenium', 'Stripe API'],
  },
};
