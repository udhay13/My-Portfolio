import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Target, Users, Sparkles, Zap } from "lucide-react";

const stats = [
  { number: "2+", label: "Years Experience", icon: Briefcase },
  { number: "10+", label: "Projects Completed", icon: Target },
  { number: "5+", label: "Happy Clients", icon: Users },
  { number: "4", label: "Domains Expertise", icon: Sparkles },
];

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "BCA & MBA in Business Analytics",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description: "2+ Years in Tech Industry",
    color: "from-primary/20 to-orange-500/20",
  },
  {
    icon: Target,
    title: "Focus",
    description: "QA, Design & Analytics",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Users,
    title: "Approach",
    description: "User-Centric Solutions",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
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
            <Zap size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">Get To Know</span>
          </motion.div>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 3D Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group perspective-1000"
              >
                <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${card.color} backdrop-blur-sm border border-white/10 transition-all duration-500`}>
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.2)' }}
                  />
                  
                  {/* 3D floating icon */}
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <card.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  
                  <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">{card.description}</p>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Text Content with layered design */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Background layer */}
            <div className="absolute -inset-4 bg-gradient-to-br from-card/50 to-transparent rounded-3xl" />
            
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                A Multidisciplinary{" "}
                <span className="text-gradient">Technology Professional</span>
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                I'm a passionate technologist with a unique blend of skills spanning QA Automation, 
                UI/UX Design, and Business Analytics. My journey in tech has been driven by a 
                commitment to solving complex problems through innovative, user-centered solutions.
              </p>
              
              {/* Timeline education */}
              <div className="space-y-4 mb-8">
                {[
                  { title: "BCA - Dr. M.G.R. Educational and Research Institute", period: "Chennai, 2019 - 2022" },
                  { title: "MBA (Business Analytics & HR) - Sona School of Business & Management", period: "Salem, 2022 - 2024" }
                ].map((edu, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-primary rounded-full mt-1" />
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">{edu.title}</p>
                      <p className="text-muted-foreground text-sm">{edu.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.a 
                href="#contact" 
                className="btn-primary inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} />
                Let's Connect
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* 3D Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ 
                y: -10, 
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card with 3D effect */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating icon */}
                <motion.div
                  className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <stat.icon size={18} className="text-primary" />
                </motion.div>
                
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.number}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
