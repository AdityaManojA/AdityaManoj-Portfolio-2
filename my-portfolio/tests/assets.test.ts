import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GLYPH_FILES } from '../src/game/assets';
import { GALLERY, LINKS, PROFILE, PROJECTS, SERVICES, SKILLS } from '../src/game/content';

// Integrity: every file the app references must ship in public/, and the content must be shaped
// the way the screens expect.

const PUBLIC = join(__dirname, '..', 'public');
const SRC = join(__dirname, '..', 'src', 'game');
const exists = (rel: string) => existsSync(join(PUBLIC, rel));

describe('content files exist', () => {
  it('project, gallery and profile images', () => {
    const missing = [...PROJECTS.map(p => p.image), ...GALLERY.map(g => g.image), PROFILE.avatar, PROFILE.photo, LINKS.cv].filter(f => !exists(f));
    expect(missing).toEqual([]);
  });

  it('game media: intro, theme, backgrounds, loader', () => {
    for (const f of ['nfsmw/intro.mp4', 'nfsmw/menu-theme.mp3', 'nfsmw/main-menu.webp', 'nfsmw/background.webp', 'nfsmw/loading-lamps.webp']) {
      expect(exists(f), f).toBe(true);
    }
  });

  it('every sound effect named in audio.ts', () => {
    const src = readFileSync(join(SRC, 'audio.ts'), 'utf8');
    const files = [...src.matchAll(/'(nfsmw\/sfx\/[^']+)'/g)].map(m => m[1]);
    expect(files.length).toBeGreaterThan(0);
    expect(files.filter(f => !exists(f))).toEqual([]);
  });

  it('every game glyph', () => {
    expect(GLYPH_FILES.length).toBeGreaterThan(10);
    expect(GLYPH_FILES.filter(f => !exists(`nfsmw/icons/${f}.webp`))).toEqual([]);
  });

  it('pre-rendered ink and loader lamps', () => {
    expect(exists('nfsmw/ink.webp')).toBe(true);
    expect(exists('nfsmw/loading-lamps.webp')).toBe(true);
  });

  it('the favicon named in index.html', () => {
    const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
    const icon = html.match(/rel="icon"[^>]*href="\.\/([^"]+)"/)?.[1];
    expect(icon).toBe('Aditya.svg');
    expect(exists(icon!)).toBe(true);
  });

  it('hosting lets the CDN cache media, so phones get byte ranges for the intro', () => {
    // With Cache-Control: no-cache Firebase streams media from the origin without Range support,
    // and iPhones refuse to play the video (the intro then errors straight to the menu).
    const cfg = JSON.parse(readFileSync(join(__dirname, '..', 'firebase.json'), 'utf8'));
    const rules: { source: string; headers: { key: string; value: string }[] }[] = cfg.hosting.headers;
    const media = rules.find(r => r.source === '**')!.headers.find(h => h.key === 'Cache-Control')!.value;
    expect(media).not.toMatch(/no-cache|no-store|private/);
    expect(media).toMatch(/s-maxage=\d+/);
  });

  it('no stray files are shipped from public/', () => {
    const top = readdirSync(PUBLIC);
    expect(top.filter(f => f.startsWith('__'))).toEqual([]);
  });
});

describe('content shape', () => {
  it('has at least 15 projects for the Blacklist and 5 for Top 5 Pursuits', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(15);
  });

  it('every project has a title, year, description and at least one tag', () => {
    for (const p of PROJECTS) {
      expect(p.title.trim().length, p.title).toBeGreaterThan(0);
      expect(p.year).toMatch(/^\d{4}$/);
      expect(p.description.length, p.title).toBeGreaterThan(20);
      expect(p.tags.length, p.title).toBeGreaterThan(0);
    }
  });

  it('links are absolute https or mailto', () => {
    for (const p of PROJECTS) for (const l of [p.link, p.github]) if (l) expect(l).toMatch(/^https:\/\//);
    expect(LINKS.email).toMatch(/^mailto:/);
    expect(LINKS.linkedin).toMatch(/^https:\/\//);
    expect(LINKS.github).toMatch(/^https:\/\//);
  });

  it('services and skills are non-empty', () => {
    expect(SERVICES.length).toBeGreaterThan(0);
    expect(SKILLS.every(g => g.items.length > 0)).toBe(true);
  });
});
