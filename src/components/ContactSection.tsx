import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, MessageSquare, ArrowUpRight, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmission } from "@/utils/firebaseAnalytics";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "udhayasurya1323@gmail.com",
    href: "mailto:udhayasurya1323@gmail.com",
    gradient: "from-primary/20 to-orange-500/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7548851323",
    href: "tel:+917548851323",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/udhayasurya-kamaraj-a997201b8/",
    gradient: "from-blue-500/20 to-sky-500/10",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "View on GitHub",
    href: "https://github.com/udhay13",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
];

// EmailJS configuration
// To use EmailJS:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service and template
// 3. Get your Service ID, Template ID, and Public Key
// 4. Update the values below or set them as environment variables
const EMAILJS_CONFIG = {
  serviceId: "service_5cau00f",
  templateId: "template_49byg88",
  publicKey: "5KLg0znPiPC5d-XdF",
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if EmailJS is configured
      if (
        EMAILJS_CONFIG.serviceId === "your_service_id" ||
        EMAILJS_CONFIG.templateId === "your_template_id" ||
        EMAILJS_CONFIG.publicKey === "your_public_key"
      ) {
        // Fallback: Use mailto link if EmailJS is not configured
        const mailtoLink = `mailto:udhayasurya1323@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: "Opening Email Client",
          description: "Your default email client should open. If EmailJS is configured, emails will be sent directly.",
        });
        
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
        setIsSubmitting(false);
        return;
      }

      // Load EmailJS library dynamically
      const emailjs = await import("@emailjs/browser");
      
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "udhayasurya1323@gmail.com",
        },
        EMAILJS_CONFIG.publicKey
      );

      toast({
        title: "Message Sent Successfully! ✨",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      trackFormSubmission(); // Track form submission
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      toast({
        title: "Error Sending Message",
        description: "There was an error sending your message. Please try again or use the email link above.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-background" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
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
            <MessageSquare size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">Get In Touch</span>
          </motion.div>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your vision. Feel free to reach out!
            </p>

            {/* Contact cards with 3D effect */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className="group relative block"
                >
                  {/* Shadow layer */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl transform translate-x-1 translate-y-1 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`relative flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r ${item.gradient} border border-border/50 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30`}>
                    {/* Icon container */}
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                    
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            {/* Shadow layer */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl transform translate-x-3 translate-y-3 blur-sm" />
            
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-50" />
              
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.65 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={18} /> Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                      <Sparkles size={14} className="ml-1" />
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-primary/20 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-primary/20 rounded-bl-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
