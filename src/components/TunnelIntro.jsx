import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════
   Cinematic Intro — Multi-phase reveal
   ═══════════════════════════════════════════
   Phase 1: Orbital rings draw themselves (Primary, Secondary, Glow)
   Phase 2: Floating particles with trails appear
   Phase 3: Badge slides in
   Phase 4: Title characters cascade with 3D rotation
   Phase 5: Tagline types out character by character
   Phase 6: Magnetic CTA fades in
   Phase 7: Scroll hint with particle trail
   ═══════════════════════════════════════════ */

const SplitText = ({ text, className, style, charRefs }) => (
  <span className={className} style={style} aria-label={text}>
    {text.split('').map((char, i) => (
      <span
        key={i}
        ref={el => { if (charRefs) charRefs.current[i] = el }}
        className="inline-block"
        style={{ willChange: 'transform, opacity' }}
        aria-hidden="true"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
)

const MouseGlow = () => {
  const glowRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (e) => {
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
      })
    }
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 mix-blend-screen"
      style={{
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        top: 0,
        left: 0
      }}
    />
  )
}

const TypewriterTagline = ({ delay = 3500 }) => {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Cores · Texturas · Emoções"
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [started])

  return (
    <span className="font-body uppercase text-sm tracking-[0.35em] text-white/40 h-[1.5em] block">
      {displayText}
      <span className="animate-blink inline-block w-[1px] h-[1em] bg-purple-400 align-middle ml-1"></span>
    </span>
  )
}

const ParticleTrail = () => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-20 overflow-hidden pointer-events-none">
       {/* Simple CSS-based particle emission for better performance than continuous state updates */}
       <div className="absolute top-full left-1/2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-[float_3s_ease-out_infinite] opacity-0" style={{ animationDelay: '0s' }} />
       <div className="absolute top-full left-1/2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-[float_3s_ease-out_infinite] opacity-0" style={{ animationDelay: '1s' }} />
    </div>
  )
}

