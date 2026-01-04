export type ProjectStatus = 'active' | 'draft' | 'archived';
export type ProjectVisibility = 'show' | 'hide';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  thumbnail: string;
  screenshots: string[];
  status: ProjectStatus;
  visibility: ProjectVisibility;
  featured: boolean;
  displayOrder: number;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ProjectFormData {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  thumbnail: string;
  screenshots: string[];
  status: ProjectStatus;
  visibility: ProjectVisibility;
  featured: boolean;
  displayOrder: number;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Analytics {
  visitors: number;
  formSubmissions: number;
  projectViews: number;
  totalProjects: number;
  activeProjects: number;
  inactiveProjects: number;
  featuredProjects: number;
}

