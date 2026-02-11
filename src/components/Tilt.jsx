import React, { useRef, useState } from 'react'

export const Tilt = ({ children, className = '', perspective = 1000, scale = 1.02 }) => {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [transition, setTransition] = useState('transform 0.1s ease-out')

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    const rotateX = (0.5 - y) * 20 // Max 10 deg
    const rotateY = (x - 0.5) * 20 // Max 10 deg

    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`)
    setTransition('')
  }

  const handleMouseLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`)
    setTransition('transform 0.5s ease-out')
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}
