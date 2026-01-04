import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Folder, Plus, Sparkles } from "lucide-react";
import { getProjects, Project } from "@/utils/firebaseProjects";
import { trackProjectView } from "@/utils/firebaseAnalytics";
import { ScreenshotCarousel } from "./ScreenshotCarousel";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const allProjects = await getProjects();
      const activeProjects = allProjects.filter(p => p.status === 'active');
      setProjects(activeProjects);
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-card/30" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Floating shapes */}
        <motion.div
          className="absolute top-40 right-20 w-20 h-20 border border-primary/10 rounded-2xl"
          animate={{ rotate: [0, 45, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-16 h-16 border border-blue-500/10 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
          >
            <Folder size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">My Work</span>
          </motion.div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A showcase of my recent work and contributions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
              const gradient = "from-primary/20 via-orange-500/10 to-transparent";
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative perspective-1000"
                >
                  {/* Shadow layer */}
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl transform translate-x-3 translate-y-3 blur-sm group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300" />
                  
                  {/* Main card */}
                  <div className="relative rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500 group-hover:border-primary/30">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    
                    {/* Image container with 3D effect */}
                    <div className="relative overflow-hidden">
                      {project.screenshots && project.screenshots.length > 0 ? (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-full h-56"
                        >
                          <ScreenshotCarousel
                            screenshots={[project.thumbnail, ...project.screenshots].filter(Boolean)}
                            className="w-full h-56 object-cover"
                          />
                        </motion.div>
                      ) : (
                        <motion.img
                          src={project.thumbnail || '/placeholder-project.jpg'}
                          alt={project.title}
                          className="w-full h-56 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      )}
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => trackProjectView(project.id)}
                          >
                            <Github size={20} />
                          </motion.a>
                        )}
                        {(project.liveUrl || project.demoUrl) && (
                          <motion.a
                            href={project.liveUrl || project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => trackProjectView(project.id)}
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                        )}
                      </div>
                      
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <motion.div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm"
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            <Sparkles size={12} />
                            Featured
                          </motion.div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="relative p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                        {project.shortDescription}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.slice(0, 6).map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + i * 0.05 }}
                            className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.techStack.length > 6 && (
                          <span className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                            +{project.techStack.length - 6}
                          </span>
                        )}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-outline flex items-center justify-center gap-2 text-sm py-2.5"
                            onClick={() => trackProjectView(project.id)}
                          >
                            <Github size={16} /> GitHub
                          </a>
                        )}
                        {(project.liveUrl || project.demoUrl) && (
                          <a
                            href={project.liveUrl || project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2.5"
                            onClick={() => trackProjectView(project.id)}
                          >
                            <ExternalLink size={16} /> {project.liveUrl ? 'Live Demo' : 'View Demo'}
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })
          }

          {/* More Projects Coming - 3D Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="group relative perspective-1000"
          >
            {/* Shadow layer */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl transform translate-x-3 translate-y-3 blur-sm" />
            
            <div className="relative h-full min-h-[400px] rounded-2xl bg-card border border-dashed border-border/50 overflow-hidden flex flex-col items-center justify-center text-center p-8 transition-all duration-300 hover:border-primary/30">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Plus icon with animation */}
              <motion.div 
                className="relative mb-6"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                  <Plus className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">More Projects Coming</h3>
              <p className="text-muted-foreground text-sm">
                Stay tuned for more exciting projects and contributions
              </p>
              
              {/* Decorative elements */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/30"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
