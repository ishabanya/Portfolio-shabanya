export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string[];
  metrics?: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  longDescription?: string;
  challenges?: string[];
  learnings?: string[];
  status?: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProjectsShowcaseProps {
  projects: Project[];
}

export type ProjectCategory = 'All' | 'Java' | 'Python' | 'Data Engineering' | 'ML/AI' | 'Full-Stack' | 'DevOps';