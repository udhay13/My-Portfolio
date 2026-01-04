import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Palette, 
  Globe, 
  Smartphone, 
  LayoutDashboard,
  Settings,
  Share2,
  Bot,
  ArrowUpRight,
  Layers
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered designs, wireframes, and interactive prototypes that enhance user experience.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    iconBg: "bg-pink-500/10",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive websites built with cutting-edge technologies and best practices.",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Smartphone,
    title: "Application Development",
    description: "Scalable web and mobile applications tailored to your business needs.",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    iconBg: "bg-green-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & Analytics",
    description: "Business intelligence solutions and data visualization dashboards for informed decisions.",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Settings,
    title: "Website Management",
    description: "Maintenance, performance optimization, and ongoing support for your digital assets.",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: Share2,
    title: "Social Media Handling",
    description: "Digital presence management and social media strategy implementation.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    iconBg: "bg-sky-500/10",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Intelligent automation solutions powered by artificial intelligence.",
    gradient: "from-primary/20 via-orange-500/10 to-transparent",
    iconBg: "bg-primary/10",
  },
  {
    icon: Settings,
    title: "Quality Assurance",
    description: "Comprehensive testing and quality assurance services to ensure bug-free software delivery.",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    iconBg: "bg-indigo-500/10",
  },
  {
    icon: Layers,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions for modern applications.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-teal-500/10",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-4 h-4 bg-primary/30 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-32 w-3 h-3 bg-blue-500/30 rounded-full"
          animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
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
            <Layers size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">What I Offer</span>
          </motion.div>
          <h2 className="section-title">Software Solutions & Services</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            End-to-end digital solutions to help your business grow and succeed
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              className="group relative perspective-1000"
            >
              {/* Main card */}
              <div className="relative h-full p-6 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500 group-hover:border-primary/30">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* 3D layered background effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  {/* Icon with 3D float effect */}
                  <div className="flex items-start justify-between mb-5">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <service.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    
                    {/* Arrow with animation */}
                    <motion.div
                      className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Bottom line accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
                
                {/* Corner decoration */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Shadow layer for 3D effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 transform translate-y-2 -z-10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
