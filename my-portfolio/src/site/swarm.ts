// The "agent swarm" build animation: a handful of labelled cursors assemble a page section by
// section. Each element marked with data-b="type" (typed in) or data-b="fade" (faded in) is a
// layer; a section's layers start building when its first layer scrolls into view.

export const AGENTS: ReadonlyArray<readonly [name: string, color: string]> = [
  ['Layout', '#9b8cff'],
  ['Type', '#5eead4'],
  ['Copy', '#ffb86b'],
  ['Image', '#ff8fb1'],
  ['Motion', '#7cc4ff'],
  ['Review', '#f5e16b'],
];

export interface SwarmUi {
  /** Fixed, viewport-sized element the cursors are drawn in. */
  overlay: HTMLElement;
  /** Receives the "n of N layers" status text. */
  status: HTMLElement;
  /** Its width is set to the build progress percentage. */
  progress: HTMLElement;
}

export interface Swarm {
  replay(): void;
  destroy(): void;
}

interface Layer {
  el: HTMLElement;
  typed: boolean;
  nodes: { node: Text; text: string }[];
  total: number;
  shown: number;
  agent: number;
  start: number;
  markAt: number;
  done: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  frame: HTMLDivElement;
  badge: HTMLElement;
  mark: HTMLSpanElement;
}

interface Section {
  layers: Layer[];
  started: boolean;
}

interface Cursor {
  el: HTMLDivElement;
  x: number;
  y: number;
  fx: number;
  fy: number;
  nextMove: number;
  working: boolean;
}

const GROW = 0.6; // seconds a selection frame takes to drag out
const FILL = 1.1; // seconds to type or fade the content in
const FADE = 0.4; // seconds for the frame to dissolve afterwards
const STAGGER = 0.42; // delay between consecutive layers in a section

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

function setTyped(layer: Layer, count: number) {
  let left = count;
  for (const part of layer.nodes) {
    part.node.nodeValue = part.text.slice(0, Math.max(0, left));
    left -= part.text.length;
  }
  layer.shown = count;
}

