import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Beaker, TestTube, Microscope, Atom, Database, Code } from 'lucide-react';

// Define station interfaces
interface LabStation {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const LaboratoryNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [visitedSections, setVisitedSections] = useState<string[]>([]);
  const [showLabels, setShowLabels] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lab stations with their configurations
  const stations: LabStation[] = [
    {
      id: 'home',
      name: 'Accueil',
      icon: <Beaker size={24} />,
      color: 'from-blue-500 to-purple-500',
      description: 'Centre d\'accueil et présentation principale'
    },
    {
      id: 'about',
      name: 'À propos',
      icon: <Microscope size={24} />,
      color: 'from-green-500 to-teal-500',
      description: 'Analyse détaillée de mon parcours'
    },
    {
      id: 'skills',
      name: 'Compétences',
      icon: <TestTube size={24} />,
      color: 'from-purple-500 to-pink-500',
      description: 'Arsenal technique et méthodologique'
    },
    {
      id: 'projects',
      name: 'Projets',
      icon: <TestTube size={24} />,
      color: 'from-orange-500 to-red-500',
      description: 'Expériences réalisées et résultats'
    },
    {
      id: 'experience',
      name: 'Expérience',
      icon: <Atom size={24} />,
      color: 'from-yellow-500 to-amber-500',
      description: 'Parcours professionnel et réalisations'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <Database size={24} />,
      color: 'from-cyan-500 to-blue-500',
      description: 'Initier une collaboration'
    }
  ];
  
  // For parallax effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);
  
  // Set up intersection observer to detect active section
  useEffect(() => {
    const sectionElements = stations.map(s => document.getElementById(s.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            
            // Mark section as visited
            setVisitedSections(prev => {
              if (prev.includes(id)) return prev;
              return [...prev, id];
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    
    sectionElements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      sectionElements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  // Lab decoration effects
  useEffect(() => {
    // Animation of laboratory elements
    const animateLabElements = () => {
      // Bubbles animation
      const bubbles = document.querySelectorAll('.lab-bubble');
      bubbles.forEach((bubble, index) => {
        const el = bubble as HTMLElement;
        const delay = index * 0.2;
        const duration = 2 + Math.random() * 3;
        
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      });
      
      // Data stream animations
      const dataStreams = document.querySelectorAll('.data-stream');
      dataStreams.forEach((stream, index) => {
        const el = stream as HTMLElement;
        el.style.left = `${10 + (index * 15)}%`;
        el.style.animationDelay = `${index * 0.5}s`;
      });
    };
    
    animateLabElements();
  }, []);
  
  return (
    <>
      {/* Laboratory background and decoration elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background gradient effect */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-gray-900/0 dark:from-gray-900/30 dark:to-gray-900/10"
        />
        
        {/* Lab decoration elements */}
        <div className="absolute inset-0">
          {/* Bubbles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`bubble-${i}`}
              className="lab-bubble absolute rounded-full bg-primary/10 dark:bg-primary/20"
              style={{
                width: `${20 + Math.random() * 50}px`,
                height: `${20 + Math.random() * 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.5
              }}
            />
          ))}
          
          {/* Data streams */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`stream-${i}`} className="data-stream" />
          ))}
          
          {/* Lab equipment */}
          <div className="absolute top-20 right-10 w-10 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-b-full">
            <div className="absolute bottom-0 w-full h-1/3 bg-purple-500/30 dark:bg-purple-500/40 rounded-b-full" />
          </div>
          
          <div className="absolute bottom-40 left-10 w-8 h-32 bg-green-500/10 dark:bg-green-500/20 rounded-b-full">
            <div className="absolute bottom-0 w-full h-1/4 bg-green-500/30 dark:bg-green-500/40 rounded-b-full" />
          </div>
          
          {/* Flask on the left */}
          <div className="absolute top-1/4 left-20 w-16 h-24">
            <div className="absolute bottom-0 w-full h-16 bg-blue-500/20 dark:bg-blue-500/30 rounded-b-lg" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 border-t-8 border-l-8 border-r-8 border-blue-500/20 dark:border-blue-500/30 rounded-t-lg" />
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 from-transparent via-gray-500/5 to-transparent bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)] bg-[length:50px_50px]" />
        </div>
      </div>
      
      {/* Navigation stations - vertical navigation on the right */}
      <div className="fixed top-1/2 right-6 transform -translate-y-1/2 space-y-4 z-40">
        {stations.map((station) => (
          <a
            key={station.id}
            href={`#${station.id}`}
            className="group relative block"
            onMouseEnter={() => setShowLabels(true)}
            onMouseLeave={() => setShowLabels(false)}
          >
            <div className="relative flex items-center">
              {/* Connecting line to show active section */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: activeSection === station.id ? 40 : 0 
                }}
                className={`h-1 bg-gradient-to-r ${station.color} rounded-full mr-2`}
              />
              
              {/* Station icon */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all border-2 
                  ${activeSection === station.id 
                    ? `border-${station.color.split('-')[1]} bg-${station.color.split('-')[1]}/20 shadow-lg shadow-${station.color.split('-')[1]}/20`
                    : visitedSections.includes(station.id)
                      ? "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
              >
                <div className={`transition-colors ${
                  activeSection === station.id
                    ? `text-${station.color.split('-')[1]}`
                    : "text-gray-600 dark:text-gray-400"
                }`}>
                  {station.icon}
                </div>
                
                {/* Status indicator dot */}
                {visitedSections.includes(station.id) && activeSection !== station.id && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </div>
              
              {/* Station label - shown on hover */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: showLabels ? 1 : 0,
                  x: showLabels ? 0 : -10
                }}
                className="absolute right-14 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg min-w-48"
              >
                <p className="text-sm font-medium whitespace-nowrap">{station.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{station.description}</p>
              </motion.div>
            </div>
          </a>
        ))}
      </div>
      
      {/* Quick info panel - shows at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: activeSection !== 'home' ? 0 : 100, 
          opacity: activeSection !== 'home' ? 1 : 0 
        }}
        className="fixed bottom-6 right-6 left-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 rounded-lg shadow-lg max-w-xs ml-auto z-30"
      >
        <div className="flex items-start gap-3">
          {stations.find(s => s.id === activeSection)?.icon}
          <div>
            <h4 className="font-medium text-sm">
              Section: {stations.find(s => s.id === activeSection)?.name}
            </h4>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Code size={12} className="mr-1" />
              <span>Sections explorées: {visitedSections.length}/{stations.length}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Hidden reference element to keep the component mounted */}
      <div ref={containerRef} className="hidden" />
    </>
  );
};

export default LaboratoryNavigation;