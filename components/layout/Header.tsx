import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@components/ui/Logo';

interface HeaderProps {
  scrollY: number;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ scrollY, isMenuOpen, toggleMenu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  // Update header styling based on scroll position
  useEffect(() => {
    if (scrollY > 50) {
      setIsScrolled(true);
      controls.start({ 
        height: '70px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(255, 255, 255, 0.98)'
      });
    } else {
      setIsScrolled(false);
      controls.start({ 
        height: '90px',
        boxShadow: 'none',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      });
    }
  }, [scrollY, controls]);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.header
      className="fixed w-full z-50 transition-all"
      initial={{ height: '90px', backgroundColor: 'rgba(255, 255, 255, 1)' }}
      animate={controls}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <motion.div
          className="flex items-center"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative overflow-hidden rounded-full">
            <Image
              src="/images/JEC.png"
              alt="Jacques Evens Camille"
              width={isScrolled ? 50 : 60}
              height={isScrolled ? 50 : 60}
              className="object-cover transition-all duration-300"
            />
          </div>
          <div className="ml-4">
            <h1 className={`font-heading font-bold ${isScrolled ? 'text-xl' : 'text-2xl'} text-primary-dark transition-all duration-300`}>
              Jacques Evens Camille
            </h1>
            <p className={`text-gray-medium ${isScrolled ? 'text-sm' : 'text-base'} transition-all duration-300`}>
              Empowering Leaders, Transforming Organizations
            </p>
          </div>
        </motion.div>

        <div className="flex items-center">
          <motion.div
            className="hidden lg:block"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <nav className="flex space-x-6">
              <motion.a 
                href="#about" 
                className="text-primary-dark hover:text-primary-gold transition-colors duration-200 relative group"
                variants={navItemVariants}
              >
                About
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a 
                href="#services" 
                className="text-primary-dark hover:text-primary-gold transition-colors duration-200 relative group"
                variants={navItemVariants}
              >
                Services
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a 
                href="#timeline" 
                className="text-primary-dark hover:text-primary-gold transition-colors duration-200 relative group"
                variants={navItemVariants}
              >
                Journey
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a 
                href="#conversation" 
                className="text-primary-dark hover:text-primary-gold transition-colors duration-200 relative group"
                variants={navItemVariants}
              >
                Connect
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a 
                href="#resources" 
                className="text-primary-dark hover:text-primary-gold transition-colors duration-200 relative group"
                variants={navItemVariants}
              >
                Resources
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
              <motion.a 
                href="#contact" 
                className="text-primary-dark hover:text-primary-gold transition-colors duration-200 relative group"
                variants={navItemVariants}
              >
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            </nav>
          </motion.div>

          <div className="ml-6 lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span 
                className="block w-6 h-0.5 bg-primary-dark"
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.span>
              <motion.span 
                className="block w-6 h-0.5 bg-primary-dark"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              ></motion.span>
              <motion.span 
                className="block w-6 h-0.5 bg-primary-dark"
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}