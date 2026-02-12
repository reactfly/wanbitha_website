/* ═══ WanBitha — Premium GSAP Interactions v2.0 ═══ */
/* Requires: GSAP Core, ScrollTrigger, Lenis */

(function() {
  'use strict';

  /* ─── Initialize Lenis (Smooth Scroll) ─── */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync ScrollTrigger with Lenis
  gsap.registerPlugin(ScrollTrigger);
  
  /* ─── Scroll-Bound Video (Scrollytelling) ─── */
  const heroVideo = document.querySelector('.hero__video-bg'); // Selects <video> tag
  if (heroVideo && heroVideo.tagName === 'VIDEO') {
    
    // Setup Video
    heroVideo.pause();
    heroVideo.currentTime = 0;
    heroVideo.removeAttribute('loop'); // Disable loop for linearity
    
    // Fix video to background
    gsap.set(heroVideo, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -5, // Behind content, in front of universe
      opacity: 0.4 // Adjust visibility
    });

    // Make sure metadata is loaded for duration
    heroVideo.addEventListener('loadedmetadata', () => {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // 0.5s smoothing
        onUpdate: (self) => {
          if (heroVideo.duration) {
            heroVideo.currentTime = self.progress * heroVideo.duration;
          }
        }
      });
    });

    // Fallback if metadata already loaded
    if (heroVideo.readyState >= 1) {
       ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          if (heroVideo.duration) {
            heroVideo.currentTime = self.progress * heroVideo.duration; // Direct seek
          }
        }
      });
    }
  }

  /* ─── Universe Tunnel (The "Warp" Effect) ─── */
  const starsLayers = document.querySelectorAll('.universe-stars');
  if (starsLayers.length) {
    // Generate Stars
    const generateStars = (amount) => {
      let value = '';
      for (let i = 0; i < amount; i++) {
        const x = Math.floor(Math.random() * 2000); 
        const y = Math.floor(Math.random() * 2000);
        const opacity = Math.random();
        value += `${x}px ${y}px rgba(255, 255, 255, ${opacity})${i < amount - 1 ? ',' : ''}`;
      }
      return value;
    };

    starsLayers.forEach((layer, index) => {
      const count = 150 + (index * 150);
      layer.style.width = '1px';
      layer.style.height = '1px';
      layer.style.boxShadow = generateStars(count);
      layer.dataset.depth = (index + 1) * 0.2; // Depth factor
    });

    // Create Timeline linked to scroll
    const universeTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      }
    });

    starsLayers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth);
      universeTl.to(layer, {
        scale: 4, 
        ease: 'none',
        force3D: true,
      }, 0);
    });

    /* ─── Universe Mouse Parallax & Interaction ─── */
    const universeBg = document.querySelector('.universe-bg');
    const nebulas = document.querySelectorAll('.universe-fog');
    
    // Parallax on Mouse Move
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      // Move stars slightly
      starsLayers.forEach((layer, i) => {
        const depth = (i + 1) * 15;
        gsap.to(layer, {
          x: x * depth, 
          y: y * depth, 
          duration: 1.5, 
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      // Move Nebula (slower, deeper feeling)
      if (nebulas.length) {
        gsap.to(nebulas, {
          x: x * 40,
          y: y * 40,
          duration: 3,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    });

    /* ─── Stardust Cursor Trail ─── */
    const createStardust = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'stardust-particle';
      document.body.appendChild(particle);
      
      const size = Math.random() * 4 + 2;
      const color = Math.random() > 0.5 ? 'var(--color-rose-hot)' : 'var(--color-lavender)';
      
      gsap.set(particle, {
        x: x,
        y: y,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9998,
        boxShadow: `0 0 ${size * 2}px ${color}`
      });

      gsap.to(particle, {
        x: x + (Math.random() - 0.5) * 50,
        y: y + (Math.random() - 0.5) * 50,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => particle.remove()
      });
    };

    // Throttle particle creation
    let lastTime = 0;
    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTime > 40) { // Limit frequency
        createStardust(e.clientX, e.clientY);
        lastTime = now;
      }
    });

    // Velocity Warp Effect (Existing Logic kept simple)
    let warpProxy = { skew: 0 };
    ScrollTrigger.create({
      trigger: 'body',
      onUpdate: (self) => {
        const vel = self.getVelocity() / 500;
        gsap.to(warpProxy, {
          skew: vel,
          duration: 0.2,
          onUpdate: () => {
             // Subtle scale effect on speed
             if (universeBg) universeBg.style.transform = `scale(${1 + Math.min(Math.abs(vel * 0.002), 0.2)})`;
          }
        });
      }
    });
  }

  /* ─── Magnetic Buttons (GSAP quickTo) ─── */
  const magBtns = document.querySelectorAll('.btn--primary, .btn--glass');
  magBtns.forEach(btn => {
    const xTo = gsap.quickTo(btn, "x", {duration: 0.4, ease: "power3", overwrite: 'auto'});
    const yTo = gsap.quickTo(btn, "y", {duration: 0.4, ease: "power3", overwrite: 'auto'});

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.3);
      yTo(y * 0.3);
    });

    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });

  /* ─── 3D Tilt Cards (GSAP) ─── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.product-card').forEach(card => {
      /* Inject shine overlay if missing */
      if (!card.querySelector('.product-card__shine')) {
        const shine = document.createElement('div');
        shine.className = 'product-card__shine';
        card.querySelector('.product-card__image-wrapper')?.appendChild(shine);
      }

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const xAttr = (e.clientX - rect.left) / rect.width;
        const yAttr = (e.clientY - rect.top) / rect.height;
        
        // Tilt
        gsap.to(card, {
          rotateY: (xAttr - 0.5) * 10,
          rotateX: (0.5 - yAttr) * 10,
          transformPerspective: 800,
          translateY: -5,
          duration: 0.5,
          ease: 'power2.out'
        });

        // Shine
        const shine = card.querySelector('.product-card__shine');
        if (shine) {
          shine.style.background = `radial-gradient(circle at ${xAttr * 100}% ${yAttr * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          translateY: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });
        const shine = card.querySelector('.product-card__shine');
        if (shine) shine.style.background = 'transparent';
      });
    });
  }

  /* ─── Split Text Reveals ─── */
  const splitElements = document.querySelectorAll('[data-split-text]');
  splitElements.forEach(el => {
    // Basic split logic
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<div class="split-word" style="display:inline-block;overflow:hidden;"><div class="split-word__inner" style="display:inline-block;">${w}</div></div>`).join(' ');
    
    gsap.from(el.querySelectorAll('.split-word__inner'), {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: '110%',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05
    });
  });

  /* ─── Section Parallax & Reveals ─── */
  // Product Cards Stagger
  ScrollTrigger.batch(".product-card", {
    start: "top 90%",
    onEnter: batch => gsap.from(batch, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out"
    })
  });

  // Image Curtain Reveal
  document.querySelectorAll('[data-reveal-image]').forEach(el => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      }
    });
    // Assuming wrapper::after is the curtain. GSAP can't tween pseudo-elements directly simply.
    // Instead we rely on the class toggle for the curtain (CSS transition is efficient)
    // BUT we can animate the image scale with GSAP
    tl.add(() => el.classList.add('image-revealed'))
      .from(el.querySelector('img'), {
        scale: 1.3,
        duration: 1.6,
        ease: "power2.out"
      }, 0);
  });

  /* ─── Mouse Parallax on Hero ─── */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    document.addEventListener('mousemove', e => {
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      gsap.to(heroContent, {
        x: cx * -30,
        y: cy * -20,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }

  /* ─── Shooting Star Logic (Vanilla JS is fine here) ─── */
  // Kept from previous version, integrated
  const universeContainer = document.querySelector('.universe-bg');
  if (universeContainer) {
    const spawnShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.top = `${Math.random() * window.innerHeight * 0.6}px`;
      star.style.left = `${Math.random() * window.innerWidth + 200}px`;
      universeContainer.appendChild(star);
      
      // Animate with GSAP for consistency
      gsap.fromTo(star, 
        { x: 0, opacity: 1, rotation: 315 },
        { x: -1500, opacity: 0, duration: 2.5, ease: 'none', onComplete: () => star.remove() }
      );
      setTimeout(spawnShootingStar, Math.random() * 4000 + 2000);
    };
    setTimeout(spawnShootingStar, 2000);
  }

  /* ─── Zoom Gallery Parallax ─── */
  const galleryItems = document.querySelectorAll('.zoom-gallery__item');
  if (galleryItems.length) {
    ScrollTrigger.batch(galleryItems, {
      start: "top bottom",
      onEnter: batch => gsap.from(batch, {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      })
    });

    // Parallax effect per column (simulated)
    galleryItems.forEach((item, i) => {
      const speed = (i % 4 + 1) * 20; // Varied speed based on "column"
      gsap.to(item, {
        y: -speed,
        ease: 'none',
        scrollTrigger: {
          trigger: item.closest('.zoom-gallery'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  /* ─── Update Scroll Progress Bar ─── */
  gsap.to('.scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0
    }
  });

  /* ─── Gallery Lightbox (FLIP Transition) ─── */
  gsap.registerPlugin(Flip);

  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-fullscreen-view';
  lightbox.innerHTML = `
    <button class="gallery-close-btn">FECHAR</button>
    <div class="gallery-fullscreen-image-wrapper"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxWrapper = lightbox.querySelector('.gallery-fullscreen-image-wrapper');
  const closeBtn = lightbox.querySelector('.gallery-close-btn');
  let activeImage = null;
  let originalParent = null;

  // Open Lightbox
  document.querySelectorAll('.zoom-gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      activeImage = img;
      originalParent = img.parentNode;

      // Capture State
      const state = Flip.getState(img);

      // Move to Lightbox
      lightbox.classList.add('is-active');
      lightboxWrapper.appendChild(img);
      img.classList.add('gallery-fullscreen-image');

      // Animate (FLIP) - Framer Motion style spring
      if (typeof Flip !== 'undefined') {
        Flip.from(state, {
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          absolute: true,
          zIndex: 10001, // Ensure on top
          onComplete: () => {
            enableZoomPan(img);
          }
        });
      } else {
        console.warn('GSAP Flip not loaded');
      }
    });
  });

  // Close Lightbox
  const closeLightbox = () => {
    if (!activeImage) return;

    // Remove Zoom/Pan transforms first
    gsap.set(activeImage, { clearProps: "transform" });

    const state = Flip.getState(activeImage);

    lightbox.classList.remove('is-active');
    activeImage.classList.remove('gallery-fullscreen-image');
    
    // Return to original parent (resetting scale style from zoom logic)
    activeImage.style.transform = ''; 
    originalParent.appendChild(activeImage);

    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut",
      absolute: true,
      onComplete: () => {
        activeImage = null;
        originalParent = null;
      }
    });
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxWrapper) closeLightbox();
  });

  // Zoom/Pan Logic
  function enableZoomPan(img) {
    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let startX = 0;
    let startY = 0;

    // Simple mouse move pan when zoomed
    img.addEventListener('mousemove', (e) => {
      if (scale > 1) {
        const rect = lightboxWrapper.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(img, {
          x: xPct * -200 * scale, // Pan amount depends on scale
          y: yPct * -200 * scale,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });

    // Wheel Zoom
    lightbox.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      scale = Math.min(Math.max(1, scale + delta), 3);
      
      gsap.to(img, {
        scale: scale,
        duration: 0.3
      });
      
      if(scale === 1) {
        gsap.to(img, { x: 0, y: 0, duration: 0.3 });
      }
    });
  }



  /* ─── Horizontal Scroll Section ─── */
  const horizSection = document.querySelector('.horizontal-scroll-section');
  if (horizSection) {
    const track = horizSection.querySelector('.horizontal-scroll__track');
    
    // Calculate scroll distance
    // We want to scroll the exact width of track minus viewport width
    // But since it's flex, let's just use a functional value
    
    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 100); // +100 for padding
    };

    gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: horizSection,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // Scroll length related to width
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    // Parallax inside horizontal cards on horizontal move?
    // Let's keep it simple first.
  }

  /* ─── Text Reveal (Scrollytelling) ─── */
  const revealTexts = document.querySelectorAll('[data-reveal-text]');
  revealTexts.forEach(el => {
    // Split text
    const text = el.innerText;
    el.innerHTML = text.split(/\s+/).map(word => `<span class="reveal-word">${word}</span>`).join(' ');

    const words = el.querySelectorAll('.reveal-word');
    
    gsap.fromTo(words, 
      { backgroundPosition: "100% 0" },
      { 
        backgroundPosition: "0 0",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1
        }
      }
    );
  });
  
})();
