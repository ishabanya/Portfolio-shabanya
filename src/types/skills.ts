export interface Skill {
  name: string;
  level: number; // 1-100
  yearsOfExperience: number;
  icon?: string; // React Icons component name
  description?: string;
  projects?: string[]; // Projects where this skill was used
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  color: string; // Tailwind color class
  bgColor: string; // Background gradient
}

export interface SkillCardProps {
  skill: Skill;
  categoryColor: string;
  index: number;
}

export interface SkillsSectionProps {
  categories: SkillCategory[];
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export const getSkillLevel = (level: number): SkillLevel => {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 50) return 'Intermediate';
  return 'Beginner';
};

export const getSkillLevelColor = (level: number): string => {
  if (level >= 90) return 'text-purple-600';
  if (level >= 75) return 'text-blue-600';
  if (level >= 50) return 'text-green-600';
  return 'text-yellow-600';
};

export const getProgressBarColor = (level: number): string => {
  if (level >= 90) return 'from-purple-500 to-pink-500';
  if (level >= 75) return 'from-blue-500 to-cyan-500';
  if (level >= 50) return 'from-green-500 to-emerald-500';
  return 'from-yellow-500 to-orange-500';
};