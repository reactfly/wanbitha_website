import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Typewriter = ({ text, className = '', delay = 0, speed = 0.05 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const cursorRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        delay: delay
      })
      
      // Cursor blink
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: 'steps(1)'
      })

      // Type animation
      const chars = text.length
      const obj = { count: 0 }
      
      tl.to(obj, {
        count: chars,
        duration: chars * speed,
        ease: `steps(${chars})`,
        onUpdate: () => {
          setDisplayedText(text.substring(0, Math.round(obj.count)))
        }
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [text, delay, speed])

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      <span ref={cursorRef} className="ml-1 inline-block w-[3px] h-[1em] bg-rose-hot align-middle" />
    </span>
  )
}
