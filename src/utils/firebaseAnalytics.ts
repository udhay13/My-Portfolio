import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AnalyticsData {
  visitors: number;
  formSubmissions: number;
  projectViews: number;
}

const ANALYTICS_COLLECTION = 'analytics';

export const trackVisitor = async () => {
  try {
    await addDoc(collection(db, ANALYTICS_COLLECTION), {
      type: 'visitor',
      timestamp: new Date(),
      userAgent: navigator.userAgent
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

export const trackFormSubmission = async () => {
  try {
    await addDoc(collection(db, ANALYTICS_COLLECTION), {
      type: 'form_submission',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
};

export const trackProjectView = async (projectId: string) => {
  try {
    await addDoc(collection(db, ANALYTICS_COLLECTION), {
      type: 'project_view',
      projectId,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error tracking project view:', error);
  }
};

export const getAnalytics = async (): Promise<AnalyticsData> => {
  try {
    const analyticsSnapshot = await getDocs(collection(db, ANALYTICS_COLLECTION));
    
    let visitors = 0;
    let formSubmissions = 0;
    let projectViews = 0;

    analyticsSnapshot.forEach(doc => {
      const data = doc.data();
      switch (data.type) {
        case 'visitor':
          visitors++;
          break;
        case 'form_submission':
          formSubmissions++;
          break;
        case 'project_view':
          projectViews++;
          break;
      }
    });

    return { visitors, formSubmissions, projectViews };
  } catch (error) {
    console.error('Error getting analytics:', error);
    return { visitors: 0, formSubmissions: 0, projectViews: 0 };
  }
};