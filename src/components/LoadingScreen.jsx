import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

export const LoadingScreen = () => {
  const container = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const progressRef = useRef(null)
  const progressGlowRef = useRef(null)
  const counterRef = useRef(null)
  const buttonRef = useRef(null)
  const particlesRef = useRef([])
  
  const [isReady, setIsReady] = useState(false)
  const [complete, setComplete] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline({
        onComplete: () => setIsReady(true)
      })

      // Phase 0: Particles fade in
      tl.fromTo(particlesRef.current.filter(Boolean),
        { opacity: 0, scale: 0, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(2)' }
      )
      // Phase 1: Bar & Counter
      .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 2.5, ease: 'power2.inOut' }, 0.2)
      .fromTo(progressGlowRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 2.5, ease: 'power2.inOut' }, 0.2)
      .to(progressGlowRef.current, { opacity: 0.6, duration: 0.5, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 0.2)
      .fromTo(counterRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }, 0.2)
      .to(counterRef.current, {
        innerText: 100, duration: 2.5, ease: 'power2.inOut', snap: { innerText: 1 },
        modifiers: { innerText: (v) => Math.round(v) + '%' }
      }, 0.2)

      // Phase 2: Line
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.3')

      // Phase 3: Logo
      .fromTo(logoRef.current,
        { opacity: 0, y: 20, scale: 0.8, rotate: -5 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      // Glitch
      .to(logoRef.current, { x: -4, duration: 0.04, ease: 'steps(1)' })
      .to(logoRef.current, { x: 5, duration: 0.04, ease: 'steps(1)' })
      .to(logoRef.current, { x: -3, duration: 0.04, ease: 'steps(1)' })
      .to(logoRef.current, { x: 2, duration: 0.04, ease: 'steps(1)' })
      .to(logoRef.current, { x: 0, duration: 0.04, ease: 'steps(1)' })
      
    }, container)
    return () => ctx.revert()
  }, [])

  // Show button when ready
  useEffect(() => {
     if (isReady && buttonRef.current) {
        gsap.fromTo(buttonRef.current, 
            { opacity: 0, y: 10, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' }
        )
     }
  }, [isReady])

  const handleEnter = () => {
    // Exit Sequence
    const tl = gsap.timeline({
        onComplete: () => setComplete(true)
    })

    tl.to(buttonRef.current, { scale: 0.9, opacity: 0, duration: 0.2 })
    
    // Fast exit
    .to([progressRef.current, progressGlowRef.current], { opacity: 0, scaleX: 1.2, duration: 0.3, ease: 'power2.in' }, 0)
    .to(counterRef.current, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' }, 0)
    .to(lineRef.current, { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power2.in' }, 0.1)
    .to(particlesRef.current.filter(Boolean), { opacity: 0, scale: 3, duration: 0.4, ease: 'power2.in', stagger: 0.01 }, 0) // Particles explode out
    
    // Logo Zoom Exit (Warp Speed feeling)
    .to(logoRef.current, { scale: 20, opacity: 0, duration: 0.8, ease: 'expo.in' }, 0.1)

    .to(container.current, {
      opacity: 0, duration: 0.5, ease: 'power2.inOut'
    }, 0.5)
  }

  if (complete) return null

  // Enhanced floating particles
  const particles = [
    { x: '10%', y: '15%', size: 4, delay: 0, color: 'rgba(192,132,252,0.7)' },
    { x: '85%', y: '10%', size: 3, delay: 0.15, color: 'rgba(244,114,196,0.7)' },
    { x: '20%', y: '80%', size: 5, delay: 0.1, color: 'rgba(192,132,252,0.6)' },
    { x: '75%', y: '85%', size: 3, delay: 0.25, color: 'rgba(244,114,196,0.6)' },
    { x: '45%', y: '5%', size: 4, delay: 0.2, color: 'rgba(251,191,36,0.6)' },
    { x: '95%', y: '45%', size: 3, delay: 0.3, color: 'rgba(192,132,252,0.5)' },
    { x: '5%', y: '45%', size: 4, delay: 0.05, color: 'rgba(244,114,196,0.5)' },
    { x: '55%', y: '25%', size: 3, delay: 0.35, color: 'rgba(251,191,36,0.5)' },
    { x: '30%', y: '70%', size: 4, delay: 0.12, color: 'rgba(192,132,252,0.6)' },
    { x: '70%', y: '30%', size: 3, delay: 0.22, color: 'rgba(244,114,196,0.6)' },
  ]

  return (
    <div ref={container} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* Content Container (Fixed Center) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
         {/* Particles */}
         {particles.map((p, i) => (
          <div
            key={i}
            ref={el => { particlesRef.current[i] = el }}
            className="absolute rounded-full opacity-0"
            style={{
              left: p.x, top: p.y, width: p.size, height: p.size, background: p.color,
              boxShadow: `0 0 ${p.size * 5}px ${p.color}, 0 0 ${p.size * 10}px ${p.color}40`,
              animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo */}
          <h1
            ref={logoRef}
            className="text-5xl md:text-7xl font-display tracking-tight opacity-0"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #fff, #c084fc, #fbbf24)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientMove 4s ease infinite',
              filter: 'drop-shadow(0 0 30px rgba(192,132,252,0.3))',
            }}
          >
            WanBitha
          </h1>

          {/* Line */}
          <div
            ref={lineRef}
            className="w-32 h-px origin-center"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.8), rgba(244,114,196,0.8), transparent)',
              boxShadow: '0 0 20px rgba(192,132,252,0.5)'
            }}
          />

          {/* Progress Bar and Counter (Fade out or move up when ready) */}
          {!isReady && (
             <div className="flex flex-col items-center gap-4 transition-opacity duration-500">
                <div className="w-56 h-[3px] rounded-full overflow-hidden relative" style={{ 
                    background: 'rgba(255,255,255,0.08)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    <div
                    ref={progressRef}
                    className="absolute inset-0 origin-left"
                    style={{
                        background: 'linear-gradient(90deg, #c084fc, #f472c4, #fbbf24, #c084fc)',
                        backgroundSize: '200% 100%',
                        borderRadius: 'inherit',
                        animation: 'gradientMove 2s linear infinite',
                    }}
                    />
                    <div
                    ref={progressGlowRef}
                    className="absolute inset-0 origin-left"
                    style={{
                        background: 'linear-gradient(90deg, #c084fc, #f472c4, #fbbf24, #c084fc)',
                        backgroundSize: '200% 100%',
                        filter: 'blur(8px)',
                        opacity: 0.7,
                        borderRadius: 'inherit',
                        animation: 'gradientMove 2s linear infinite',
                    }}
                    />
                </div>
                <span
                    ref={counterRef}
                    className="font-body text-sm tracking-[0.4em] uppercase opacity-0"
                    style={{ 
                        color: 'rgba(255,255,255,0.5)',
                        textShadow: '0 0 10px rgba(192,132,252,0.3)'
                    }}
                >
                    0%
                </span>
             </div>
          )}

          {/* Enter Button */}
          {isReady && (
            <button
                ref={buttonRef}
                onClick={handleEnter}
                className="opacity-0 group relative overflow-hidden rounded-full bg-white/10 px-8 py-3 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 0 30px rgba(192,132,252,0.2)'
                }}
            >
                <div className="relative z-10 flex items-center gap-2 font-display text-sm tracking-widest text-white uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-hot animate-pulse" />
                    Entrar
                </div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
            </button>
          )}

        </div>
      </div>
    </div>
  )
}
