import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  icon,
  align = 'center',
  className
}: SectionTitleProps) => {
  const alignmentClasses = {
    'left': 'text-left',
    'center': 'text-center mx-auto',
    'right': 'text-right ml-auto'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("max-w-3xl mb-12", alignmentClasses[align], className)}
    >
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
            {icon}
          </div>
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      
      <div className="h-1 w-20 bg-primary mb-6 rounded-full mx-auto"></div>
      
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;