import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../utils/cn';

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  noOverflow?: boolean;
  gradient?: 'blue' | 'purple' | 'green' | 'none';
}

const SectionContainer = ({
  id,
  children,
  className,
  fullHeight = true,
  noOverflow = false,
  gradient = 'none'
}: SectionContainerProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Définir les classes de gradient
  const gradientClasses = {
    blue: 'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-blue-500/5 before:via-transparent before:to-transparent dark:before:from-blue-500/10',
    purple: 'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-tl before:from-purple-500/5 before:via-transparent before:to-transparent dark:before:from-purple-500/10',
    green: 'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-tr before:from-green-500/5 before:via-transparent before:to-transparent dark:before:from-green-500/10',
    none: ''
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300',
        fullHeight && 'h-screen',
        noOverflow ? '' : 'overflow-hidden',
        gradientClasses[gradient],
        className
      )}
    >
      <div className={cn(
        'absolute inset-0',
        !noOverflow && 'overflow-y-auto'
      )}>
        <div className={cn(
          fullHeight ? 'min-h-full' : '',
          'py-20 px-4'
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionContainer;