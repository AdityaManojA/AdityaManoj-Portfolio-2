import { useEffect, useRef } from 'react';
import { getVehicle, drawTyres, drawTailLights, type Vehicle } from './vehicles';

// A top-down vehicle that chases the pointer and drifts through its turns. It runs along the
// axes and pivots onto the other axis in a carved arc; while it turns the tail slides out (the
// body over-rotates past the direction of travel, front wheels counter-steering), the rear tyres
// pour out smoke and lay skid marks, and the slide settles with a little wobble once it
// straightens. It brakes and parks on the cursor until the cursor moves off. Which vehicle, and
// how it handles, comes from vehicles.ts. The canvas sits beneath the page (see drift-car.css),
// so it drives under text and cards. Mouse and pen only, off under reduced motion.
//
// Cost: the body and the smoke puff are pre-rendered sprites (rebuilt only when the vehicle or
// theme changes), puffs live in a reused pool, and the frame loop goes to sleep once the vehicle
// is parked and the smoke and skid marks have faded, waking on the next pointer move.
const DIRS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];
const MIN_SEGMENT = 40; // px travelled before the vehicle may turn again
const MIN_SPEED = 2.4;
const ARRIVE = 18; // vehicle this close to the cursor: brake and park
const LEAVE = 56; // cursor this far from a parked vehicle: drive again
const DRIFT_SLIP = 0.12; // slip beyond which the tyres smoke and mark
const MARK_MS = 2600;
const MAX_PUFFS = 360;
const SPRITE_PAD = 4; // model units around the body, for mirrors and wings

type Puff = { x: number; y: number; vx: number; vy: number; r: number; grow: number; age: number; life: number; alpha: number };
type MarkPoint = { x: number; y: number; t: number } | null;

export type DriftSettings = { vehicle: string; smoke: boolean; marks: boolean };

