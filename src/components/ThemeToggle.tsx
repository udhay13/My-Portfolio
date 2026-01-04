import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-secondary border border-border p-1 transition-colors duration-300 hover:border-primary/50"
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="absolute top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg"
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-primary-foreground" />
        ) : (
          <Sun className="w-3 h-3 text-primary-foreground" />
        )}
      </motion.div>
      <div className="flex justify-between items-center h-full px-1">
        <Moon className="w-3 h-3 text-muted-foreground" />
        <Sun className="w-3 h-3 text-muted-foreground" />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
