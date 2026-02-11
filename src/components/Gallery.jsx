import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InteractiveCard } from './InteractiveCard'

gsap.registerPlugin(ScrollTrigger)

export const Gallery = () => {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const titleRef = useRef(null)
  const progressBarRef = useRef(null)
  const counterRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(1)

  const projects = [
    {
      id: '01', title: 'Imersão', category: 'WebGL',
      description: 'Experiências visuais imersivas utilizando WebGL e shaders customizados. Criamos mundos digitais interativos que respondem ao toque e ao movimento, transportando o usuário para realidades alternativas.',
      tags: ['Three.js', 'GLSL', 'WebGL', 'Interativo']
    },
    {
      id: '02', title: 'Interface', category: 'UI Design',
      description: 'Design de interfaces elegantes e intuitivas pensadas para encantar. Cada pixel é cuidadosamente posicionado para criar experiências que conectam estética e funcionalidade.',
      tags: ['Figma', 'React', 'Design System', 'Responsivo']
    },
    {
      id: '03', title: 'Movimento', category: 'Animation',
      description: 'Animações fluidas que dão vida às interfaces. Micro-interações, transições cinematográficas e motion design que transformam a navegação em uma experiência sensorial.',
      tags: ['GSAP', 'Framer Motion', 'CSS', 'Storytelling']
    },
    {
      id: '04', title: 'Conceito', category: 'Branding',
      description: 'Identidade visual que comunica essência. Construímos marcas memoráveis através de cores, tipografia e elementos visuais que contam histórias únicas.',
      tags: ['Identidade Visual', 'Tipografia', 'Paleta', 'Estratégia']
    }
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = sectionRef.current.offsetWidth - window.innerWidth

      const scrollTween = gsap.fromTo(sectionRef.current, {
        translateX: 0
      }, {
        translateX: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`
            }
            // Update counter
            const idx = Math.min(
              projects.length,
              Math.floor(self.progress * projects.length) + 1
            )
            setCurrentIndex(idx)
          }
        }
      })

      // Title entrance
      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: triggerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={triggerRef} id="projetos" className="overflow-hidden relative">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Progress Bar — fixed at top of pinned section */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[2px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          ref={progressBarRef}
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #c084fc, #f472c4, #fbbf24)',
            transform: 'scaleX(0)',
            boxShadow: '0 0 10px rgba(192,132,252,0.5)',
          }}
        />
      </div>

      {/* Counter — fixed at bottom-right */}
      <div className="absolute bottom-8 right-8 z-20 flex items-baseline gap-1">
        <span
          ref={counterRef}
          className="font-display text-4xl md:text-5xl"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #f472c4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {String(currentIndex).padStart(2, '0')}
        </span>
        <span className="font-body text-sm text-white/25 mb-1">
          / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      <div ref={sectionRef} className="flex h-screen w-fit items-center">
        {/* Section title (scrolls with the horizontal content) */}
        <div ref={titleRef} className="shrink-0 w-[40vw] md:w-[30vw] flex flex-col justify-center pl-12 md:pl-20 pr-8">
          <span className="text-xs font-body tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Portfólio
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.9] mb-4"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #ffffff, #c084fc)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientMove 5s ease infinite',
            }}
          >
            Projetos
          </h2>
          <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Cada projeto é uma jornada. Explore nosso trabalho.
          </p>
          {/* Scroll hint */}
          <div className="flex items-center gap-3 mt-8">
            <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <span className="font-body text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Deslize →
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-8 md:gap-12 pr-20 items-center">
          {projects.map((item) => (
            <InteractiveCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
