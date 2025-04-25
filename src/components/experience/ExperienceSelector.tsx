import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '../../context/ExperienceContext';
import { Settings, Monitor, Beaker, Train, Grid3X3, Code, BriefcaseBusiness, Palette } from 'lucide-react';
import { cn } from '../../utils/cn';

const ExperienceSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    state, 
    setNavigationMode, 
    setAnimationLevel, 
    setUserRole 
  } = useExperience();
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full bg-primary text-white shadow-lg flex items-center gap-2"
      >
        <Settings size={20} />
        <span className="text-sm font-medium">Personnaliser</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2">Personnalisez votre expérience</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adaptez votre navigation selon vos préférences
                </p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Mode de navigation */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Mode de navigation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNavigationMode('default')}
                      className={cn(
                        "p-4 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.navigationMode === 'default'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Monitor size={24} className="mb-2" />
                      <span className="font-medium">Standard</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Navigation classique
                      </span>
                    </button>
                    
                    <button
                      onClick={() => setNavigationMode('laboratory')}
                      className={cn(
                        "p-4 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.navigationMode === 'laboratory'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Beaker size={24} className="mb-2" />
                      <span className="font-medium">Laboratoire</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Exploration interactive
                      </span>
                    </button>
                    
                    <button
                      onClick={() => setNavigationMode('journey')}
                      className={cn(
                        "p-4 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.navigationMode === 'journey'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Train size={24} className="mb-2" />
                      <span className="font-medium">Voyage</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Défilement horizontal
                      </span>
                    </button>
                    
                    <button
                      onClick={() => setNavigationMode('isometric')}
                      className={cn(
                        "p-4 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.navigationMode === 'isometric'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Grid3X3 size={24} className="mb-2" />
                      <span className="font-medium">Isométrique</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Vue d'ensemble
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Niveau d'animation */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Niveau d'animation</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setAnimationLevel('minimal')}
                      className={cn(
                        "p-3 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.animationLevel === 'minimal'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <span className="font-medium">Minimal</span>
                    </button>
                    
                    <button
                      onClick={() => setAnimationLevel('medium')}
                      className={cn(
                        "p-3 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.animationLevel === 'medium'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <span className="font-medium">Modéré</span>
                    </button>
                    
                    <button
                      onClick={() => setAnimationLevel('full')}
                      className={cn(
                        "p-3 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.animationLevel === 'full'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <span className="font-medium">Complet</span>
                    </button>
                  </div>
                </div>
                
                {/* Profil utilisateur */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Je suis...</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setUserRole('developer')}
                      className={cn(
                        "p-3 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.userRole === 'developer'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Code size={20} className="mb-1" />
                      <span className="font-medium">Développeur</span>
                    </button>
                    
                    <button
                      onClick={() => setUserRole('designer')}
                      className={cn(
                        "p-3 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.userRole === 'designer'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <Palette size={20} className="mb-1" />
                      <span className="font-medium">Designer</span>
                    </button>
                    
                    <button
                      onClick={() => setUserRole('recruiter')}
                      className={cn(
                        "p-3 rounded-lg flex flex-col items-center text-center border transition-all",
                        state.userRole === 'recruiter'
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <BriefcaseBusiness size={20} className="mb-1" />
                      <span className="font-medium">Recruteur</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceSelector;