import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════
   Immersive Space Tunnel — Hyperspace Warp
   ═══════════════════════════════════════════════
   Lightweight approach: polar-coordinate tunnel
   with warp-speed starfield, nebula glow, and
   scroll-driven travel. No heavy raymarching.
*/

const spaceVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const spaceFragment = `
  precision mediump float;

  uniform float uTime;
  uniform float uScroll;
  uniform float uWarp; // New uniform
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  varying vec2 vUv;

  #define PI 3.14159265
  #define TAU 6.28318530

  // ── Fast hash ──
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // ── Improved noise with more detail ──
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1, 0)), f.x),
      mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x),
      f.y
    );
  }

  // ── Fractal Brownian Motion for more organic patterns ──
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // ── Enhanced starfield with glow ──
  float starLayer(vec2 uv, float scale, float brightness, float twinkleSpeed) {
    uv *= scale;
    vec2 g = floor(uv);
    vec2 f = fract(uv);
    float h = hash(g);
    vec2 center = vec2(hash(g + 0.1), hash(g + 99.0));
    float d = length(f - center);
    float size = 0.003 + h * 0.03;
    float star = smoothstep(size, size * 0.15, d) * brightness;
    // Enhanced twinkle with multiple frequencies
    float twinkle = sin(h * 100.0 + uTime * twinkleSpeed) * 0.5 + 0.5;
    twinkle += sin(h * 200.0 + uTime * twinkleSpeed * 1.5) * 0.25;
    star *= 0.4 + 0.6 * twinkle;
    // Add glow
    float glow = exp(-d * 20.0) * 0.3 * h;
    star += glow;
    return star;
  }

  // ── Brand Palette (Rose/Gold/Purple) ──
  vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.3, 0.2, 0.2); // Rose tint
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    float t = uTime;
    float scroll = uScroll;
    
    // Smooth Warp Transition
    float warp = uWarp;
    
    // Mouse Influence
    vec2 mouse = uMouse * 0.4; // Stronger influence
    vec2 center = mouse;
    vec2 centered = uv - center;

    // Polar coordinates
    float angle = atan(centered.y, centered.x);
    float radius = length(centered);

    // ── Hyper Speed Logic ──
    float baseSpeed = t * 0.2;
    float warpSpeed = scroll * 20.0 + warp * 30.0; // FASTER
    float speed = baseSpeed + warpSpeed;

    // Tunnel Depth (Widens on warp)
    float depth = 1.0 / (radius + 0.1 - warp * 0.08); 

    // Texture coords
    vec2 tunnelUv = vec2(
      angle / TAU + 0.5 + t * 0.05, // Rotation
      depth * 3.0 - speed
    );

    // ── Background (Deep Space) ──
    vec3 bgColor = vec3(0.01, 0.005, 0.02);
    
    // ── Tunnel Walls (Electric) ──
    float ringPattern = sin(tunnelUv.y * 20.0 + t) * 0.5 + 0.5;
    ringPattern = pow(ringPattern, 6.0); // Sharper rings
    
    // Color Palette
    float hue = fract(tunnelUv.y * 0.15 + scroll * 0.5 + t * 0.1);
    vec3 ringColor = palette(hue);
    
    // Shift to Rose Hot on Warp
    ringColor = mix(ringColor, vec3(1.0, 0.0, 0.5), warp * 0.8);

    // Intensity
    float wallIntensity = smoothstep(0.0, 0.6, radius);
    wallIntensity *= 1.0 + scroll * 1.0; 
    
    bgColor += ringColor * ringPattern * wallIntensity;

    // ── Grid / Cyber Lines ──
    float grid = sin(angle * 30.0 + speed * 2.0) * 0.5 + 0.5;
    grid = pow(grid, 20.0);
    bgColor += vec3(0.4, 0.8, 1.0) * grid * wallIntensity * 0.5;

    // ── Star Streaks (Warp Effect) ──
    if (warp > 0.01 || scroll > 0.01) {
        float streakIntensity = (warp + scroll) * 2.0;
        float streak = sin(tunnelUv.y * 100.0) * 0.5 + 0.5;
        streak = pow(streak, 10.0) * noise(uv * 10.0);
        bgColor += vec3(1.0, 1.0, 1.0) * streak * streakIntensity * radius;
    }

    // ── Vignette & Tone Mapping ──
    float vig = 1.0 - smoothstep(0.4, 2.5, radius);
    bgColor *= vig;
    
    // Final Color
    gl_FragColor = vec4(bgColor, 1.0);
  }
`

