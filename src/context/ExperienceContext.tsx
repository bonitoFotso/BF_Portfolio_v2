import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type NavigationMode = 'default' | 'laboratory' | 'journey' | 'isometric';
type AnimationLevel = 'minimal' | 'medium' | 'full';
type UserRole = 'developer' | 'designer' | 'recruiter' | 'general';

interface ExperienceState {
  navigationMode: NavigationMode;
  animationLevel: AnimationLevel;
  userRole: UserRole;
  quickView: boolean;
  hasExplored: boolean;
  visitedSections: string[];
  lastInteraction: Date;
}

interface ExperienceContextType {
  state: ExperienceState;
  setNavigationMode: (mode: NavigationMode) => void;
  setAnimationLevel: (level: AnimationLevel) => void;
  setUserRole: (role: UserRole) => void;
  toggleQuickView: () => void;
  addVisitedSection: (section: string) => void;
  resetExperience: () => void;
}

const defaultState: ExperienceState = {
  navigationMode: 'default',
  animationLevel: 'medium',
  userRole: 'general',
  quickView: false,
  hasExplored: false,
  visitedSections: [],
  lastInteraction: new Date()
};

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ExperienceState>(() => {
    // Récupérer les paramètres sauvegardés s'ils existent
    const savedState = localStorage.getItem('portfolio-experience');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  // Enregistrer les changements dans localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-experience', JSON.stringify(state));
  }, [state]);

  // Mettre à jour la date de dernière interaction
  useEffect(() => {
    const updateLastInteraction = () => {
      setState(prev => ({...prev, lastInteraction: new Date()}));
    };

    window.addEventListener('click', updateLastInteraction);
    window.addEventListener('scroll', updateLastInteraction);
    window.addEventListener('keydown', updateLastInteraction);

    return () => {
      window.removeEventListener('click', updateLastInteraction);
      window.removeEventListener('scroll', updateLastInteraction);
      window.removeEventListener('keydown', updateLastInteraction);
    };
  }, []);

  const setNavigationMode = (mode: NavigationMode) => {
    setState(prev => ({...prev, navigationMode: mode}));
  };

  const setAnimationLevel = (level: AnimationLevel) => {
    setState(prev => ({...prev, animationLevel: level}));
  };

  const setUserRole = (role: UserRole) => {
    setState(prev => ({...prev, userRole: role}));
  };

  const toggleQuickView = () => {
    setState(prev => ({...prev, quickView: !prev.quickView}));
  };

  const addVisitedSection = (section: string) => {
    setState(prev => {
      if (prev.visitedSections.includes(section)) return prev;
      return {
        ...prev, 
        visitedSections: [...prev.visitedSections, section],
        hasExplored: true
      };
    });
  };

  const resetExperience = () => {
    setState(defaultState);
  };

  return (
    <ExperienceContext.Provider value={{
      state,
      setNavigationMode,
      setAnimationLevel,
      setUserRole,
      toggleQuickView,
      addVisitedSection,
      resetExperience
    }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};