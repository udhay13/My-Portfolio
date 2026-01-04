import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Link2,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Calendar,
  MoreVertical,
  Search,
  Filter,
  X,
  CheckCircle2,
  Circle,
  Archive,
  RefreshCw,
} from 'lucide-react';
import { Project, ProjectStatus } from '@/types/project';
import {
  getProjects,
  updateProject,
  deleteProject as deleteFirebaseProject,
} from '@/utils/firebaseProjects';
import { getAnalytics } from '@/utils/firebaseAnalytics';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddProjectDialog } from './AddProjectDialog';
import { EditProjectDialog } from './EditProjectDialog';
import { EditLinksDialog } from './EditLinksDialog';
import { PreviewProjectDialog } from './PreviewProjectDialog';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState(getAnalytics());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showLinksDialog, setShowLinksDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const loadProjects = async () => {
    const all = await getProjects();
    setAllProjects(all);
    setProjects(all);
    
    const analyticsData = await getAnalytics();
    setAnalytics({
      ...analyticsData,
      totalProjects: all.length,
      activeProjects: all.filter(p => p.status === 'active').length,
      inactiveProjects: all.filter(p => p.status !== 'active').length,
      featuredProjects: 0 // Firebase projects don't have featured field yet
    });
  };

  useEffect(() => {
    loadProjects();
  }, [showArchived]);

  const handleAddProject = () => {
    setSelectedProject(null);
    setShowAddDialog(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowEditDialog(true);
  };

  const handleEditLinks = (project: Project) => {
    setSelectedProject(project);
    setShowLinksDialog(true);
  };

  const handlePreview = (project: Project) => {
    setSelectedProject(project);
    setShowPreviewDialog(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setShowDeleteDialog(true);
  };

  const handleRestore = async (project: Project) => {
    try {
      await updateProject(project.id, { status: 'active' });
      toast.success('Project restored successfully');
      loadProjects();
    } catch (error) {
      toast.error('Failed to restore project');
    }
  };

  const confirmDelete = async () => {
    if (selectedProject) {
      try {
        await deleteFirebaseProject(selectedProject.id);
        toast.success('Project deleted successfully');
        setShowDeleteDialog(false);
        setSelectedProject(null);
        loadProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      await updateProject(project.id, { status: project.status === 'active' ? 'archived' : 'active' });
      toast.success(project.status === 'active' ? 'Project archived' : 'Project activated');
      loadProjects();
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-3xl">{analytics.totalProjects}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Projects</CardDescription>
            <CardTitle className="text-3xl text-green-500">{analytics.activeProjects}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactive Projects</CardDescription>
            <CardTitle className="text-3xl text-yellow-500">{analytics.inactiveProjects}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Featured Projects</CardDescription>
            <CardTitle className="text-3xl text-primary">{analytics.featuredProjects}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Projects List</CardTitle>
              <CardDescription>Manage all your portfolio projects</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowArchived(!showArchived)}
              >
                {showArchived ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Show Active
                  </>
                ) : (
                  <>
                    <Archive className="w-4 h-4 mr-2" />
                    Show Archived
                  </>
                )}
              </Button>
              <Button onClick={handleAddProject} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('draft')}
              >
                Draft
              </Button>
              <Button
                variant={statusFilter === 'archived' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('archived')}
              >
                Archived
              </Button>
            </div>
          </div>

          {/* Projects Table */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {showArchived ? 'No archived projects found' : 'No projects found'}
              </p>
              {!showArchived && (
                <Button onClick={handleAddProject} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Project</TableHead>
                    <TableHead>Tech Stack</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-16 h-16 rounded-lg object-cover border"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center border">
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{project.title}</p>
                              {project.featured && (
                                <Star className="w-4 h-4 text-primary fill-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {project.shortDescription}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === 'active'
                              ? 'default'
                              : project.status === 'draft'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(project.updatedAt), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handlePreview(project)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditProject(project)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditLinks(project)}>
                              <Link2 className="w-4 h-4 mr-2" />
                              Edit Links
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(project)}>
                              <Star className="w-4 h-4 mr-2" />
                              {project.featured ? 'Unfeature' : 'Mark as Featured'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {showArchived ? (
                              <DropdownMenuItem onClick={() => handleRestore(project)}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Restore
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleDelete(project)}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddProjectDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={loadProjects}
      />

      {selectedProject && (
        <>
          <EditProjectDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            project={selectedProject}
            onSuccess={loadProjects}
          />
          <EditLinksDialog
            open={showLinksDialog}
            onOpenChange={setShowLinksDialog}
            project={selectedProject}
            onSuccess={loadProjects}
          />
          <PreviewProjectDialog
            open={showPreviewDialog}
            onOpenChange={setShowPreviewDialog}
            project={selectedProject}
          />
        </>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProject?.title}"? This action can be undone by restoring from archived projects.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

