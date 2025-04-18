import { motion } from 'framer-motion';
import Logo from '@components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="flex items-center mb-4">
              <Logo isLight size={40} />
              <div className="ml-4">
                <h3 className="font-heading font-bold text-xl">Jacques Evens Camille</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Executive Leadership Coach | Organizational Development Expert | Business Consultant | Market Systems Development Specialist based in Kigali, Rwanda.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-gold transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-xl font-heading font-semibold mb-4 border-b border-primary-gold pb-2">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#about" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">About</a>
              <a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Services</a>
              <a href="#timeline" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Journey</a>
              <a href="#conversation" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Connect</a>
              <a href="#resources" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Resources</a>
              <a href="#contact" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Contact</a>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-xl font-heading font-semibold mb-4 border-b border-primary-gold pb-2">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Executive Leadership Coaching</a></li>
              <li><a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Organizational Development</a></li>
              <li><a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Strategic Planning</a></li>
              <li><a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Team Development</a></li>
              <li><a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Management Consulting & Strategy</a></li>
              <li><a href="#services" className="block text-gray-300 hover:text-primary-gold transition-colors duration-200">Capacity Building</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-xl font-heading font-semibold mb-4 border-b border-primary-gold pb-2">Newsletter</h3>
            <p className="text-gray-300 mb-4">Stay updated with my latest insights and events.</p>
            <form className="space-y-2">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary-gold text-primary-dark font-semibold rounded hover:bg-opacity-90 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-700 text-center"
        >
          <p className="text-gray-400">
            &copy; {currentYear} Jacques Evens Camille. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}