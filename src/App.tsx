import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AIChat from './components/features/AIChat';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { i18n } = useTranslation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Update the page title based on the current language
    document.title = i18n.t('site.title');
    
    // Set the document language attribute for accessibility
    document.documentElement.lang = language;
    
    // Add a data-language attribute to the html element for CSS targeting
    document.documentElement.setAttribute('data-language', language);
  }, [language, i18n]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow scroll-container">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:lang" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;