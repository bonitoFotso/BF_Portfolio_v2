import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

type Language = "en" | "fr";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "portfolio-language",
  ...props
}: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize language from URL, localStorage, or browser
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL path first
    const pathLang = location.pathname.split('/')[1];
    if (pathLang === 'fr' || pathLang === 'en') {
      return pathLang as Language;
    }
    
    // Then check localStorage
    const storedLang = localStorage.getItem(storageKey) as Language;
    if (storedLang) return storedLang;
    
    // Finally check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr') return 'fr';
    
    // Default fallback
    return defaultLanguage;
  });

  // Update i18n instance on language change
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem(storageKey, language);
    
    // Update URL to reflect language
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    if (pathSegments[0] === 'en' || pathSegments[0] === 'fr') {
      // Replace language segment
      pathSegments[0] = language;
    } else {
      // Add language segment at the beginning
      pathSegments.unshift(language);
    }
    
    const newPath = `/${pathSegments.join('/')}`;
    if (newPath !== currentPath) {
      navigate(newPath, { replace: true });
    }
  }, [language, i18n, navigate, location, storageKey]);

  // Handle language change
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageProviderContext.Provider 
      {...props} 
      value={{ language, setLanguage }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguageContext must be used within a LanguageProvider");

  return context;
};