import { Project, Analytics } from '@/types/project';

const PROJECTS_STORAGE_KEY = 'portfolioProjects';
const ANALYTICS_STORAGE_KEY = 'portfolioAnalytics';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'default-1',
    title: 'Portfolio Website',
    shortDescription: 'A modern, responsive portfolio website built with React and TypeScript',
    detailedDescription: 'This portfolio website showcases my skills and projects with a modern design, smooth animations, and responsive layout. Built with React, TypeScript, Tailwind CSS, and Framer Motion.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    screenshots: [],
    status: 'active' as const,
    visibility: 'show' as const,
    featured: true,
    displayOrder: 0,
    liveUrl: '',
    githubUrl: 'https://github.com/udhay13',
    demoUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'default-2',
    title: 'QA Automation Framework',
    shortDescription: 'Comprehensive test automation framework for web applications',
    detailedDescription: 'A robust test automation framework designed for web application testing with support for multiple browsers, parallel execution, and detailed reporting.',
    techStack: ['Selenium', 'Java', 'TestNG', 'Maven', 'Jenkins'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    screenshots: [],
    status: 'active' as const,
    visibility: 'show' as const,
    featured: false,
    displayOrder: 1,
    liveUrl: '',
    githubUrl: 'https://github.com/udhay13',
    demoUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!stored) {
      // Return default projects if no stored projects
      return DEFAULT_PROJECTS;
    }
    const projects = JSON.parse(stored) as Project[];
    // Filter out soft-deleted projects
    const activeProjects = projects.filter(p => !p.deletedAt);
    // If no active projects, return defaults
    return activeProjects.length > 0 ? activeProjects : DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
};

export const getAllProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Project[];
  } catch {
    return [];
  }
};

export const getProject = (id: string): Project | null => {
  const projects = getAllProjects();
  return projects.find(p => p.id === id) || null;
};

export const saveProject = (project: Project): void => {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  
  // Update analytics automatically
  const activeProjects = getProjects();
  updateAnalytics({
    totalProjects: activeProjects.length,
    activeProjects: activeProjects.filter(p => p.status === 'active').length,
    inactiveProjects: activeProjects.filter(p => p.status !== 'active').length,
    featuredProjects: activeProjects.filter(p => p.featured).length,
  });
};

export const deleteProject = (id: string): void => {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index >= 0) {
    projects[index] = { ...projects[index], deletedAt: new Date().toISOString() };
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    
    // Update analytics automatically
    const activeProjects = getProjects();
    updateAnalytics({
      totalProjects: activeProjects.length,
      activeProjects: activeProjects.filter(p => p.status === 'active').length,
      inactiveProjects: activeProjects.filter(p => p.status !== 'active').length,
      featuredProjects: activeProjects.filter(p => p.featured).length,
    });
  }
};

export const restoreProject = (id: string): void => {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index >= 0) {
    projects[index] = { ...projects[index], deletedAt: undefined };
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    
    // Update analytics automatically
    const activeProjects = getProjects();
    updateAnalytics({
      totalProjects: activeProjects.length,
      activeProjects: activeProjects.filter(p => p.status === 'active').length,
      inactiveProjects: activeProjects.filter(p => p.status !== 'active').length,
      featuredProjects: activeProjects.filter(p => p.featured).length,
    });
  }
};

export const getAnalytics = (): Analytics => {
  try {
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Analytics;
    }
  } catch {
    // Fall through to default
  }
  
  const projects = getProjects();
  const defaultAnalytics: Analytics = {
    visitors: 0,
    formSubmissions: 0,
    projectViews: 0,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    inactiveProjects: projects.filter(p => p.status !== 'active').length,
    featuredProjects: projects.filter(p => p.featured).length,
  };
  
  return defaultAnalytics;
};

export const updateAnalytics = (updates: Partial<Analytics>): void => {
  const current = getAnalytics();
  const updated = { ...current, ...updates };
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
};

export const incrementProjectViews = (): void => {
  const analytics = getAnalytics();
  updateAnalytics({ projectViews: analytics.projectViews + 1 });
};

