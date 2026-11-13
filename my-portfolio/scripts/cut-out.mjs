// Removes the plain white background from a picture and saves it as a transparent PNG,
// trimmed to the subject.
//
// It floods inward from the picture's edges through near-white pixels only, so white that
// is enclosed by the drawing (headphones, slippers, eye highlights) is kept. Pixels on the
// edge of the subject are faded by how white they are, which removes the pale fringe.
//
//   node scripts/cut-out.mjs <input image> <output.png> [max height, default 720]
//
// Needs Node 22+ and Edge or Chrome (the browser's canvas does the pixel work, so there is
// nothing to npm install).

import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';

const [input, output, maxHeight = '720'] = process.argv.slice(2);
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

// Runs in the page. WHITE is how bright a pixel's darkest channel must be to count as
// background; FADE is where the edge fade starts.
const work = async (src, maxH) => {
  const WHITE = 236;
  const FADE = 205;
  const img = new Image();
  img.src = src;
  await img.decode();
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const image = ctx.getImageData(0, 0, w, h);
  const px = image.data;
  const lowest = (i) => Math.min(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]);

  // Flood from every edge pixel through near-white pixels.
  const bg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;
  const visit = (i) => {
    if (!bg[i] && lowest(i) >= WHITE) {
      bg[i] = 1;
      queue[tail++] = i;
    }
  };
  for (let x = 0; x < w; x++) { visit(x); visit((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { visit(y * w); visit(y * w + w - 1); }
  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    if (x > 0) visit(i - 1);
    if (x < w - 1) visit(i + 1);
    if (i >= w) visit(i - w);
    if (i < w * (h - 1)) visit(i + w);
  }

  // Distance (up to 3px) from the background, for the edge fade.
  const near = new Uint8Array(w * h);
  let ring = [];
  for (let i = 0; i < w * h; i++) if (bg[i]) ring.push(i);
  for (let d = 1; d <= 3; d++) {
    const next = [];
    for (const i of ring) {
      const x = i % w;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) {
        if (j >= 0 && j < w * h && !bg[j] && !near[j]) { near[j] = d; next.push(j); }
      }
    }
    ring = next;
  }

  let left = w, right = 0, top = h, bottom = 0;
  for (let i = 0; i < w * h; i++) {
    if (bg[i]) { px[i * 4 + 3] = 0; continue; }
    if (near[i]) {
      // The whiter an edge pixel is, the more of the old background is mixed into it.
      const keep = Math.max(0, Math.min(1, (255 - lowest(i)) / (255 - FADE)));
      px[i * 4 + 3] = Math.round(255 * keep);
      if (keep < 0.15) continue;
    }
    const x = i % w;
    const y = (i - x) / w;
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < top) top = y;
    if (y > bottom) bottom = y;
  }
  ctx.putImageData(image, 0, 0);

  const pad = 6;
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
  return { width: out.width, height: out.height, removed: Math.round((tail / (w * h)) * 100), png: out.toDataURL('image/png') };
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
