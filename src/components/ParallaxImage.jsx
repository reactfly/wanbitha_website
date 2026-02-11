import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ParallaxImage = ({ 
  src, 
  alt, 
  className = '', 
  speed = 0.5,
  children 
}) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div 
        ref={imageRef}
        className="relative w-full h-full"
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export const ParallaxSection = ({ 
  children, 
  className = '',
  imageSrc,
  imageAlt = '',
  imagePosition = 'right',
  parallaxSpeed = 0.3
}) => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: parallaxSpeed * 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [parallaxSpeed])

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex items-center py-20 px-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div 
          ref={contentRef}
          className={`order-2 lg:order-${imagePosition === 'right' ? '1' : '2'}`}
        >
          {children}
        </div>
        
        {/* Parallax Image */}
        <div 
          ref={imageRef}
          className={`order-1 lg:order-${imagePosition === 'right' ? '2' : '1'}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-wine/20">
            <img 
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-deep/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
