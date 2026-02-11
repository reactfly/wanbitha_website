import React, { useRef, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from './TextReveal'
import { ParallaxSection } from './ParallaxImage'
import { Tilt } from './Tilt' // Import Tilt

gsap.registerPlugin(ScrollTrigger)

const AnimatedCounter = ({ value, label }) => {
  const numberRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!numberRef.current || hasAnimated.current) return

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const suffix = value.replace(/[0-9]/g, '')

    if (isNaN(numericValue)) {
      numberRef.current.textContent = value
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: numericValue,
          duration: 2.5, // Slower for elegance
          ease: 'power3.out',
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = Math.round(obj.val) + suffix
            }
          }
        })
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    observer.observe(numberRef.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-center group">
      <div
        ref={numberRef}
        className="text-5xl md:text-7xl font-display mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
        style={{
          background: 'linear-gradient(135deg, #c084fc, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 15px rgba(192,132,252,0.3))'
        }}
      >
        0
      </div>
      <div className="text-white/50 font-body text-sm tracking-widest uppercase">{label}</div>
    </div>
  )
}

export const About = () => {
  const container = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 80, duration: 1.5, ease: 'power4.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      })
      
      // Cards come in from bottom with rotation
      gsap.from(cardsRef.current.filter(Boolean), {
        opacity: 0, 
        y: 100,
        rotationX: 45,
        duration: 1.2, 
        stagger: 0.2, 
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: cardsRef.current[0], 
          start: 'top 85%', 
          toggleActions: 'play none none reverse' 
        }
      })
    }, container)
    return () => ctx.revert()
  }, [])

  const features = [
    {
      title: 'Design',
      desc: 'UI/UX imersivo e centrado no humano. Cada detalhe é pensado para criar conexões emocionais profundas.',
      icon: '◆',
      color: '#d946a8'
    },
    {
      title: 'Tecnologia',
      desc: 'React, Three.js e arquitetura escalável. Performance extrema e inovação em cada linha de código.',
      icon: '▲',
      color: '#c084fc'
    },
    {
      title: 'Arte',
      desc: 'Direção criativa e storytelling visual. Transformamos conceitos abstratos em experiências memoráveis.',
      icon: '●',
      color: '#fbbf24'
    }
  ]

  const stats = [
    { value: '50+', label: 'Projetos' },
    { value: '100%', label: 'Satisfação' },
    { value: '5+', label: 'Anos' },
    { value: '24/7', label: 'Suporte' }
  ]

  return (
    <section ref={container} id="sobre" className="min-h-screen py-32 px-6 relative overflow-hidden section">
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a16] to-black opacity-80" />
      
      {/* Ambient Grid (Subtle) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-end">
          <div>
             <span className="text-label text-rose-hot/80 mb-6 block tracking-[0.3em]">
              MANIFESTO
            </span>
            <h2
              ref={titleRef}
              className="text-6xl md:text-8xl font-display leading-[0.85]"
            >
              <span className="block text-white">Arte &</span>
              <span className="block bg-gradient-to-r from-rose-hot via-purple-500 to-gold bg-clip-text text-transparent">
                Código
              </span>
            </h2>
          </div>
          <div className="text-lg md:text-xl text-white/70 font-editorial leading-relaxed max-w-xl">
             <TextReveal type="words" delay={0.2}>
               Nós não apenas construímos websites. Nós esculpimos jornadas digitais que desafiam o convencional. 
               Onde a estética encontra a função em um balé perfeito de pixels.
             </TextReveal>
          </div>
        </div>

        {/* Feature cards with Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {features.map((item, i) => (
            <Tilt key={i} perspective={2000} scale={1.03}>
              <div
                ref={el => cardsRef.current[i] = el}
                className="group h-full p-10 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/10"
                style={{
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  className="text-4xl mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white/5"
                  style={{ color: item.color, boxShadow: `0 0 20px ${item.color}20` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-3xl font-display mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {item.title}
                </h3>
                <p className="text-body text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  {item.desc}
                </p>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Full Width Parallax Section */}
        <div className="mb-40 rounded-4xl overflow-hidden border border-white/10 relative">
             <ParallaxSection
              imageSrc="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80"
              imageAlt="Abstract digital art"
              imagePosition="center"
              parallaxSpeed={0.2}
              className="py-32"
            >
              <div className="text-center relative z-10">
                 <h3 className="text-5xl md:text-7xl font-display mb-8 text-white">
                    Visão de Futuro
                 </h3>
                 <p className="max-w-2xl mx-auto text-xl text-white/80 font-editorial">
                    "O design não é apenas o que parece e o que se sente. O design é como funciona."
                 </p>
              </div>
            </ParallaxSection>
        </div>

        {/* Minimal Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-20 border-t border-white/10">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
