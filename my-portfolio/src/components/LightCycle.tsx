import { useEffect, useRef } from 'react';

// A TRON light cycle that chases the pointer. Like on the Grid it rides along the axes and
// changes lanes in quarter turns, carved as tight arcs rather than snapped, so it closes in on
// the cursor in a rounded staircase, then brakes and
// parks with its nose on it until the cursor moves off. The jetwall behind it fades with age, so
// a fast run leaves a long wall and a parked cycle none. The canvas sits beneath the page (see
// tron.css), so the cycle rides under cards and text rather than over them. Mouse and pen only,
// off under reduced motion.
const DIRS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];
const TRAIL_MS = 1100;
const MIN_SEGMENT = 44; // px travelled before the cycle may turn again
const MIN_SPEED = 2.4;
const MAX_SPEED = 14;
const BIKE_SCALE = 1.05;
const BIKE_LENGTH = 84; // model units, tail light to front tyre
const TURN_RADIUS = 46; // px; a quarter turn is carved along this arc
const BODY = BIKE_LENGTH * BIKE_SCALE; // on-screen length, front tyre to tail
const ARRIVE = 20; // nose this close to the cursor: brake and park
const LEAVE = 48; // cursor this far from a parked nose: ride again

type TrailPoint = { x: number; y: number; t: number };

