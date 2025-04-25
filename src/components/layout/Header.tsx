import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Moon, Sun, Code, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [showParticles, setShowParticles] = useState(false);

  // For custom cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const navItems = [
    { label: t('nav.home'), href: '#home', icon: <Zap size={16} /> },
    { label: t('nav.about'), href: '#about', icon: <Sparkles size={16} /> },
    { label: t('nav.skills'), href: '#skills', icon: <Code size={16} /> },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Observer for active sections
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all sections
    navItems.forEach(item => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      navItems.forEach(item => {
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, [navItems]);

  // Effect to track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Particle effect on theme change
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 1000);
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  // Logo animation
  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -1, 1, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2
        }
      }
    }
  };

  return (
    <>
      {/* Custom cursor */}
      <motion.div 
        className="fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 hidden md:block"
        style={{ 
          left: mouseX, 
          top: mouseY,
          x: "-50%",
          y: "-50%"
        }}
      />

      {/* Theme change particles */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: window.innerWidth / 2, 
                  y: window.innerHeight / 2,
                  scale: 0
                }}
                animate={{ 
                  x: window.innerWidth * Math.random(),
                  y: window.innerHeight * Math.random(),
                  scale: Math.random() * 3
                }}
                transition={{ duration: 1 }}
                className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-primary' : 'bg-primary-dark'}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-6 lg:px-8',
          isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.a 
            href="#home" 
            variants={logoVariants}
            whileHover="hover"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary transition-all duration-200"
          >
            <span className="relative inline-block">
              Fotso.dev
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.a>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center gap-1.5",
                  activeSection === item.href.replace('#', '') 
                    ? "text-primary dark:text-primary bg-primary/5 dark:bg-primary/10" 
                    : "text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5 dark:hover:text-primary dark:hover:bg-primary/10"
                )}
              >
                {item.icon && (
                  <span className={cn(
                    activeSection === item.href.replace('#', '')
                      ? "opacity-100" 
                      : "opacity-70 group-hover:opacity-100"
                  )}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </motion.a>
            ))}

            <div className="flex items-center ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-x-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200 flex items-center"
              >
                <Globe size={20} />
                <span className="ml-1 text-xs font-medium">{language === 'en' ? 'FR' : 'EN'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
            </div>
          </nav>

          <div className="flex items-center md:hidden space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              <Globe size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg mx-4 mt-2 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block py-2 px-3 text-base font-medium rounded-md transition-all duration-300 flex items-center gap-2",
                      activeSection === item.href.replace('#', '') 
                        ? "text-primary dark:text-primary bg-primary/5 dark:bg-primary/10" 
                        : "text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5 dark:hover:text-primary dark:hover:bg-primary/10"
                    )}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;