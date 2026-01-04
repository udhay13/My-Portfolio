import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  Mail,
  Folder,
  TrendingUp,
  Eye,
  Settings,
  Bell,
  Search,
  LogOut,
  Home,
  Sun,
  Moon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProjectsManagement } from './ProjectsManagement';
import { getAnalytics } from '@/utils/firebaseAnalytics';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [analytics, setAnalytics] = useState({ visitors: 0, formSubmissions: 0, projectViews: 0 });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load theme preference
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    
    // Load analytics
    const loadAnalytics = async () => {
      const data = await getAnalytics();
      setAnalytics(data);
    };
    
    loadAnalytics();
    
    // Reload analytics periodically
    const interval = setInterval(loadAnalytics, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (password === 'Udhay@754885') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      toast.success('Login successful');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-xl bg-card border border-border max-w-md w-full shadow-lg"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
            <p className="text-muted-foreground">Enter your password to access the dashboard</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Folder className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Udhay's Admin Dasboard</h1>
                <p className="text-xs text-muted-foreground">Welcome back, BOSS</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'projects' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('projects')}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Projects
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardDescription>Total Visitors</CardDescription>
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">{analytics.visitors}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardDescription>Form Submissions</CardDescription>
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">{analytics.formSubmissions}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>+5 this week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardDescription>Project Views</CardDescription>
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">{analytics.projectViews}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>+23% from last week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Projects Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Projects Overview</CardTitle>
                  <CardDescription>Quick summary of your portfolio projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-secondary/50">
                      <p className="text-2xl font-bold">{analytics.totalProjects}</p>
                      <p className="text-sm text-muted-foreground">Total Projects</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-500/10">
                      <p className="text-2xl font-bold text-green-500">{analytics.activeProjects}</p>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                      <p className="text-2xl font-bold text-yellow-500">{analytics.inactiveProjects}</p>
                      <p className="text-sm text-muted-foreground">Inactive</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <p className="text-2xl font-bold text-primary">{analytics.featuredProjects}</p>
                      <p className="text-sm text-muted-foreground">Featured</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setActiveTab('projects')} variant="outline">
                      <Folder className="w-4 h-4 mr-2" />
                      Manage Projects
                    </Button>
                    <Button onClick={() => setActiveTab('analytics')} variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Portfolio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === 'projects' && <ProjectsManagement />}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Detailed analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Traffic Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Total Visitors</p>
                        <p className="text-2xl font-bold">{analytics.visitors}</p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Form Submissions</p>
                        <p className="text-2xl font-bold">{analytics.formSubmissions}</p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Project Views</p>
                        <p className="text-2xl font-bold">{analytics.projectViews}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Project Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
                        <p className="text-2xl font-bold">{analytics.totalProjects}</p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Active</p>
                        <p className="text-2xl font-bold text-green-500">{analytics.activeProjects}</p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Inactive</p>
                        <p className="text-2xl font-bold text-yellow-500">{analytics.inactiveProjects}</p>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">Featured</p>
                        <p className="text-2xl font-bold text-primary">{analytics.featuredProjects}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
