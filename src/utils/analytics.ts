// Simple analytics tracking
export const trackVisitor = () => {
  const analytics = JSON.parse(localStorage.getItem('portfolioAnalytics') || '{"visitors":0,"formSubmissions":0,"projectViews":0}');
  analytics.visitors += 1;
  localStorage.setItem('portfolioAnalytics', JSON.stringify(analytics));
};

export const trackFormSubmission = () => {
  const analytics = JSON.parse(localStorage.getItem('portfolioAnalytics') || '{"visitors":0,"formSubmissions":0,"projectViews":0}');
  analytics.formSubmissions += 1;
  localStorage.setItem('portfolioAnalytics', JSON.stringify(analytics));
};

export const trackProjectView = () => {
  const analytics = JSON.parse(localStorage.getItem('portfolioAnalytics') || '{"visitors":0,"formSubmissions":0,"projectViews":0}');
  analytics.projectViews += 1;
  localStorage.setItem('portfolioAnalytics', JSON.stringify(analytics));
};

export const getProjects = () => {
  return JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
};