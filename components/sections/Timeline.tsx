import { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Timeline entry interface
interface TimelineEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
  isHighlight?: boolean;
}

// Timeline data
const timelineData: TimelineEntry[] = [
  {
    year: "Present",
    title: "Executive Leadership Coach & Organizational Development Consultant",
    organization: "Leadership Management International (LMI) East Africa",
    description: "Providing tailored executive coaching and capacity-building support to senior leaders across public and private sectors in Rwanda and East Africa.",
    isHighlight: true
  },
  {
    year: "2022-2023",
    title: "Master of Business Administration (MBA), Project Management",
    organization: "Universidad Católica San Antonio de Murcia (UCAM)",
    description: "Focused on Strategic Management and Leadership, Strategic Project Management, and Change Management.",
  },
  {
    year: "2018-2021",
    title: "Master of Social Work (MSW), International Cooperation and Humanitarian Aid",
    organization: "KALU Institute",
    description: "Studied International Cooperation, Humanitarian Aid, and Logical Framework Analysis.",
  },
  {
    year: "2014-2016",
    title: "Head of Training for SMEs and External Services",
    organization: "Entrepreneurs du Monde – Haiti",
    description: "Designed, coordinated, and evaluated training programs aimed at empowering entrepreneurs and small to medium-sized enterprises.",
    isHighlight: true
  },
  {
    year: "Prior",
    title: "Educational Director and Full-Time Instructor",
    organization: "ETRE Ayisyen Institut Entrepreneurial – Haiti",
    description: "Oversaw pedagogical coordination of school programs designed to foster youth entrepreneurship.",
  }
];

export default function Timeline() {
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
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Use this to create a parallax effect
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="timeline" className="py-20 bg-gray-light relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/3 h-full bg-primary-gold/5 -z-10"
        style={{ y: parallaxY }}
      ></motion.div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            variants={headerVariants}
            className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 inline-block relative"
          >
            Professional Journey
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-gold"></span>
          </motion.h2>
          <motion.p 
            variants={headerVariants}
            className="text-gray-dark max-w-3xl mx-auto text-lg"
          >
            Explore my path through leadership development, education, and organizational transformation
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-blue/30"></div>
          
          {/* Timeline entries */}
          {timelineData.map((entry, index) => (
            <TimelineItem 
              key={index} 
              entry={entry} 
              index={index} 
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Timeline item component
function TimelineItem({ 
  entry, 
  index, 
  isLast 
}: { 
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-center mb-20 ${isLast ? 'mb-0' : ''}`}
    >
      {/* Circle on timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-primary-blue z-10"></div>
      
      {/* Year marker */}
      <div className={`absolute left-1/2 transform ${isEven ? '-translate-x-[calc(100%+1rem)]' : 'translate-x-[1rem]'} text-lg font-heading ${entry.isHighlight ? 'text-primary-gold font-bold' : 'text-primary-blue'} top-[-30px]`}>
        {entry.year}
      </div>
      
      {/* Content box */}
      <div className={`w-[calc(50%-3rem)] ${isEven ? 'mr-auto pr-8' : 'ml-auto pl-8'} mt-6`}>
        <div className={`bg-white p-6 rounded-lg shadow-md ${entry.isHighlight ? 'border-l-4 border-primary-gold' : ''}`}>
          <h3 className="text-xl font-heading font-semibold text-primary-dark mb-1">
            {entry.title}
          </h3>
          <p className="text-primary-blue font-medium mb-3">{entry.organization}</p>
          <p className="text-gray-dark">{entry.description}</p>
        </div>
      </div>
    </motion.div>
  );
}