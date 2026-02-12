/* ═══ WanBitha Theme JS v2.0 — Premium Interactions ═══ */
(function() {
  'use strict';

  /* ─── Loading Screen ─── */
  const loader = document.querySelector('.loading-screen');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 800);
      setTimeout(() => loader.remove(), 1600);
    });
  }

  /* ─── Custom Cursor ─── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
    const hoverTargets = 'a, button, [role="button"], .product-card, input, textarea, select, .zoom-gallery__item, .instagram-item';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });
  }

  /* ─── Mobile Menu ─── */
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.site-header__nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('.site-header__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Header Scroll (with hide-on-scroll-down) ─── */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScrollY = 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          header.classList.toggle('is-scrolled', scrollY > 50);
          if (scrollY > 300 && scrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
          } else {
            header.style.transform = 'translateY(0)';
          }
          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── Scroll Reveal ─── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ─── Product Thumbnails ─── */
  const thumbs = document.querySelectorAll('.product-page__thumb');
  const mainImg = document.querySelector('.product-page__main-image img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      if (mainImg) {
        const img = thumb.querySelector('img');
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(1.05)';
        setTimeout(() => {
          mainImg.src = img.dataset.fullSrc || img.src;
          mainImg.alt = img.alt;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 250);
      }
    });
  });

  /* ─── Quantity Selector ─── */
  document.querySelectorAll('.product-form__qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.product-form__quantity').querySelector('.product-form__qty-input');
      if (!input) return;
      let v = parseInt(input.value) || 1;
      if (btn.dataset.action === 'increase') v++;
      if (btn.dataset.action === 'decrease' && v > 1) v--;
      input.value = v;
    });
  });

  /* ─── Variant Price Update ─── */
  const varSel = document.querySelector('.product-form__variant-select');
  if (varSel) {
    varSel.addEventListener('change', () => {
      const price = varSel.options[varSel.selectedIndex].dataset.price;
      const priceEl = document.querySelector('.product-page__price');
      if (price && priceEl) priceEl.textContent = price;
    });
  }

  /* ─── Parallax on Hero Image ─── */
  const heroBg = document.querySelector('.hero__bg img, .hero__bg video');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ─── Counter Animation (with easeOut) ─── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();
          function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ─── Smooth anchor scrolls ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Typewriter Effect ─── */
  const twEl = document.getElementById('heroTypewriter');
  const twData = document.getElementById('heroTypewriterPhrases');
  if (twEl && twData) {
    let phrases;
    try { phrases = JSON.parse(twData.textContent); } catch { phrases = []; }
    if (phrases.length === 0) phrases = ['A Arte de Sentir em Cores e Texturas'];

    const TYPE_SPEED = 65;
    const ERASE_SPEED = 30;
    const HOLD_DURATION = 2500;
    const PAUSE_BEFORE_TYPE = 400;
    let phraseIdx = 0;
    let charIdx = 0;
    let isErasing = false;

    function typewriterTick() {
      const current = phrases[phraseIdx];

      if (!isErasing) {
        twEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx >= current.length) {
          isErasing = true;
          setTimeout(typewriterTick, HOLD_DURATION);
          return;
        }
        setTimeout(typewriterTick, TYPE_SPEED);
      } else {
        twEl.textContent = current.substring(0, charIdx);
        charIdx--;
        if (charIdx < 0) {
          isErasing = false;
          charIdx = 0;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(typewriterTick, PAUSE_BEFORE_TYPE);
          return;
        }
        setTimeout(typewriterTick, ERASE_SPEED);
      }
    }

    setTimeout(typewriterTick, 1500);
  }
})();
