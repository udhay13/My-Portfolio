import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  // Additional fields for compatibility
  shortDescription?: string;
  detailedDescription?: string;
  thumbnail?: string;
  screenshots?: string[];
  visibility?: 'show' | 'hide';
  featured?: boolean;
  displayOrder?: number;
  demoUrl?: string;
  updatedAt?: string;
}

const PROJECTS_COLLECTION = 'projects';

export const addProject = async (project: any) => {
  try {
    console.log('Adding project:', project);
    const projectData = {
      title: project.title || '',
      description: project.shortDescription || project.description || '',
      image: project.thumbnail || project.image || '',
      techStack: project.techStack || [],
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      status: project.status || 'active',
      shortDescription: project.shortDescription || '',
      detailedDescription: project.detailedDescription || '',
      thumbnail: project.thumbnail || '',
      screenshots: project.screenshots || [],
      visibility: project.visibility || 'show',
      featured: project.featured || false,
      displayOrder: project.displayOrder || 0,
      demoUrl: project.demoUrl || '',
      createdAt: new Date(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectData);
    console.log('Project added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        description: data.description || data.shortDescription || '',
        image: data.image || data.thumbnail || '',
        techStack: data.techStack || [],
        githubUrl: data.githubUrl || '',
        liveUrl: data.liveUrl || '',
        status: data.status || 'active',
        createdAt: data.createdAt?.toDate() || new Date(),
        shortDescription: data.shortDescription || data.description || '',
        detailedDescription: data.detailedDescription || '',
        thumbnail: data.thumbnail || data.image || '',
        screenshots: data.screenshots || [],
        visibility: data.visibility || 'show',
        featured: data.featured || false,
        displayOrder: data.displayOrder || 0,
        demoUrl: data.demoUrl || '',
        updatedAt: data.updatedAt || new Date().toISOString()
      } as Project;
    });
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(projectRef, updateData);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};