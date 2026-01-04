import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/udhayasurya-kamaraj-a997201b8/", label: "Connect" },
  { name: "GitHub", icon: Github, href: "https://github.com/udhay13", label: "See My Work" },
  { name: "Email", icon: Mail, href: "mailto:udhayasurya1323@gmail.com", label: "Get In Touch" },
];

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] -top-48 -right-48 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[400px] h-[400px] bottom-0 -left-48 rounded-full bg-primary/15 blur-[80px]"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Available for Projects</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-muted-foreground text-lg">Hello, I'm</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-[1.1]"
            >
              Udhayasurya
            </motion.h1>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
            >
              <span className="text-gradient">Kamaraj</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {["QA Automation", "UI/UX Design", "Business Analytics"].map((skill, index) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed"
            >
              A technology professional specializing in Quality Assurance, UI/UX design, 
              and business analytics. Building scalable software solutions and user-centric 
              digital products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a href="#projects" className="btn-primary group inline-flex items-center gap-2">
                View Portfolio 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="https://drive.google.com/file/d/1DTEjGeMnJtmZvRadcY2t4dduUXRpiPDh/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
                <Download size={18} />
                Download CV
              </a>
            </motion.div>

            {/* Social Links - Card Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <social.icon size={20} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{social.name}</span>
                    <span className="text-xs text-muted-foreground">{social.label}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative Background Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed border-primary/20"
              />
              
              {/* Main Decorative Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[420px] md:h-[420px]">
                <div className="absolute inset-0 bg-primary rounded-full translate-x-8 -translate-y-8 opacity-80" />
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-primary/30 rounded-full blur-3xl" />
              
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-card shadow-2xl"
              >
                <img
                  src="https://thumbs2.imgbox.com/b8/6e/cmFmskn4_t.png"
                  alt="Udhayasurya Kamaraj"
                  className="w-full h-full object-cover object-center"
                  style={{ display: 'block' }}
                  loading="eager"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </motion.div>


            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
