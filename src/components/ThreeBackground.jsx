import React, { useState, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor, Stars, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 100 }) {
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#E91E7B" roughness={0.5} metalness={0.5} />
      </instancedMesh>
    </>
  )
}

function FloatingOrb({ position, color, scale, speed }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    }
  })
  
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

function FloatingRing({ position, color, scale, speed }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5
    }
  })
  
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
  )
}

function Scene() {
  const group = useRef()
  
  useFrame((state) => {
    // Mouse parallax
    const x = (state.mouse.x * window.innerWidth) / 2
    const y = (state.mouse.y * window.innerHeight) / 2
    
    // Smooth dampening for rotation
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.0005, 0.1)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.0005, 0.1)

      // Scroll interaction (zoom / rotation) - mimicking Spline scroll events
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollProgress = scrollY / (maxScroll || 1)
      
      // Move camera or group based on scroll
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, scrollProgress * 5, 0.1)
      group.current.rotation.z += 0.001
    }
  })

  return (
    <>
      <group ref={group}>
        {/* Enhanced stars with more depth */}
        <Stars radius={150} depth={80} count={8000} factor={4} saturation={0} fade speed={0.5} />
        
        {/* Sparkles for magical effect */}
        <Sparkles count={200} scale={15} size={4} speed={0.4} opacity={0.5} color="#FFD700" />
        
        {/* Main floating orb with distortion material */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial color="#E91E7B" distort={0.4} speed={2} wireframe />
          </mesh>
        </Float>
        
        {/* Secondary floating orbs */}
        <FloatingOrb position={[-4, 2, -10]} color="#FF7EB3" scale={[1, 1, 1]} speed={0.7} />
        <FloatingOrb position={[4, -2, -12]} color="#D4A5FF" scale={[1.2, 1.2, 1.2]} speed={0.6} />
        <FloatingOrb position={[0, 4, -9]} color="#FFD700" scale={[0.8, 0.8, 0.8]} speed={0.8} />
        
        {/* Floating rings */}
        <FloatingRing position={[-3, -1, -6]} color="#8B2252" scale={[1.5, 1.5, 1.5]} speed={0.4} />
        <FloatingRing position={[3, 1, -7]} color="#5C1A3A" scale={[1.8, 1.8, 1.8]} speed={0.3} />
        
        {/* Particles */}
        <Particles count={200} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Multiple point lights for depth */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#E91E7B" />
        <pointLight position={[-10, -10, 10]} intensity={0.8} color="#FFD700" />
        <pointLight position={[0, 5, 5]} intensity={0.6} color="#D4A5FF" />
        
        {/* Directional light for shadows */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
      </group>
    </>
  )
}

export const ThreeBackground = () => {
  const [dpr, setDpr] = useState(1.5)
  
  return (
    <div id="canvas-container">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true }} // Disabling antialias for performance
      >
        <PerformanceMonitor 
          onIncline={() => setDpr(2)} 
          onDecline={() => setDpr(1)} // Fallback to lower dpr on lag
        />
        <Scene />
      </Canvas>
    </div>
  )
}