export default function LightCycle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reducedMotion || !finePointer) return;

    const target = { x: 0, y: 0 };
    // dir is the lane being steered for; angle is the actual heading, which swings toward it.
    const cycle = { x: 0, y: 0, dir: 0, angle: 0, speed: MIN_SPEED, sinceTurn: 0, alive: false, parked: false };
    let trail: TrailPoint[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let accent = '111, 243, 255';
    let accentCheck = 0;
    let wheelPhase = 0;
    let bodyAngle = 0;

    const readAccent = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || accent;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // cycle.x/y is the front tyre: the cycle steers, turns and parks by its nose. The wall is
    // recorded along that same path and the body is drawn over its newest stretch, so it still
    // reads as leaving the tail. (Pivoting on the tail instead would swing the nose a full
    // body-length on every turn and it would never settle on the cursor.)
    const turnTowards = (perp: number, horizontal: boolean) => {
      const sign = perp >= 0 ? 1 : -1;
      cycle.dir = horizontal ? (sign > 0 ? 1 : 3) : sign > 0 ? 0 : 2;
      cycle.sinceTurn = 0;
    };

    const steer = () => {
      if (cycle.sinceTurn < MIN_SEGMENT) return;
      const dx = target.x - cycle.x;
      const dy = target.y - cycle.y;
      const horizontal = cycle.dir === 0 || cycle.dir === 2;
      const along = horizontal ? dx * DIRS[cycle.dir].x : dy * DIRS[cycle.dir].y;
      const perp = horizontal ? dy : dx;

      // Overshot, lined up on this axis, or the other axis now matters more: turn 90°.
      // A cycle can't reverse, so overshooting becomes two quarter turns: a U.
      if (along < -4 || (Math.abs(along) < 10 && Math.abs(perp) > 14) || (Math.abs(perp) > 48 && Math.abs(perp) > Math.abs(along) * 1.6)) {
        turnTowards(perp === 0 ? 1 : perp, horizontal);
      }
    };

    // The tail rides on the wall one body-length back along the path the nose has taken, so the
    // body is a chord of that path: through a curve it swings round smoothly instead of hanging
    // rigidly off the nose. Returns the tail point and how much of the trail lies behind it.
    const findTail = () => {
      let left = BODY;
      for (let i = trail.length - 1; i > 0; i--) {
        const a = trail[i];
        const b = trail[i - 1];
        const seg = Math.hypot(a.x - b.x, a.y - b.y);
        if (seg >= left) {
          const f = left / seg;
          return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, upTo: i - 1 };
        }
        left -= seg;
      }
      // Not enough wall yet (just arrived, or parked long enough for it to fade): keep the
      // body where it last pointed.
      return { x: cycle.x - Math.cos(bodyAngle) * BODY, y: cycle.y - Math.sin(bodyAngle) * BODY, upTo: -1 };
    };

    // Stroked in short runs that share an end point, each with one fade level. Butt caps keep
    // the runs from overlapping, which under additive blending would bead the wall with dots.
    // Only the wall behind the tail is drawn; the body covers the rest of the path.
    const drawTrail = (now: number, upTo: number, tail: { x: number; y: number }) => {
      const pts = trail.slice(0, upTo + 1);
      if (pts.length) pts.push({ ...tail, t: pts[pts.length - 1].t });
      const RUN = 6;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      for (let pass = 0; pass < 2; pass++) {
        ctx.lineWidth = pass === 0 ? 8 : 2;
        for (let start = 0; start < pts.length - 1; start += RUN) {
          const end = Math.min(start + RUN, pts.length - 1);
          const life = 1 - (now - pts[end].t) / TRAIL_MS;
          if (life <= 0) continue;
          ctx.strokeStyle = pass === 0 ? `rgba(${accent}, ${0.14 * life})` : `rgba(${accent}, ${0.95 * life})`;
          ctx.beginPath();
          ctx.moveTo(pts[start].x, pts[start].y);
          for (let i = start + 1; i <= end; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
        }
      }
    };

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    };

    // A hubless Legacy wheel from above: a long fat tyre wrapped in its loop of light, the tread
    // rolling with the cycle's speed.
    const drawWheel = (x: number, len: number, half: number) => {
      ctx.fillStyle = 'rgba(5, 9, 13, 1)';
      ctx.strokeStyle = `rgba(${accent}, 1)`;
      ctx.lineWidth = 1.6;
      roundRect(x, -half, len, half * 2, half * 0.9);
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.clip();
      ctx.strokeStyle = `rgba(${accent}, 0.3)`;
      ctx.lineWidth = 1;
      const pitch = 4;
      const offset = wheelPhase % pitch;
      for (let tx = x - pitch + offset; tx < x + len + pitch; tx += pitch) {
        ctx.beginPath();
        ctx.moveTo(tx, -half + 1.5);
        ctx.lineTo(tx, half - 1.5);
        ctx.stroke();
      }
      ctx.restore();
    };

    // Seen from directly above, as on the arcade Light Cycles grid: modelled tail-at-origin with
    // the front tyre along +x, then shifted back so the front tyre sits on cycle.x/y. Two separate
    // wheels and a visible rider (legs back, shoulders, arms forward, helmet) keep it reading
    // as a bike rather than a capsule.
    const drawCycle = () => {
      ctx.save();
      ctx.translate(cycle.x, cycle.y);
      ctx.rotate(bodyAngle);
      ctx.scale(BIKE_SCALE, BIKE_SCALE);
      ctx.translate(-BIKE_LENGTH, 0);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = `rgba(${accent}, 0.9)`;
      ctx.shadowBlur = 10;

      drawWheel(2, 26, 6.5);
      drawWheel(56, 27, 6);

      // Frame: a slim spine joining the wheels, fairing out where it wraps each wheel.
      ctx.fillStyle = 'rgba(4, 8, 12, 0.97)';
      ctx.strokeStyle = `rgba(${accent}, 1)`;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(18, -3.5);
      ctx.lineTo(62, -3.5);
      ctx.lineTo(66, -2);
      ctx.lineTo(66, 2);
      ctx.lineTo(62, 3.5);
      ctx.lineTo(18, 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Fins flicked out behind the rider.
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(26, 3.5 * s);
        ctx.lineTo(19, 9 * s);
        ctx.lineTo(30, 3.5 * s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Rider lying along the spine. Legs first: hips to bent knees to feet on the rear pegs.
      ctx.strokeStyle = `rgba(${accent}, 1)`;
      for (const s of [-1, 1]) {
        ctx.lineWidth = 4.2;
        ctx.strokeStyle = 'rgba(8, 14, 20, 1)';
        ctx.beginPath();
        ctx.moveTo(38, 2.5 * s);
        ctx.lineTo(31, 7 * s);
        ctx.lineTo(24, 5 * s);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${accent}, 0.9)`;
        ctx.stroke();
      }

      // Torso, widest at the shoulders.
      ctx.fillStyle = 'rgba(8, 14, 20, 1)';
      ctx.strokeStyle = `rgba(${accent}, 1)`;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(36, -3.5);
      ctx.bezierCurveTo(42, -5, 47, -7.5, 50, -6.5);
      ctx.lineTo(51, 0);
      ctx.lineTo(50, 6.5);
      ctx.bezierCurveTo(47, 7.5, 42, 5, 36, 3.5);
      ctx.quadraticCurveTo(34, 0, 36, -3.5);
      ctx.fill();
      ctx.stroke();

      // Arms reaching forward to the grips over the front wheel.
      for (const s of [-1, 1]) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(8, 14, 20, 1)';
        ctx.beginPath();
        ctx.moveTo(49, 6 * s);
        ctx.lineTo(57, 5 * s);
        ctx.lineTo(61, 3.6 * s);
        ctx.stroke();
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = `rgba(${accent}, 0.9)`;
        ctx.stroke();
      }

      // Helmet with its lit crest.
      ctx.fillStyle = 'rgba(10, 16, 22, 1)';
      ctx.strokeStyle = `rgba(${accent}, 1)`;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.ellipse(55, 0, 4.4, 3.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 6;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(51.5, 0);
      ctx.lineTo(58.5, 0);
      ctx.stroke();

      // Tail light.
      ctx.fillStyle = `rgba(${accent}, 1)`;
      ctx.fillRect(-0.5, -2.5, 2, 5);
      ctx.restore();
    };

    const loop = (now: number) => {
      const k = last ? Math.min((now - last) / 16.67, 3) : 1;
      last = now;

      if (now - accentCheck > 400) {
        readAccent();
        accentCheck = now;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      if (cycle.alive) {
        const dist = Math.hypot(target.x - cycle.x, target.y - cycle.y);
        if (!cycle.parked && dist < ARRIVE) cycle.parked = true;
        else if (cycle.parked && dist > LEAVE) cycle.parked = false;

        if (cycle.parked) {
          cycle.speed += (0 - cycle.speed) * 0.25 * k; // brake hard
          if (cycle.speed < 0.05) cycle.speed = 0;
        } else {
          const wanted = Math.min(MAX_SPEED, Math.max(MIN_SPEED, dist * 0.055));
          cycle.speed += (wanted - cycle.speed) * 0.08 * k;
          steer();
        }

        // Swing the heading toward the chosen lane no faster than the turn radius allows, so the
        // nose (and the wall it lays) follows a circular arc through every corner.
        const step = cycle.speed * k;
        const goal = (cycle.dir * Math.PI) / 2;
        const off = Math.atan2(Math.sin(goal - cycle.angle), Math.cos(goal - cycle.angle));
        const maxTurn = step / TURN_RADIUS;
        cycle.angle += Math.max(-maxTurn, Math.min(maxTurn, off));
        cycle.x += Math.cos(cycle.angle) * step;
        cycle.y += Math.sin(cycle.angle) * step;
        cycle.sinceTurn += step;
        wheelPhase += step / BIKE_SCALE;

        if (step > 0) trail.push({ x: cycle.x, y: cycle.y, t: now });
        trail = trail.filter((p) => now - p.t < TRAIL_MS);
        if (trail.length > 600) trail = trail.slice(-600);

        const tail = findTail();
        bodyAngle = Math.atan2(cycle.y - tail.y, cycle.x - tail.x);
        drawTrail(now, tail.upTo, tail);
        ctx.globalCompositeOperation = 'source-over';
        drawCycle();
      }

      frame = document.hidden ? 0 : requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!cycle.alive) {
        // Ride in from the nearest side edge.
        cycle.alive = true;
        cycle.y = e.clientY;
        cycle.x = e.clientX < width / 2 ? -20 : width + 20;
        cycle.dir = e.clientX < width / 2 ? 0 : 2;
        cycle.angle = (cycle.dir * Math.PI) / 2;
        bodyAngle = cycle.angle;
      }
    };

    const onVisibility = () => {
      if (!document.hidden && !frame) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    resize();
    readAccent();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(loop);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="light-cycle-canvas" aria-hidden="true" />;
}
