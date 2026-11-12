import { useEffect, useRef } from 'react';
import { PROJECTS_DATA, type Project } from '../data';

const CAPTION = 'Selected work, 2023 to 2026';

// The handbook entry opened a modal on the old site and has no page of its own here.
const PROJECTS = PROJECTS_DATA.filter((p) => !p.isHandbook && p.link);
// The cloud shows real screenshots only, not the vector placeholder graphics.
const CLOUD = PROJECTS.filter((p) => !p.image.endsWith('.svg')).slice(0, 12);

const shortName = (p: Project) => p.title.split(' — ')[0];
const subtitle = (p: Project) => p.title.split(' — ')[1] ?? p.tags.slice(0, 3).join(', ');

export default function ProjectsView() {
  const hero = useRef<HTMLDivElement>(null);
  const cloud = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const dragged = useRef(0);

  useEffect(() => {
    const heroEl = hero.current;
    const cloudEl = cloud.current;
    if (!heroEl || !cloudEl) return;

    const cards = Array.from(cloudEl.children) as HTMLElement[];
    // Fibonacci sphere: an even spread of points for any number of cards.
    const points = cards.map((_, i) => {
      const y = 1 - (2 * (i + 0.5)) / cards.length;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      return { x: r * Math.cos(theta), y, z: r * Math.sin(theta) };
    });

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const drift = still ? 0 : 0.003;
    let rotation = 0;
    let velocity = drift;
    let tilt = 0.3;
    let dragging = false;
    let lastX = 0;
    let raf = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      dragged.current = 0;
    };
    const onUp = () => {
      dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        dragged.current += Math.abs(dx);
        velocity = dx * 0.004;
        lastX = e.clientX;
      }
      const r = heroEl.getBoundingClientRect();
      tilt = 0.3 + ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    heroEl.addEventListener('pointerdown', onDown);
    heroEl.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const draw = () => {
      rotation += velocity;
      if (!dragging) velocity += (drift - velocity) * 0.03;
      const radiusX = Math.min(heroEl.clientWidth * 0.34, 360);
      const radiusY = Math.min(heroEl.clientHeight * 0.3, 200);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const cr = Math.cos(rotation);
      const sr = Math.sin(rotation);
      cards.forEach((card, i) => {
        const p = points[i];
        const x = p.x * cr + p.z * sr;
        const zr = -p.x * sr + p.z * cr;
        const y = p.y * ct - zr * st;
        const z = p.y * st + zr * ct;
        const depth = (z + 1) / 2;
        card.style.transform = `translate(${(x * radiusX).toFixed(1)}px,${(y * radiusY).toFixed(1)}px) scale(${(0.6 + 0.65 * depth).toFixed(3)})`;
        card.style.zIndex = String(Math.round(depth * 40));
        card.style.filter = `brightness(${(0.45 + 0.55 * depth).toFixed(2)})`;
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      heroEl.removeEventListener('pointerdown', onDown);
      heroEl.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const setCaption = (text: string) => {
    if (caption.current) caption.current.textContent = text;
  };

  const jumpTo = (p: Project) => {
    // A drag that ends on a card is a spin, not a selection.
    if (dragged.current > 5) return;
    document.getElementById(`project-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main>
      <div className="hero" ref={hero}>
        <div ref={cloud}>
          {CLOUD.map((p) => (
            <button
              key={p.id}
              type="button"
              className="cd"
              aria-label={`Jump to ${shortName(p)}`}
              style={{ backgroundImage: `url("${p.image}")` }}
              onPointerEnter={() => setCaption(`${shortName(p)}, ${p.year}`)}
              onPointerLeave={() => setCaption(CAPTION)}
              onFocus={() => setCaption(`${shortName(p)}, ${p.year}`)}
              onBlur={() => setCaption(CAPTION)}
              onClick={() => jumpTo(p)}
            />
          ))}
        </div>
        <p className="hero-cap sf" ref={caption}>
          {CAPTION}
        </p>
        <p className="hero-hint mu">Drag to spin, select a card to jump to it</p>
      </div>

      <p className="lead">
        A curated selection of <span className="sf">systems and web projects</span>
      </p>

      <div className="grid">
        {PROJECTS.map((p) => (
          <a key={p.id} id={`project-${p.id}`} className="tile" href={p.link} target="_blank" rel="noopener noreferrer">
            <div className="im">
              <img src={p.image} alt={`${shortName(p)} screenshot`} loading="lazy" />
            </div>
            <div className="tile-cap">
              <div>
                <p>{shortName(p)}</p>
                <p className="sf">{subtitle(p)}</p>
              </div>
              <span className="mu">{p.year}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