export function createSwarm(root: HTMLElement, ui: SwarmUi): Swarm {
  const sectionEls = Array.from(root.querySelectorAll<HTMLElement>('.sec'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Without motion there is nothing to build: show the finished page.
  if (reduced) {
    root.classList.add('static');
    const count = root.querySelectorAll('[data-b]').length;
    ui.status.textContent = `${AGENTS.length} agents · ${count} of ${count} layers · Built`;
    ui.progress.style.width = '100%';
    return {
      replay() {},
      destroy() {
        root.classList.remove('static');
      },
    };
  }

  const layers: Layer[] = [];
  const sections: Section[] = [];
  const sectionOf = new Map<Element, Section>();
  let index = 0;

  for (const sectionEl of sectionEls) {
    const section: Section = { layers: [], started: false };
    for (const el of Array.from(sectionEl.querySelectorAll<HTMLElement>('[data-b]'))) {
      const typed = el.dataset.b === 'type';
      const nodes: Layer['nodes'] = [];
      if (typed) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = n.nodeValue ?? '';
          if (text.trim()) nodes.push({ node: n as Text, text });
        }
      }
      const agent = index % AGENTS.length;

      const frame = document.createElement('div');
      frame.className = 'sel';
      frame.innerHTML =
        '<i style="left:0;top:0"></i><i style="left:100%;top:0"></i>' +
        '<i style="left:0;top:100%"></i><i style="left:100%;top:100%"></i><span class="bd"></span>';
      root.appendChild(frame);

      const mark = document.createElement('span');
      mark.className = 'mk';
      mark.textContent = index % 2 ? '×' : '+';
      mark.style.color = AGENTS[agent][1];
      root.appendChild(mark);

      const layer: Layer = {
        el,
        typed,
        nodes,
        total: nodes.reduce((sum, part) => sum + part.text.length, 0),
        shown: -1,
        agent,
        start: Infinity,
        markAt: 0,
        done: false,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        frame,
        badge: frame.querySelector<HTMLElement>('.bd')!,
        mark,
      };
      section.layers.push(layer);
      layers.push(layer);
      index++;
    }
    if (section.layers.length) {
      sections.push(section);
      sectionOf.set(section.layers[0].el, section);
    }
  }

  const cursors: Cursor[] = AGENTS.map(([name, color], j) => {
    const el = document.createElement('div');
    el.className = 'cu';
    el.innerHTML =
      `<svg width="16" height="16" viewBox="0 0 15 15"><path d="M1.5 1.5v11l3.4-3 2.4 4.4 2-1-2.3-4.3 4.5-.3z" fill="${color}" stroke="#0a0a0b" stroke-width="1"/></svg>` +
      `<span style="background:${color}">${name}</span>`;
    ui.overlay.appendChild(el);
    return {
      el,
      x: window.innerWidth * (0.15 + j * 0.14),
      y: window.innerHeight * 0.5,
      fx: rnd(0.08, 0.9),
      fy: rnd(0.15, 0.8),
      nextMove: 0,
      working: false,
    };
  });

  function startSection(section: Section) {
    if (section.started) return;
    section.started = true;
    const base = root.getBoundingClientRect();
    const now = performance.now() / 1000;
    section.layers.forEach((layer, k) => {
      const r = layer.el.getBoundingClientRect();
      layer.x = r.left - base.left;
      layer.y = r.top - base.top;
      layer.w = r.width;
      layer.h = r.height;
      layer.frame.style.left = layer.mark.style.left = `${layer.x}px`;
      layer.frame.style.top = layer.mark.style.top = `${layer.y}px`;
      layer.markAt = now + 0.06 * k;
      layer.start = now + 0.55 + k * STAGGER;
      if (layer.typed) {
        // Hold the box open so the page does not reflow while the text is typed in.
        layer.el.style.minHeight = `${layer.h}px`;
        setTyped(layer, 0);
        layer.el.style.opacity = '1';
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const section = sectionOf.get(entry.target);
        if (entry.isIntersecting && section) startSection(section);
      }
    },
    { rootMargin: '0px 0px -22% 0px' },
  );

  let armTimer = 0;
  function arm() {
    // Wait for the page loader to clear, or the first section would build unseen behind it.
    if (document.documentElement.classList.contains('loader-active')) {
      armTimer = window.setTimeout(arm, 120);
      return;
    }
    for (const section of sections) observer.observe(section.layers[0].el);
  }

  function restore(layer: Layer) {
    layer.start = Infinity;
    layer.done = false;
    layer.el.style.opacity = '';
    layer.el.style.minHeight = '';
    if (layer.typed) setTyped(layer, layer.total);
    layer.shown = -1;
    layer.frame.style.opacity = '0';
    layer.mark.style.opacity = '0';
  }

  function replay() {
    window.clearTimeout(armTimer);
    observer.disconnect();
    for (const section of sections) section.started = false;
    layers.forEach(restore);
    window.scrollTo(0, 0);
    armTimer = window.setTimeout(arm, 60);
  }

  let lastScroll = window.scrollY;
  let raf = 0;

  function frame() {
    const now = performance.now() / 1000;
    const base = root.getBoundingClientRect();
    const targets: ([number, number] | null)[] = cursors.map(() => null);
    let done = 0;
    let started = 0;

    for (const layer of layers) {
      if (layer.done) {
        done++;
        started++;
        continue;
      }
      if (layer.start === Infinity) continue;
      started++;

      const u = now - layer.start;
      let w = 0;
      let h = 0;
      let frameOpacity = 0;
      let progress = 0;
      let filling = false;
      if (u >= 0 && u < GROW) {
        const e = easeOut(u / GROW);
        w = layer.w * e;
        h = layer.h * e;
        frameOpacity = 1;
      } else if (u >= GROW && u < GROW + FILL) {
        w = layer.w;
        h = layer.h;
        frameOpacity = 1;
        progress = (u - GROW) / FILL;
        filling = true;
      } else if (u >= GROW + FILL) {
        w = layer.w;
        h = layer.h;
        frameOpacity = Math.max(0, 1 - (u - GROW - FILL) / FADE);
        progress = 1;
        filling = true;
      }

      layer.frame.style.opacity = String(frameOpacity);
      layer.frame.style.width = `${w.toFixed(1)}px`;
      layer.frame.style.height = `${h.toFixed(1)}px`;
      layer.badge.textContent = `${Math.round(w)} × ${Math.round(h)}`;
      layer.mark.style.opacity = u < 0 && now > layer.markAt ? '1' : '0';

      if (layer.typed) {
        const count = Math.round(progress * layer.total);
        if (count !== layer.shown) setTyped(layer, count);
      } else {
        layer.el.style.opacity = filling ? Math.min(1, progress * 2).toFixed(2) : '0';
      }

      if (u > -0.6) {
        targets[layer.agent] =
          u < 0
            ? [base.left + layer.x, base.top + layer.y]
            : [base.left + layer.x + w, base.top + layer.y + h];
      }

      if (u >= GROW + FILL + FADE) {
        layer.done = true;
        layer.frame.style.opacity = '0';
        if (layer.typed) setTyped(layer, layer.total);
        layer.el.style.opacity = '1';
      }
    }

    // Cursors live in the viewport. A working cursor is pinned to its element, so it moves
    // with the page; an idle one stays put, gives a little with the scroll, and now and then
    // glides somewhere new.
    const scrolled = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    cursors.forEach((cursor, j) => {
      const target = targets[j];
      if (target) {
        if (cursor.working) cursor.y -= scrolled;
        cursor.working = true;
        cursor.x += (target[0] - cursor.x) * 0.14;
        cursor.y += (target[1] - cursor.y) * 0.14;
      } else {
        if (cursor.working) {
          cursor.working = false;
          cursor.nextMove = now + rnd(0.4, 1.2);
        }
        if (now > cursor.nextMove) {
          cursor.fx = rnd(0.06, 0.9);
          cursor.fy = rnd(0.14, 0.82);
          cursor.nextMove = now + rnd(2.4, 5);
        }
        cursor.y -= scrolled * 0.18;
        const gx = cursor.fx * window.innerWidth + Math.sin(now * 0.6 + j) * 14;
        const gy = cursor.fy * window.innerHeight + Math.cos(now * 0.8 + j * 2) * 11;
        cursor.x += (gx - cursor.x) * 0.035;
        cursor.y += (gy - cursor.y) * 0.035;
      }
      cursor.el.style.transform = `translate(${cursor.x.toFixed(1)}px,${cursor.y.toFixed(1)}px)`;
    });

    const total = layers.length;
    const state = done < started ? 'Building' : done < total ? 'Scroll to keep building' : 'Built';
    ui.status.textContent = `${AGENTS.length} agents · ${done} of ${total} layers · ${state}`;
    ui.progress.style.width = `${total ? Math.round((done / total) * 100) : 100}%`;

    raf = requestAnimationFrame(frame);
  }

  arm();
  raf = requestAnimationFrame(frame);

  return {
    replay,
    destroy() {
      cancelAnimationFrame(raf);
      window.clearTimeout(armTimer);
      observer.disconnect();
      for (const layer of layers) {
        restore(layer);
        layer.frame.remove();
        layer.mark.remove();
      }
      for (const cursor of cursors) cursor.el.remove();
    },
  };
}
