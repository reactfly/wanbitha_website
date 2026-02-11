import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export const AnimatedLogo = ({ size = 'large' }) => {
  const logoRef = useRef(null)
  const outerCircleRef = useRef(null)
  const innerCircleRef = useRef(null)
  const centerCircleRef = useRef(null)
  const textRef = useRef(null)
  const glowRef = useRef(null)
  const particleRefs = useRef([])

  const sizeClasses = size === 'large' 
    ? 'w-40 h-40 md:w-48 md:h-48' 
    : 'w-24 h-24 md:w-32 md:h-32'

  const textSizeClasses = size === 'large'
    ? 'text-3xl md:text-4xl'
    : 'text-xl md:text-2xl'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation - logo reveal
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.from(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.8,
        delay: 0.3
      })
      .from(outerCircleRef.current, {
        scale: 0,
        rotation: -180,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, '-=1.4')
      .from(innerCircleRef.current, {
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: 'back.out(1.5)'
      }, '-=1')
      .from(centerCircleRef.current, {
        scale: 0,
        duration: 0.8,
        ease: 'back.out(1.3)'
      }, '-=0.6')
      .from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, '-=0.4')
      .from(particleRefs.current.filter(Boolean), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)'
      }, '-=0.3')

      // Continuous animations
      // Glow pulse with multiple layers
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.7,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Outer circle rotation (slow)
      gsap.to(outerCircleRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
      })

      // Inner circle rotation (faster, opposite direction)
      gsap.to(innerCircleRef.current, {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      })

      // Center circle pulse
      gsap.to(centerCircleRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Floating effect
      gsap.to(logoRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Particle animations
      particleRefs.current.forEach((particle, i) => {
        if (!particle) return
        gsap.to(particle, {
          rotation: 360,
          duration: 10 + i * 2,
          repeat: -1,
          ease: 'none'
        })
        gsap.to(particle, {
          scale: 1.2,
          duration: 1.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        })
      })

      // Hover effect
      const handleMouseEnter = () => {
        gsap.to(logoRef.current, {
          scale: 1.15,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
        gsap.to(glowRef.current, {
          scale: 1.6,
          opacity: 0.9,
          duration: 0.4
        })
        gsap.to(outerCircleRef.current, {
          rotation: '+=45',
          duration: 0.6,
          ease: 'power2.out'
        })
        gsap.to(innerCircleRef.current, {
          rotation: '-=45',
          duration: 0.6,
          ease: 'power2.out'
        })
      }

      const handleMouseLeave = () => {
        gsap.to(logoRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
        gsap.to(glowRef.current, {
          scale: 1.3,
          opacity: 0.7,
          duration: 0.4
        })
      }

      const logoElement = logoRef.current
      logoElement.addEventListener('mouseenter', handleMouseEnter)
      logoElement.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        logoElement.removeEventListener('mouseenter', handleMouseEnter)
        logoElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, logoRef)
    return () => ctx.revert()
  }, [size])

  return (
    <div 
      ref={logoRef}
      className="relative group cursor-pointer inline-block"
    >
      {/* Multi-layered glow effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-full blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(233,30,123,0.6) 0%, rgba(192,132,252,0.4) 40%, rgba(251,191,36,0.3) 70%, transparent 100%)'
        }}
      />
      
      {/* Main logo container */}
      <div className="relative">
        {/* Outer rotating circle with gradient */}
        <div 
          ref={outerCircleRef}
          className={`${sizeClasses} relative`}
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs>
              <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E91E7B">
                  <animate attributeName="stopColor" values="#E91E7B;#C084FC;#FBBF24;#E91E7B" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#FFD700">
                  <animate attributeName="stopColor" values="#FFD700;#F472C4;#C084FC;#FFD700" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#D4A5FF">
                  <animate attributeName="stopColor" values="#D4A5FF;#FBBF24;#E91E7B;#D4A5FF" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#E91E7B" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Outer dashed circle */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="url(#logoGradient1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="25 12"
              filter="url(#glow)"
            />
            
            {/* Decorative dots on outer circle */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle
                key={i}
                cx={60 + 50 * Math.cos(angle * Math.PI / 180)}
                cy={60 + 50 * Math.sin(angle * Math.PI / 180)}
                r="2.5"
                fill="url(#logoGradient2)"
                filter="url(#glow)"
              />
            ))}
          </svg>
        </div>
        
        {/* Inner rotating circle */}
        <div 
          ref={innerCircleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* Inner solid circle */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="url(#logoGradient2)"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Inner dashed circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="url(#logoGradient1)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="15 8"
              opacity="0.5"
            />
          </svg>
        </div>
        
        {/* Center circle with pattern */}
        <div 
          ref={centerCircleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="logoPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="1.5" fill="url(#logoGradient1)" />
              </pattern>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(233,30,123,0.3)" />
                <stop offset="100%" stopColor="rgba(192,132,252,0.1)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#centerGlow)" />
            <rect width="100" height="100" fill="url(#logoPattern)" opacity="0.8" />
            
            {/* Central emblem */}
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#logoGradient1)" strokeWidth="2" />
            <path d="M50 35 L50 65 M35 50 L65 50" stroke="url(#logoGradient2)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* Logo text */}
        <div 
          ref={textRef}
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        >
          <span className={`block ${textSizeClasses} font-display font-bold tracking-widest`}>
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose-hot via-gold to-rose-hot animate-gradient"
              style={{ backgroundSize: '200% auto', display: 'inline-block' }}
            >
              WanBitha
            </span>
          </span>
          <span className="block text-xs font-body tracking-[0.3em] uppercase text-white/40 mt-1">
            Digital Experience
          </span>
        </div>
      </div>
      
      {/* Floating particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          ref={el => particleRefs.current[i] = el}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? '#E91E7B' : '#C084FC',
            top: `${10 + i * 15}%`,
            left: `${i % 2 === 0 ? '5%' : '90%'}`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#E91E7B' : '#C084FC'}`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
      
      {/* Decorative corner elements */}
      <div className="absolute -top-3 -right-3 w-4 h-4 border-2 border-gold/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute -bottom-3 -left-3 w-3 h-3 border-2 border-rose-hot/50 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      <div className="absolute top-1/2 -right-6 w-2 h-2 bg-lavender/50 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
    </div>
  )
}
