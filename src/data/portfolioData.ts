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
    linkedin: "https://linkedin.com/in/yshabanya",
    resume: "/resume.pdf"
  },
  
  experience: [
    {
      id: "citibank",
      role: "Java Developer Intern",
      company: "CitiBank",
      period: "September 2023 - December 2023",
      description: [
        "Orchestrated robust payment processing system handling 1M+ daily transactions",
        "Led microservices migration improving scalability by 300%",
        "Developed fraud detection system reducing detection time from 24h to 5min"
      ],
      technologies: ["Java", "Spring Boot", "Kafka", "Elasticsearch", "Microservices"],
      metrics: [
        { label: "Daily Transactions", value: "1M+" },
        { label: "System Uptime", value: "99.99%" },
        { label: "Scalability Improvement", value: "300%" }
      ]
    }
  ],
  
  projects: [
    {
      id: "llm-benchmark",
      title: "LLM Benchmark Dashboard",
      description: "Benchmarking platform evaluating multiple LLMs across 75+ test cases",
      technologies: ["Python", "Streamlit", "OpenAI API", "Docker"],
      category: ["Python", "ML/AI"],
      metrics: ["75+ test cases", "Sub-2s response time"],
      github: "https://github.com/ishabanya/llm-benchmark",
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