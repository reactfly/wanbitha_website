import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const OrganicBlobs = () => {
  const container = useRef(null)
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Blob 1 Animation (Breathing + Float)
      gsap.to('.blob-1', {
        scale: 1.1,
        rotation: 10,
        x: 20,
        y: -20,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
      
      // Blob 2 Animation (Opposite Float)
      gsap.to('.blob-2', {
        scale: 0.9,
        rotation: -15,
        x: -30,
        y: 30,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1
      })

       // Scroll Movement (Parallax)
       gsap.to('.blob-layer', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
       })

    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={container} className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
      <div className="blob-layer w-full h-full relative">
        {/* Blob 1 - Rose Hot */}
        <div className="blob-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-hot opacity-40 blur-[80px] mix-blend-screen animate-pulse-slow"></div>
        
        {/* Blob 2 - Gold */}
        <div className="blob-2 absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gold opacity-30 blur-[100px] mix-blend-screen"></div>
        
        {/* Blob 3 - Lavender (Bottom) */}
        <div className="blob-1 absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-lavender opacity-30 blur-[120px] mix-blend-overlay"></div>
      </div>
      
      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] animate-noise pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  )
}
