import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Udhayasurya Kamaraj. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Heart size={14} className="text-primary" /> in India
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/udhayasurya-kamaraj-a997201b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/udhay13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:udhayasurya1323@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
