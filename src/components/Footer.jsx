import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const footerLinks = [
  { label: 'Início', id: 'inicio' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Projetos', id: 'galeria' }, // Fixed ID
  { label: 'Contato', id: 'contato' },
]

const services = ['UI/UX Design', 'Desenvolvimento Web', 'WebGL & 3D', 'Branding', 'Consultoria']

const socials = ['Instagram', 'LinkedIn', 'Behance', 'GitHub']

export const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="relative bg-black pt-32 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* CTA Section */}
          <div>
            <h2 className="text-6xl md:text-8xl font-display leading-[0.9] mb-8 text-white">
              Vamos <br />
              <span className="text-white/40 italic font-editorial">Criar?</span>
            </h2>
            <p className="text-xl text-white/60 max-w-md mb-12">
              Pronto para transformar sua visão digital em realidade? 
              Estamos ansiosos para ouvir sobre seu próximo projeto.
            </p>
            <button 
              onClick={() => scrollTo('contato')}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-rose-200 transition-colors"
            >
              Iniciar Projeto
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:pl-20">
            <div>
              <h4 className="text-sm text-white/40 uppercase tracking-widest mb-6">Menu</h4>
              <ul className="space-y-4">
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollTo(link.id)}
                      className="text-white/70 hover:text-white text-lg transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm text-white/40 uppercase tracking-widest mb-6">Social</h4>
              <ul className="space-y-4">
                {socials.map((social) => (
                  <li key={social}>
                    <a href="#" className="text-white/70 hover:text-white text-lg transition-colors flex items-center gap-2 group">
                      {social}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm text-white/40 uppercase tracking-widest mb-6">Serviços</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s} className="text-white/50 text-sm">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-display text-white mb-2">Wanessa Bitha</h3>
            <p className="text-white/30 text-xs">© 2026 Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-8 text-xs text-white/30">
            <a href="#" className="hover:text-white transition-colors">Politica de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>

        {/* Big Text Background */}
        <div className="absolute -bottom-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
          <h1 className="text-[20vw] font-display whitespace-nowrap leading-none text-white select-none">
            WANESSA BITHA
          </h1>
        </div>
      </div>
    </footer>
  )
}
