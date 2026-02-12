import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Instagram, MessageCircle, CheckCircle, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export const Contact = () => {
  const container = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 60, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      })
      gsap.from(formRef.current, {
        opacity: 0, x: -30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      })
      gsap.from(infoRef.current, {
        opacity: 0, x: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      })
    }, container)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success')
    }, 2000)
  }

  const inputClass = "w-full px-5 py-4 rounded-xl font-body text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-400"
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(192,132,252,0.5)'
    e.target.style.background = 'rgba(255,255,255,0.06)'
    e.target.style.boxShadow = '0 0 0 3px rgba(192,132,252,0.1), 0 0 20px rgba(192,132,252,0.05)'
  }
  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
    e.target.style.background = 'rgba(255,255,255,0.04)'
    e.target.style.boxShadow = 'none'
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contato@wanbitha.com', color: '#d946a8' },
    { icon: MapPin, label: 'Ateliê', value: 'São Paulo, Brasil', color: '#c084fc' }
  ]

  const socials = [
    { name: 'Instagram', icon: Instagram, color: '#E4405F', href: '#' },
    { name: 'WhatsApp', icon: MessageCircle, color: '#25D366', href: '#' },
  ]

  return (
    <section ref={container} id="contato" className="min-h-screen flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40 backdrop-blur-[3px]" />

      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/5 w-72 h-72 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-rose-hot/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-body tracking-[0.4em] uppercase mb-4 inline-block" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Contato
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-display leading-[0.9] mb-4"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #ffffff, #c084fc)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientMove 5s ease infinite',
            }}
          >
            Vamos Conversar
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto font-editorial">
            Interessado em uma obra? Quer saber mais sobre o processo criativo? Entre em contato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <div
            ref={formRef}
            className="lg:col-span-3 rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {formStatus === 'success' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-20 animate-fade-in">
                 <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                 </div>
                 <h3 className="text-2xl font-display text-white mb-2">Mensagem Enviada!</h3>
                 <p className="text-white/60 text-center max-w-xs">
                   Obrigada pelo contato. Retornarei em breve.
                 </p>
                 <button 
                   onClick={() => setFormStatus('idle')}
                   className="mt-8 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-sm transition-colors text-white/80"
                 >
                   Enviar outra mensagem
                 </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className={`space-y-5 transition-opacity duration-500 ${formStatus === 'submitting' ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-xs text-white/35 uppercase tracking-wider mb-2">Nome</label>
                  <input type="text" required className={inputClass} style={inputStyle} placeholder="Seu nome" onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div>
                  <label className="block font-body text-xs text-white/35 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" required className={inputClass} style={inputStyle} placeholder="seu@email.com" onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs text-white/35 uppercase tracking-wider mb-2">Assunto</label>
                <input type="text" required className={inputClass} style={inputStyle} placeholder="Interesse em obra, encomenda, exposição..." onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label className="block font-body text-xs text-white/35 uppercase tracking-wider mb-2">Mensagem</label>
                <textarea rows={5} required className={inputClass + ' resize-none'} style={inputStyle} placeholder="Conte-me mais sobre o que você busca..." onFocus={handleFocus} onBlur={handleBlur} />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="group w-full py-4 rounded-xl font-display text-base tracking-wider text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #d946a8, #c084fc)',
                  boxShadow: '0 8px 30px -10px rgba(192,132,252,0.3)',
                }}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Enviar Mensagem</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <h3 className="font-display text-lg text-white/80 mb-6">Informações</h3>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.color + '12' }}>
                      <item.icon size={18} strokeWidth={1.5} color={item.color} />
                    </div>
                    <div>
                      <p className="font-body text-xs text-white/35 uppercase tracking-wider">{item.label}</p>
                      <p className="font-body text-sm text-white/70 mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <h3 className="font-display text-lg text-white/80 mb-6">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((social, i) => (
                  <a key={i} href={social.href} className="group flex items-center gap-2.5 px-4 py-3 rounded-xl font-body text-xs text-white/50 hover:text-white transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = social.color + '40'; e.currentTarget.style.boxShadow = `0 4px 15px -5px ${social.color}25` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <social.icon size={14} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-current" style={{ color: social.color }} />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Manifesto mini-quote */}
            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <p className="font-editorial text-white/60 italic text-sm leading-relaxed">
                "A arte não é o que você vê, mas o que você faz os outros verem."
              </p>
              <p className="font-body text-xs text-white/30 mt-3 tracking-widest uppercase">— WanBitha</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
