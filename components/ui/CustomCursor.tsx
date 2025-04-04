import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorStyle = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(computedStyle.cursor === 'pointer');

        // Check if we're hovering over a button, link, etc.
        const isClickable = 
          hoveredElement.tagName === 'BUTTON' || 
          hoveredElement.tagName === 'A' || 
          hoveredElement.tagName === 'INPUT' ||
          hoveredElement.classList.contains('cursor-pointer');
        
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousemove', updateCursorStyle);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', updateCursorStyle);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position.x, position.y]);

  // Only show custom cursor on desktop devices
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ 
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 35,
          opacity: { duration: 0.2 }
        }}
      >
        <motion.div 
          className="cursor-dot"
          animate={{
            scale: isPointer ? 0.5 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div 
          className="cursor-outline"
          animate={{
            scale: isPointer ? 1.2 : 1,
            borderColor: isPointer ? 'rgba(196, 163, 90, 0.5)' : 'rgba(255, 255, 255, 0.5)'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <style jsx global>{`
        * {
          cursor: none;
        }
        
        @media (max-width: 1024px) {
          * {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
}