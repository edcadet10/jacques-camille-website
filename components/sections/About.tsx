import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-blue/5 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-gold/5 rounded-tr-full -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 inline-block relative"
          >
            About Jacques
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-gold"></span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-dark max-w-3xl mx-auto text-lg"
          >
            A Caribbean native with deep Haitian roots, bringing a multicultural perspective to leadership and organizational development
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-lg relative">
              <Image
                src="/images/JEC.png"
                alt="Jacques Evens Camille - Professional Portrait"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-primary-gold/10 opacity-60"></div>
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-primary-gold rounded-lg z-[-1]"></div>
            
            {/* Experience badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary-blue shadow-lg flex flex-col items-center justify-center text-white transform"
            >
              <span className="text-xl font-bold">10+</span>
              <span className="text-xs">Years Exp.</span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-heading font-semibold text-primary-dark mb-4">Background & Nationality</h3>
            <p className="text-gray-dark mb-6">
              A Caribbean native with deep Haitian roots, I bring a rich, multicultural perspective to my work. 
              I currently reside in Kigali, Rwanda, where my diverse experience across Africa and the Caribbean 
              informs my global outlook on leadership and organizational development.
            </p>
            
            <h3 className="text-2xl font-heading font-semibold text-primary-dark mb-4">Professional Identity</h3>
            <p className="text-gray-dark mb-6">
              As an Executive Leadership Coach, Business Consultant, and Organizational Development Expert, 
              I focus on transforming leaders and organizations through tailored coaching and strategic interventions. 
              I currently serve as an Executive Leadership Coach & Organizational Development Consultant with 
              Leadership Management International (LMI) East Africa.
            </p>
            
            <h3 className="text-2xl font-heading font-semibold text-primary-dark mb-4">Education</h3>
            <ul className="list-disc list-inside text-gray-dark mb-6 ml-4 space-y-2">
              <li>MBA in Project Management from Universidad Católica San Antonio de Murcia (UCAM)</li>
              <li>Master of Social Work in International Cooperation and Humanitarian Aid from KALU Institute</li>
              <li>Studies in Administration and Management from Institut National d'Administration, de Gestion et des Hautes Études Internationales (INAGHEI)</li>
            </ul>
            
            <h3 className="text-2xl font-heading font-semibold text-primary-dark mb-4">Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <LanguageSkill language="English" level="Native" />
              <LanguageSkill language="French" level="Native" />
              <LanguageSkill language="Haitian Creole" level="Native" />
              <LanguageSkill language="Spanish" level="Professional" />
              <LanguageSkill language="Kinyarwanda" level="Elementary" />
              <LanguageSkill language="Kiswahili" level="Basic" />
            </div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-primary-blue text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 shadow-md"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper component for language skills
function LanguageSkill({ language, level }: { language: string; level: string }) {
  return (
    <div className="bg-gray-light rounded-lg p-3 shadow-sm">
      <p className="font-semibold text-primary-dark">{language}</p>
      <p className="text-sm text-gray-medium">{level}</p>
    </div>
  );
}