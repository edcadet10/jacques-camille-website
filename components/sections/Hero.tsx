import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Hero() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animate wavy background
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Wave properties
    const waves = [
      { y: 0.5, length: 0.01, amplitude: 30, speed: 0.006, color: 'rgba(30, 95, 116, 0.1)' },
      { y: 0.6, length: 0.015, amplitude: 20, speed: 0.008, color: 'rgba(30, 95, 116, 0.07)' },
      { y: 0.4, length: 0.02, amplitude: 10, speed: 0.01, color: 'rgba(196, 163, 90, 0.05)' }
    ];

    let animationFrameId: number;
    let time = 0;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * wave.y);

        for (let x = 0; x < canvas.width; x++) {
          const dx = x * wave.length;
          const y = Math.sin(dx + time * wave.speed) * wave.amplitude;
          ctx.lineTo(x, canvas.height * wave.y + y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Start animations when section is in view
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden" id="hero">
      {/* Animated wavy background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{ opacity: 0.7 }}
      ></canvas>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center pt-20">
        <motion.div
          ref={ref}
          className="lg:w-1/2 mb-10 lg:mb-0 z-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-primary-dark leading-tight"
            variants={itemVariants}
          >
            Empowering Leaders, <br/>
            <span className="text-primary-blue">Transforming</span> Organizations
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-dark mb-8 max-w-xl"
            variants={itemVariants}
          >
            I'm Jacques Evens Camille, an Executive Leadership Coach and Organizational Development Expert with a passion for helping leaders and organizations reach their full potential.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <a 
              href="#conversation" 
              className="px-6 py-3 bg-primary-blue text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300 shadow-lg flex items-center group"
            >
              Start a Conversation
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            
            <a 
              href="#about" 
              className="px-6 py-3 border-2 border-primary-blue text-primary-blue font-medium rounded-md hover:bg-primary-blue hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="lg:w-1/2 relative z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Professional headshot of Jacques */}
            <div className="aspect-[3/4] rounded-lg shadow-xl overflow-hidden relative">
              <Image
                src="/images/JEC.png"
                alt="Jacques Evens Camille - Executive Leadership Coach"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/30"></div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-gold/10 rounded-full"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute -top-5 -right-5 w-20 h-20 bg-primary-blue/10 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <a href="#about" className="flex flex-col items-center text-primary-dark">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}