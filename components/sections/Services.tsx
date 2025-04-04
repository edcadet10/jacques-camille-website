import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
}

// Services data
const services: Service[] = [
  {
    id: 'leadership-coaching',
    title: 'Executive Leadership Coaching',
    shortDescription: 'Personalized coaching for senior leaders to enhance their capabilities and effectiveness.',
    fullDescription: 'My leadership coaching approach is personalized and focuses on enhancing leadership capabilities, strategic thinking, and personal effectiveness.',
    icon: (
      <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    )
  },
  {
    id: 'organizational-development',
    title: 'Organizational Development',
    shortDescription: 'Transforming organizational structures, processes, and culture for improved performance.',
    fullDescription: 'My organizational development services involve comprehensive interventions to transform organizational structures, processes, and culture.',
    icon: (
      <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    )
  },
  {
    id: 'strategic-planning',
    title: 'Strategic Planning',
    shortDescription: 'Developing and implementing effective strategic plans aligned with vision and goals.',
    fullDescription: 'My strategic planning services help organizations develop and implement effective plans aligned with their vision and goals.',
    icon: (
      <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
    )
  },
  {
    id: 'team-development',
    title: 'Team Development',
    shortDescription: 'Enhancing team cohesion, communication, and performance through tailored interventions.',
    fullDescription: 'I offer specialized programs to enhance team cohesion, communication, and performance.',
    icon: (
      <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    )
  },
  {
    id: 'project-management',
    title: 'Project Management',
    shortDescription: 'Expert planning, execution, and evaluation of projects across multiple sectors.',
    fullDescription: 'With my expertise in project management, I provide guidance on planning, execution, and evaluation of projects across various sectors.',
    icon: (
      <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
    )
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building',
    shortDescription: 'Comprehensive training programs to empower individuals and teams with needed skills.',
    fullDescription: 'I design and deliver comprehensive training programs that empower individuals and teams with the skills needed for success.',
    icon: (
      <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    )
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-primary-blue/5 rounded-br-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-primary-gold/5 rounded-tl-full -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 inline-block relative">
            Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-gold"></span>
          </h2>
          <p className="text-gray-dark max-w-3xl mx-auto text-lg">
            Tailored solutions to empower leaders and transform organizations for optimal performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-lg p-6 shadow-lg border-t-4 ${
                activeService === service.id ? 'border-primary-gold' : 'border-transparent'
              } transition-all hover:shadow-xl`}
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-primary-blue/10 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-dark">{service.title}</h3>
              </div>
              
              <p className="text-gray-dark mb-4">
                {service.shortDescription}
              </p>
              
              <AnimatePresence>
                {activeService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-dark mb-4 pt-2 border-t border-gray-200">
                      {service.fullDescription}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={() => toggleService(service.id)}
                className="text-primary-blue hover:text-primary-gold transition-colors duration-200 font-medium flex items-center"
              >
                {activeService === service.id ? 'Read Less' : 'Read More'}
                <svg
                  className={`w-5 h-5 ml-1 transform transition-transform duration-200 ${
                    activeService === service.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="px-8 py-4 bg-primary-blue text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 shadow-md inline-flex items-center"
          >
            Discuss Your Needs
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}