import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Beaker, TestTube, Microscope, Atom } from 'lucide-react';
import { useExperience } from '../../context/ExperienceContext';
import { cn } from '../../utils/cn';

interface LabStation {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

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
    icon: <Atom size={24} />,
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
  }
];

const LaboratoryNavigation = () => {
  const { state, addVisitedSection } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Détection de la section active
  const { scrollY } = useScroll();
  const activeSection = useRef('home');
  
  // Effet de parallaxe
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);
  
  // Observer les sections pour détecter laquelle est visible
  useEffect(() => {
    const sectionElements = stations.map(s => document.getElementById(s.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            activeSection.current = id;
            addVisitedSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    sectionElements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      sectionElements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, [addVisitedSection]);
  
  // Animation des éléments de laboratoire
  useEffect(() => {
    // Animation uniquement si le mode laboratoire est actif
    if (state.navigationMode !== 'laboratory') return;
    
    const animateLabElements = () => {
      // Simulation d'éléments de laboratoire animés
      const bubbles = document.querySelectorAll('.lab-bubble');
      bubbles.forEach((bubble, index) => {
        const el = bubble as HTMLElement;
        const delay = index * 0.2;
        const duration = 2 + Math.random() * 3;
        
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      });
    };
    
    animateLabElements();
  }, [state.navigationMode]);
  
  return (
    <>
      {/* Overlay du laboratoire visible uniquement en mode laboratoire */}
      {state.navigationMode === 'laboratory' && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Arrière-plan avec effets */}
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-gray-900/0 dark:from-gray-900/30 dark:to-gray-900/10"
          />
          
          {/* Éléments décoratifs de laboratoire */}
          <div className="absolute inset-0">
            {/* Bulles animées */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="lab-bubble absolute rounded-full bg-primary/10 dark:bg-primary/20"
                style={{
                  width: `${20 + Math.random() * 30}px`,
                  height: `${20 + Math.random() * 30}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.2 + Math.random() * 0.5
                }}
              />
            ))}
            
            {/* Tubes à essai */}
            <div className="absolute top-20 right-10 w-10 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-b-full">
              <div className="absolute bottom-0 w-full h-1/3 bg-purple-500/30 dark:bg-purple-500/40 rounded-b-full" />
            </div>
            
            <div className="absolute bottom-40 left-10 w-8 h-32 bg-green-500/10 dark:bg-green-500/20 rounded-b-full">
              <div className="absolute bottom-0 w-full h-1/4 bg-green-500/30 dark:bg-green-500/40 rounded-b-full" />
            </div>
            
            {/* Grille de laboratoire */}
            <div className="absolute inset-0 from-transparent via-gray-500/5 to-transparent bg-[length:50px_50px] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]" />
          </div>
          
          {/* Menu de navigation laboratoire */}
          <div className="absolute top-1/2 right-6 transform -translate-y-1/2 space-y-4">
            {stations.map((station) => (
              <a
                key={station.id}
                href={`#${station.id}`}
                className="pointer-events-auto group"
              >
                <div className="relative flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeSection.current === station.id ? 40 : 0 
                    }}
                    className={`h-1 bg-gradient-to-r ${station.color} rounded-full mr-2`}
                  />
                  
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                      "border-2",
                      activeSection.current === station.id
                        ? `border-${station.color.split('-')[1]} bg-${station.color.split('-')[1]}/20 shadow-lg shadow-${station.color.split('-')[1]}/20`
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    )}
                  >
                    <div className={cn(
                      "transition-colors",
                      activeSection.current === station.id
                        ? `text-${station.color.split('-')[1]}`
                        : "text-gray-600 dark:text-gray-400"
                    )}>
                      {station.icon}
                    </div>
                  </div>
                  
                  {/* Étiquette */}
                  <div className="absolute right-14 transition-all opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg">
                    <p className="text-sm font-medium whitespace-nowrap">{station.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{station.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Container visible quel que soit le mode de navigation */}
      <div ref={containerRef} className="hidden md:block">
        {/* Placeholder pour maintenir la structure même si le contenu est caché */}
        <div className="fixed top-1/2 right-6 transform -translate-y-1/2 space-y-4">
          {stations.map((station) => (
            <div key={station.id} className="w-12 h-12 opacity-0" />
          ))}
        </div>
      </div>
    </>
  );
};

export default LaboratoryNavigation;