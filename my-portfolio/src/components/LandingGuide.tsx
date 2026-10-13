import { useEffect, useRef } from 'react';

// Continues the hero's scroll-cue line as a circuit trace down the landing page.
// The trace runs vertically in each section's own left gutter. Between sections whose
// gutters differ it jogs across with 45° bevelled corners (light-cycle style), and it never
// crosses content. For the handbook card it runs outside the card, then turns in to the label.
// Distance along the trace equals scroll distance, so the fill advances at scroll speed and
// takes the jogs in its stride. Labels are re-measured on each scroll, so the node for the
// pinned flagship header travels with it while it is sticky.
const TARGETS = '.section-index-tag, .handbook-spotlight-kicker';
const GUTTER = 28; // px between the trace and the content edge; matches the label rule offset in CSS
const JOG_ABOVE = 56; // how far above a section label the trace crosses over
const BEVEL = 14; // 45° corner size

type Pt = [number, number];

export default function LandingGuide() {
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const landing = svg?.parentElement;
    const base = baseRef.current;
    const fill = fillRef.current;
    const pulse = pulseRef.current;
    const head = headRef.current;
    if (!svg || !landing || !base || !fill || !pulse || !head) return;

    // Label nodes are drawn by each label's own CSS rule (see .section-index-tag::before), so the
    // pinned flagship label's node is pinned with it and can never drift. Here we only toggle
    // which ones the fill has passed.
    const passedClass = 'is-guide-passed';

    // The fill's head sits at a fixed point on screen (mid-viewport). While the flagship stage
    // is pinned it simply holds there, and once the stage releases it carries on from the same
    // spot, so there is never anything to catch up on.
    const headScreenY = () => window.innerHeight * 0.5;

    // Appends a horizontal crossing at height y from the current x to toX, with 45° bevels.
    const jog = (pts: Pt[], y: number, toX: number) => {
      const [x] = pts[pts.length - 1];
      const dx = toX - x;
      if (Math.abs(dx) < 1) return;
      const c = Math.min(BEVEL, Math.abs(dx) / 2);
      const s = Math.sign(dx);
      pts.push([x, y - c], [x + s * c, y], [toX - s * c, y], [toX, y + c]);
    };

    const update = () => {
      if (getComputedStyle(svg).display === 'none') {
        head.style.opacity = '0';
        return;
      }
      const targets = Array.from(landing.querySelectorAll<HTMLElement>(TARGETS));
      const firstSection = landing.querySelector<HTMLElement>('.hero-editorial-section + section');
      if (!targets.length || !firstSection) return;

      const box = landing.getBoundingClientRect();
      const top = firstSection.getBoundingClientRect().top - box.top;

      // Per label: the gutter the trace runs in, the x where the label's rule begins, and its height.
      const stops = targets.map((t) => {
        const r = t.getBoundingClientRect();
        const container = t.closest<HTMLElement>('.handbook-spotlight-card') ?? t;
        return {
          gutter: container.getBoundingClientRect().left - box.left - GUTTER,
          tie: r.left - box.left - GUTTER,
          y: r.top + r.height / 2 - box.top,
        };
      });

      const pts: Pt[] = [[stops[0].gutter, top]];
      const nodeAt: number[] = []; // index into pts of each label's node
      stops.forEach((stop, i) => {
        if (i > 0) {
          const prevY = pts[pts.length - 1][1];
          const crossY = Math.max(prevY + BEVEL * 2, stop.y - JOG_ABOVE);
          jog(pts, crossY, stop.gutter);
        }
        if (Math.abs(stop.tie - stop.gutter) < 1) {
          pts.push([stop.gutter, stop.y]);
        } else {
          // Turn in from the gutter to the label (handbook card).
          const s = Math.sign(stop.tie - stop.gutter);
          pts.push([stop.gutter, stop.y - BEVEL], [stop.gutter + s * BEVEL, stop.y], [stop.tie, stop.y]);
        }
        nodeAt.push(pts.length - 1);
      });

      // Cumulative arc length at each point.
      const cum = [0];
      for (let i = 1; i < pts.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      }
      const total = cum[cum.length - 1];
      const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
      base.setAttribute('d', d);
      fill.setAttribute('d', d);
      pulse.setAttribute('d', d);
      svg.style.setProperty('--trace-len', String(total));

      // Arc length covered = scroll distance past the trace's start.
      const covered = Math.max(0, Math.min(total, headScreenY() - box.top - top));
      fill.style.strokeDasharray = `${total} ${total}`;
      fill.style.strokeDashoffset = String(total - covered);

      // The head is position: fixed at mid-viewport, so the browser never scrolls it out of
      // place between updates. Only its x follows the trace (it changes only on the jogs).
      let seg = 1;
      while (seg < cum.length - 1 && cum[seg] < covered) seg++;
      const span = cum[seg] - cum[seg - 1];
      const t = span ? (covered - cum[seg - 1]) / span : 0;
      head.style.left = `${box.left + pts[seg - 1][0] + (pts[seg][0] - pts[seg - 1][0]) * t}px`;
      head.style.opacity = covered > 0 && covered < total ? '1' : '0';

      nodeAt.forEach((pi, i) => {
        targets[i]?.classList.toggle(passedClass, cum[pi] <= covered);
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Reveal animations and images shift layout after mount; re-measure when the page settles.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(landing);
    landing.addEventListener('transitionend', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
      landing.removeEventListener('transitionend', update);
      landing.querySelectorAll(TARGETS).forEach((el) => el.classList.remove(passedClass));
    };
  }, []);

  return (
    <>
      <svg className="landing-guide" ref={svgRef} aria-hidden="true">
        <path ref={baseRef} className="landing-guide-base" />
        <path ref={fillRef} className="landing-guide-fill" />
        <path ref={pulseRef} className="landing-guide-pulse" />
      </svg>
      <span className="landing-guide-head" ref={headRef} aria-hidden="true" />
    </>
  );
}
