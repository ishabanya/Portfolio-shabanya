export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  location?: string;
  type?: 'work' | 'education' | 'project';
}

export interface TimelineCardProps {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface ExperienceTimelineProps {
  experiences: Experience[];
}