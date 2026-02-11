import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Magnetic } from './Magnetic'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const mobileLinksRef = useRef([])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)

      // Scroll progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      setScrollProgress(progress)

      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Stagger mobile menu items
  useEffect(() => {
    const links = mobileLinksRef.current.filter(Boolean)
    if (menuOpen && links.length > 0) {
      gsap.fromTo(links,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.15 }
      )
    }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-fuchsia-900/10'
          : 'py-5 bg-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] z-50" style={{
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #c084fc, #f472c4, #fbbf24)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(192,132,252,0.4)',
      }} />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); scrollTo('#inicio') }}
          className="font-display text-2xl md:text-3xl tracking-tight transition-all duration-300 hover:opacity-80"
          style={{
            background: 'linear-gradient(135deg, #e879a8, #f5c2d4, #d4a5ff)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientMove 5s ease infinite',
          }}
        >
          Wanessa Bitha
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={id}>
                <Magnetic strength={0.3}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                    className={`block relative px-5 py-2 rounded-full text-sm tracking-wider uppercase font-body transition-all duration-300 group ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-6 bg-gradient-to-r from-fuchsia-400 to-purple-400'
                          : 'w-0 group-hover:w-4 bg-gradient-to-r from-fuchsia-400/60 to-purple-400/60'
                      }`}
                    />
                  </a>
                </Magnetic>
              </li>
            )
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
          aria-label="Menu"
        >
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/90 backdrop-blur-2xl transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(({ label, href }, i) => {
            const id = href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={id} ref={el => { mobileLinksRef.current[i] = el }}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                  className={`text-3xl font-display tracking-wider transition-all duration-300 ${
                    isActive ? 'text-fuchsia-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
