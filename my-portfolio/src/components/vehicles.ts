// The garage: every vehicle the cursor chaser can drive. Each one is drawn top-down in model
// units, nose along +x and centred on the origin, and carries its own handling so a truck feels
// heavier than a bike. paint() holds everything static (it is cached as a sprite); tyres and tail
// lights are drawn per frame so the fronts can steer and the lights can brighten on braking.

export type Rect = { x: number; y: number; w: number; h: number }; // centred on x, y

export type Vehicle = {
  id: string;
  name: string;
  blurb: string;
  len: number;
  wid: number;
  scale: number;
  rearTyres: Rect[];
  frontTyres: Rect[];
  contacts: [number, number][]; // rear tyre contact points: where smoke and skid marks start
  tailLights: Rect[];
  maxSpeed: number;
  turnRadius: number; // px the path arcs through a quarter turn
  slipGain: number; // how hard turning throws the tail out
  maxSlip: number; // rad
  smoke: number; // multiplier on smoke density
  markWidth: number; // model units
  paint: (ctx: CanvasRenderingContext2D, accent: string) => void;
};

// Lit along the top flank, falling into shade on the far one, clipped to the given outline.
function shade(ctx: CanvasRenderingContext2D, outline: Path2D, len: number, wid: number) {
  ctx.save();
  ctx.clip(outline);
  const g = ctx.createLinearGradient(0, -wid / 2, 0, wid / 2);
  g.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
  g.addColorStop(0.35, 'rgba(255, 255, 255, 0)');
  g.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
  g.addColorStop(1, 'rgba(0, 0, 0, 0.26)');
  ctx.fillStyle = g;
  ctx.fillRect(-len / 2, -wid / 2, len, wid);
  ctx.restore();
}

function glassGradient(ctx: CanvasRenderingContext2D, half: number) {
  const g = ctx.createLinearGradient(0, -half, 0, half);
  g.addColorStop(0, '#3a4654');
  g.addColorStop(0.45, '#141b24');
  g.addColorStop(1, '#0b1016');
  return g;
}

const HEADLIGHT = 'rgba(255, 248, 220, 0.95)';
const STRIPE = 'rgba(255, 255, 255, 0.88)';
const OUTLINE = 'rgba(0, 0, 0, 0.3)';

const coupe: Vehicle = {
  id: 'coupe',
  name: 'Coupe',
  blurb: 'Balanced. Big, smoky slides.',
  len: 46,
  wid: 22,
  scale: 1.15,
  rearTyres: [-1, 1].map((s) => ({ x: -13.5, y: s * 11, w: 9, h: 4.6 })),
  frontTyres: [-1, 1].map((s) => ({ x: 13.5, y: s * 11, w: 9, h: 4.6 })),
  contacts: [[-14, -10.5], [-14, 10.5]],
  tailLights: [-1, 1].map((s) => ({ x: -22.2, y: s * 6.6, w: 1.6, h: 4 })),
  maxSpeed: 13,
  turnRadius: 40,
  slipGain: 2.6,
  maxSlip: 0.75,
  smoke: 1,
  markWidth: 3.2,
  paint(ctx, accent) {
    const L = 23;
    const W = 11;
    const body = new Path2D();
    body.moveTo(-L + 3, -W);
    body.lineTo(L - 9, -W + 0.6);
    body.quadraticCurveTo(L, -W + 2, L, -W + 6);
    body.lineTo(L, W - 6);
    body.quadraticCurveTo(L, W - 2, L - 9, W - 0.6);
    body.lineTo(-L + 3, W);
    body.quadraticCurveTo(-L, W, -L, W - 3);
    body.lineTo(-L, -W + 3);
    body.quadraticCurveTo(-L, -W, -L + 3, -W);
    ctx.fillStyle = `rgb(${accent})`;
    ctx.fill(body);
    ctx.fillStyle = STRIPE;
    ctx.fillRect(-L, -3.4, 46, 2);
    ctx.fillRect(-L, 1.4, 46, 2);
    shade(ctx, body, 46, 22);
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 0.8;
    ctx.stroke(body);

    ctx.fillStyle = glassGradient(ctx, 7.5);
    ctx.beginPath();
    ctx.moveTo(3, -7.5);
    ctx.lineTo(9.5, -6);
    ctx.lineTo(9.5, 6);
    ctx.lineTo(3, 7.5);
    ctx.closePath();
    ctx.moveTo(-8, -7);
    ctx.lineTo(-12.5, -6);
    ctx.lineTo(-12.5, 6);
    ctx.lineTo(-8, 7);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `rgb(${accent})`;
    ctx.fillRect(-8, -7.2, 11, 14.4);
    const roof = ctx.createLinearGradient(0, -7.2, 0, 7.2);
    roof.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    roof.addColorStop(1, 'rgba(0, 0, 0, 0.22)');
    ctx.fillStyle = roof;
    ctx.fillRect(-8, -7.2, 11, 14.4);
    ctx.fillStyle = STRIPE;
    ctx.fillRect(-8, -3.4, 11, 2);
    ctx.fillRect(-8, 1.4, 11, 2);

    ctx.fillStyle = `rgb(${accent})`;
    ctx.fillRect(4, -W - 1.6, 2.4, 1.8);
    ctx.fillRect(4, W - 0.2, 2.4, 1.8);
    ctx.fillStyle = HEADLIGHT;
    ctx.fillRect(L - 2.6, -W + 3.2, 2, 3.4);
    ctx.fillRect(L - 2.6, W - 6.6, 2, 3.4);
  },
};

