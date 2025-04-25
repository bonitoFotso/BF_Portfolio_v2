import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../utils/cn';

interface BackgroundDecorationsProps {
  type?: 'dots' | 'grid' | 'waves' | 'circuit';
  primaryColor?: boolean;
  density?: 'low' | 'medium' | 'high';
  parallax?: boolean;
  opacity?: number;
  className?: string;
}

const BackgroundDecorations = ({
  type = 'dots',
  primaryColor = false,
  density = 'medium',
  parallax = true,
  opacity = 0.05,
  className
}: BackgroundDecorationsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const getPatternUrl = () => {
    // Patterns SVG pour différents types de décorations
    const patterns = {
      dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23000000' fill-opacity='${opacity}'/%3E%3C/svg%3E")`,
      grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23000000' fill-opacity='${opacity}'/%3E%3C/svg%3E")`,
      waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C30 0, 70 0, 100 10 C70 20, 30 20, 0 10z' fill='%23000000' fill-opacity='${opacity}'/%3E%3C/svg%3E")`,
      circuit: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23000000' fill-opacity='${opacity}'/%3E%3C/svg%3E")`
    };
    
    return patterns[type];
  };
  
  const getDensity = () => {
    const densities = {
      low: '100px',
      medium: '60px',
      high: '30px'
    };
    
    return densities[density];
  };
  
  return (
    <motion.div
      ref={containerRef}
      style={{ y: parallax ? y : 0 }}
      className={cn(
        "absolute inset-0 pointer-events-none -z-10",
        primaryColor ? "dark:opacity-20" : "opacity-5 dark:opacity-10",
        className
      )}
    >
      <div 
        className="h-full w-full"
        style={{
          backgroundImage: getPatternUrl(),
          backgroundSize: getDensity()
        }}
      />
    </motion.div>
  );
};

export default BackgroundDecorations;