import { useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';


interface ScrollProgressOptions {
  target?: React.RefObject<HTMLElement>;
  offset?: [string, string];
  scrollThreshold?: number;
  smooth?: boolean;
}

export const useScrollProgress = (options: ScrollProgressOptions = {}) => {
  const {
    target,
    offset = ["start end", "end start"],
    scrollThreshold = 100,
    smooth = true
  } = options;
  
  const defaultRef = useRef<HTMLElement>(null);
  const targetRef = target || defaultRef;
  
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset
  });
  
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const smoothProgress = smooth ? springProgress : scrollYProgress;
  
  // Transformations utiles
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(smoothProgress, [0, 1], [50, 0]);
  
  // Détecter si l'utilisateur a défilé au-delà du seuil
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold && !hasScrolled) {
        setHasScrolled(true);
      } else if (window.scrollY <= scrollThreshold && hasScrolled) {
        setHasScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, scrollThreshold]);
  
  return {
    progress: smoothProgress,
    rawProgress: scrollYProgress,
    hasScrolled,
    opacity,
    scale,
    y,
    ref: targetRef
  };
};