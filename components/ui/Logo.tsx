import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  isLight?: boolean;
}

export default function Logo({ size = 50, isLight = false }: LogoProps) {
  const bgColor = isLight ? '#ffffff' : '#1e5f74';
  const textColor = isLight ? '#1e5f74' : '#ffffff';
  const strokeColor = '#c4a35a';

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        fill={bgColor} 
        stroke={strokeColor} 
        strokeWidth="4" 
      />
      
      {/* JEC text */}
      <text 
        x="50" 
        y="55" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="26" 
        fontWeight="700" 
        fill={textColor} 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        JEC
      </text>
      
      {/* Decorative underscore */}
      <motion.path 
        d="M35,64 L65,64" 
        stroke={strokeColor} 
        strokeWidth="3" 
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}