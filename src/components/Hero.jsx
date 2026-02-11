import React, { useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Code2, Sparkles } from 'lucide-react'
import { AnimatedLogo } from './AnimatedLogo'
import { Typewriter } from './Typewriter'

gsap.registerPlugin(ScrollTrigger)

const TiltCard = ({ icon: IconComponent, title, desc, color }) => {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, {
      rotateX, rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    })

    // Move glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 0.15,
        duration: 0.3,
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0, rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-2xl border cursor-default overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Follow glow */}
      <div
        ref={glowRef}
        className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${color}30, transparent 70%)`,
          filter: 'blur(20px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Icon */}
      <div
        className="text-2xl mb-6 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: color + '15', color: color, transform: 'translateZ(30px)' }}
      >
        <IconComponent size={24} strokeWidth={1.5} />
      </div>

      <h3
        className="text-xl font-display mb-3 text-white/90"
        style={{ transform: 'translateZ(20px)' }}
      >
        {title}
      </h3>
      <p
        className="font-body text-sm text-white/45 leading-relaxed"
        style={{ transform: 'translateZ(10px)' }}
      >
        {desc}
      </p>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(225deg, ${color}10, transparent)` }}
      />
    </div>
  )
}

export const Hero = () => {
  const container = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const cardsRef = useRef([])
  const lineRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Animations ───
      // 1. Description Assembly

      // 2. Description Assembly
      gsap.from(descRef.current, {
        opacity: 0, 
        y: 50, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: { trigger: descRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      })

      // 3. Service Cards "Puzzle Pieces" Snap
      // They fly in from corners to form the grid
      const cards = cardsRef.current.filter(Boolean)
      
      // Card 1 (Left): Comes from left-bottom
      gsap.from(cards[0], {
        x: -300, y: 200, rotation: -45, opacity: 0, scale: 0.5,
        scrollTrigger: { trigger: container.current, start: 'top 70%', scrub: 1, end: 'top 20%' }
      })
      // Card 2 (Center): Comes from top (drops in)
      gsap.from(cards[1], {
        y: -300, rotation: 180, opacity: 0, scale: 0.5,
        scrollTrigger: { trigger: container.current, start: 'top 70%', scrub: 1, end: 'top 20%' }
      })
      // Card 3 (Right): Comes from right-bottom
      gsap.from(cards[2], {
        x: 300, y: 200, rotation: 45, opacity: 0, scale: 0.5,
        scrollTrigger: { trigger: container.current, start: 'top 70%', scrub: 1, end: 'top 20%' }
      })

      // Decorative line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0, opacity: 0, duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 90%', toggleActions: 'play none none reverse' }
        })
      }
    }, container)
    return () => ctx.revert()
  }, [])

  const services = [
    { icon: Palette, title: 'Design', desc: 'Interfaces imersivas que encantam', color: '#d946a8' },
    { icon: Code2, title: 'Desenvolvimento', desc: 'Código limpo e performático', color: '#c084fc' },
    { icon: Sparkles, title: 'Experiência', desc: 'Interações que contam histórias', color: '#fbbf24' },
  ]

  return (
    <section ref={container} className="min-h-screen flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden section">
      {/* Glass overlay */}
      <div className="overlay-gradient" />

      {/* Ambient orbs */}
      <div className="ambient-light">
        <div className="ambient-orb absolute top-1/4 left-1/5 w-72 h-72 bg-purple-500/8" />
        <div className="ambient-orb absolute bottom-1/3 right-1/5 w-80 h-80 bg-rose-hot/8" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <AnimatedLogo size="large" />
        </div>

        {/* Name - MEGA SIZE */}
        <div className="mb-12 relative group z-20">
          {/* Glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-hot/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
          
          <h1 className="relative text-[11vw] md:text-[13vw] font-display leading-[0.9] tracking-tighter uppercase select-none">
            <span className="block bg-gradient-to-r from-rose-hot via-gold to-lavender bg-clip-text text-transparent bg-[length:200%_auto] animate-gradientMove hover:scale-105 transition-transform duration-700 ease-out origin-bottom pb-2">
              Wanessa
            </span>
            <span className="block bg-gradient-to-r from-lavender-dark via-rose-hot to-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-gradientMove" style={{ animationDelay: '-1.5s' }}>
              Bitha
            </span>
          </h1>
        </div>

        {/* Section label */}
        <div className="mb-6">
          <span className="text-label text-white/35">
            O que fazemos
          </span>
        </div>

        {/* Title with Typewriter */}
        <h2
          ref={titleRef}
          className="text-h1 mb-8"
        >
          {/* Row 1 */}
          <div className="block">
            <Typewriter 
              text="Criamos experiências" 
              className="text-gradient-mixed"
              speed={0.07}
            />
          </div>
          {/* Row 2 */}
          <div className="block mt-2">
            <Typewriter 
              text="que inspiram" 
              className="text-gradient-gold" 
              delay={1.5}
              speed={0.07}
            />
          </div>
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-editorial text-tertiary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Unimos arte, design e tecnologia para construir experiências digitais
          que vão além do esperado.
        </p>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="w-24 h-px mx-auto mb-16 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.4), transparent)' }}
        />

        {/* Service cards with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el}>
              <TiltCard {...item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
