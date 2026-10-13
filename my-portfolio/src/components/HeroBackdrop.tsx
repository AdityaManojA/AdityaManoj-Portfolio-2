import { useEffect, useRef } from 'react';

// Ambient dot-grid behind the hero: a slow diagonal wave, and dots that light up and
// grow around the pointer. No background glow, only the dots themselves change. Pauses offscreen / in background tabs, static under reduced motion.
const SPACING = 28;
const POINTER_RADIUS = 260;

export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999, strength: 0, target: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducedMotion) draw(0);
    };

    const draw = (time: number) => {
      const dark = document.documentElement.classList.contains('dark');
      const base = dark ? '250, 250, 249' : '26, 25, 22';
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '194, 65, 12';
      ctx.clearRect(0, 0, width, height);

      pointer.strength += (pointer.target - pointer.strength) * 0.08;
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;

      for (let x = offsetX; x < width; x += SPACING) {
        for (let y = offsetY; y < height; y += SPACING) {
          const wave = reducedMotion ? 0 : Math.sin((x + y) * 0.012 - time * 0.0009);
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / POINTER_RADIUS) * pointer.strength;

          // Light paper needs roughly double the ink to read like the dark grid does.
          // Only opacity differs per mode; dot size and radius are shared so a theme toggle is seamless.
          const alpha = dark ? 0.16 + wave * 0.05 : 0.3 + wave * 0.08;
          ctx.fillStyle = `rgba(${base}, ${alpha})`;
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);

          if (near > 0.01) {
            const r = 1 + near * 2.6;
            ctx.fillStyle = `rgba(${accent}, ${Math.min(1, near * (dark ? 1.1 : 1.6))})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (!reducedMotion && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.target = pointer.y >= 0 && pointer.y <= rect.height ? 1 : 0;
    };
    const onPointerLeave = () => {
      pointer.target = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const resizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', start);
    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }
    start();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', start);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-backdrop-canvas" />
    </div>
  );
}
