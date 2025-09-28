'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  life: number
  maxLife: number
}

export default function Logo() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const particleIdCounter = useRef(0)

  // Create particles for particle animation
  const createParticle = (x: number, y: number): Particle => {
    const colors = [
      'from-purple-400 to-pink-400',
      'from-pink-400 to-purple-400',
      'from-purple-500 to-pink-500',
      'from-pink-500 to-purple-500'
    ]
    
    // Use a counter instead of random for ID to ensure consistency
    particleIdCounter.current += 1
    
    return {
      id: particleIdCounter.current,
      x,
      y,
      size: 2 + Math.random() * 4, // Keep some randomness for visual variety
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 40 + Math.random() * 60
    }
  }

  // Update particles animation
  useEffect(() => {
    if (!isHovered) return

    const interval = setInterval(() => {
      setParticles(prev => {
        // Add new particles
        const newParticles = [...prev]
        if (newParticles.length < 30 && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          
          for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * 20
            newParticles.push(createParticle(
              centerX + Math.cos(angle) * radius,
              centerY + Math.sin(angle) * radius
            ))
          }
        }

        // Update existing particles
        return newParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life + 1,
            size: p.size * 0.98
          }))
          .filter(p => p.life < p.maxLife && p.size > 0.5)
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isHovered])

  // Split and Merge Animation for MZ letters
  const letterVariants = {
    initial: { 
      x: 0, 
      y: 0,
      scale: 1,
      opacity: 1
    },
    split: (custom: number) => ({
      x: custom === 0 ? -15 : 15,
      y: custom === 0 ? -10 : 10,
      scale: 0.8,
      opacity: 0.7,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }),
    merge: {
      x: 0,
      y: 0,
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] rounded-full flex items-center justify-center shadow-lg relative overflow-hidden cursor-pointer"
      animate={{ 
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        scale: [1, 1.02, 1]
      }}
      transition={{ 
        backgroundPosition: {
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      onClick={() => window.location.href = '/'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Particle Animation */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute bg-gradient-to-r ${particle.color} rounded-full opacity-70`}
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: (1 - particle.life / particle.maxLife) * 0.7,
            scale: particle.life / particle.maxLife
          }}
          exit={{ opacity: 0, scale: 0 }}
        />
      ))}

      {/* MZ Letters with Split and Merge Animation */}
      <div className="flex items-center justify-center relative z-10">
        <motion.span
          className="font-bold text-lg"
          variants={letterVariants}
          initial="initial"
          animate={isHovered ? ["split", "merge"] : "initial"}
          custom={0}
          whileHover="hover"
          style={{
            background: 'linear-gradient(45deg, #c084fc, #f472b6, #c084fc)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShimmer 3s ease-in-out infinite'
          }}
        >
          M
        </motion.span>
        <motion.span
          className="font-bold text-lg ml-0.5"
          variants={letterVariants}
          initial="initial"
          animate={isHovered ? ["split", "merge"] : "initial"}
          custom={1}
          whileHover="hover"
          style={{
            background: 'linear-gradient(45deg, #c084fc, #f472b6, #c084fc)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShimmer 3s ease-in-out infinite'
          }}
        >
          Z
        </motion.span>
      </div>

      {/* Enhanced Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Outer Ring Animation */}
      <motion.div 
        className="absolute inset-0 border-2 border-purple-400/50 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Inner Sparkle Effect */}
      <motion.div 
        className="absolute w-1 h-1 bg-white rounded-full"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          x: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <style jsx>{`
        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradientShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  )
}