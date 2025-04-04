import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NewsletterSignupForm from './NewsletterSignupForm';
import NewsletterPreview from './NewsletterPreview';

export default function NewsletterSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <section id="newsletter" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 inline-block relative">
            Jacques' Newsletter
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-gold"></span>
          </h2>
          <p className="text-gray-dark max-w-3xl mx-auto text-lg">
            Subscribe to receive leadership insights, practical tips, and exclusive content delivered directly to your inbox.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NewsletterPreview />
          </motion.div>
          
          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-heading font-semibold text-primary-dark mb-4">
              Join the Community
            </h3>
            <p className="text-gray-dark mb-6">
              Over 2,000 leaders and professionals receive Jacques' insights every month. Sign up now and get a free guide on "5 Essential Leadership Practices" as a welcome gift.
            </p>
            
            <NewsletterSignupForm />
            
            <p className="text-xs text-gray-500 mt-4">
              Your privacy is important. I'll never share your information and you can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
