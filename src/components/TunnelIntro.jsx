import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════
   Cinematic Intro — Multi-phase reveal
   ═══════════════════════════════════════════
   Phase 1: Orbital ring draws itself
   Phase 2: Each letter cascades in with depth
   Phase 3: Tagline types out one word at a time
   Phase 4: CTA fades in, scroll hint pulses
   Scroll: everything parallaxes away at
          different speeds for depth effect
*/

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

export const TunnelIntro = () => {
  const sectionRef = useRef(null)
  const ringRef = useRef(null)
  const ringGlowRef = useRef(null)
  const charRefs = useRef([])
  const taglineWordsRef = useRef([])
  const ctaRef = useRef(null)
  const scrollHintRef = useRef(null)
  const lineTopRef = useRef(null)
  const lineBotRef = useRef(null)
  const badgeRef = useRef(null)
  const dotRefs = useRef([])
  const particleRefs = useRef([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse parallax for floating elements
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

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // ── Master Timeline ──
      const master = gsap.timeline({ delay: 0.5 })

      // Phase 0: Orbital ring draws in
      master.fromTo(ringRef.current,
        { strokeDashoffset: 900, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.8, ease: 'power2.inOut' }
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
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: { each: 0.05, from: 'center' },
          ease: 'back.out(1.5)',
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
        '-=0.2'
      )

      // Phase 4: Tagline words appear one at a time
      const tWords = taglineWordsRef.current.filter(Boolean)
      master.fromTo(tWords,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out'
        },
        '-=0.1'
      )

      // Phase 5: CTA
      .fromTo(ctaRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' },
        '-=0.2'
      )

      // Phase 6: Scroll hint
      .fromTo(scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5 },
        '-=0.1'
      )

      // ── Continuous animations ──
      // Main Ring rotates slowly
      gsap.to(ringRef.current?.parentElement, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      })

      // Secondary Ring rotates faster reverse
      gsap.to('.secondary-ring', {
        rotate: -360,
        duration: 25,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
      })

      // Ring glow pulses
      gsap.to(ringGlowRef.current, {
        opacity: 0.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 5,
      })

      // Title breathing (letter spacing)
      gsap.to(chars, {
        letterSpacing: '0.05em',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.02, from: 'center' } // Wave breathing
      })

      // Title subtle float
      gsap.to(chars, {
        y: (i) => Math.sin(i * 0.5) * 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 6,
        stagger: { each: 0.08, from: 'center' },
      })

      // Particles continuous parallax & twinkle
      gsap.to(particleRefs.current.filter(Boolean), {
        y: (i) => Math.sin(i * 0.8 + 2) * 20,
        x: (i) => Math.cos(i * 0.6 + 1) * 15,
        opacity: (i) => 0.3 + Math.random() * 0.5, // Twinkle
        scale: (i) => 0.8 + Math.random() * 0.4, // Pulse size
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 7,
        stagger: 0.2,
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

      // Different layers move at different speeds for depth
      scrollTl
        .to(scrollHintRef.current, { opacity: 0, y: -20, duration: 0.05 }, 0)
        .to(badgeRef.current, { opacity: 0, y: -60, duration: 0.2 }, 0)
        .to([lineTopRef.current, lineBotRef.current], { opacity: 0, scaleX: 0, duration: 0.15 }, 0.02)
        .to(ringRef.current?.parentElement, { opacity: 0, scale: 0.5, rotate: 180, duration: 0.4 }, 0.03) // Spin out
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
          z: -200, // Fly into screen
          rotateX: -45,
          scale: 0.8,
          stagger: { each: 0.01, from: 'edges' },
          duration: 0.25,
        }, 0.05)
        .to(tWords, { opacity: 0, y: -40, stagger: 0.02, duration: 0.2 }, 0.1)
        .to(ctaRef.current, { opacity: 0, y: -30, scale: 0.9, duration: 0.15 }, 0.15)

    }, section)

    // Auto-skip
    const timer = setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })
    }, 18000)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  const taglineWords = ['Arte', '·', 'Design', '·', 'Tecnologia']

  return (
    <section
      ref={sectionRef}
      className="tunnel-intro relative w-full h-screen flex items-center justify-center overflow-hidden z-30"
      id="inicio"
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">

        {/* ── Orbital Ring ── */}
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
            />
            {/* Secondary Inner Ring (New) */}
            <circle
              className="secondary-ring"
              cx="150" cy="150" r="110"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="0.5"
              strokeDasharray="20 40"
              opacity="0.3"
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
              style={{ filter: 'blur(8px)' }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
                <stop offset="33%" stopColor="#f472c4" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.6" />
              </linearGradient>
            </defs>
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

        {/* ── Parallax Floating Particles ── */}
        {[
          { x: -20, y: -15, size: 4, color: '#c084fc', speed: 0.3 },
          { x: 25, y: -20, size: 3, color: '#f472c4', speed: 0.5 },
          { x: -30, y: 20, size: 5, color: '#fbbf24', speed: 0.4 },
          { x: 30, y: 15, size: 3, color: '#c084fc', speed: 0.6 },
          { x: -10, y: 30, size: 4, color: '#f472c4', speed: 0.35 },
          { x: 15, y: -25, size: 3, color: '#fbbf24', speed: 0.45 },
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
            Digital Experience Studio
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

        {/* ── Tagline — Word by word ── */}
        <p className="flex items-center gap-3 mb-12 relative z-10"
          style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`, transition: 'transform 0.4s ease-out' }}
        >
          {taglineWords.map((word, i) => (
            <span
              key={i}
              ref={el => { taglineWordsRef.current[i] = el }}
              className={`font-body uppercase opacity-0 ${word === '·' ? 'text-purple-400' : ''}`}
              style={{
                fontSize: word === '·' ? '1.2rem' : 'clamp(0.65rem, 1.2vw, 0.85rem)',
                letterSpacing: word === '·' ? '0' : '0.35em',
                color: word === '·' ? undefined : 'rgba(255,255,255,0.4)',
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* ── CTA ── */}
        <button
          ref={ctaRef}
          className="group relative z-10 cursor-pointer opacity-0"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })}
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`, transition: 'transform 0.4s ease-out' }}
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
            Explorar
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
          <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 blur-xl transition-all duration-500" />
        </button>

        {/* ── Scroll Hint ── */}
        <div ref={scrollHintRef} className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
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
