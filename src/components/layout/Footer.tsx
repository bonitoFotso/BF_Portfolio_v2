import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Code } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Fotso Fotso Mossi Bonito
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('site.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {t('nav.title', 'Navigation')}
            </h3>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.home')}
              </a>
              <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.about')}
              </a>
              <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.skills')}
              </a>
              <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.projects')}
              </a>
              <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.contact')}
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {t('contact.availability.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {t('contact.availability.status')}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {t('contact.availability.timezone')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
            {t('footer.made_with')} <Code size={16} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;