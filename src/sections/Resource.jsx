import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Globe from '../../components/globe';
import * as THREE from 'three';

const Resources = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const brainRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hoveredCard, setHoveredCard] = useState(null);

  // Course data with smaller cards
  const courses = [
    {
      id: 1,
      title: "Quantum Computing Fundamentals",
      description: "Master quantum mechanics, gates, and algorithms with simulators.",
      duration: "12 weeks",
      level: "Intermediate",
      students: "2.5K+",
      position: "left-top",
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      lineColor: "#3b82f6"
    },
    {
      id: 2,
      title: "Advanced AI & Machine Learning",
      description: "Deep dive into neural networks and cutting-edge AI research.",
      duration: "16 weeks",
      level: "Advanced",
      students: "3.8K+",
      position: "left-middle",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      lineColor: "#10b981"
    },
    {
      id: 3,
      title: "IoT System Architecture",
      description: "Design scalable IoT solutions with edge computing patterns.",
      duration: "10 weeks",
      level: "Intermediate",
      students: "1.9K+",
      position: "left-bottom",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      lineColor: "#f97316"
    },
    {
      id: 4,
      title: "Quantum Algorithms & Cryptography",
      description: "Explore Shor's algorithm and post-quantum cryptography.",
      duration: "14 weeks",
      level: "Advanced",
      students: "1.2K+",
      position: "right-top",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-600",
      lineColor: "#a855f7"
    },
    {
      id: 5,
      title: "Neural Networks & Deep Learning",
      description: "Build sophisticated architectures and deep learning models.",
      duration: "18 weeks",
      level: "Advanced",
      students: "4.1K+",
      position: "right-middle",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      lineColor: "#06b6d4"
    },
    {
      id: 6,
      title: "Smart IoT Applications",
      description: "Create intelligent IoT ecosystems with AI integration.",
      duration: "12 weeks",
      level: "Intermediate",
      students: "2.7K+",
      position: "right-bottom",
      gradient: "from-yellow-500 via-amber-500 to-orange-600",
      lineColor: "#eab308"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const titleVariants = {
    hidden: { y: -60, opacity: 0, rotateX: -45 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.6,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const globeVariants = {
    hidden: { scale: 0, rotateY: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 1
      }
    }
  };

  const getCardPosition = (position) => {
    const positions = {
      'left-top': 'top-8 left-8',
      'left-middle': 'top-1/2 -translate-y-1/2 left-8',
      'left-bottom': 'bottom-8 left-8',
      'right-top': 'top-8 right-8',
      'right-middle': 'top-1/2 -translate-y-1/2 right-8',
      'right-bottom': 'bottom-8 right-8'
    };
    return positions[position];
  };

  // Get connection line path from card to center
  const getConnectionPath = (position) => {
    const centerX = 400; // Half of container width (800px)
    const centerY = 400; // Half of container height (800px)
    
    const cardPositions = {
      'left-top': { x: 40, y: 120 },
      'left-middle': { x: 50, y: 400 },
      'left-bottom': { x: 50, y: 680 },
      'right-top': { x: 750, y: 120 },
      'right-middle': { x: 750, y: 400 },
      'right-bottom': { x: 750, y: 680 }
    };

    const cardPos = cardPositions[position];
    const controlX = (cardPos.x + centerX) / 2;
    const controlY = (cardPos.y + centerY) / 2 - 50; // Add curve

    return `M ${cardPos.x} ${cardPos.y} Q ${controlX} ${controlY} ${centerX} ${centerY}`;
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden py-24">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(1000px circle at 30% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
            "radial-gradient(1000px circle at 70% 70%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
            "radial-gradient(1000px circle at 50% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
            "radial-gradient(1000px circle at 80% 20%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div 
          className="text-center mb-20"
          variants={titleVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            style={{
              background: "linear-gradient(45deg, #ffffff, #3b82f6, #10b981)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Learning Resources
          </motion.h2>
          
          <motion.div 
            className="relative w-40 h-1 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full" />
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Explore our comprehensive courses designed to unlock the potential of emerging technologies
          </motion.p>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative max-w-7xl mx-auto">
          {/* Course Cards Container */}
          <div className="relative w-full" style={{ height: '800px' }}>
            {/* Connection Lines SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              style={{ width: '800px', height: '800px', left: '50%', transform: 'translateX(-50%)' }}
            >
              {courses.map((course, index) => (
                <motion.path
                  key={`line-${course.id}`}
                  d={getConnectionPath(course.position)}
                  fill="none"
                  stroke={course.lineColor}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 2 + index * 0.3 }}
                  className="drop-shadow-glow"
                  style={{
                    filter: `drop-shadow(0 0 4px ${course.lineColor}40)`
                  }}
                />
              ))}
            </svg>

            {/* Animated Globe in Center */}
           <section className="w-full h-screen flex justify-center items-center">
            <Globe />
           </section>
            
            {/* Course Cards - Now Smaller */}
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className={`absolute w-64 ${getCardPosition(course.position)} z-30`}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 1.5 + index * 0.2 }}
                onHoverStart={() => setHoveredCard(course.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div
                  className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-white/10 rounded-full text-xs font-semibold text-white tracking-wide">
                        {course.level}
                      </span>
                      <span className="text-xs text-gray-400">
                        {course.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span className="text-xs text-gray-400">{course.students}</span>
                      </div>
                      
                      <motion.button
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover effect particles */}
                  {hoveredCard === course.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 4 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          initial={{ 
                            opacity: 0,
                            x: Math.random() * 240,
                            y: Math.random() * 160
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: Math.random() * 240,
                            y: Math.random() * 160
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;