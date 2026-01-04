import { ExternalLink, Github, Star, Calendar, Eye } from 'lucide-react';
import { Project } from '@/types/project';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ScreenshotCarousel } from './ScreenshotCarousel';

interface PreviewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export const PreviewProjectDialog = ({ open, onOpenChange, project }: PreviewProjectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Project Preview
          </DialogTitle>
          <DialogDescription>
            This is how your project will appear on the portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thumbnail with Carousel */}
          {(project.thumbnail || (project.screenshots && project.screenshots.length > 0)) && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border">
              {project.screenshots && project.screenshots.length > 0 ? (
                <ScreenshotCarousel
                  screenshots={[project.thumbnail, ...project.screenshots].filter(Boolean)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Title and Status */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold">{project.title}</h2>
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
            </div>
            <p className="text-muted-foreground">{project.shortDescription}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{project.detailedDescription}</p>
          </div>

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Screenshots</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border">
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.liveUrl || project.githubUrl || project.demoUrl) && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Links</h3>
              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Created: {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Updated: {format(new Date(project.updatedAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="ml-auto">
              <Badge variant={project.visibility === 'show' ? 'default' : 'secondary'}>
                {project.visibility === 'show' ? 'Visible' : 'Hidden'}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

