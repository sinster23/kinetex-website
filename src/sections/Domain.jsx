import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Cpu,
  Brain,
  Wifi,
  Globe,
  Search,
  Users,
  Megaphone,
  Star,
  Zap,
  Palette,
  Play,
  ArrowRight,
} from "lucide-react";

const KineTechDomains = () => {
  const [activeTab, setActiveTab] = useState("tech");
  const [selectedDomain, setSelectedDomain] = useState(null);
  const { scrollY } = useScroll();

  // Transform values for parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const fadeOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  const techDomains = [
    {
      id: 1,
      title: "Quantum Computing",
      subtitle: "Quantum Algorithms & Game Theory",
      icon: <Cpu className="w-6 h-6" />,
      description:
        "Exploring quantum algorithms, quantum machine learning, and game theory applications in computational systems with cutting-edge research.",
      gradient: "from-slate-700 via-slate-800 to-gray-900",
      imageUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
      projects: 12,
      members: 8,
      status: "Active Research",
      tags: ["Quantum ML", "Algorithms", "Game Theory"],
    },
    {
      id: 2,
      title: "AI/ML Systems",
      subtitle: "Next-Gen Intelligence",
      icon: <Brain className="w-6 h-6" />,
      description:
        "Developing quantum-enhanced AI models and machine learning algorithms for unprecedented computational power and intelligent systems.",
      gradient: "from-gray-700 via-gray-800 to-slate-900",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      projects: 15,
      members: 12,
      status: "Innovation Hub",
      tags: ["Deep Learning", "Neural Networks", "AI Research"],
    },
    {
      id: 3,
      title: "IoT Development",
      subtitle: "Connected Smart Systems",
      icon: <Wifi className="w-6 h-6" />,
      description:
        "Creating intelligent IoT ecosystems, sensor networks, and edge computing solutions for smart environments and connected devices.",
      gradient: "from-zinc-700 via-zinc-800 to-gray-900",
      imageUrl:
          "https://images.unsplash.com/photo-1553341640-9397992456f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projects: 20,
      members: 10,
      status: "Production Ready",
      tags: ["Edge Computing", "Sensors", "Smart Cities"],
    },
    {
      id: 4,
      title: "Web Development",
      subtitle: "Modern Digital Experiences",
      icon: <Globe className="w-6 h-6" />,
      description:
        "Building cutting-edge web applications, progressive web apps, and immersive digital experiences using modern frameworks.",
      gradient: "from-stone-700 via-stone-800 to-gray-900",
      imageUrl:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
      projects: 25,
      members: 15,
      status: "High Demand",
      tags: ["React", "Next.js", "Full Stack"],
    },
    {
      id: 5,
      title: "Research & Development",
      subtitle: "Future Technology Exploration",
      icon: <Search className="w-6 h-6" />,
      description:
        "Investigating emerging technologies, conducting research, and developing proof-of-concept solutions for tomorrow's challenges.",
      gradient: "from-neutral-700 via-neutral-800 to-gray-900",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      projects: 8,
      members: 6,
      status: "Experimental",
      tags: ["Innovation", "Prototyping", "Emerging Tech"],
    },
  ];

  const nonTechDomains = [
    {
      id: 6,
      title: "Operations & HR",
      subtitle: "Organizational Excellence",
      icon: <Users className="w-6 h-6" />,
      description:
        "Managing human resources, operations coordination, and organizational development to build a thriving work culture.",
      gradient: "from-slate-600 via-slate-700 to-gray-800",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      projects: 10,
      members: 8,
      status: "Core Operations",
      tags: ["Recruitment", "Training", "Policy"],
    },
    {
      id: 7,
      title: "Creative Media",
      subtitle: "Visual Storytelling",
      icon: <Palette className="w-6 h-6" />,
      description:
        "Creating stunning visual content, photography, videography, and graphic design that brings our brand to life.",
      gradient: "from-stone-600 via-stone-700 to-gray-800",
      imageUrl:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      projects: 18,
      members: 12,
      status: "Creative Hub",
      tags: ["Design", "Photography", "Video Editing"],
    },
    {
      id: 8,
      title: "Marketing & Growth",
      subtitle: "Brand Amplification",
      icon: <Megaphone className="w-6 h-6" />,
      description:
        "Developing strategic marketing campaigns, brand promotion, and community engagement to drive exponential growth.",
      gradient: "from-zinc-600 via-zinc-700 to-gray-800",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      projects: 14,
      members: 9,
      status: "Growth Mode",
      tags: ["Strategy", "Campaigns", "Analytics"],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  // Scroll-triggered animation variants
  const scrollVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const InViewWrapper = ({ children, variants = scrollVariants, threshold = 0.1, ...props }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { threshold, once: true });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  };

  const TabToggle = () => (
    <InViewWrapper
      className="flex justify-center mb-16"
      variants={{
        hidden: { opacity: 0, y: -30, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.6
          }
        }
      }}
    >
      <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-full p-2">
        <motion.div
          className="absolute top-2 bottom-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
          animate={{
            left: activeTab === "tech" ? "8px" : "50%",
            width: "calc(50% - 12px)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8,
          }}
        />

        <div className="relative z-10 flex">
          <motion.button
            className={`px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center space-x-2 ${
              activeTab === "tech"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("tech")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Tech Domains</span>
          </motion.button>

          <motion.button
            className={`px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center space-x-2 ${
              activeTab === "nontech"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("nontech")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Support Domains</span>
          </motion.button>
        </div>
      </div>
    </InViewWrapper>
  );

  const DomainCard = ({ domain, index }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { threshold: 0.2, once: true });
    
    return (
      <motion.div
        ref={ref}
        className="group relative overflow-hidden rounded-3xl cursor-pointer"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotateX: 20,
            rotateY: 10,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.8,
              delay: index * 0.1,
            },
          },
        }}
        whileHover={{
          y: -12,
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 17,
            mass: 0.8,
          },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        onClick={() => setSelectedDomain(domain)}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Image */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={domain.imageUrl}
            alt={domain.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: index * 0.1 + 0.2,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.7, ease: "easeOut" },
            }}
          />

          {/* Gradient Overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-t ${domain.gradient} opacity-80`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          />

          {/* Subtle animated overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{
              x: "100%",
              opacity: 1,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <motion.div
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: index * 0.1 + 0.4,
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, -10, 10, 0],
                transition: {
                  scale: { type: "spring", stiffness: 400, damping: 17 },
                  rotate: { duration: 0.6, ease: "easeInOut" },
                },
              }}
            >
              {domain.icon}
            </motion.div>

            <motion.div
              className="flex flex-col items-end space-y-2"
              initial={{ opacity: 0, x: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.8 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1 + 0.5,
                type: "spring",
                stiffness: 150,
                damping: 20
              }}
            >
              <motion.span
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {domain.status}
              </motion.span>
              <div className="flex space-x-1">
                {domain.tags.slice(0, 2).map((tag, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 bg-black/20 backdrop-blur-sm rounded text-xs"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ 
                      delay: index * 0.1 + 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <motion.h3
                className="text-2xl font-bold text-white mb-1"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  delay: index * 0.1 + 0.7, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150,
                  damping: 20
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
              >
                {domain.title}
              </motion.h3>
              <motion.p
                className="text-white/80 text-sm font-medium mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
              >
                {domain.subtitle}
              </motion.p>
            </div>

            <motion.p
              className="text-white/90 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.9, duration: 0.6 }}
            >
              {domain.description}
            </motion.p>

            {/* Stats and CTA */}
            <motion.div
              className="flex justify-between items-center pt-4 border-t border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                delay: index * 0.1 + 1,
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                damping: 20
              }}
            >
              <div className="flex space-x-4 text-sm">
                <motion.div
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <span>{domain.projects} Projects</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white/80 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.5 + index * 0.2,
                    }}
                  />
                  <span>{domain.members} Members</span>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center space-x-2 text-white/80 group-hover:text-white"
                whileHover={{
                  x: 8,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-sm font-semibold">Explore</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        />
      </motion.div>
    );
  };

  const currentDomains = activeTab === "tech" ? techDomains : nonTechDomains;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 py-20 relative overflow-hidden">
      {/* Animated background with parallax */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Header with parallax effect */}
      <motion.div
        className="text-center mb-16 relative z-10"
        style={{ y: headerY, opacity: fadeOpacity }}
      >
        <InViewWrapper
          variants={{
            hidden: { opacity: 0, y: -80, scale: 0.8 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1
              }
            }
          }}
        >
          <motion.h2
            className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight"
            style={{
              background: "linear-gradient(45deg, #ffffff, #f97316, #3b82f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.2)",
            }}
          >
            Our Domains
          </motion.h2>
        </InViewWrapper>

        <InViewWrapper
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.3
              }
            }
          }}
        >
          <motion.p
            className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our diverse innovation domains where creativity meets
            cutting-edge technology
          </motion.p>
        </InViewWrapper>
      </motion.div>

      {/* Tab Toggle */}
      <TabToggle />

      {/* Domains Grid */}
      <div className="px-8 md:px-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "tech" ? -100 : 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: activeTab === "tech" ? 100 : -100, scale: 0.9 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              type: "spring",
              stiffness: 120,
              damping: 25,
            }}
          >
            <InViewWrapper
              className="text-center mb-12"
              variants={{
                hidden: { opacity: 0, y: -50, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    duration: 0.8
                  }
                }
              }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
              >
                {activeTab === "tech"
                  ? "Tech Domains"
                  : "Support & Creative Domains"}
              </motion.h2>
              <motion.p
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {activeTab === "tech"
                  ? "Innovation-driven technical excellence across cutting-edge fields"
                  : "Essential functions that power our organization and amplify our impact"}
              </motion.p>
            </InViewWrapper>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDomains.map((domain, index) => (
                <DomainCard key={domain.id} domain={domain} index={index} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Section with scroll animations */}
      <InViewWrapper
        className="text-center mt-24 px-8 md:px-20 relative z-10"
        variants={{
          hidden: { opacity: 0, y: 100, scale: 0.9 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.8
            }
          }
        }}
      >
        <motion.div
          className="p-12"
          animate={{
            borderColor: [
              "rgba(249, 115, 22, 0.2)",
              "rgba(249, 115, 22, 0.4)",
              "rgba(249, 115, 22, 0.2)",
            ],
          }}
          transition={{
            borderColor: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <motion.h3
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 150,
              damping: 20
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 17 },
            }}
          >
            Ready to Join a Domain?
          </motion.h3>
          <motion.p
            className="text-gray-300 md:text-2xl mb-8 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Discover your passion, develop your skills, and contribute to
            groundbreaking projects.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.6,
              type: "spring",
              stiffness: 150,
              damping: 20
            }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)",
                y: -2,
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Apply Now
            </motion.button>
            <motion.button
              className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors duration-300"
              whileHover={{
                scale: 1.05,
                y: -2,
                borderColor: "#f97316",
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </InViewWrapper>

      {/* Floating particles for enhanced visual appeal */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="w-12 h-12 border-2 border-orange-500/30 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm bg-black/10"
          animate={{
            borderColor: [
              "rgba(249, 115, 22, 0.3)",
              "rgba(249, 115, 22, 0.8)",
              "rgba(249, 115, 22, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(249, 115, 22, 0.1)",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowRight className="w-4 h-4 text-orange-400 rotate-[-90deg]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KineTechDomains;