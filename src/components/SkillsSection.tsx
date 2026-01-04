import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Palette, 
  BarChart3,
  TestTube,
  Settings,
  FileCode,
  Layout,
  Cpu,
  Wrench
} from "lucide-react";

const technicalTools = [
  { name: "Jira", icon: Settings, color: "from-blue-500/20 to-blue-600/10" },
  { name: "GitLab", icon: Code2, color: "from-orange-500/20 to-orange-600/10" },
  { name: "VS Code", icon: FileCode, color: "from-sky-500/20 to-sky-600/10" },
  { name: "Eclipse", icon: Code2, color: "from-purple-500/20 to-purple-600/10" },
  { name: "Power BI", icon: BarChart3, color: "from-yellow-500/20 to-yellow-600/10" },
  { name: "Excel", icon: Layout, color: "from-green-500/20 to-green-600/10" },
  { name: "Figma", icon: Palette, color: "from-pink-500/20 to-pink-600/10" },
  { name: "PostgreSQL", icon: Database, color: "from-cyan-500/20 to-cyan-600/10" },
  { name: "MS Office 365", icon: Layout, color: "from-primary/20 to-orange-600/10" },
];

const functionalSkills = [
  { name: "Test Automation", icon: TestTube, level: 90 },
  { name: "Software Development", icon: BarChart3, level: 82 },
  { name: "Data & Business Analytics", icon: BarChart3, level: 80 },
  { name: "UI/UX Designing", icon: Palette, level: 85 },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-card/30" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Decorative dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
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
            <Cpu size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">What I Know</span>
          </motion.div>
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A comprehensive skill set spanning automation, design, and analytics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Technical Tools - 3D Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group flex flex-col"
          >
            {/* Card shadow layer */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl transform translate-x-2 translate-y-2 blur-sm" />
            
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Technical Tools</h3>
              </div>
              
              {/* 3D Tool cards grid */}
              <div className="grid grid-cols-3 gap-4 flex-1 content-start">
                {technicalTools.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    whileHover={{ 
                      y: -8,
                      rotateY: 10,
                      transition: { duration: 0.2 }
                    }}
                    className="group/item perspective-1000"
                  >
                    <div className={`relative p-4 rounded-xl bg-gradient-to-br ${skill.color} border border-white/10 dark:border-white/10 light:border-border backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg`}>
                      {/* Icon */}
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mb-3 mx-auto"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <skill.icon size={20} className="text-primary" />
                      </motion.div>
                      
                      <p className="text-sm font-medium text-center">{skill.name}</p>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity"
                        style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.15)' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Functional Skills - Grid Layout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group flex flex-col"
          >
            {/* Card shadow layer */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl transform translate-x-2 translate-y-2 blur-sm" />
            
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Functional Skills</h3>
              </div>
              
              {/* Skills in grid layout matching technical tools */}
              <div className="grid grid-cols-2 gap-6 flex-1 content-start">
                {functionalSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    whileHover={{ 
                      y: -8,
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                    className="group/skill perspective-1000"
                  >
                    <div className={`relative p-4 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]`}>
                      {/* Icon */}
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mb-3"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <skill.icon size={20} className="text-primary" />
                      </motion.div>
                      
                      {/* Skill name */}
                      <p className="text-sm font-semibold mb-2">{skill.name}</p>
                      
                      {/* Progress bar */}
                      <div className="relative h-2 bg-background/30 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/70"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Percentage */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Level</span>
                        <span className="text-xs font-bold text-primary">{skill.level}%</span>
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity"
                        style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