const formula: Vehicle = {
  id: 'formula',
  name: 'Formula',
  blurb: 'Fastest, tightest turns, grippy.',
  len: 52,
  wid: 24,
  scale: 1.05,
  rearTyres: [-1, 1].map((s) => ({ x: -14.5, y: s * 9.5, w: 11, h: 6 })),
  frontTyres: [-1, 1].map((s) => ({ x: 15, y: s * 9, w: 8, h: 5 })),
  contacts: [[-15, -9.5], [-15, 9.5]],
  tailLights: [{ x: -25.6, y: 0, w: 1.4, h: 2.4 }],
  maxSpeed: 15.5,
  turnRadius: 32,
  slipGain: 2,
  maxSlip: 0.55,
  smoke: 0.8,
  markWidth: 4.4,
  paint(ctx, accent) {
    // Rear wing and front wing, in a darker shade of the livery.
    ctx.fillStyle = `rgb(${accent})`;
    ctx.fillRect(-26, -11, 4.5, 22);
    ctx.fillRect(21.5, -11.5, 3.5, 23);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(-26, -11, 4.5, 22);
    ctx.fillRect(21.5, -11.5, 3.5, 23);

    // Monocoque: needle nose, sidepods, tapering engine cover.
    const tub = new Path2D();
    tub.moveTo(25.5, 0);
    tub.quadraticCurveTo(24, -1.8, 18, -2.2);
    tub.lineTo(6, -3.2);
    tub.lineTo(2, -6.5);
    tub.lineTo(-11, -6.5);
    tub.quadraticCurveTo(-15, -6, -18, -3.2);
    tub.lineTo(-22, -2.2);
    tub.lineTo(-22, 2.2);
    tub.lineTo(-18, 3.2);
    tub.quadraticCurveTo(-15, 6, -11, 6.5);
    tub.lineTo(2, 6.5);
    tub.lineTo(6, 3.2);
    tub.lineTo(18, 2.2);
    tub.quadraticCurveTo(24, 1.8, 25.5, 0);
    ctx.fillStyle = `rgb(${accent})`;
    ctx.fill(tub);
    ctx.fillStyle = STRIPE;
    ctx.fillRect(-20, -0.8, 44, 1.6);
    shade(ctx, tub, 52, 13);
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 0.7;
    ctx.stroke(tub);

    // Cockpit, halo and helmet.
    ctx.fillStyle = '#10151c';
    ctx.beginPath();
    ctx.ellipse(-1, 0, 5, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f2c230';
    ctx.beginPath();
    ctx.arc(-1.5, 0, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1b1f24';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(1, -2.6);
    ctx.moveTo(5, 0);
    ctx.lineTo(1, 2.6);
    ctx.stroke();
  },
};

const bike: Vehicle = {
  id: 'bike',
  name: 'Motorbike',
  blurb: 'Nimble. Tight lines, light trail.',
  len: 40,
  wid: 11, // body width for the shadow; bars and mirrors overhang it
  scale: 1.25,
  rearTyres: [{ x: -13, y: 0, w: 11, h: 4.4 }],
  frontTyres: [{ x: 14.5, y: 0, w: 10, h: 3.6 }],
  contacts: [[-14, 0]],
  tailLights: [{ x: -16.4, y: 0, w: 1.2, h: 2.2 }],
  maxSpeed: 14,
  turnRadius: 28,
  slipGain: 1.6,
  maxSlip: 0.45,
  smoke: 0.6,
  markWidth: 2.8,
  paint(ctx, accent) {
    const paint = `rgb(${accent})`;
    const leather = '#1c2229';
    const leatherLit = '#2c343e';

    // Swingarm out to the rear axle, and the exhaust tucked under the tail.
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-13, 0);
    ctx.lineTo(-4, -2.4);
    ctx.moveTo(-13, 0);
    ctx.lineTo(-4, 2.4);
    ctx.stroke();
    const pipe = ctx.createLinearGradient(0, 2.6, 0, 5);
    pipe.addColorStop(0, '#d7dadd');
    pipe.addColorStop(1, '#6d7278');
    ctx.fillStyle = pipe;
    ctx.beginPath();
    ctx.roundRect(-15, 2.6, 9, 2.4, 1.2);
    ctx.fill();

    // Tail cowl, pointed at the back, and the seat ahead of it.
    const tail = new Path2D();
    tail.moveTo(-16.6, 0);
    tail.quadraticCurveTo(-15, -2.4, -8, -2.8);
    tail.lineTo(-6, -2.6);
    tail.lineTo(-6, 2.6);
    tail.lineTo(-8, 2.8);
    tail.quadraticCurveTo(-15, 2.4, -16.6, 0);
    ctx.fillStyle = paint;
    ctx.fill(tail);
    shade(ctx, tail, 40, 6);
    ctx.fillStyle = '#16191d';
    ctx.beginPath();
    ctx.roundRect(-8.5, -2.9, 6.5, 5.8, 1.6);
    ctx.fill();

    // Fuel tank: the widest painted part.
    const tank = new Path2D();
    tank.moveTo(-2.4, -3.4);
    tank.quadraticCurveTo(2, -5.2, 6, -4);
    tank.lineTo(6.5, 0);
    tank.lineTo(6, 4);
    tank.quadraticCurveTo(2, 5.2, -2.4, 3.4);
    tank.closePath();
    ctx.fillStyle = paint;
    ctx.fill(tank);
    shade(ctx, tank, 40, 10.4);
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 0.6;
    ctx.stroke(tank);

    // Front fairing tapering to the nose, with a tinted screen and twin headlights.
    const fairing = new Path2D();
    fairing.moveTo(5.5, -4.4);
    fairing.quadraticCurveTo(12, -4.2, 16.5, -1.6);
    fairing.quadraticCurveTo(18, 0, 16.5, 1.6);
    fairing.quadraticCurveTo(12, 4.2, 5.5, 4.4);
    fairing.closePath();
    ctx.fillStyle = paint;
    ctx.fill(fairing);
    shade(ctx, fairing, 40, 8.8);
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 0.6;
    ctx.stroke(fairing);
    ctx.fillStyle = glassGradient(ctx, 2.8);
    ctx.beginPath();
    ctx.moveTo(8, -2.8);
    ctx.quadraticCurveTo(12, -2.4, 13, 0);
    ctx.quadraticCurveTo(12, 2.4, 8, 2.8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = HEADLIGHT;
    ctx.fillRect(15.4, -1.8, 1.4, 1.2);
    ctx.fillRect(15.4, 0.6, 1.4, 1.2);

    // Clip-on bars, and mirrors on stalks.
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(7, -3.6);
    ctx.lineTo(6.4, -6.6);
    ctx.moveTo(7, 3.6);
    ctx.lineTo(6.4, 6.6);
    ctx.moveTo(10, -4);
    ctx.lineTo(10.6, -6.4);
    ctx.moveTo(10, 4);
    ctx.lineTo(10.6, 6.4);
    ctx.stroke();
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(10.8, -7, 1.3, 0.9, 0, 0, Math.PI * 2);
    ctx.ellipse(10.8, 7, 1.3, 0.9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rider, tucked in. Legs first: hips back to the pegs, knees out beside the tank.
    ctx.lineJoin = 'round';
    for (const s of [-1, 1]) {
      ctx.strokeStyle = leather;
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(-4.5, 2.4 * s);
      ctx.lineTo(0.5, 5.6 * s);
      ctx.lineTo(-5.5, 5.4 * s);
      ctx.stroke();
      ctx.fillStyle = paint; // knee slider
      ctx.beginPath();
      ctx.arc(0.6, 5.8 * s, 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    // Torso, broad at the shoulders, with a stripe down the spine.
    const torso = new Path2D();
    torso.moveTo(-6.5, -2.6);
    torso.quadraticCurveTo(-1, -4.2, 3.2, -4.4);
    torso.quadraticCurveTo(4.6, -2, 4.6, 0);
    torso.quadraticCurveTo(4.6, 2, 3.2, 4.4);
    torso.quadraticCurveTo(-1, 4.2, -6.5, 2.6);
    torso.quadraticCurveTo(-7.4, 0, -6.5, -2.6);
    ctx.fillStyle = leather;
    ctx.fill(torso);
    ctx.fillStyle = leatherLit;
    ctx.beginPath();
    ctx.ellipse(-1.2, -1.2, 4.2, 1.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = paint;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(3.4, 0);
    ctx.stroke();

    // Arms reaching to the grips.
    ctx.strokeStyle = leather;
    ctx.lineWidth = 1.9;
    ctx.beginPath();
    ctx.moveTo(2.6, -3.8);
    ctx.lineTo(6.6, -5.8);
    ctx.moveTo(2.6, 3.8);
    ctx.lineTo(6.6, 5.8);
    ctx.stroke();

    // Helmet: painted shell, white stripe, dark visor at the front, highlight on top.
    ctx.fillStyle = paint;
    ctx.beginPath();
    ctx.ellipse(6.4, 0, 3.2, 2.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(3.4, -0.5, 5.2, 1);
    ctx.fillStyle = '#0e1318';
    ctx.beginPath();
    ctx.ellipse(8.4, 0, 1.3, 2.1, 0, -Math.PI / 2, Math.PI / 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.ellipse(5.6, -1.2, 1.6, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  },
};

const truck: Vehicle = {
  id: 'truck',
  name: 'Pickup',
  blurb: 'Heavy. Wide arcs, clouds of dust.',
  len: 56,
  wid: 25,
  scale: 1.05,
  rearTyres: [-1, 1].map((s) => ({ x: -17, y: s * 12.4, w: 11, h: 5 })),
  frontTyres: [-1, 1].map((s) => ({ x: 16.5, y: s * 12.4, w: 11, h: 5 })),
  contacts: [[-17, -12], [-17, 12]],
  tailLights: [-1, 1].map((s) => ({ x: -27.2, y: s * 9, w: 1.6, h: 4 })),
  maxSpeed: 10.5,
  turnRadius: 52,
  slipGain: 3,
  maxSlip: 0.85,
  smoke: 1.5,
  markWidth: 4,
  paint(ctx, accent) {
    const L = 28;
    const W = 12.5;
    const body = new Path2D();
    body.roundRect(-L, -W, L * 2, W * 2, [3, 6, 6, 3]);
    ctx.fillStyle = `rgb(${accent})`;
    ctx.fill(body);
    shade(ctx, body, 56, 25);
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 0.8;
    ctx.stroke(body);

    // Load bed with ribs.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.34)';
    ctx.beginPath();
    ctx.roundRect(-26, -10.5, 25, 21, 1.5);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (const y of [-6, -2, 2, 6]) {
      ctx.moveTo(-25, y);
      ctx.lineTo(-2, y);
    }
    ctx.stroke();

    // Cab: rear window, roof, windscreen.
    ctx.fillStyle = glassGradient(ctx, 9);
    ctx.fillRect(1, -9, 2.4, 18);
    ctx.beginPath();
    ctx.moveTo(13, -9.5);
    ctx.lineTo(18.5, -8);
    ctx.lineTo(18.5, 8);
    ctx.lineTo(13, 9.5);
    ctx.closePath();
    ctx.fill();
    const roof = ctx.createLinearGradient(0, -9.5, 0, 9.5);
    roof.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    roof.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = roof;
    ctx.fillRect(3.4, -9.5, 9.6, 19);

    // Grille, headlights, mirrors.
    ctx.fillStyle = '#20252b';
    ctx.fillRect(26.6, -5, 1.4, 10);
    ctx.fillStyle = HEADLIGHT;
    ctx.fillRect(25.4, -10.5, 2.4, 4);
    ctx.fillRect(25.4, 6.5, 2.4, 4);
    ctx.fillStyle = '#20252b';
    ctx.fillRect(13, -W - 2, 2.6, 2);
    ctx.fillRect(13, W, 2.6, 2);
  },
};

export const VEHICLES: Vehicle[] = [coupe, formula, bike, truck];
export const DEFAULT_VEHICLE = formula.id;

export function getVehicle(id: string): Vehicle {
  return VEHICLES.find((v) => v.id === id) ?? coupe;
}

// Tyres in model units; the fronts turn by steer radians about their own centres.
export function drawTyres(ctx: CanvasRenderingContext2D, v: Vehicle, steer: number) {
  ctx.fillStyle = '#141414';
  ctx.beginPath();
  for (const t of v.rearTyres) ctx.roundRect(t.x - t.w / 2, t.y - t.h / 2, t.w, t.h, 1.5);
  ctx.fill();
  for (const t of v.frontTyres) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(steer);
    ctx.beginPath();
    ctx.roundRect(-t.w / 2, -t.h / 2, t.w, t.h, 1.5);
    ctx.fill();
    ctx.restore();
  }
}

export function drawTailLights(ctx: CanvasRenderingContext2D, v: Vehicle, braking: boolean) {
  ctx.fillStyle = braking ? '#ff2a2a' : '#b81414';
  for (const t of v.tailLights) ctx.fillRect(t.x - t.w / 2, t.y - t.h / 2, t.w, t.h);
}

// A still top-down portrait of the vehicle for the garage cards, fitted to the canvas.
export function drawPreview(canvas: HTMLCanvasElement, v: Vehicle, accent: string) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth || 120;
  const h = canvas.clientHeight || 64;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const fit = Math.min((w * 0.82) / v.len, (h * 0.8) / v.wid);
  ctx.setTransform(dpr * fit, 0, 0, dpr * fit, (w / 2) * dpr, (h / 2) * dpr);
  ctx.clearRect(-v.len, -v.wid, v.len * 2, v.wid * 2);
  ctx.fillStyle = 'rgba(30, 20, 10, 0.16)';
  ctx.beginPath();
  ctx.roundRect(-v.len / 2 + 1.5, -v.wid / 2 + 2, v.len, v.wid, 6);
  ctx.fill();
  drawTyres(ctx, v, 0.18);
  v.paint(ctx, accent);
  drawTailLights(ctx, v, false);
}
