import React, {  useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const TextReveal = ({ children, className = "", type = "words", delay = 0 }) => {
  const el = useRef(null)
  
  // Helper to split text
  const splitContent = (text, type) => {
    if (type === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block reveal-char" style={{ opacity: 0 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    }
    // Default words
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block reveal-word mr-2 overflow-hidden align-top">
        <span className="inline-block reveal-content transform translate-y-full">
          {word}
        </span>
      </span>
    ))
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for Chars (Fade + Scale/Rotate/Y)
      if (type === 'chars') {
        gsap.to('.reveal-char', {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      } 
      // Animation for Words (Reveal from bottom/mask)
      else {
        gsap.to('.reveal-content', {
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power4.out',
          delay: delay,
          scrollTrigger: {
            trigger: el.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    }, el)
    return () => ctx.revert()
  }, [type, delay])

  return (
    <div ref={el} className={className}>
      {typeof children === 'string' ? splitContent(children, type) : children}
    </div>
  )
}