export const TunnelIntro = () => {
  const sectionRef = useRef(null)
  const ringRef = useRef(null)
  const ringSecRef = useRef(null)
  const ringGlowRef = useRef(null)
  const charRefs = useRef([])
  const ctaRef = useRef(null)
  const scrollHintRef = useRef(null)
  const lineTopRef = useRef(null)
  const lineBotRef = useRef(null)
  const badgeRef = useRef(null)
  const dotRefs = useRef([])
  const particleRefs = useRef([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Magnetic Button Effect
  useEffect(() => {
    const btn = ctaRef.current
    if (!btn) return

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      // Only magnetize if close
      if (Math.abs(x) < 100 && Math.abs(y) < 100) {
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    if(btn.parentElement) {
        // Attach to a wrapper or the button itself
        // For magnetic effect to work well, we usually attach listener to window or a larger area, 
        // but here let's keep it simple and attach to button for hover-magnetism
        btn.addEventListener('mousemove', handleMouseMove)
        btn.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if(btn) {
        btn.removeEventListener('mousemove', handleMouseMove)
        btn.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])


  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // ── Master Timeline ──
      const master = gsap.timeline({ delay: 0.5 })

      // Phase 0: Orbital rings draw in
      master.fromTo(ringRef.current,
        { strokeDashoffset: 900, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.8, ease: 'power2.inOut' }
      )
      .fromTo(ringSecRef.current,
        { strokeDashoffset: 300, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.3, duration: 1.5, ease: 'power2.inOut' },
        '<' // Start at same time
      )
      .fromTo(ringGlowRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )

      // Phase 1: Dots appear on ring
      .fromTo(dotRefs.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(3)' },
        '-=0.8'
      )

      // Phase 1b: Floating particles appear
      .fromTo(particleRefs.current.filter(Boolean),
        { opacity: 0, scale: 0, y: 50 },
        { opacity: 0.6, scale: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      )

      // Phase 2: Letters cascade with 3D rotation
      const chars = charRefs.current.filter(Boolean)
      master.fromTo(chars,
        {
          opacity: 0,
          y: 80,
          rotateX: 90,
          scale: 0.5,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: { each: 0.08, from: 'center' },
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.3'
      )

      // Phase 2b: Horizontal lines extend
      .fromTo([lineTopRef.current, lineBotRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )

      // Phase 3: Badge slides in
      .fromTo(badgeRef.current,
        { opacity: 0, y: -15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' },
        '-=0.5'
      )

      // Phase 4: Tagline is handled by React component state/timer, we just wait a bit here visually in the timeline if needed
      // Actually, we don't need to do anything here for tagline, it handles itself.

      // Phase 5: CTA
      .fromTo(ctaRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 2 }, // Delay to let tagline type
        '-=0.2'
      )

      // Phase 6: Scroll hint
      .fromTo(scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5 },
        '-=0.1'
      )

      // ── Continuous animations ──
      // Main Ring rotates
      gsap.to(ringRef.current?.parentElement, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      })

      // Secondary Ring rotates reverse
      gsap.to('.secondary-ring', {
        rotate: -360,
        duration: 25,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
      })

      // Particle float sine wave
      gsap.to(particleRefs.current.filter(Boolean), {
        y: (i) => Math.sin(i * 0.8 + 2) * 20,
        x: (i) => Math.cos(i * 0.6 + 1) * 15,
        opacity: (i) => 0.3 + Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      })

      // ── Scroll-driven parallax exit ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          scrub: 0.5,
        },
      })

      scrollTl
        .to(scrollHintRef.current, { opacity: 0, y: -20, duration: 0.05 }, 0)
        .to(badgeRef.current, { opacity: 0, y: -60, duration: 0.2 }, 0)
        .to([lineTopRef.current, lineBotRef.current], { opacity: 0, scaleX: 0, duration: 0.15 }, 0.02)
        .to(ringRef.current?.parentElement, { opacity: 0, scale: 0.5, rotate: 180, duration: 0.4 }, 0.03)
        .to(particleRefs.current.filter(Boolean), { 
          opacity: 0, 
          y: (i) => -150 - i * 30, 
          scale: 0,
          stagger: 0.05,
          duration: 0.3 
        }, 0.04)
        .to(chars, {
          opacity: 0,
          y: (i) => -100 - i * 10,
          rotateX: -45,
          scale: 0.8,
          stagger: { each: 0.01, from: 'edges' },
          duration: 0.25,
        }, 0.05)
        .to(ctaRef.current, { opacity: 0, y: -30, scale: 0.9, duration: 0.15 }, 0.15)

    }, section)

    // Auto-skip - reduced to 8s
    const timer = setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })
    }, 8000)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="tunnel-intro relative w-full h-screen flex items-center justify-center overflow-hidden z-30"
      id="inicio"
    >
      <MouseGlow />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">

        {/* ── Orbital Ring System ── */}
        <div
          className="absolute"
          style={{
            width: 'clamp(320px, 50vw, 600px)',
            height: 'clamp(320px, 50vw, 600px)',
            transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 15px rgba(192,132,252,0.2))' }}>
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
                <stop offset="33%" stopColor="#f472c4" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Main ring */}
            <circle
              ref={ringRef}
              cx="150" cy="150" r="140"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="1"
              strokeDasharray="900"
              strokeDashoffset="900"
              opacity="0"
              className="ring-primary"
            />
            {/* Secondary Inner Ring */}
            <circle
              ref={ringSecRef}
              className="secondary-ring"
              cx="150" cy="150" r="110"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="0.5"
              strokeDasharray="20 40"
              opacity="0"
              style={{ transformOrigin: 'center center' }}
            />
            {/* Glow ring */}
            <circle
              ref={ringGlowRef}
              cx="150" cy="150" r="140"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="3"
              opacity="0"
              style={{ filter: 'blur(8px)', animation: 'ringPulse 2s ease-in-out infinite' }}
            />
            
            {/* Dots on ring */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              const x = 150 + 140 * Math.cos(rad)
              const y = 150 + 140 * Math.sin(rad)
              return (
                <circle
                  key={i}
                  ref={el => { dotRefs.current[i] = el }}
                  cx={x} cy={y} r="2"
                  fill={i % 2 === 0 ? '#c084fc' : '#f472c4'}
                  opacity="0"
                />
              )
            })}
          </svg>
        </div>

        {/* ── Parallax Floating Particles (Expanded) ── */}
        {[
          { x: -20, y: -15, size: 4, color: '#c084fc', speed: 0.3 },
          { x: 25, y: -20, size: 3, color: '#f472c4', speed: 0.5 },
          { x: -30, y: 20, size: 5, color: '#fbbf24', speed: 0.4 },
          { x: 30, y: 15, size: 3, color: '#c084fc', speed: 0.6 },
          { x: -10, y: 30, size: 4, color: '#f472c4', speed: 0.35 },
          { x: 15, y: -25, size: 3, color: '#fbbf24', speed: 0.45 },
          { x: -40, y: 10, size: 2, color: '#c084fc', speed: 0.2 },
          { x: 40, y: -10, size: 2, color: '#f472c4', speed: 0.3 },
          { x: 0, y: -40, size: 4, color: '#fbbf24', speed: 0.5 },
        ].map((p, i) => (
          <div
            key={i}
            ref={el => { particleRefs.current[i] = el }}
            className="absolute rounded-full opacity-0"
            style={{
              left: `calc(50% + ${p.x}%)`,
              top: `calc(50% + ${p.y}%)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              transform: `translate(${mousePos.x * p.speed * 10}px, ${mousePos.y * p.speed * 10}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          />
        ))}

        {/* ── Badge ── */}
        <div ref={badgeRef} className="opacity-0 mb-10 relative z-10"
          style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`, transition: 'transform 0.4s ease-out' }}
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-body text-[0.65rem] tracking-[0.4em] uppercase"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Artista Plástica Contemporânea
          </span>
        </div>

        {/* ── Decorative line top ── */}
        <div
          ref={lineTopRef}
          className="w-16 h-px mb-6 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.5), transparent)',
            transform: `translate(${mousePos.x * 2}px, 0)`,
            transition: 'transform 0.4s ease-out',
          }}
        />

        {/* ── Title — Split Characters ── */}
        <h1
          className="relative z-10 font-display leading-[0.85]"
          style={{
            fontSize: 'clamp(3rem, 13vw, 10rem)',
            perspective: '800px',
            transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <SplitText
            text="WanBitha"
            charRefs={charRefs}
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #ffffff, #c084fc, #f9a8d4)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientMove 6s ease infinite',
              filter: 'drop-shadow(0 0 60px rgba(192,132,252,0.25))',
            }}
          />
        </h1>

        {/* ── Decorative line bottom ── */}
        <div
          ref={lineBotRef}
          className="w-24 h-px mt-6 mb-8 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(244,114,196,0.4), transparent)',
            transform: `translate(${mousePos.x * -2}px, 0)`,
            transition: 'transform 0.4s ease-out',
          }}
        />

        {/* ── Tagline — Typewriter ── */}
        <div className="flex items-center justify-center gap-3 mb-12 relative z-10 min-h-[2rem]"
          style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`, transition: 'transform 0.4s ease-out' }}
        >
          <TypewriterTagline delay={3000} />
        </div>

        {/* ── CTA ── */}
        <button
          ref={ctaRef}
          className="group relative z-10 cursor-pointer opacity-0"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })}
          style={{ transition: 'transform 0.1s ease-out' }} 
        >
          <span
            className="relative z-10 inline-flex items-center gap-3 px-10 py-4 rounded-full font-display tracking-wider transition-all duration-500 group-hover:tracking-widest group-hover:gap-4"
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
            }}
          >
            Explorar Galeria
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
          <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 blur-xl transition-all duration-500" />
        </button>

        {/* ── Scroll Hint ── */}
        <div ref={scrollHintRef} className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
          <ParticleTrail />
          <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
            <div
              className="w-0.5 h-2 rounded-full bg-white/40"
              style={{ animation: 'scrollLine 2s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
