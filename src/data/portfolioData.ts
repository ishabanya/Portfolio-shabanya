// src/data/portfolioData.ts
export const portfolioData = {
  personal: {
    name: "Y Shabanya Kishore",
    title: "Full-Stack Developer",
    roles: ["Full-Stack Developer", "Java Spring Boot Expert", "Data Engineer"],
    email: "yadaginishabanya@gmail.com",
    phone: "+91-8296281999",
    location: "Chennai, Tamil Nadu",
    github: "https://github.com/ishabanya",
    linkedin: "https://www.linkedin.com/in/shabanya-kishore-yadagini-9a7a55249",
    resume: "/resume.pdf"
  },
  
  experience: [
    {
      id: "ford",
      role: "Project Intern",
      company: "Ford Motor Company",
      period: "August 2025 - Present",
      description: [
        "Streamlined build validation procedures with innovative Pega workflows and Ascent tools, reducing critical defects by 15% and enabling continuous integration for three major Ford vehicle programs",
        "Documented 3 critical build processes, including dependency management and version control, which allowed team leads to deploy fixes and updates to production without delays",
        "Leveraged advanced Excel and Ford's internal CMMS systems to analyze supplier performance data, identifying key trends that led to a 15% improvement in on-time delivery rates of critical components",
        "Created automated monitoring tools using Python and bash scripting for pipeline health checks; improved application performance by 8% by optimizing algorithms, decreasing CPU usage, and increasing system uptime"
      ],
      technologies: ["Pega", "Python", "Bash", "Excel", "CMMS", "CI/CD", "Version Control"],
      metrics: [
        { label: "Defect Reduction", value: "15%" },
        { label: "Delivery Improvement", value: "15%" },
        { label: "Performance Gain", value: "8%" }
      ]
    },
    {
      id: "citibank",
      role: "Java Developer Intern",
      company: "CitiBank",
      period: "September 2023 - December 2023",
      description: [
        "Orchestrated the construction of a robust payment processing system leveraging Java, Spring Boot, and Hibernate, expertly managing over 1 million daily transactions while maintaining a high 99.99% uptime record",
        "Led the migration of legacy financial applications to microservices architecture, improving system scalability by 300% and reducing deployment times by 75%",
        "Spearheaded the development of a fraud detection system utilizing Kafka and Elasticsearch, reducing the average time to detect fraudulent transactions from 24 hours to under 5 minutes, enabling swift intervention",
        "Modernized legacy financial systems by implementing fault tolerance mechanisms using distributed system patterns, decreasing alert fatigue by 30% by designing self-healing processes to mitigate system errors"
      ],
      technologies: ["Java", "Spring Boot", "Hibernate", "Kafka", "Elasticsearch", "Microservices"],
      metrics: [
        { label: "Daily Transactions", value: "1M+" },
        { label: "System Uptime", value: "99.99%" },
        { label: "Scalability Improvement", value: "300%" },
        { label: "Fraud Detection", value: "<5min" }
      ]
    }
  ],
  
  projects: [
    {
      id: "system-benchmark",
      title: "System Benchmark Dashboard",
      description: "Benchmarking platform evaluating multiple systems across 75+ test cases",
      technologies: ["Python", "Streamlit", "REST APIs", "Docker"],
      category: ["Python", "Data Analysis"],
      metrics: ["75+ test cases", "Sub-2s response time"],
      github: "https://github.com/ishabanya/system-benchmark",
      featured: true
    },
    {
      id: "payment-processing",
      title: "Payment Processing System",
      description: "Enterprise payment processing system handling 1M+ daily transactions with fraud detection",
      technologies: ["Java", "Spring Boot", "Kafka", "Elasticsearch", "PostgreSQL"],
      category: ["Backend", "Enterprise"],
      metrics: ["1M+ daily transactions", "99.99% uptime", "5min fraud detection"],
      github: "https://github.com/ishabanya/payment-system",
      featured: true
    },
    {
      id: "microservices-migration",
      title: "Microservices Architecture Migration",
      description: "Led migration from monolithic to microservices architecture improving scalability by 300%",
      technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "Jenkins"],
      category: ["Backend", "DevOps"],
      metrics: ["300% scalability improvement", "20+ microservices", "Zero downtime migration"],
      github: "https://github.com/ishabanya/microservices-migration",
      featured: true
    },
    {
      id: "data-pipeline",
      title: "Real-time Data Pipeline",
      description: "Built scalable data pipeline processing millions of events with real-time analytics",
      technologies: ["Python", "Apache Kafka", "Apache Spark", "PostgreSQL", "Docker"],
      category: ["Data Engineering", "Backend"],
      metrics: ["Million+ events/day", "Real-time processing", "99.9% reliability"],
      github: "https://github.com/ishabanya/data-pipeline",
      featured: false
    },
    {
      id: "react-dashboard",
      title: "Analytics Dashboard",
      description: "Interactive dashboard for real-time business analytics and reporting",
      technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
      category: ["Frontend", "Full-Stack"],
      metrics: ["Real-time updates", "10+ chart types", "Mobile responsive"],
      github: "https://github.com/ishabanya/analytics-dashboard",
      featured: false
    },
    {
      id: "api-gateway",
      title: "API Gateway Service",
      description: "High-performance API gateway with rate limiting, authentication, and monitoring",
      technologies: ["Go", "Redis", "JWT", "Docker", "Prometheus"],
      category: ["Backend", "DevOps"],
      metrics: ["10k+ requests/sec", "Sub-50ms latency", "99.99% availability"],
      github: "https://github.com/ishabanya/api-gateway",
      featured: false
    }
  ],
  
  skills: {
    languages: ["Java", "Python", "C/C++", "SQL", "JavaScript", "Go", "R"],
    backend: ["Spring Boot", "Spring Data", "Hibernate", "FastAPI", "Node.js"],
    frontend: ["React", "Angular", "HTML/CSS", "TypeScript"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    tools: ["Docker", "Kubernetes", "Jenkins", "Git", "AWS", "Kafka"]
  }
};