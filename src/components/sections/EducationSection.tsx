import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

type Degree = {
  degree: string;
  institution: string;
  year: string;
};

const EducationSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Get education data from translations
  const degrees: Degree[] = t('education.degrees', { returnObjects: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('education.title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-8">
            {degrees.map((degree, index) => (
              <motion.div
                key={`${degree.degree}-${index}`}
                variants={item}
                className="flex bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-600"
              >
                <div className="mr-6 flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{degree.degree}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400">
                    <span>{degree.institution}</span>
                    <span className="hidden sm:block mx-2">•</span>
                    <span className="flex items-center mt-1 sm:mt-0">
                      <Calendar size={14} className="mr-1" /> {degree.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;