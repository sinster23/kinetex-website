import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const About = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Updated about data for Kinetix Lab
  const aboutData = [
    {
      id: 1,
      category: "Mission",
      question: "What is our Mission?",
      answer: "Kinetix Lab is dedicated to advancing cutting-edge research in Quantum Computing, Artificial Intelligence, and Internet of Things. We strive to bridge the gap between theoretical innovation and practical implementation, fostering a collaborative environment for breakthrough discoveries.",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      accentColor: "#f97316",
      stats: { research: "Active", focus: "3 Domains", impact: "Global" }
    },
    {
      id: 2,
      category: "Vision",
      question: "What drives our Vision?",
      answer: "To become a globally recognized center of excellence in emerging technologies, creating solutions that transform industries and improve human lives. We envision a future where our research contributes to solving the world's most complex challenges through innovative technology.",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      accentColor: "#3b82f6",
      stats: { recognition: "Global", solutions: "Industry", future: "Focused" }
    },
    {
      id: 3,
      category: "History",
      question: "How did we begin?",
      answer: "Kinetix Lab was established with a vision to create a premier research institution focused on emerging technologies. Founded by visionary educators and researchers, our lab has grown from a small initiative to a recognized center for innovation in quantum computing, AI, and IoT technologies.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      accentColor: "#10b981",
      stats: { established: "2020+", growth: "Exponential", legacy: "Building" }
    },
    {
      id: 4,
      category: "Leadership",
      question: "Meet our Founder",
      answer: "Anjan Bandhyapadhay - Our visionary founder and lead educator, brings decades of experience in technology research and education. Under his leadership, Kinetix Lab has become a beacon of innovation, fostering the next generation of tech pioneers and breakthrough research.",
      gradient: "from-purple-500 via-violet-500 to-pink-500",
      accentColor: "#8b5cf6",
      stats: { experience: "Decades", vision: "Clear", leadership: "Strong" }
    },
    {
      id: 5,
      category: "Co-Founders",
      question: "Our Founding Team",
      answer: "Sujata, Mahendra Gourasaria, and Anil - Our distinguished co-founding educators bring diverse expertise and unwavering commitment to excellence. Together, they form the backbone of Kinetix Lab's academic and research initiatives, each contributing unique perspectives and specialized knowledge.",
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      accentColor: "#f59e0b",
      stats: { cofounders: "3", expertise: "Diverse", commitment: "Total" }
    },
    {
      id: 6,
      category: "Impact",
      question: "What's our Impact?",
      answer: "Kinetix Lab has established strategic collaborations with leading institutions and industry partners. Our research has contributed to significant advances in quantum algorithms, AI model optimization, and IoT network architectures, creating real-world applications that benefit society.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      accentColor: "#06b6d4",
      stats: { collaborations: "Strategic", research: "Published", applications: "Real-world" }
    }
  ];

  // Auto-play functionality with improved handling
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setActiveCard((prev) => (prev + 1) % aboutData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, aboutData.length]);

  // Enhanced floating particles with different shapes
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => {
      const shapes = ['circle', 'square', 'triangle', 'diamond'];
      const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return (
        <motion.div
          key={i}
          className={`absolute opacity-20 ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-sm' : 'rounded-none'}`}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            scale: [0.2, 1.2, 0.2],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360, 720]
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4
          }}
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                     shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none'
          }}
        />
      );
    });
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const stackedCardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
      z: -100
    }),
    center: (index) => ({
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0
      }
    }),
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
      z: -100,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }),
    stack: (index) => ({
      x: (index - activeCard) * 320,
      y: 0,
      opacity: index === activeCard ? 1 : Math.max(0.4, 1 - Math.abs(index - activeCard) * 0.3),
      scale: index === activeCard ? 1 : Math.max(0.75, 1 - Math.abs(index - activeCard) * 0.15),
      rotateY: (index - activeCard) * 15,
      z: index === activeCard ? 100 : 100 - Math.abs(index - activeCard) * 30,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const handleCardChange = (index) => {
    if (index === activeCard) return;
    
    setDirection(index > activeCard ? 1 : -1);
    setActiveCard(index);
    setIsAutoPlay(false);
    
    // Resume autoplay after user interaction
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const handleNavigation = (dir) => {
    setDirection(dir);
    if (dir > 0) {
      setActiveCard((prev) => (prev + 1) % aboutData.length);
    } else {
      setActiveCard((prev) => (prev - 1 + aboutData.length) % aboutData.length);
    }
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  // Helper function to get visible card indices with circular wrapping
  const getVisibleCards = () => {
    const visibleCards = [];
    const totalCards = aboutData.length;
    
    // Show 2 cards on each side of the active card (5 total visible)
    for (let i = -2; i <= 2; i++) {
      let index = (activeCard + i + totalCards) % totalCards;
      visibleCards.push({
        index,
        offset: i,
        data: aboutData[index]
      });
    }
    
    return visibleCards;
  };

  const currentCard = aboutData[activeCard];
  const visibleCards = getVisibleCards();

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 relative overflow-hidden py-24">
      {/* Enhanced Floating Particles */}
      <FloatingParticles />
      
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(800px circle at 25% 25%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)",
            "radial-gradient(800px circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(800px circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
            "radial-gradient(800px circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Enhanced Section Title */}
        <motion.div 
          className="text-center mb-20"
          variants={titleVariants}
        >
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            style={{
              background: "linear-gradient(45deg, #ffffff, #f97316, #3b82f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
            whileHover={{ 
              scale: 1.02,
              filter: "brightness(1.2)"
            }}
          >
            About Kinetex Lab
          </motion.h2>
          
          <motion.div 
            className="relative w-40 h-1 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-full" />
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Pioneering research in Quantum Computing, AI, and IoT technologies with visionary leadership and collaborative excellence
          </motion.p>
        </motion.div>

        {/* Enhanced Stacked Cards Container */}
        <div className="max-w-8xl mx-auto">
          {/* Side-by-Side Cards Display Area with Navigation */}
          <div className="relative mb-16">
            {/* Left Navigation Button */}
            <motion.button
              onClick={() => handleNavigation(-1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 group bg-gray-800/80 hover:bg-gray-700/90 border border-gray-600/50 hover:border-orange-500/70 p-4 rounded-full backdrop-blur-lg transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.15, rotate: -5, boxShadow: "0 15px 35px rgba(249, 115, 22, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-7 h-7 text-white group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Right Navigation Button */}
            <motion.button
              onClick={() => handleNavigation(1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 group bg-gray-800/80 hover:bg-gray-700/90 border border-gray-600/50 hover:border-orange-500/70 p-4 rounded-full backdrop-blur-lg transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 15px 35px rgba(249, 115, 22, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-7 h-7 text-white group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Cards Container */}
            <div className="relative h-[600px] overflow-hidden px-20" style={{ perspective: '1000px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                {visibleCards.map(({ index, offset, data: card }) => {
                  const isActive = offset === 0;
                  
                  return (
                    <motion.div
                      key={`${card.id}-${index}`}
                      className="absolute w-full max-w-xl cursor-pointer"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        zIndex: isActive ? 50 : 50 - Math.abs(offset)
                      }}
                      variants={stackedCardVariants}
                      initial="stack"
                      onClick={() => !isActive && handleCardChange(index)}
                      whileHover={!isActive ? { 
                        scale: 0.88,
                        x: offset * 320 + (offset > 0 ? -20 : 20),
                        transition: { duration: 0.2 }
                      } : {}}
                      animate={{
                        x: offset * 320,
                        y: 0,
                        opacity: isActive ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.3),
                        scale: isActive ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.15),
                        rotateY: offset * 15,
                        z: isActive ? 100 : 100 - Math.abs(offset) * 30,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <motion.div
                        className="relative h-[500px] overflow-hidden"
                        whileHover={isActive ? { scale: 1.02 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Main Card */}
                        <div 
                          className={`bg-gray-900/95 backdrop-blur-xl rounded-3xl p-12 h-full relative overflow-hidden transition-all duration-500 ${
                            isActive 
                              ? 'border-l-4 border-l-orange-500' 
                              : 'border-l border-l-gray-700/50'
                          }`}
                        >

                          {/* Content Container */}
                          <div className="relative z-10 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                              <motion.div 
                                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <span className="text-sm font-semibold text-white tracking-wide uppercase">
                                  {card.category}
                                </span>
                              </motion.div>
                            </div>

                            {/* Question */}
                            <motion.h4 
                              className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                            >
                              {card.question}
                            </motion.h4>

                            {/* Answer */}
                            <motion.p 
                              className="text-md text-gray-300 leading-relaxed mb-6 flex-grow"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                            >
                              {card.answer}
                            </motion.p>

                            {/* Stats Section - only show for active card */}
                            {isActive && (
                              <motion.div 
                                className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10"
                                variants={statsVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                {Object.entries(card.stats).map(([key, value]) => (
                                  <motion.div 
                                    key={key}
                                    className="text-center"
                                    variants={statsVariants}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                  >
                                    <div 
                                      className="text-xl font-bold mb-1"
                                      style={{ color: card.accentColor }}
                                    >
                                      {value}
                                    </div>
                                    <div className="text-sm text-gray-400 capitalize tracking-wide">
                                      {key}
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card Indicator Dots */}
          <div className="flex justify-center items-center space-x-3">
            {aboutData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleCardChange(index)}
                className={`w-2 h-2 rounded-full border border-white/20 transition-all duration-300 ${
                  index === activeCard 
                    ? 'bg-orange-500 shadow-lg shadow-orange-500/50' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={index === activeCard ? {
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;