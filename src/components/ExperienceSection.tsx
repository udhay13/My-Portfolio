import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, Briefcase, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "Accenture",
    position: "Test Automation Engineer",
    duration: "Feb 2024 – Present",
    description: [
      "Creating and maintaining Selenium automation scripts for web application testing",
      "Performing API testing and validation using industry-standard tools",
      "Collaborating with development teams to ensure quality throughout the SDLC",
      "Implementing best practices in test automation frameworks",
    ],
    technologies: ["Selenium", "Java", "API Testing", "Jenkins", "Git"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
        
        {/* Decorative lines */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
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
            <Briefcase size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">My Journey</span>
          </motion.div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Professional experience building quality software solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline connector */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
              
              {/* Main card with 3D layers */}
              <div className="relative md:ml-20">
                {/* Timeline dot */}
                <div className="absolute -left-[52px] top-8 hidden md:block">
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-background rounded-full" />
                    </div>
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                  </motion.div>
                </div>
                
                {/* Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  {/* Background shadow layer */}
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl transform translate-x-2 translate-y-2 blur-sm group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
                  
                  {/* Main card content */}
                  <div className="relative p-8 rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-primary/30">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Header */}
                    <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        {/* Company logo placeholder */}
                        <motion.div 
                          className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-lg"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                        >
                          <Building2 className="w-8 h-8 text-primary" />
                        </motion.div>
                        
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.position}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm">
                        <Calendar size={14} className="text-primary" />
                        <span className="text-muted-foreground">{exp.duration}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3 text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        >
                          <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                          className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
