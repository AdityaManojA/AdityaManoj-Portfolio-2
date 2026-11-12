import { useEffect, useRef } from 'react';
import { PROJECTS_DATA, type Project } from '../data';


// The projects that lead the page, by id, in this order: ThreadPath, The Whisky Business,
// Pixel Spaces, IndZita, Levern, TerraCove, GLIA, ALFRED. The rest follow in data order.
const LEAD = [8, 11, 18, 13, 22, 21, 1, 16];
const rank = (p: Project) => {
  const i = LEAD.indexOf(p.id);
  return i === -1 ? LEAD.length : i;
};

// The handbook entry opened a modal on the old site and has no page of its own here.
// (Array.prototype.sort is stable, so equal ranks keep their data order.)
const PROJECTS = PROJECTS_DATA.filter((p) => !p.isHandbook).sort((a, b) => rank(a) - rank(b));
// The cloud shows real screenshots only, not the vector placeholder graphics.
const CLOUD = PROJECTS.filter((p) => !p.image.endsWith('.svg')).slice(0, 12);

const shortName = (p: Project) => p.title.split(' — ')[0];
const subtitle = (p: Project) => p.title.split(' — ')[1] ?? p.tags.slice(0, 3).join(', ');

// The caption under the cloud spans whatever years the listed projects cover.
const YEARS = PROJECTS.map((p) => Number(p.year));
const CAPTION = `Selected work, ${Math.min(...YEARS)} to ${Math.max(...YEARS)}`;

// Screenshots are served as the WebP copies that scripts/optimize-images.sh writes to
// ProjectImages/web: "sm" (480px) for the cloud, full (1920px) for the grid.
const baseName = (path: string) => path.slice(path.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');

function webImage(path: string, size: 'sm' | 'full') {
  if (path.endsWith('.svg')) return path;
  return `/ProjectImages/web/${encodeURIComponent(baseName(path))}${size === 'sm' ? '-sm' : ''}.webp`;
}

// Sites with a recorded scroll-through (scripts/capture-previews.mjs), keyed by the
// screenshot's file name. The video plays over the screenshot on hover, or on a phone
// while the tile is the one in focus.
const PREVIEWS = new Set(['Threadpath', 'Whisky', 'Pixel Spaces', 'Indzita', 'SBAFA', 'CsvtoJson']);
const previewVideo = (path: string) =>
  PREVIEWS.has(baseName(path)) ? `/ProjectImages/previews/${encodeURIComponent(baseName(path))}.mp4` : null;

function playPreview(tile: Element) {
  const video = tile.querySelector('video');
  if (!video) return;
  // The file is only fetched the first time its tile is played.
  if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src;
  video.play().catch(() => {
    // Autoplay was refused (for example in a low-power mode); the screenshot stays.
  });
}

function stopPreview(tile: Element) {
  const video = tile.querySelector('video');
  if (!video) return;
  video.pause();
  tile.classList.remove('playing');
  if (video.readyState > 0) video.currentTime = 0;
}

/** Pulses a tile once, as soon as the smooth scroll has brought it into view. */
function pulseWhenVisible(tile: HTMLElement) {
  let fired = false;
  const fire = () => {
    if (fired) return;
    fired = true;
    observer.disconnect();
    tile.classList.remove('pulse');
    void tile.offsetWidth; // restart the animation if the same tile is picked twice
    tile.classList.add('pulse');
    tile.addEventListener('animationend', () => tile.classList.remove('pulse'), { once: true });
  };
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) window.setTimeout(fire, 140);
    },
    { threshold: 0.75 },
  );
  observer.observe(tile);
  // A tile taller than the viewport never reaches the threshold; pulse anyway.
  window.setTimeout(fire, 1600);
}

