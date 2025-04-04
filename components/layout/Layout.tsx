import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll events to animate header, etc.
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header scrollY={scrollY} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-[80px] left-0 right-0 bg-white shadow-lg z-50"
          >
            <nav className="p-6 space-y-4">
              <a href="#about" className="block py-2 text-primary-dark hover:text-primary-gold transition-colors duration-200 text-xl font-heading font-medium" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
              <a href="#services" className="block py-2 text-primary-dark hover:text-primary-gold transition-colors duration-200 text-xl font-heading font-medium" onClick={() => setIsMenuOpen(false)}>
                Services
              </a>
              <a href="#timeline" className="block py-2 text-primary-dark hover:text-primary-gold transition-colors duration-200 text-xl font-heading font-medium" onClick={() => setIsMenuOpen(false)}>
                Journey
              </a>
              <a href="#conversation" className="block py-2 text-primary-dark hover:text-primary-gold transition-colors duration-200 text-xl font-heading font-medium" onClick={() => setIsMenuOpen(false)}>
                Connect
              </a>
              <a href="#resources" className="block py-2 text-primary-dark hover:text-primary-gold transition-colors duration-200 text-xl font-heading font-medium" onClick={() => setIsMenuOpen(false)}>
                Resources
              </a>
              <a href="#contact" className="block py-2 text-primary-dark hover:text-primary-gold transition-colors duration-200 text-xl font-heading font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}