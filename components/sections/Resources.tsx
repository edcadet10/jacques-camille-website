import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Resource interface
interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide';
  description: string;
  imagePath: string;
  link: string;
}

// Resource data
const resources: Resource[] = [
  {
    id: 'total-leader',
    title: "The Total Leader® Process",
    type: 'article',
    description: "A holistic approach to leadership that integrates personal growth with organizational success.",
    imagePath: "/images/resource-total-leader.svg",
    link: "#"
  },
  {
    id: 'women-leadership',
    title: "Leadership for Women Program",
    type: 'guide',
    description: "Transformative initiatives to empower women leaders by addressing unique challenges.",
    imagePath: "/images/resource-placeholder.svg",
    link: "#"
  },
  {
    id: 'productivity',
    title: "Productivity Techniques Workshop",
    type: 'video',
    description: "Practical strategies and insights to boost efficiency and achieve measurable results.",
    imagePath: "/images/resource-placeholder.svg",
    link: "#"
  },
  {
    id: 'strategic-planning',
    title: "Strategic Planning Framework",
    type: 'guide',
    description: "A comprehensive guide to developing and implementing effective strategic plans.",
    imagePath: "/images/resource-placeholder.svg",
    link: "#"
  },
  {
    id: 'team-building',
    title: "Team Building Activities",
    type: 'video',
    description: "Engaging activities designed to enhance team cohesion and collaboration.",
    imagePath: "/images/resource-placeholder.svg",
    link: "#"
  },
  {
    id: 'organizational-excellence',
    title: "Organizational Excellence",
    type: 'article',
    description: "Insights on cultivating a culture of excellence and continuous improvement.",
    imagePath: "/images/resource-placeholder.svg",
    link: "#"
  }
];

export default function Resources() {
  const [filter, setFilter] = useState<string>('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Filter resources when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(resource => resource.type === filter));
    }
  }, [filter]);

  // Get filter button class based on active state
  const getFilterButtonClass = (buttonFilter: string) => {
    return `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      filter === buttonFilter 
        ? 'bg-primary-blue text-white shadow-md' 
        : 'bg-white text-gray-dark hover:bg-gray-100'
    }`;
  };

  return (
    <section id="resources" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-blue/5 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-gold/5 rounded-tr-full -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 inline-block relative">
            Resources
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-gold"></span>
          </h2>
          <p className="text-gray-dark max-w-3xl mx-auto text-lg">
            Explore articles, videos, and guides on leadership and organizational development
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={getFilterButtonClass('all')}
          >
            All Resources
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('article')}
            className={getFilterButtonClass('article')}
          >
            Articles
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('video')}
            className={getFilterButtonClass('video')}
          >
            Videos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('guide')}
            className={getFilterButtonClass('guide')}
          >
            Guides
          </motion.button>
        </div>
        
        {/* Resources grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-gold/20 z-10"></div>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-dark">Resource Image</span>
                  </div>
                  <div className={`absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-xs font-semibold ${
                    resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'video' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-primary-dark mb-2 group-hover:text-primary-blue transition-colors duration-200">
                    {resource.title}
                  </h3>
                  <p className="text-gray-dark mb-6">
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    className="text-primary-blue hover:text-primary-gold transition-colors duration-200 font-medium inline-flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* No results message */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <p className="text-gray-dark text-lg">No resources found for the selected filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}