export default function DriftCar({ vehicle, smoke, marks: showMarks }: DriftSettings) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef<DriftSettings>({ vehicle, smoke, marks: showMarks });
  const refreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    settingsRef.current = { vehicle, smoke, marks: showMarks };
    refreshRef.current();
  }, [vehicle, smoke, showMarks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reducedMotion || !finePointer) return;

    let v: Vehicle = getVehicle(settingsRef.current.vehicle);
    const target = { x: 0, y: 0 };
    // dir is the lane being steered for; heading is the direction of travel, which swings
    // toward it along the turn arc; slip is how far the body hangs past the heading.
    const car = {
      x: 0, y: 0, dir: 0, heading: 0, speed: MIN_SPEED, sinceTurn: 0,
      slip: 0, slipVel: 0, alive: false, parked: false,
    };
    const puffs: Puff[] = [];
    let puffCount = 0;
    const marks: MarkPoint[][] = [[], []];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    let accent = '194, 65, 12';
    let dark = false;
    const bodySprite = document.createElement('canvas');
    const smokeSprite = document.createElement('canvas');

    const buildSprites = () => {
      // Body: rendered at device resolution so it stays crisp when rotated.
      const s = v.scale * dpr;
      bodySprite.width = Math.ceil((v.len + SPRITE_PAD * 2) * s);
      bodySprite.height = Math.ceil((v.wid + SPRITE_PAD * 2) * s);
      const c = bodySprite.getContext('2d')!;
      c.setTransform(s, 0, 0, s, bodySprite.width / 2, bodySprite.height / 2);
      c.clearRect(-v.len, -v.wid, v.len * 2, v.wid * 2);
      v.paint(c, accent);

      // Smoke: one soft puff, tinted for the theme, stamped at any size and opacity.
      const tone = dark ? '214, 214, 220' : '128, 118, 106';
      smokeSprite.width = smokeSprite.height = 64;
      const m = smokeSprite.getContext('2d')!;
      const g = m.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, `rgba(${tone}, 1)`);
      g.addColorStop(0.45, `rgba(${tone}, 0.55)`);
      g.addColorStop(1, `rgba(${tone}, 0)`);
      m.clearRect(0, 0, 64, 64);
      m.fillStyle = g;
      m.fillRect(0, 0, 64, 64);
    };

    const readTheme = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || accent;
      dark = document.documentElement.classList.contains('dark');
      buildSprites();
      wake();
    };

    // Called when the garage changes: swap the vehicle in place and redraw.
    refreshRef.current = () => {
      const next = getVehicle(settingsRef.current.vehicle);
      if (next !== v) {
        v = next;
        car.speed = Math.min(car.speed, v.maxSpeed);
        buildSprites();
      }
      if (!settingsRef.current.marks) marks.forEach((line) => (line.length = 0));
      if (!settingsRef.current.smoke) puffCount = 0;
      wake();
    };

    const resize = () => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * nextDpr);
      canvas.height = Math.round(height * nextDpr);
      ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
      if (nextDpr !== dpr) {
        dpr = nextDpr;
        buildSprites();
      }
      wake();
    };

    const steer = () => {
      if (car.sinceTurn < MIN_SEGMENT) return;
      const dx = target.x - car.x;
      const dy = target.y - car.y;
      const horizontal = car.dir === 0 || car.dir === 2;
      const along = horizontal ? dx * DIRS[car.dir].x : dy * DIRS[car.dir].y;
      const perp = horizontal ? dy : dx;

      // Overshot, lined up on this axis, or the other axis now matters more: pivot 90°.
      // Overshooting becomes two quarter turns, a U, rather than a reverse.
      if (along < -4 || (Math.abs(along) < 10 && Math.abs(perp) > 14) || (Math.abs(perp) > 48 && Math.abs(perp) > Math.abs(along) * 1.6)) {
        const sign = (perp === 0 ? 1 : perp) >= 0 ? 1 : -1;
        car.dir = horizontal ? (sign > 0 ? 1 : 3) : sign > 0 ? 0 : 2;
        car.sinceTurn = 0;
      }
    };

    // Rear tyre contact points in screen space, for smoke and skid marks.
    const wheels = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    const placeContacts = (angle: number) => {
      const c = Math.cos(angle);
      const n = Math.sin(angle);
      v.contacts.forEach(([mx, my], i) => {
        const bx = mx * v.scale;
        const by = my * v.scale;
        wheels[i].x = car.x + bx * c - by * n;
        wheels[i].y = car.y + bx * n + by * c;
      });
    };

    const spawnPuff = (wx: number, wy: number, intensity: number, angle: number) => {
      // Reuse a dead slot when the pool is full rather than allocating.
      const p = puffCount < puffs.length ? puffs[puffCount] : puffCount < MAX_PUFFS ? (puffs[puffCount] = {} as Puff) : null;
      if (!p) return;
      puffCount++;
      // Kicked backwards off the tyre and out to the side, then left to drift and spread.
      const back = 0.4 + Math.random() * 0.8;
      p.x = wx + (Math.random() - 0.5) * 4;
      p.y = wy + (Math.random() - 0.5) * 4;
      p.vx = -Math.cos(angle) * back + (Math.random() - 0.5) * 0.9;
      p.vy = -Math.sin(angle) * back + (Math.random() - 0.5) * 0.9;
      p.r = (4 + Math.random() * 4) * Math.sqrt(v.smoke);
      p.grow = 0.3 + Math.random() * 0.35;
      p.age = 0;
      p.life = 80 + Math.random() * 60;
      p.alpha = (0.2 + Math.random() * 0.12) * Math.min(1, 0.4 + intensity);
    };

    const emitSmoke = (intensity: number, angle: number) => {
      const density = intensity * v.smoke;
      for (let i = 0; i < v.contacts.length; i++) {
        const count = density > 0.6 ? 2 : Math.random() < density * 2 ? 1 : 0;
        for (let j = 0; j < count; j++) spawnPuff(wheels[i].x, wheels[i].y, intensity, angle);
      }
    };

    const trimMarks = (now: number) => {
      for (const line of marks) {
        let drop = 0;
        while (drop < line.length && (!line[drop] || now - (line[drop] as { t: number }).t > MARK_MS)) drop++;
        if (drop) line.splice(0, drop);
      }
    };

    // Stroked in short runs that share an end point, each with one fade level. Butt caps keep
    // the runs from overlapping, which would bead the translucent marks with darker dots.
    const drawMarks = (now: number) => {
      const RUN = 5;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'round';
      ctx.lineWidth = v.markWidth * v.scale;
      const ink = dark ? '255, 255, 255' : '40, 32, 26';
      const peak = dark ? 0.08 : 0.17;
      for (const line of marks) {
        let start = 0;
        while (start < line.length - 1) {
          if (!line[start]) {
            start++;
            continue;
          }
          let end = start;
          while (end < line.length - 1 && end - start < RUN && line[end + 1]) end++;
          if (end === start) {
            start++;
            continue;
          }
          const life = 1 - (now - (line[end] as { t: number }).t) / MARK_MS;
          if (life > 0) {
            ctx.strokeStyle = `rgba(${ink}, ${peak * life})`;
            ctx.beginPath();
            for (let i = start; i <= end; i++) {
              const p = line[i] as { x: number; y: number };
              if (i === start) ctx.moveTo(p.x, p.y);
              else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
          }
          start = end;
        }
      }
    };

    // Advance and stamp every live puff, compacting the pool in place as puffs die.
    const drawSmoke = (k: number) => {
      let live = 0;
      for (let i = 0; i < puffCount; i++) {
        const p = puffs[i];
        p.age += k;
        if (p.age >= p.life) continue;
        p.x += p.vx * k;
        p.y += p.vy * k;
        // Air drag, plus a slow rise and lean as the smoke lifts off the road.
        p.vx = p.vx * 0.95 + 0.004 * k;
        p.vy = p.vy * 0.95 - 0.006 * k;
        p.r += p.grow * k;
        const t = p.age / p.life;
        const a = p.alpha * (1 - t) * (1 - t);
        if (a > 0.003) {
          ctx.globalAlpha = a;
          ctx.drawImage(smokeSprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        }
        if (live !== i) {
          puffs[i] = puffs[live];
          puffs[live] = p;
        }
        live++;
      }
      puffCount = live;
      ctx.globalAlpha = 1;
    };

    const drawVehicle = (angle: number) => {
      // Ground shadow, cast down and to the right on screen whichever way it faces.
      ctx.save();
      ctx.translate(car.x + 2.5, car.y + 3.5);
      ctx.rotate(angle);
      ctx.scale(v.scale, v.scale);
      ctx.fillStyle = dark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(30, 20, 10, 0.18)';
      ctx.beginPath();
      ctx.roundRect(-v.len / 2, -v.wid / 2, v.len, v.wid, 7);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(angle);
      ctx.scale(v.scale, v.scale);
      drawTyres(ctx, v, -car.slip * 0.8); // the fronts counter-steer against the slide
      const sw = bodySprite.width / (dpr * v.scale);
      const sh = bodySprite.height / (dpr * v.scale);
      ctx.drawImage(bodySprite, -sw / 2, -sh / 2, sw, sh);
      drawTailLights(ctx, v, car.parked || car.speed < 3);
      ctx.restore();
    };

    const loop = (now: number) => {
      const k = last ? Math.min((now - last) / 16.67, 3) : 1;
      last = now;
      ctx.clearRect(0, 0, width, height);
      const settings = settingsRef.current;

      const dist = Math.hypot(target.x - car.x, target.y - car.y);
      if (!car.parked && dist < ARRIVE) car.parked = true;
      else if (car.parked && dist > LEAVE) car.parked = false;

      if (car.parked) {
        car.speed += (0 - car.speed) * 0.2 * k;
        if (car.speed < 0.05) car.speed = 0;
      } else {
        const wanted = Math.min(v.maxSpeed, Math.max(MIN_SPEED, dist * 0.05));
        car.speed += (wanted - car.speed) * 0.08 * k;
        steer();
      }

      // Carve the turn: heading swings toward the lane no faster than the turn radius allows.
      const step = car.speed * k;
      const goal = (car.dir * Math.PI) / 2;
      const off = Math.atan2(Math.sin(goal - car.heading), Math.cos(goal - car.heading));
      const maxTurn = step / v.turnRadius;
      const turn = Math.max(-maxTurn, Math.min(maxTurn, off));
      car.heading += turn;
      car.x += Math.cos(car.heading) * step;
      car.y += Math.sin(car.heading) * step;
      car.sinceTurn += step;

      // The slide: turning rate (scaled by speed) pushes the tail out, a damped spring brings
      // it back, overshooting slightly as the driver catches it.
      const rate = turn / k;
      const slipTarget = Math.max(-v.maxSlip, Math.min(v.maxSlip, rate * v.slipGain * Math.min(1, car.speed / 6)));
      car.slipVel += (slipTarget - car.slip) * 0.16 * k;
      car.slipVel *= Math.pow(0.74, k);
      car.slip += car.slipVel * k;
      const bodyAngle = car.heading + car.slip;

      const intensity = Math.min(1, Math.max(0, (Math.abs(car.slip) - DRIFT_SLIP) / 0.35));
      placeContacts(bodyAngle);
      if (intensity > 0 && car.speed > 1.5) {
        if (settings.smoke) emitSmoke(intensity, bodyAngle);
        if (settings.marks) v.contacts.forEach((_, i) => marks[i].push({ x: wheels[i].x, y: wheels[i].y, t: now }));
      } else {
        // Break the skid lines so the next slide starts a fresh pair.
        for (const line of marks) if (line.length && line[line.length - 1]) line.push(null);
        // A light haze off the tyres when pulling hard in a straight line.
        if (settings.smoke && car.speed > 9 && Math.random() < 0.15) emitSmoke(0.15, bodyAngle);
      }
      trimMarks(now);

      drawMarks(now);
      drawSmoke(k);
      drawVehicle(bodyAngle);

      // Nothing left moving: leave the last frame on screen and stop until something changes.
      const settled = car.speed === 0 && Math.abs(car.slip) < 0.002 && Math.abs(car.slipVel) < 0.002;
      const idle = settled && puffCount === 0 && marks.every((line) => !line.length);
      frame = idle || document.hidden ? 0 : requestAnimationFrame(loop);
    };

    function wake() {
      if (!frame && car.alive && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!car.alive) {
        // Drive in from the nearest side edge.
        car.alive = true;
        car.y = e.clientY;
        car.x = e.clientX < width / 2 ? -40 : width + 40;
        car.dir = e.clientX < width / 2 ? 0 : 2;
        car.heading = (car.dir * Math.PI) / 2;
      }
      wake();
    };

    // Recolour when the theme toggles, instead of polling computed styles.
    const themeObserver = new MutationObserver(readTheme);

    resize();
    readTheme();
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', wake);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      refreshRef.current = () => {};
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', wake);
    };
  }, []);

  return <canvas ref={canvasRef} className="drift-car-canvas" aria-hidden="true" />;
}
