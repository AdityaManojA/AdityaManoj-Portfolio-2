// Removes the plain white background from a picture and saves it as a transparent PNG,
// trimmed to the subject.
//
// 1. It floods inward from the picture's edges through near-white pixels only, so white
//    that is enclosed by the drawing (headphones, slippers, eye highlights) is kept.
// 2. Along the subject's edge the source is a blend of the subject and the white behind it.
//    Each edge pixel is given the colour of the solid subject just inside it, and an opacity
//    equal to how much of that colour the blend contained. Nothing of the old white is left
//    in the pixel, so there is no pale fringe on a dark page, and soft shapes keep soft edges.
//
//   node scripts/cut-out.mjs <input image> <output.png> [max height, default: full size]
//
// Needs Node 22+ and Edge or Chrome (the browser's canvas does the pixel work, so there is
// nothing to npm install).

import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';

const [input, output, maxHeight = '100000'] = process.argv.slice(2);
if (!input || !output) throw new Error('Usage: node scripts/cut-out.mjs <input image> <output.png> [max height]');

const browser =
  process.env.BROWSER ??
  [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find(existsSync);
if (!browser) throw new Error('No browser found. Set BROWSER to an Edge or Chrome executable.');

const PORT = 9361;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const type = { '.png': 'image/png', '.webp': 'image/webp' }[extname(input).toLowerCase()] ?? 'image/jpeg';
const source = `data:${type};base64,${readFileSync(input).toString('base64')}`;

// Runs in the page.
const work = async (src, maxH) => {
  const WHITE = 238; // a pixel whose darkest channel is at least this is background
  const BAND = 7; // how many pixels in from the background count as "edge"
  const NEAR_WHITE = 60; // a subject colour closer to white than this cannot be un-blended
  const TINT = 12; // a bright pixel with more colour than this is a pale part of the subject
  const PALE = 226; // tinted pixels at least this bright, touching the background, are glow

  const img = new Image();
  img.src = src;
  await img.decode();
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const n = w * h;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const image = ctx.getImageData(0, 0, w, h);
  const px = image.data;
  const lowest = (i) => Math.min(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]);
  const neighbours = (i) => {
    const x = i % w;
    return [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i >= w ? i - w : -1, i < n - w ? i + w : -1];
  };

  // 1. Flood from every edge pixel through near-white pixels.
  const bg = new Uint8Array(n);
  const queue = new Int32Array(n);
  let head = 0;
  let tail = 0;
  const visit = (i) => {
    // Bright and colourless. A bright pixel with a tint (the pale tips of the star) is kept.
    if (i >= 0 && !bg[i] && lowest(i) >= WHITE && Math.max(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]) - lowest(i) <= TINT) {
      bg[i] = 1;
      queue[tail++] = i;
    }
  };
  for (let x = 0; x < w; x++) { visit(x); visit((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { visit(y * w); visit(y * w + w - 1); }
  while (head < tail) for (const j of neighbours(queue[head++])) visit(j);
  const removed = tail;

  // 1b. A soft, pale, tinted rim that touches the background (the glow round the star) is
  //     not solid subject either. It is collected here and given a soft opacity in step 4b,
  //     so the shape fades out and does not end in a ragged pale edge.
  const pale = new Uint8Array(n);
  const paleList = [];
  const tint = (i) => Math.max(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]) - lowest(i);
  const visitPale = (i) => {
    if (i >= 0 && !bg[i] && !pale[i] && lowest(i) >= PALE && tint(i) > TINT) {
      pale[i] = 1;
      paleList.push(i);
    }
  };
  for (let k = 0; k < removed; k++) for (const j of neighbours(queue[k])) visitPale(j);
  for (let k = 0; k < paleList.length; k++) for (const j of neighbours(paleList[k])) visitPale(j);
  // From here on the glow counts as outside the subject.
  for (const i of paleList) bg[i] = 1;

  // 2. Depth of each subject pixel from the background, up to BAND. Deeper pixels are "core".
  const depth = new Uint8Array(n); // 0 = background or core, 1..BAND = edge band
  const layers = [[]];
  let ring = [];
  for (let i = 0; i < n; i++) if (bg[i]) ring.push(i);
  for (let d = 1; d <= BAND; d++) {
    const next = [];
    for (const i of ring) for (const j of neighbours(i)) if (j >= 0 && !bg[j] && !depth[j]) { depth[j] = d; next.push(j); }
    layers.push(next);
    ring = next;
  }

  // 3. Give every band pixel the colour of the solid subject behind it, working outward from
  //    the core. A pixel with nothing deeper next to it (a thin feature) keeps its own colour.
  const solid = new Float32Array(n * 3);
  const has = new Uint8Array(n); // 1 = colour came from the core, 2 = the pixel's own colour
  for (let d = BAND; d >= 1; d--) {
    for (const i of layers[d]) {
      let r = 0, g = 0, bl = 0, count = 0;
      let own = true;
      for (const j of neighbours(i)) {
        if (j < 0 || bg[j]) continue;
        if (depth[j] === 0) { r += px[j * 4]; g += px[j * 4 + 1]; bl += px[j * 4 + 2]; count++; own = false; }
        else if (depth[j] > d && has[j]) { r += solid[j * 3]; g += solid[j * 3 + 1]; bl += solid[j * 3 + 2]; count++; if (has[j] === 1) own = false; }
      }
      if (count) { solid[i * 3] = r / count; solid[i * 3 + 1] = g / count; solid[i * 3 + 2] = bl / count; }
      else { solid[i * 3] = px[i * 4]; solid[i * 3 + 1] = px[i * 4 + 1]; solid[i * 3 + 2] = px[i * 4 + 2]; }
      has[i] = own ? 2 : 1;
    }
  }

  // 4b. The glow takes the colour of the subject it surrounds, spreading outward from it.
  const glowSolid = new Float32Array(n * 3);
  const glowHas = new Uint8Array(n);
  let frontier = [];
  const take = (i) => {
    let r = 0, g = 0, bl = 0, count = 0;
    for (const j of neighbours(i)) {
      if (j < 0) continue;
      if (glowHas[j]) { r += glowSolid[j * 3]; g += glowSolid[j * 3 + 1]; bl += glowSolid[j * 3 + 2]; count++; }
      else if (!bg[j]) {
        const own = depth[j] === 0;
        r += own ? px[j * 4] : solid[j * 3]; g += own ? px[j * 4 + 1] : solid[j * 3 + 1]; bl += own ? px[j * 4 + 2] : solid[j * 3 + 2];
        count++;
      }
    }
    if (!count) return false;
    glowSolid[i * 3] = r / count; glowSolid[i * 3 + 1] = g / count; glowSolid[i * 3 + 2] = bl / count;
    return true;
  };
  let waiting = paleList;
  while (waiting.length) {
    const done = [];
    const rest = [];
    for (const i of waiting) (take(i) ? done : rest).push(i);
    if (!done.length) break;
    for (const i of done) glowHas[i] = 1;
    waiting = rest;
  }
  const glowAlpha = new Uint8Array(n);
  for (const i of paleList) {
    if (!glowHas[i]) continue;
    const fr = 255 - glowSolid[i * 3], fg = 255 - glowSolid[i * 3 + 1], fb = 255 - glowSolid[i * 3 + 2];
    const span = fr * fr + fg * fg + fb * fb;
    if (span < NEAR_WHITE * NEAR_WHITE) continue;
    const a = ((255 - px[i * 4]) * fr + (255 - px[i * 4 + 1]) * fg + (255 - px[i * 4 + 2]) * fb) / span;
    if (a < 0.04) continue;
    glowAlpha[i] = Math.round(Math.min(1, a) * 255);
  }

  // 4. Un-blend: pixel = solid * a + white * (1 - a). Solve for a, then store the solid colour.
  for (let i = 0; i < n; i++) {
    if (pale[i]) {
      px[i * 4] = Math.round(glowSolid[i * 3]); px[i * 4 + 1] = Math.round(glowSolid[i * 3 + 1]); px[i * 4 + 2] = Math.round(glowSolid[i * 3 + 2]);
      px[i * 4 + 3] = glowAlpha[i];
      continue;
    }
    if (bg[i]) { px[i * 4 + 3] = 0; continue; }
    if (!depth[i]) continue;
    const fr = 255 - solid[i * 3], fg = 255 - solid[i * 3 + 1], fb = 255 - solid[i * 3 + 2];
    const span = fr * fr + fg * fg + fb * fb;
    if (span < NEAR_WHITE * NEAR_WHITE) {
      // A subject that is itself nearly white (the headphones) looks the same blended or
      // not, so it is left alone. A nearly white speck with no solid subject behind it is
      // leftover background, and goes.
      if (has[i] === 2) px[i * 4 + 3] = 0;
      continue;
    }
    const cr = 255 - px[i * 4], cg = 255 - px[i * 4 + 1], cb = 255 - px[i * 4 + 2];
    let a = (cr * fr + cg * fg + cb * fb) / span;
    a = a < 0.03 ? 0 : a > 0.97 ? 1 : a;
    px[i * 4] = Math.round(solid[i * 3]);
    px[i * 4 + 1] = Math.round(solid[i * 3 + 1]);
    px[i * 4 + 2] = Math.round(solid[i * 3 + 2]);
    px[i * 4 + 3] = Math.round(a * 255);
  }
  // 4c. Last, small near-white specks left on the outline. A real white part of the drawing
  //     (headphones, slippers) is a large area; a speck is a few pixels touching the outside.
  const SPECK = 220;
  const seen = new Uint8Array(n);
  const whiteish = (i) => px[i * 4 + 3] > 0 && lowest(i) >= 224;
  for (let start = 0; start < n; start++) {
    if (seen[start] || !whiteish(start)) continue;
    const group = [start];
    seen[start] = 1;
    let touchesOutside = false;
    for (let k = 0; k < group.length && group.length <= SPECK; k++) {
      for (const j of neighbours(group[k])) {
        if (j < 0) continue;
        if (px[j * 4 + 3] === 0) touchesOutside = true;
        else if (!seen[j] && whiteish(j)) { seen[j] = 1; group.push(j); }
      }
    }
    if (group.length <= SPECK && touchesOutside) for (const i of group) px[i * 4 + 3] = 0;
  }
  ctx.putImageData(image, 0, 0);

  // 5. Trim to what is left, and scale down if a maximum height was asked for.
  let left = w, right = 0, top = h, bottom = 0;
  for (let i = 0; i < n; i++) {
    if (px[i * 4 + 3] < 26) continue;
    const x = i % w;
    const y = (i - x) / w;
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < top) top = y;
    if (y > bottom) bottom = y;
  }
  const pad = 4;
  left = Math.max(0, left - pad); top = Math.max(0, top - pad);
  right = Math.min(w - 1, right + pad); bottom = Math.min(h - 1, bottom + pad);
  const cw = right - left + 1;
  const ch = bottom - top + 1;
  const scale = Math.min(1, maxH / ch);
  const out = document.createElement('canvas');
  out.width = Math.round(cw * scale);
  out.height = Math.round(ch * scale);
  const octx = out.getContext('2d');
  octx.imageSmoothingQuality = 'high';
  octx.drawImage(canvas, left, top, cw, ch, 0, 0, out.width, out.height);
  return { width: out.width, height: out.height, removed: Math.round((removed / n) * 100), png: out.toDataURL('image/png') };
};

const proc = spawn(browser, [
  '--headless=new', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${join(tmpdir(), 'portfolio-cut-out-profile')}`, 'about:blank',
]);
try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page');
    } catch {
      // the browser is still starting
    }
  }
  if (!target) throw new Error('Could not reach the browser on the debugging port.');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  const reply = new Promise((resolve) => { ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id === 1) resolve(d); }; });
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: { expression: `(${work})(${JSON.stringify(source)}, ${Number(maxHeight)})`, awaitPromise: true, returnByValue: true },
  }));
  const result = (await reply).result?.result?.value;
  if (!result) throw new Error('The browser did not return a picture.');
  writeFileSync(output, Buffer.from(result.png.split(',')[1], 'base64'));
  console.log(`${output}: ${result.width} × ${result.height}, ${result.removed}% of the picture removed as background`);
  ws.close();
} finally {
  proc.kill();
}
process.exit(0);
