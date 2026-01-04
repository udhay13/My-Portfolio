import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { Project, ProjectFormData, ProjectStatus, ProjectVisibility } from '@/types/project';
import { addProject } from '@/utils/firebaseProjects';
import { uploadImageFromBase64 } from '@/utils/firebaseStorage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  detailedDescription: z.string().min(1, 'Detailed description is required'),
  techStack: z.array(z.string()).min(1, 'At least one technology is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  screenshots: z.array(z.string()),
  status: z.enum(['active', 'draft', 'archived']),
  visibility: z.enum(['show', 'hide']),
  featured: z.boolean(),
  displayOrder: z.number().min(0),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
});

const commonTechStack = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot',
  'Vue.js', 'Angular', 'Svelte', 'HTML', 'CSS',
  'Tailwind CSS', 'Bootstrap', 'SASS', 'PostgreSQL',
  'MongoDB', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'GCP', 'Firebase', 'Supabase',
  'GraphQL', 'REST API', 'Express.js', 'FastAPI',
];

interface AddProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddProjectDialog = ({ open, onOpenChange, onSuccess }: AddProjectDialogProps) => {
  const [customTech, setCustomTech] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      detailedDescription: '',
      techStack: [],
      thumbnail: '',
      screenshots: [],
      status: 'draft',
      visibility: 'show',
      featured: false,
      displayOrder: 0,
      liveUrl: '',
      githubUrl: '',
      demoUrl: '',
    },
  });

  const techStack = form.watch('techStack');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'screenshot') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'thumbnail') {
          form.setValue('thumbnail', result);
          setThumbnailPreview(result);
        } else {
          const current = form.getValues('screenshots');
          form.setValue('screenshots', [...current, result]);
          setScreenshotPreviews([...screenshotPreviews, result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = (index: number) => {
    const current = form.getValues('screenshots');
    const updated = current.filter((_, i) => i !== index);
    form.setValue('screenshots', updated);
    setScreenshotPreviews(screenshotPreviews.filter((_, i) => i !== index));
  };

  const addTech = (tech: string) => {
    if (tech && !techStack.includes(tech)) {
      form.setValue('techStack', [...techStack, tech]);
    }
  };

  const removeTech = (tech: string) => {
    form.setValue('techStack', techStack.filter(t => t !== tech));
  };

  const onSubmit = async (data: ProjectFormData, status?: 'active' | 'draft') => {
    try {
      const projectData = {
        ...data,
        status: status || data.status,
      };

      await addProject(projectData);
      toast.success(`Project ${status === 'draft' ? 'saved as draft' : 'published'} successfully`);
      form.reset();
      setThumbnailPreview('');
      setScreenshotPreviews([]);
      setCustomTech('');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      console.log('Saving as draft...');
      const formData = form.getValues();
      console.log('Form data:', formData);
      
      const projectData = {
        ...formData,
        status: 'draft' as const,
      };

      const projectId = await addProject(projectData);
      console.log('Project saved with ID:', projectId);
      toast.success('Project saved as draft successfully');
      form.reset();
      setThumbnailPreview('');
      setScreenshotPreviews([]);
      setCustomTech('');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save project: ' + (error as Error).message);
    }
  };

  const handlePublish = async () => {
    try {
      console.log('Publishing project...');
      const isValid = await form.trigger();
      if (!isValid) {
        console.log('Form validation failed');
        toast.error('Please fill in all required fields');
        return;
      }
      
      const formData = form.getValues();
      console.log('Form data:', formData);
      
      // Upload thumbnail if it's base64
      let thumbnailUrl = formData.thumbnail;
      if (thumbnailUrl && thumbnailUrl.startsWith('data:image')) {
        console.log('Uploading thumbnail...');
        thumbnailUrl = await uploadImageFromBase64(thumbnailUrl, 'thumbnails');
      }
      
      // Upload screenshots if they're base64
      const screenshotUrls = [];
      for (const screenshot of formData.screenshots) {
        if (screenshot.startsWith('data:image')) {
          const url = await uploadImageFromBase64(screenshot, 'screenshots');
          screenshotUrls.push(url);
        } else {
          screenshotUrls.push(screenshot);
        }
      }
      
      const projectData = {
        ...formData,
        thumbnail: thumbnailUrl,
        screenshots: screenshotUrls,
        status: 'active' as const,
      };

      const projectId = await addProject(projectData);
      console.log('Project published with ID:', projectId);
      toast.success('Project published successfully');
      form.reset();
      setThumbnailPreview('');
      setScreenshotPreviews([]);
      setCustomTech('');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error publishing project:', error);
      toast.error('Failed to publish project: ' + (error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill in all the details to add a new project to your portfolio
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description that will appear in project cards"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailedDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A comprehensive description of the project, features, and technologies used"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be displayed on the project detail page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Links</h3>
              
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Project URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username/repo" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://demo.example.com" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tech Stack *</h3>
              
              <FormField
                control={form.control}
                name="techStack"
                render={() => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="gap-1">
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Select onValueChange={addTech}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select from common technologies" />
                          </SelectTrigger>
                          <SelectContent>
                            {commonTechStack
                              .filter(tech => !techStack.includes(tech))
                              .map((tech) => (
                                <SelectItem key={tech} value={tech}>
                                  {tech}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2 flex-1">
                          <Input
                            placeholder="Or add custom tech"
                            value={customTech}
                            onChange={(e) => setCustomTech(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addTech(customTech);
                                setCustomTech('');
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              addTech(customTech);
                              setCustomTech('');
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Media</h3>
              
              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem>
                    <FormLabel>Project Thumbnail *</FormLabel>
                    <div className="space-y-2">
                      {thumbnailPreview ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                          <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              form.setValue('thumbnail', '');
                              setThumbnailPreview('');
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload thumbnail</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'thumbnail')}
                          />
                        </label>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="screenshots"
                render={() => (
                  <FormItem>
                    <FormLabel>Screenshots (Optional)</FormLabel>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {screenshotPreviews.map((screenshot, index) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                            <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => removeScreenshot(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        {screenshotPreviews.length < 6 && (
                          <label className="flex items-center justify-center aspect-video border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50">
                            <div className="text-center">
                              <ImageIcon className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">Add</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'screenshot')}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Project Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Lower numbers appear first</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Visibility</FormLabel>
                      <FormDescription>
                        {field.value === 'show' ? 'Project is visible on portfolio' : 'Project is hidden from portfolio'}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="show">Show</SelectItem>
                          <SelectItem value="hide">Hide</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Featured Project</FormLabel>
                      <FormDescription>
                        Featured projects are highlighted on the portfolio
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button type="button" onClick={handlePublish}>
                Publish Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

