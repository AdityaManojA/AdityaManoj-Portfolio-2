import { useLayoutEffect, useRef, useState } from 'react';
import { audio } from '../audio';
import { SKILLS } from '../content';
import { Icon } from '../icons';
import type { IconName } from '../icons';
import { useKeys } from '../input';
import { useNav } from '../nav';
import { Backdrop, Corners, KeyHints, ScreenTitle } from '../ui';
import { selection } from '../util';

// Challenge Series event board. Reference: "Challenge Series #1 - Tollbooth Time Trial" frame.
//   marker heading, a bracketed panel with the event glyph, name and goal line, a four-column grid
//   of event glyphs (selected one gold and framed) with a yellow scroll bar and "n/69" counter on
//   the left, and the event's map box on the right. Each event is one tool from the arsenal; the
//   map box shows that tool's logo and the rest of its series.

const GLYPHS: IconName[] = ['tollbooth', 'stopwatch', 'speedtrap', 'badge', 'moneybag', 'roadblock'];
const COLS = 4;

const EVENTS = SKILLS.flatMap((g, gi) =>
  g.items.map((s, si) => ({ ...s, category: g.category, group: gi, order: si, size: g.items.length, glyph: GLYPHS[gi % GLYPHS.length] })),
);

export default function ChallengeSeries() {
  const nav = useNav();
  const [sel, setSelState] = useState(() => selection.get('challenge') ?? 0);
  const gridRef = useRef<HTMLDivElement>(null);
  const ev = EVENTS[sel];
  const siblings = SKILLS[ev.group].items;

  const setSel = (i: number) => {
    selection.set('challenge', i);
    setSelState(i);
  };
  const move = (delta: number) => {
    const next = sel + delta;
    if (next < 0 || next >= EVENTS.length) return;
    audio.play('tick');
    setSel(next);
  };
  const back = () => { audio.play('back'); nav.back(); };

  useKeys({
    left: () => move(-1),
    right: () => move(1),
    up: () => move(-COLS),
    down: () => move(COLS),
    back,
  });

  useLayoutEffect(() => {
    gridRef.current?.querySelector('.is-sel')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  return (
    <div className="fe-screen cs-screen">
      <Backdrop dim />
      <ScreenTitle className="cs-title">challenge series</ScreenTitle>

      <section className="cs-panel" key={ev.name} aria-live="polite">
        <Corners className="is-white" />
        <div className="cs-panel-head">
          <Icon name={ev.glyph} />
          <h2>{ev.name}</h2>
        </div>
        <p>Clear this {ev.category} event: {ev.order + 1} of {ev.size} in the series.</p>
      </section>

      <div className="cs-main">
        <div className="cs-board">
          <div className="cs-scroll" aria-hidden="true">
            <button type="button" tabIndex={-1} onClick={() => move(-COLS)}>▲</button>
            <span><i style={{ top: `${(sel / Math.max(1, EVENTS.length - 1)) * 100}%` }} /></span>
            <button type="button" tabIndex={-1} onClick={() => move(COLS)}>▼</button>
          </div>
          <div className="cs-grid" ref={gridRef} role="listbox" aria-label="Events">
            {EVENTS.map((e, i) => (
              <button
                key={`${e.group}-${e.name}`}
                type="button"
                role="option"
                aria-selected={i === sel}
                className={`cs-cell ${i === sel ? 'is-sel' : ''}`}
                onClick={() => { audio.play('tick'); setSel(i); }}
                title={e.name}
                tabIndex={-1}
              >
                {i === sel && <Corners />}
                <Icon name={e.glyph} />
              </button>
            ))}
          </div>
          <div className="cs-count">{sel + 1}/{EVENTS.length}</div>
        </div>

        <aside className="cs-map">
          <div className="cs-map-head">{ev.category}</div>
          <div className="cs-map-body">
            <img src={ev.icon} alt="" className="cs-logo" loading="lazy" decoding="async" key={ev.icon} />
            <ol className="cs-route">
              {siblings.map((s, i) => (
                <li key={s.name} className={i === ev.order ? 'is-here' : ''}>{s.name}</li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      <KeyHints className="cs-keys" hints={[{ k: 'Esc', label: 'Back', onClick: back }, { k: '←→↑↓', label: 'Select Event' }]} />
    </div>
  );
}
