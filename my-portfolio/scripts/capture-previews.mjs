// Records a short scrolling preview video of each live project site, and the screenshot
// that the video plays over.
//
// For every entry in SITES it opens the page in headless Edge/Chrome and:
//   1. saves the page as it first appears to public/ProjectImages/<name>.png (2560 × 1600);
//   2. scrolls slowly from the top, saving one frame per step, and encodes the frames with
//      ffmpeg to public/ProjectImages/previews/<name>.mp4 (960px wide, silent).
// The screenshot and the video's first frame are the same capture, so when a tile starts
// playing nothing jumps or rescales. Run scripts/optimize-images.sh afterwards.
//
//   node scripts/capture-previews.mjs            record every site
//   node scripts/capture-previews.mjs GLIA Levern  record only these
//
// Needs Node 22+ (built-in WebSocket), ffmpeg, and Edge or Chrome. Set BROWSER to the
// executable path if it is not found. Talks to the browser over the DevTools protocol
// directly, so there is nothing to npm install.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// name = the screenshot's file name in public/ProjectImages, without the extension.
const SITES = [
  ['Threadpath', 'https://threadpathcollective.ca/'],
  ['Whisky', 'https://thewhiskybusiness.in/'],
  ['Pixel Spaces', 'https://pixelspaces.web.app/'],
  ['Indzita', 'https://indzitabio.web.app/'],
  ['SBAFA', 'https://sbafa-ft.web.app/landing'],
  ['CsvtoJson', 'https://csv-to-jsonconv.netlify.app/'],
  // Not recorded: GLIA and Levern open on a sign-in screen, TerraCove's demo opens behind
  // a welcome tour, and Retro QR Crafter is a single static screen, so a video would show
  // nothing the screenshot does not. A site can take { click: ['Button text', ...] } as a
  // third item to press buttons before recording.
];

const WIDTH = 1280;
const HEIGHT = 800;
const FPS = 24;
const HOLD_START = 14; // frames held at the top before scrolling
const SCROLL = 84; // frames spent scrolling
const HOLD_END = 12; // frames held at the bottom
const MAX_SCROLL = 2600; // px; long pages are not scrolled to the very end
const PORT = 9333;

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imageDir = join(root, 'public', 'ProjectImages');
const outDir = join(imageDir, 'previews');
const work = join(tmpdir(), 'portfolio-previews');

const browser =
  process.env.BROWSER ??
  [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find(existsSync);
if (!browser) throw new Error('No browser found. Set BROWSER to an Edge or Chrome executable.');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Minimal DevTools protocol client: send a command, await its result or an event. */
async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let nextId = 1;
  const pending = new Map();
  const waiters = new Map();
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(new Error(data.error.message));
      else resolve(data.result);
    } else if (data.method && waiters.has(data.method)) {
      waiters.get(data.method)();
      waiters.delete(data.method);
    }
  };
  return {
    send(method, params = {}) {
      const id = nextId++;
      ws.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    once(method, timeout) {
      return Promise.race([new Promise((resolve) => waiters.set(method, resolve)), sleep(timeout)]);
    },
    close: () => ws.close(),
  };
}

async function record(page, name, url, options = {}) {
  const frames = join(work, name.replace(/\W+/g, '_'));
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });

  const loaded = page.once('Page.loadEventFired', 30000);
  await page.send('Page.navigate', { url });
  await loaded;
  await sleep(4500); // loaders, fonts, entrance animations

  const evaluate = async (expression) =>
    (await page.send('Runtime.evaluate', { expression, returnByValue: true })).result.value;

  // Buttons or links to press first, matched by their text, in order.
  for (const label of options.click ?? []) {
    await evaluate(`(() => {
      const el = [...document.querySelectorAll('button, a')].find((e) => e.textContent.trim().startsWith(${JSON.stringify(label)}));
      if (el) el.click();
    })()`);
    await sleep(3000);
  }

  // Most pages scroll the document. App-style pages scroll an inner panel instead, so
  // pick whichever element has the most to scroll and drive that.
  const scrollable = await evaluate(`(() => {
    const doc = document.scrollingElement;
    let best = doc, most = doc.scrollHeight - window.innerHeight;
    for (const el of document.querySelectorAll('*')) {
      const room = el.scrollHeight - el.clientHeight;
      if (room > most + 40 && /auto|scroll/.test(getComputedStyle(el).overflowY)) { best = el; most = room; }
    }
    window.__previewScroller = best;
    return most;
  })()`);
  const distance = Math.max(0, Math.min(scrollable, MAX_SCROLL));

  // The tile's screenshot: the exact state the video starts from.
  await evaluate('window.__previewScroller.scrollTop = 0');
  await sleep(300);
  const poster = await page.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(imageDir, `${name}.png`), Buffer.from(poster.data, 'base64'));

  const total = HOLD_START + SCROLL + HOLD_END;
  for (let i = 0; i < total; i++) {
    const t = Math.min(1, Math.max(0, (i - HOLD_START) / SCROLL));
    await evaluate(`window.__previewScroller.scrollTop = ${Math.round(distance * easeInOut(t))}`);
    await sleep(45);
    const shot = await page.send('Page.captureScreenshot', { format: 'jpeg', quality: 84 });
    writeFileSync(join(frames, `${String(i).padStart(4, '0')}.jpg`), Buffer.from(shot.data, 'base64'));
  }

  const out = join(outDir, `${name}.mp4`);
  const ff = spawnSync(
    'ffmpeg',
    ['-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', join(frames, '%04d.jpg'),
      '-vf', 'scale=960:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out],
    { stdio: 'inherit' },
  );
  if (ff.status !== 0) throw new Error(`ffmpeg failed for ${name}`);
  console.log(`${name}: screenshot + ${distance}px scroll -> ${name}.png, previews/${name}.mp4`);
}

const only = process.argv.slice(2);
const sites = only.length ? SITES.filter(([name]) => only.includes(name)) : SITES;
mkdirSync(outDir, { recursive: true });
mkdirSync(work, { recursive: true });

const proc = spawn(browser, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(work, 'profile')}`,
  `--window-size=${WIDTH},${HEIGHT}`, 'about:blank',
]);

try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      target = list.find((t) => t.type === 'page');
    } catch {
      // the browser is still starting
    }
  }
  if (!target) throw new Error('Could not reach the browser on the debugging port.');

  const page = await connect(target.webSocketDebuggerUrl);
  await page.send('Page.enable');
  await page.send('Emulation.setDeviceMetricsOverride', {
    // 2x: sharp enough for the screenshot. ffmpeg scales the frames down for the video.
    width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: false,
  });
  for (const [name, url, options] of sites) {
    try {
      await record(page, name, url, options);
    } catch (error) {
      console.error(`${name}: FAILED - ${error.message}`);
    }
  }
  page.close();
} finally {
  proc.kill();
}
