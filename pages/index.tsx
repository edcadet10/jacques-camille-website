import { useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '@components/layout/Layout';
import Hero from '@components/sections/Hero';
import About from '@components/sections/About';
import Services from '@components/sections/Services';
import Conversation from '@components/sections/Conversation';
import Timeline from '@components/sections/Timeline';
import Resources from '@components/sections/Resources';
import Contact from '@components/sections/Contact';
import NewsletterSection from '@components/sections/Newsletter/NewsletterSection';

export default function Home() {
  // Initialize GSAP or other animations on page load
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Jacques Evens Camille - Leadership & Organizational Development</title>
      </Head>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Services />
          <Timeline />
          <Conversation />
          <Resources />
          <NewsletterSection />
          <Contact />
        </motion.div>
      </Layout>
    </>
  );
}