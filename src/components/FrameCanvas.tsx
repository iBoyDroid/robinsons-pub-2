import { useEffect, useRef } from 'react';

const FRAME_COUNT = 150;
const HERO_RATIO = 0.40;

export default function FrameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const FRAME_DIR = isMobile ? 'frames_mobile' : 'frames';
    const FRAME_W = isMobile ? 750 : 1280;
    const FRAME_H = isMobile ? 422 : 720;

    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    let currentIdx = 0;
    let rafId: number | null = null;

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      drawFrameAt(currentIdx);
    }

    function drawFrameAt(idx: number) {
      const img = frames[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = canvas!.width, ch = canvas!.height;
      const scale = Math.max(cw / FRAME_W, ch / FRAME_H);
      const sw = FRAME_W * scale, sh = FRAME_H * scale;
      ctx!.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    function getScrollProgress(): number {
      const heroScrollEl = document.getElementById('hero-scroll');
      if (!heroScrollEl) return 0;
      const zoneTop = heroScrollEl.offsetTop;
      const zoneH = heroScrollEl.offsetHeight - window.innerHeight;
      const heroP = Math.max(0, Math.min(1, (window.scrollY - zoneTop) / zoneH));
      if (heroP < 1) return heroP * HERO_RATIO;
      const heroZoneEnd = zoneTop + zoneH;
      const totalMax = document.documentElement.scrollHeight - window.innerHeight;
      const remainingScroll = Math.max(1, totalMax - heroZoneEnd);
      const pastHero = window.scrollY - heroZoneEnd;
      return HERO_RATIO + Math.min(1, pastHero / remainingScroll) * (1 - HERO_RATIO);
    }

    function getHeroProgress(): number {
      const heroScrollEl = document.getElementById('hero-scroll');
      if (!heroScrollEl) return 0;
      const zoneTop = heroScrollEl.offsetTop;
      const zoneH = heroScrollEl.offsetHeight - window.innerHeight;
      return Math.max(0, Math.min(1, (window.scrollY - zoneTop) / zoneH));
    }

    function updateOverlays(): number {
      const p = getScrollProgress();
      const hp = getHeroProgress();

      const scrollCue = document.getElementById('scroll-cue');
      if (scrollCue) scrollCue.style.opacity = Math.max(0, 1 - hp * 6).toFixed(2);

      if (!reducedMotion) {
        const heroContent = document.getElementById('hero-content');
        const heroBadge = document.querySelector<HTMLElement>('#hero .badge-enter');
        let opacity: number, ty: number;
        if (hp < 0.12) {
          const t = hp / 0.12;
          opacity = t; ty = 24 * (1 - t);
        } else if (hp < 0.65) {
          opacity = 1; ty = 0;
        } else {
          const t = (hp - 0.65) / (1 - 0.65);
          opacity = Math.max(0, 1 - t); ty = -t * 30;
        }
        if (heroContent) {
          heroContent.style.opacity = opacity.toFixed(3);
          heroContent.style.transform = ty !== 0 ? `translateY(${ty.toFixed(1)}px)` : '';
        }
        if (heroBadge) {
          heroBadge.style.opacity = opacity.toFixed(3);
          heroBadge.style.transform = hp < 0.12
            ? `translateX(${(16 * (1 - hp / 0.12)).toFixed(1)}px)` : '';
        }
      }

      return p;
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_DIR}/frame${String(i + 1).padStart(4, '0')}.jpg`;
      frames[i] = img;
      if (i === 0) img.onload = () => resizeCanvas();
    }

    resizeCanvas();
    updateOverlays();

    const handleResize = () => resizeCanvas();
    const handleScroll = () => {
      const p = updateOverlays();
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          const idx = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
          if (idx !== currentIdx) {
            currentIdx = idx;
            drawFrameAt(idx);
          }
        });
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
