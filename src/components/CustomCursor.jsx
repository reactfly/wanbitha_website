import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'
    
    // Initial ref checks
    if (!cursorRef.current || !followerRef.current) return

    // Center cursor
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 })
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 })

    const onMove = (e) => {
      const { clientX, clientY } = e
      // Main dot follows instantly
      gsap.to(cursorRef.current, { x: clientX, y: clientY, duration: 0.1 })
      // Follower has lag
      gsap.to(followerRef.current, { x: clientX, y: clientY, duration: 0.6, ease: 'power2.out' })
    }

    const onHoverStart = () => setIsHovering(true)
    const onHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    
    // Add hover listeners to clickable elements
    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, .cursor-pointer')
      clickables.forEach(el => {
        el.addEventListener('mouseenter', onHoverStart)
        el.addEventListener('mouseleave', onHoverEnd)
      })
      return clickables
    }

    let clickables = addListeners()

    // Re-check for new elements periodically (simple observer alternative)
    const observer = new MutationObserver(() => {
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart)
        el.removeEventListener('mouseleave', onHoverEnd)
      })
      clickables = addListeners()
    })
    
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart)
        el.removeEventListener('mouseleave', onHoverEnd)
      })
      document.body.style.cursor = 'auto'
    }
  }, [])

  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 })
      gsap.to(followerRef.current, { 
        scale: 1.5, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3 
      })
    } else {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })
      gsap.to(followerRef.current, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        duration: 0.3 
      })
    }
  }, [isHovering])

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-rose-hot rounded-full pointer-events-none z-[10000] mix-blend-difference"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors duration-300"
      />
    </>
  )
}