export default function ProjectsView() {
  const hero = useRef<HTMLDivElement>(null);
  const cloud = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const dragged = useRef(0);

  // The spinning cloud.
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
    let lastScroll = window.scrollY;
    let gatherStart = 0; // time the cards started flying in; 0 = still waiting on the loader
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
    // Scrolling gives the cloud a push, so it reacts to the thumb on a phone too.
    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!still) velocity += Math.max(-0.02, Math.min(0.02, dy * 0.0002));
    };
    heroEl.addEventListener('pointerdown', onDown);
    heroEl.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    const draw = () => {
      rotation += velocity;
      if (!dragging) velocity += (drift - velocity) * 0.03;
      const width = heroEl.clientWidth;
      const narrow = width < 720;
      // On a phone the cloud is taller than it is wide, to use the portrait screen.
      const radiusX = narrow ? width * 0.36 : Math.min(width * 0.34, 360);
      const radiusY = Math.min(heroEl.clientHeight * (narrow ? 0.33 : 0.3), 220);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const cr = Math.cos(rotation);
      const sr = Math.sin(rotation);

      // The gather: cards wait off-screen until the page loader has cleared, then fly in
      // to their places one after another. It is the second half of the loader.
      const now = performance.now();
      if (gatherStart === 0 && !document.documentElement.classList.contains('loader-active')) gatherStart = now;
      const reach = Math.max(width, heroEl.clientHeight) * 0.95;

      cards.forEach((card, i) => {
        const p = points[i];
        const x = p.x * cr + p.z * sr;
        const zr = -p.x * sr + p.z * cr;
        const y = p.y * ct - zr * st;
        const z = p.y * st + zr * ct;
        const depth = (z + 1) / 2;
        const t = gatherStart === 0 ? 0 : Math.min(1, Math.max(0, (now - gatherStart - i * 45) / 800));
        const g = still ? 1 : 1 - Math.pow(1 - t, 3);
        const from = i * 2.4 + 1; // each card's own direction of approach
        const px = Math.cos(from) * reach * (1 - g) + x * radiusX * g;
        const py = Math.sin(from) * reach * (1 - g) + y * radiusY * g;
        card.style.opacity = g === 0 ? '0' : '1';
        card.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px) scale(${(0.6 + 0.65 * depth).toFixed(3)})`;
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
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Grid tiles rise in as they are scrolled to, and the one nearest the middle of the
  // screen is marked "focus" (on a phone the others are dimmed, see site.css).
  useEffect(() => {
    const gridEl = grid.current;
    if (!gridEl) return;
    const tiles = Array.from(gridEl.children);

    // Previews are skipped for visitors who asked for less motion or less data.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const previews =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !connection?.saveData;
    const canHover = window.matchMedia('(hover: hover)').matches;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          reveal.unobserve(entry.target);
        }
      },
      // No bottom inset: the sliver of the first row that peeks in under the cloud
      // has to be visible straight away.
      { rootMargin: '0px' },
    );
    const focus = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('focus', entry.isIntersecting);
          // With no hover, the focused tile is the one that plays.
          if (previews && !canHover) (entry.isIntersecting ? playPreview : stopPreview)(entry.target);
        }
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    const cleanups: (() => void)[] = [];
    for (const tile of tiles) {
      reveal.observe(tile);
      focus.observe(tile);
      const video = tile.querySelector('video');
      if (!video) continue;
      // Fade the video in only once frames are actually arriving.
      const onPlaying = () => tile.classList.add('playing');
      video.addEventListener('playing', onPlaying);
      cleanups.push(() => video.removeEventListener('playing', onPlaying));
      if (previews && canHover) {
        const enter = () => playPreview(tile);
        const leave = () => stopPreview(tile);
        tile.addEventListener('pointerenter', enter);
        tile.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          tile.removeEventListener('pointerenter', enter);
          tile.removeEventListener('pointerleave', leave);
        });
      }
    }
    return () => {
      reveal.disconnect();
      focus.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const setCaption = (text: string) => {
    if (caption.current) caption.current.textContent = text;
  };

  const jumpTo = (p: Project) => {
    // A drag that ends on a card is a spin, not a selection.
    if (dragged.current > 5) return;
    const tile = document.getElementById(`project-${p.id}`);
    if (!tile) return;
    tile.classList.add('in');
    tile.scrollIntoView({ behavior: 'smooth', block: 'center' });
    pulseWhenVisible(tile);
    navigator.vibrate?.(8);
  };

  return (
    <main>
      <div className="hero" ref={hero}>
        {/* The cloud repeats the project list below it, so it is hidden from assistive tech
            and skipped by the Tab key: keyboard users go straight from the nav to the list. */}
        <div ref={cloud} aria-hidden="true">
          {CLOUD.map((p) => (
            <button
              key={p.id}
              type="button"
              tabIndex={-1}
              className="cd"
              aria-label={`Jump to ${shortName(p)}`}
              style={{ backgroundImage: `url("${webImage(p.image, 'sm')}")` }}
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
        <p className="hero-hint mu">
          <span className="for-mouse">Drag to spin, select a card to jump to it</span>
          <span className="for-touch">Swipe to spin, tap a card</span>
        </p>
      </div>

      <h1 className="lead">
        A curated selection of <span className="sf">systems and web projects</span>
      </h1>

      <div className="grid" ref={grid}>
        {PROJECTS.map((p) => {
          const video = previewVideo(p.image);
          const body = (
            <>
              <div className="im">
                <img src={webImage(p.image, 'full')} alt={`${shortName(p)} screenshot`} loading="lazy" decoding="async" />
                {video && <video data-src={video} muted loop playsInline preload="none" aria-hidden="true" />}
              </div>
              <div className="tile-cap">
                <div>
                  <h2>{shortName(p)}</h2>
                  <p className="sf">{subtitle(p)}</p>
                </div>
                <span className="mu">{p.year}</span>
              </div>
            </>
          );
          // A project whose site is no longer online is shown, but not as a link.
          return p.link ? (
            <a key={p.id} id={`project-${p.id}`} className="tile" href={p.link} target="_blank" rel="noopener noreferrer">
              {body}
            </a>
          ) : (
            <div key={p.id} id={`project-${p.id}`} className="tile">
              {body}
            </div>
          );
        })}
      </div>
    </main>
  );
}
