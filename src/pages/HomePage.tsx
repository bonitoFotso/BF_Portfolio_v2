import { useRef } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={sectionsRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </motion.div>
  );
};

export default HomePage;