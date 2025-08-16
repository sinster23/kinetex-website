import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const KietexHome = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const solarSystemRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);

  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Text animation state
  const [currentText, setCurrentText] = useState(0);
  const textOptions = ["Quantum", "AI", "IoT"];

  // Enhanced planet data with better colors and properties
  const planetData = [
    {
      name: "Mercury",
      radius: 0.15,
      distance: 3,
      color: 0xd4af37,
      speed: 0.04,
      emissive: 0x332200,
      roughness: 0.8,
    },
    {
      name: "Venus",
      radius: 0.18,
      distance: 4,
      color: 0xffc649,
      speed: 0.035,
      emissive: 0x664400,
      roughness: 0.6,
    },
    {
      name: "Earth",
      radius: 0.2,
      distance: 5,
      color: 0x6b93d6,
      speed: 0.03,
      emissive: 0x003366,
      roughness: 0.7,
    },
    {
      name: "Mars",
      radius: 0.16,
      distance: 6.5,
      color: 0xcd5c5c,
      speed: 0.025,
      emissive: 0x330000,
      roughness: 0.9,
    },
    {
      name: "Jupiter",
      radius: 0.6,
      distance: 9,
      color: 0xd2691e,
      speed: 0.02,
      emissive: 0x441100,
      roughness: 0.5,
    },
    {
      name: "Saturn",
      radius: 0.5,
      distance: 12,
      color: 0xfad5a5,
      speed: 0.015,
      emissive: 0x332211,
      roughness: 0.6,
    },
    {
      name: "Uranus",
      radius: 0.35,
      distance: 15,
      color: 0x4fd0e4,
      speed: 0.01,
      emissive: 0x003344,
      roughness: 0.4,
    },
    {
      name: "Neptune",
      radius: 0.34,
      distance: 18,
      color: 0x4169e1,
      speed: 0.008,
      emissive: 0x001144,
      roughness: 0.4,
    },
  ];

  // Text cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textOptions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Three.js Solar System Setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(500, 500);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Improved lighting system - key to fixing black planets
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // Increased ambient light
    scene.add(ambientLight);

    // Main sun light with better intensity
    const sunLight = new THREE.PointLight(0xffaa00, 3, 100);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 50;
    scene.add(sunLight);

    // Additional directional light to brighten planets
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create solar system group
    const solarSystemGroup = new THREE.Group();

    // Create the Sun with enhanced glow
    const sunGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdd44,
      transparent: true,
      opacity: 0.9,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // Add sun glow effect
    const sunGlowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.3,
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    sun.add(sunGlow);

    solarSystemGroup.add(sun);

    // Create planets with proper materials
    const planets = [];
    const orbitalPaths = [];

    planetData.forEach((data, index) => {
      // Create orbital ring
      const ringGeometry = new THREE.RingGeometry(
        data.distance - 0.02,
        data.distance + 0.02,
        64
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 2.5,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      solarSystemGroup.add(ring);

      // Create planet with MeshLambertMaterial for better color visibility
      const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
      const planetMaterial = new THREE.MeshLambertMaterial({
        color: data.color,
        emissive: data.emissive,
        emissiveIntensity: 0.1,
        transparent: false,
      });

      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.castShadow = true;
      planet.receiveShadow = true;
      planet.position.x = data.distance;

      // Add Earth's atmosphere
      if (data.name === "Earth") {
        const atmosphereGeometry = new THREE.SphereGeometry(
          data.radius * 1.1,
          32,
          32
        );
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x87ceeb,
          transparent: true,
          opacity: 0.2,
          side: THREE.BackSide,
        });
        const atmosphere = new THREE.Mesh(
          atmosphereGeometry,
          atmosphereMaterial
        );
        planet.add(atmosphere);
      }

      // Add Saturn's rings with better visibility
      if (data.name === "Saturn") {
        const saturnRingGeometry = new THREE.RingGeometry(
          data.radius * 1.2,
          data.radius * 1.8,
          32
        );
        const saturnRingMaterial = new THREE.MeshLambertMaterial({
          color: 0xc4a484,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        });
        const saturnRing = new THREE.Mesh(
          saturnRingGeometry,
          saturnRingMaterial
        );
        saturnRing.rotation.x = -Math.PI / 2;
        saturnRing.rotation.z = Math.PI / 6;
        planet.add(saturnRing);
      }

      // Store planet data for animation
      planet.userData = {
        distance: data.distance,
        speed: data.speed,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: 0.01 + Math.random() * 0.02,
        name: data.name,
      };

      solarSystemGroup.add(planet);
      planets.push(planet);
    });

    // Improved asteroid belt
    const asteroidCount = 80;
    const asteroids = [];

    for (let i = 0; i < asteroidCount; i++) {
      const asteroidGeometry = new THREE.SphereGeometry(
        0.015 + Math.random() * 0.03,
        6,
        6
      );
      const asteroidMaterial = new THREE.MeshLambertMaterial({
        color: 0x8c7853,
        transparent: false,
      });
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

      const distance = 7.5 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.2;

      asteroid.position.x = distance * Math.cos(angle);
      asteroid.position.z = distance * Math.sin(angle);
      asteroid.position.y = height;

      asteroid.userData = {
        distance: distance,
        speed: 0.005 + Math.random() * 0.003,
        angle: angle,
        rotationSpeed: Math.random() * 0.03,
      };

      solarSystemGroup.add(asteroid);
      asteroids.push(asteroid);
    }

    // Enhanced starfield
    const starCount = 300;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      // Random star colors
      const starColor = new THREE.Color();
      starColor.setHSL(
        Math.random() * 0.2 + 0.5,
        0.5,
        0.8 + Math.random() * 0.2
      );
      starColors[i] = starColor.r;
      starColors[i + 1] = starColor.g;
      starColors[i + 2] = starColor.b;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 2,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    solarSystemRef.current = {
      solarSystemGroup,
      planets,
      asteroids,
      sun,
      stars,
    };

    scene.add(solarSystemGroup);
    camera.position.set(0, 12, 30);
    camera.lookAt(0, 0, 0);

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime = 0) => {
      animationRef.current = requestAnimationFrame(animate);

      if (currentTime - lastTime < frameTime) return;
      lastTime = currentTime;

      const time = currentTime * 0.001;

      // Animate planets
      planets.forEach((planet) => {
        const userData = planet.userData;
        userData.angle += userData.speed;

        planet.position.x = userData.distance * Math.cos(userData.angle);
        planet.position.z = userData.distance * Math.sin(userData.angle);

        // Planet rotation
        planet.rotation.y += userData.rotationSpeed;

        // Add slight bobbing motion
        planet.position.y = Math.sin(userData.angle * 2) * 0.1;
      });

      // Animate asteroids
      asteroids.forEach((asteroid) => {
        const userData = asteroid.userData;
        userData.angle += userData.speed;

        asteroid.position.x = userData.distance * Math.cos(userData.angle);
        asteroid.position.z = userData.distance * Math.sin(userData.angle);

        asteroid.rotation.x += userData.rotationSpeed;
        asteroid.rotation.y += userData.rotationSpeed * 0.7;
      });

      // Enhanced sun animation
      sun.rotation.y += 0.003;
      const pulseFactor = 1 + Math.sin(time * 1.5) * 0.08;
      sun.scale.setScalar(pulseFactor);

      // Sun glow pulsing
      if (sun.children[0]) {
        sun.children[0].rotation.y -= 0.002;
        const glowPulse = 1 + Math.sin(time * 2) * 0.15;
        sun.children[0].scale.setScalar(glowPulse);
      }

      // Gentle starfield rotation
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;

      // Apply user rotation with smooth interpolation
      solarSystemGroup.rotation.x +=
        (rotation.x - solarSystemGroup.rotation.x) * 0.08;
      solarSystemGroup.rotation.y +=
        (rotation.y - solarSystemGroup.rotation.y) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // Rotation is applied in the animation loop
  }, [rotation]);

  // Mouse interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = (e.clientX - dragStart.x) * 0.006;
    const deltaY = (e.clientY - dragStart.y) * 0.006;

    setRotation((prev) => ({
      x: Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, prev.x + deltaY)),
      y: prev.y + deltaX,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging || !e.touches[0]) return;

    const touch = e.touches[0];
    const deltaX = (touch.clientX - dragStart.x) * 0.006;
    const deltaY = (touch.clientY - dragStart.y) * 0.006;

    setRotation((prev) => ({
      x: Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, prev.x + deltaY)),
      y: prev.y + deltaX,
    }));

    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart]);

  // Enhanced floating particles with Framer Motion
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.5, 1, 0.5],
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3,
        }}
        style={{
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          backgroundColor: ["#ff6b35", "#f7931e", "#ffd23f", "#06ffa5"][
            Math.floor(Math.random() * 4)
          ],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles}
      </div>
    );
  };

  // Animation variants
  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay: 0.3, ease: "easeOut" },
    },
  };

  const solarSystemVariants = {
    initial: { x: 100, opacity: 0, scale: 0.8 },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, delay: 0.5, ease: "easeOut" },
    },
  };

  const textAnimation = {
    initial: { opacity: 0, y: 20, rotateX: -90 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      rotateX: 90,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const statsVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 1.2, staggerChildren: 0.1 },
    },
  };

  const statItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 relative overflow-hidden">
      {/* Navigation with Framer Motion */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent backdrop-blur-md "
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex justify-between items-center px-4">
          <img src="/images.png" className="w-50 h-15 cursor-pointer" />
          <motion.div
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05, color: "#f97316" }}
            transition={{ duration: 0.2 }}
          >
            KineTex
          </motion.div>
          <div className="flex space-x-10">
            <div className="hidden md:flex space-x-8 text-gray-300 mr-15">
              {["Features", "About", "Resources", "Contact", "Events"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    className="hover:text-orange-400 transition-colors duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                  >
                    {item}
                  </motion.button>
                )
              )}
            </div>
            <div className="flex space-x-4">
              <motion.button
                className="text-gray-300 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Sign In
              </motion.button>
              <motion.button
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(249, 115, 22, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Floating Particles */}
      <FloatingParticles />

      {/* Hero Section */}
      <div className="flex items-center min-h-screen px-20 pt-20">
        {/* Left Content with Framer Motion */}
        <motion.div
          className="w-1/2 z-10"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="flex gap-3 text-4xl font-bold text-white"
            whileHover={{ color: "#f97316" }}
            transition={{ duration: 0.2 }}
          >
            <img src="/logo.png" className="w-18 h-14 cursor-pointer" />
            <span className="mt-2">hello</span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Innovating Across
            <div className="relative h-24 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  className="absolute block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                  variants={textAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ perspective: "1000px" }}
                >
                  {textOptions[currentText]} &{" "}
                  {textOptions[(currentText + 1) % textOptions.length]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            The best way to shape the future through technology and innovation.
            Building solutions that matter, connecting minds that create.
          </motion.p>

          <motion.div
            className="flex space-x-4 mb-12"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
          >
            <motion.button
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg text-md font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get Started
            </motion.button>
            <motion.button
              className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl text-md font-semibold transition-colors duration-300"
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

        {/* Right Content - Enhanced Interactive Solar System */}
        <motion.div
          className="w-1/2 flex justify-end items-center"
          variants={solarSystemVariants}
          initial="initial"
          animate="animate"
        >
          <div className="text-center">
            <motion.div
              ref={mountRef}
              className={`w-[500px] h-[500px] relative select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              } transition-all duration-300`}
              style={{
                filter: "drop-shadow(0 0 60px rgba(255, 165, 0, 0.4))",
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.p
              className="text-gray-400 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌟 Click and drag to explore our interactive solar system
              </motion.span>
            </motion.p>
            <motion.div
              className="mt-2 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              Experience the cosmos in real-time
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator with Framer Motion */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center group cursor-pointer"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="text-sm mb-2 group-hover:text-orange-400 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
          >
            Scroll to explore
          </motion.span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 group-hover:border-orange-400 rounded-full flex justify-center transition-colors duration-200"
            whileHover={{ scale: 1.1, borderColor: "#f97316" }}
          >
            <motion.div
              className="w-1 h-3 bg-orange-400 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KietexHome;
