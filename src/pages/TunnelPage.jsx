import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PsychedelicTunnelScene } from '../components/TunnelScene'
import { LoadingScreen } from '../components/LoadingScreen'
import '../styles/tunnel.css' // Import specific Webflow styles

export const TunnelPage = () => {
  useEffect(() => {
    // Add specific body class for tunnel if needed or handle cleanup
    document.body.style.backgroundColor = '#000000'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <PsychedelicTunnelScene />
        </Canvas>
      </Suspense>

      {/* Overlay Content based on Sleepwell Design */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mix-blend-difference">
          Sleepwell
        </h1>
        <p className="mt-4 text-sm md:text-base tracking-[0.5em] uppercase opacity-70">
          Immersive Reality
        </p>
      </div>
      
      {/* Navigation back */}
      <a href="/" className="absolute top-8 left-8 z-50 pointer-events-auto text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
        ← Back to Wanessa
      </a>
    </div>
  )
}