/* ─── Minimal 3D star dust with parallax ─── */
function StarDust({ count, color, spread, parallaxSpeed = 1, scrollRef, mouseRef }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    // Use a seeded random for consistent results
    let seed = 12345
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < count; i++) {
      const a = random() * Math.PI * 2
      const r = 0.5 + random() * spread
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = Math.sin(a) * r
      arr[i * 3 + 2] = (random() - 0.5) * 4
    }
    return arr
  }, [count, spread])

  const _scrollRef = scrollRef || { current: 0 }
  const _mouseRef = mouseRef || { current: { x: 0, y: 0 } }

  useFrame((state) => {
    if (!ref.current) return
    
    // Base rotation
    ref.current.rotation.z = state.clock.elapsedTime * 0.05 * parallaxSpeed
    
    // Scroll parallax - move particles along Z axis
    const scrollOffset = _scrollRef.current * 2 * parallaxSpeed
    ref.current.position.z = scrollOffset
    
    // Mouse parallax - subtle movement based on mouse position
    const mouseParallaxX = _mouseRef.current.x * 0.3 * parallaxSpeed
    const mouseParallaxY = _mouseRef.current.y * 0.3 * parallaxSpeed
    ref.current.position.x = mouseParallaxX
    ref.current.position.y = mouseParallaxY
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}

/* ─── Parallax Rings ─── */
function ParallaxRing({ radius, color, thickness, parallaxSpeed = 1, scrollRef, mouseRef, rotationSpeed = 1 }) {
  const ref = useRef()
  
  const _scrollRef = scrollRef || { current: 0 }
  const _mouseRef = mouseRef || { current: { x: 0, y: 0 } }

  useFrame((state) => {
    if (!ref.current) return
    
    // Rotation
    ref.current.rotation.z = state.clock.elapsedTime * 0.1 * rotationSpeed
    
    // Scroll parallax - move ring along Z axis
    const scrollOffset = _scrollRef.current * 3 * parallaxSpeed
    ref.current.position.z = scrollOffset
    
    // Mouse parallax - subtle movement based on mouse position
    const mouseParallaxX = _mouseRef.current.x * 0.5 * parallaxSpeed
    const mouseParallaxY = _mouseRef.current.y * 0.5 * parallaxSpeed
    ref.current.position.x = mouseParallaxX
    ref.current.position.y = mouseParallaxY
    
    // Scale pulse based on scroll
    const scalePulse = 1 + _scrollRef.current * 0.2 * parallaxSpeed
    ref.current.scale.set(scalePulse, scalePulse, 1)
  })

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius - thickness, radius, 64]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.3} 
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─── Parallax Nebula Clouds ─── */
function ParallaxNebula({ position, color, scale, parallaxSpeed = 1, scrollRef, mouseRef }) {
  const ref = useRef()
  
  const _scrollRef = scrollRef || { current: 0 }
  const _mouseRef = mouseRef || { current: { x: 0, y: 0 } }

  useFrame((state) => {
    if (!ref.current) return
    
    // Slow rotation
    ref.current.rotation.z = state.clock.elapsedTime * 0.02
    
    // Scroll parallax - move nebula along Z axis
    const scrollOffset = _scrollRef.current * 4 * parallaxSpeed
    ref.current.position.z = position[2] + scrollOffset
    
    // Mouse parallax - subtle movement based on mouse position
    const mouseParallaxX = _mouseRef.current.x * 0.8 * parallaxSpeed
    const mouseParallaxY = _mouseRef.current.y * 0.8 * parallaxSpeed
    ref.current.position.x = position[0] + mouseParallaxX
    ref.current.position.y = position[1] + mouseParallaxY
    
    // Scale based on scroll
    const scaleEffect = scale * (1 + _scrollRef.current * 0.3 * parallaxSpeed)
    ref.current.scale.set(scaleEffect, scaleEffect, 1)
  })

  return (
    <mesh ref={ref}>
      <circleGeometry args={[1, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════ */
export const PsychedelicTunnelScene = ({ scrollRef, mouseRef }) => {
  const shaderRef = useRef()
  const _scrollRef = scrollRef || { current: 0 }
  const _mouseRef = mouseRef || { current: { x: 0, y: 0 } }
  
  // Warp state
  const isWarping = useRef(false)
  const warpFactor = useRef(0) // 0 to 1
  const introFactor = useRef(0) // 0 to 1 for assembly

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uWarp: { value: 0 },
    uIntro: { value: 0 }, // Init at 0 (invisible)
  }), [])

  useEffect(() => {
    const onMouseDown = () => { isWarping.current = true }
    const onMouseUp = () => { isWarping.current = false }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchstart', onMouseDown)
    window.addEventListener('touchend', onMouseUp)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchstart', onMouseDown)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (!shaderRef.current) return
    
    // Smooth Warp Handling
    const targetWarp = isWarping.current ? 1 : 0
    warpFactor.current += (targetWarp - warpFactor.current) * delta * 2
    
    // Intro Assembly Animation
    if (introFactor.current < 1) {
      introFactor.current += delta * 0.5 // 2 seconds to assemble
      if (introFactor.current > 1) introFactor.current = 1
    }
    
    // Update Uniforms
    shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
    
    // Scroll + Warp boosts speed
    const currentScroll = _scrollRef.current
    shaderRef.current.uniforms.uScroll.value = currentScroll + (warpFactor.current * 0.5)
    
    // Warp also affects the uniform passed (can be used for FOV or intensity)
    shaderRef.current.uniforms.uWarp.value = warpFactor.current
    shaderRef.current.uniforms.uIntro.value = introFactor.current

    const u = shaderRef.current.uniforms.uMouse.value
    u.x += (_mouseRef.current.x - u.x) * 0.05
    u.y += (_mouseRef.current.y - u.y) * 0.05
    
    shaderRef.current.uniforms.uResolution.value.set(
      state.gl.domElement.width, state.gl.domElement.height
    )
  })

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={spaceVertex}
          fragmentShader={spaceFragment}
          uniforms={uniforms}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
      
      {/* Parallax Star Dust Layers - Different speeds for depth effect */}
      <StarDust count={60} color="#c084fc" spread={3} parallaxSpeed={0.5} scrollRef={_scrollRef} mouseRef={_mouseRef} />
      <StarDust count={40} color="#f472c4" spread={3.5} parallaxSpeed={0.8} scrollRef={_scrollRef} mouseRef={_mouseRef} />
      <StarDust count={30} color="#fbbf24" spread={4} parallaxSpeed={1.2} scrollRef={_scrollRef} mouseRef={_mouseRef} />
      
      {/* Parallax Rings - Moving at different speeds */}
      <ParallaxRing radius={1.2} color="#c084fc" thickness={0.02} parallaxSpeed={0.3} scrollRef={_scrollRef} mouseRef={_mouseRef} rotationSpeed={0.5} />
      <ParallaxRing radius={1.5} color="#f472c4" thickness={0.015} parallaxSpeed={0.5} scrollRef={_scrollRef} mouseRef={_mouseRef} rotationSpeed={-0.3} />
      <ParallaxRing radius={1.8} color="#fbbf24" thickness={0.01} parallaxSpeed={0.7} scrollRef={_scrollRef} mouseRef={_mouseRef} rotationSpeed={0.8} />
      
      {/* Parallax Nebula Clouds - Background elements */}
      <ParallaxNebula position={[-2, 1, -2]} color="#c084fc" scale={1.5} parallaxSpeed={0.4} scrollRef={_scrollRef} mouseRef={_mouseRef} />
      <ParallaxNebula position={[2, -1, -3]} color="#f472c4" scale={1.8} parallaxSpeed={0.6} scrollRef={_scrollRef} mouseRef={_mouseRef} />
      <ParallaxNebula position={[0, 2, -4]} color="#fbbf24" scale={1.2} parallaxSpeed={0.8} scrollRef={_scrollRef} mouseRef={_mouseRef} />
    </>
  )
}
