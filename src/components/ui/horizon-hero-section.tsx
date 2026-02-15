import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 3;
  
  const threeRefs = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    composer: null as EffectComposer | null,
    stars: [] as THREE.Points[],
    nebula: null as THREE.Mesh | null,
    mountains: [] as THREE.Mesh[],
    animationId: null as number | null,
    targetCameraX: 0,
    targetCameraY: 20,
    targetCameraZ: 100,
    locations: [] as number[],
    smoothCameraPos: { x: 0, y: 30, z: 100 },
    textures: {
      star: null as THREE.Texture | null,
      nebula: null as THREE.Texture | null,
      noise: null as THREE.Texture | null
    }
  });

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const initThree = () => {
      const refs = threeRefs.current;
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
      refs.camera.position.set(0, 20, 100);

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8, 0.4, 0.85
      );
      refs.composer.addPass(bloomPass);

      // Load textures
      const textureLoader = new THREE.TextureLoader();
      const loadTexture = (path: string) => textureLoader.load(path);

      refs.textures.star = loadTexture('/textures/horizon/star.svg');
      refs.textures.nebula = loadTexture('/textures/horizon/nebula.svg');
      refs.textures.noise = loadTexture('/textures/horizon/noise.svg');

      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      animate();
      setIsReady(true);
    };

    const createStarField = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;
      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          else if (colorChoice < 0.9) color.setHSL(0.08, 0.5, 0.8);
          else color.setHSL(0.6, 0.5, 0.8);
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
            pointTexture: { value: refs.textures.star }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            uniform sampler2D pointTexture;
            void main() {
              gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
              if (gl_FragColor.a < 0.1) discard;
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 },
          nebulaTexture: { value: refs.textures.nebula }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          uniform sampler2D nebulaTexture;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            vec4 texColor = texture2D(nebulaTexture, vUv * 2.0 + time * 0.05);
            color += texColor.rgb * 0.3;

            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];
      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + Math.sin(i * 0.05) * layer.height * 0.5 + Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));
        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide });
        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = -50;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const refs = threeRefs.current;
      if (!refs.scene) return;
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal; varying vec3 vPosition; void main() { vNormal = normalize(normalMatrix * normal); vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          varying vec3 vNormal; varying vec3 vPosition; uniform float time; void main() { float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0); vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity; float pulse = sin(time * 2.0) * 0.1 + 0.9; atmosphere *= pulse; gl_FragColor = vec4(atmosphere, intensity * 0.25); }
        `,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true
      });
      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const refs = threeRefs.current;
      if (!refs.scene || !refs.camera) return;
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((s: any) => { if (s.material.uniforms) s.material.uniforms.time.value = time; });
      if (refs.nebula) (refs.nebula.material as any).uniforms.time.value = time * 0.5;

      const smoothingFactor = 0.05;
      refs.smoothCameraPos.x += (refs.targetCameraX - refs.smoothCameraPos.x) * smoothingFactor;
      refs.smoothCameraPos.y += (refs.targetCameraY - refs.smoothCameraPos.y) * smoothingFactor;
      refs.smoothCameraPos.z += (refs.targetCameraZ - refs.smoothCameraPos.z) * smoothingFactor;
      
      const floatX = Math.sin(time * 0.1) * 2;
      const floatY = Math.cos(time * 0.15) * 1;
      refs.camera.position.set(refs.smoothCameraPos.x + floatX, refs.smoothCameraPos.y + floatY, refs.smoothCameraPos.z);
      refs.camera.lookAt(0, 10, -600);

      refs.mountains.forEach((m, i) => { m.position.x = Math.sin(time * 0.1) * 2 * (1 + i * 0.5); });
      if (refs.composer) refs.composer.render();
    };

    initThree();
    const handleResize = () => {
      const refs = threeRefs.current;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      const refs = threeRefs.current;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.renderer?.dispose();
    };
  }, []);

  const getLocation = () => {
    const refs = threeRefs.current;
    if (refs.mountains.length) {
      refs.locations = refs.mountains.map(m => m.position.z);
    }
  };

  useEffect(() => {
    if (!isReady) return;
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], { visibility: 'visible' });
    const tl = gsap.timeline();
    if (menuRef.current) tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: "power3.out" });
    if (titleRef.current) tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.5");
    if (subtitleRef.current) tl.from(subtitleRef.current.children, { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.8");
    if (scrollProgressRef.current) tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: "power2.out" }, "-=0.5");
    return () => { tl.kill(); };
  }, [isReady]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);

      const refs = threeRefs.current;
      const exactSection = progress * (totalSections - 1); 
      const currentIdx = Math.floor(exactSection);
      const nextIdx = Math.min(currentIdx + 1, totalSections - 1);
      const sectionProgress = exactSection - currentIdx;

      const cameraPositions = [{ x: 0, y: 30, z: 300 }, { x: 0, y: 40, z: -50 }, { x: 0, y: 50, z: -700 }];
      const currentPos = cameraPositions[currentIdx] || cameraPositions[0];
      const nextPos = cameraPositions[nextIdx] || currentPos;
      
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
        if (refs.nebula) refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
        mountain.userData.targetZ = targetZ;
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const titles = [
    { title: 'HORIZON', line1: 'Where vision meets reality,', line2: 'we shape the future of tomorrow' },
    { title: 'COSMOS', line1: 'Beyond the boundaries of imagination,', line2: 'lies the universe of possibilities' },
    { title: 'INFINITY', line1: 'In the space between thought and creation,', line2: 'we find the essence of true innovation' }
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-rose-500/30">
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
             <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      
      <div ref={menuRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-50 invisible flex flex-col gap-6 items-center">
        <div className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform text-white/80 hover:text-white">
            <Menu className="w-full h-full" />
        </div>
        <div className="writing-mode-vertical-rl text-[10px] tracking-[0.3em] font-medium opacity-60 rotate-180">SPACE</div>
      </div>

      <div ref={scrollProgressRef} className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 invisible">
        <div className="text-[10px] tracking-[0.2em] opacity-50 font-bold">SCROLL</div>
        <div className="w-[100px] h-[1px] bg-white/20 relative">
          <div className="absolute left-0 top-0 h-full bg-white transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="text-xs font-mono opacity-70">
          {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>

      <div className="relative z-10 w-full">
        {titles.map((section, i) => (
          <section key={i} className="h-screen w-full flex flex-col items-center justify-center pointer-events-none sticky top-0">
             <div className={cn("flex flex-col items-center justify-center transition-opacity duration-500", 
                 i === currentSection ? "opacity-100 blur-0" : "opacity-0 blur-sm"
             )}>
                <h1 ref={i === 0 ? titleRef : null} className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent mb-6 drop-shadow-2xl">
                  {section.title}
                </h1>
                
                <div ref={i === 0 ? subtitleRef : null} className="flex flex-col items-center gap-2 text-center">
                  <p className="subtitle-line text-lg md:text-2xl font-light tracking-wide text-blue-100/80">
                    {section.line1}
                  </p>
                  <p className="subtitle-line text-lg md:text-2xl font-light tracking-wide text-blue-100/80">
                    {section.line2}
                  </p>
                </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
