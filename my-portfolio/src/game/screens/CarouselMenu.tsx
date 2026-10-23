import { useState } from 'react';
import type { ReactNode } from 'react';
import { audio } from '../audio';
import { Icon } from '../icons';
import type { IconName } from '../icons';
import { useKeys, useTouchScreen } from '../input';
import type { KeyHandlers } from '../input';
import { useSceneArt } from '../assets';
import { useNav } from '../nav';
import { Backdrop, Chevron, Corners, InfoPanel, InkSplatter, KeyHints, PlayerTag, ScreenTitle } from '../ui';
import type { Hint } from '../ui';
import { selection } from '../util';

// The game's carousel menu, used by the main menu, Services, Contact and Settings.
// Reference: main menu and Safe House footage (see docs/REFERENCES.md):
//   «« [previous] [selected, orange corner brackets] [next] [next, smaller] »»
//   label under the selected icon, marker heading above, info box beside it in the Safe House.

export interface CarouselItem {
  key: string;
  label: string;
  icon: IconName;
  /** Rows for the info panel shown while this item is selected. */
  info?: [string, ReactNode][];
  /** One line under the label. */
  note?: ReactNode;
  onAccept: () => void;
}

interface Props {
  id: string;
  title: string;
  items: CarouselItem[];
  hints?: Hint[];
  keys?: KeyHandlers;
  /** Root menu: shows the player tag and has no Back. */
  root?: boolean;
}

export default function CarouselMenu({ id, title, items, hints = [], keys = {}, root = false }: Props) {
  const nav = useNav();
  const touch = useTouchScreen();
  const { isScene } = useSceneArt();
  const [index, setIndexState] = useState(() => Math.min(selection.get(id) ?? 0, items.length - 1));
  const n = items.length;
  const wrap = (i: number) => (i + n) % n;
  const item = items[index];

  const setIndex = (i: number) => {
    selection.set(id, i);
    setIndexState(i);
  };
  const step = (dir: number) => {
    audio.play('move');
    setIndex(wrap(index + dir));
  };
  const accept = (i = index) => {
    if (i !== index) setIndex(i);
    audio.play('accept');
    items[i].onAccept();
  };
  const back = () => {
    audio.play('back');
    nav.back();
  };

  useKeys({
    left: () => step(-1),
    right: () => step(1),
    accept: () => accept(),
    ...(root ? {} : { back }),
    ...keys,
  });

  // Every menu shows how to open the selected entry, so visitors who don't know the game can find
  // their way: an Open prompt, plus a plain help line under the carousel.
  const open: Hint = { k: '↵', label: 'Open', onClick: () => accept() };
  const baseHints: Hint[] = root ? [open] : [{ k: 'Esc', label: 'Back', onClick: back }, open];
  const help = touch
    ? 'Tap an icon to choose it, tap it again to open'
    : 'Use ← → or click an icon to choose · Enter or click again to open';

  const neighbour = (off: number) => {
    const i = wrap(index + off);
    return (
      <button
        key={`${items[i].key}:${off}`}
        type="button"
        className={`fe-icon fe-off${off}`}
        onClick={() => { audio.play('move'); setIndex(i); }}
        aria-label={items[i].label}
        tabIndex={-1}
      >
        <Icon name={items[i].icon} />
      </button>
    );
  };

  // Earlier entries show as grey dots, nearer one larger, exactly as the game draws them.
  const dot = (off: number) => {
    const i = wrap(index + off);
    return (
      <button
        key={`dot:${off}`}
        type="button"
        className={`fe-dot fe-dot${off}`}
        onClick={() => { audio.play('move'); setIndex(i); }}
        aria-label={items[i].label}
        tabIndex={-1}
      />
    );
  };

  return (
    <div className={`fe-screen fe-carousel-screen ${root ? 'is-root' : ''} ${isScene ? 'has-scene' : 'has-poster'}`}>
      <Backdrop />
      <div className="fe-layout">
        <InkSplatter />
        {item.info && <InfoPanel rows={item.info} key={`info-${item.key}`} />}
        <nav className="fe-carousel" aria-label={title}>
          <ScreenTitle>{title}</ScreenTitle>
          <div className="fe-strip">
            <Chevron dir="left" onClick={() => step(-1)} />
            {n > 3 && dot(-2)}
            {n > 2 && dot(-1)}
            <button
              key={item.key}
              type="button"
              className="fe-icon is-active"
              onClick={() => accept()}
              aria-label={item.label}
              aria-current="true"
              tabIndex={-1}
            >
              <Corners />
              <Icon name={item.icon} />
              <span className="fe-name">{item.label}</span>
            </button>
            {n > 1 && neighbour(1)}
            {n > 3 && neighbour(2)}
            <Chevron dir="right" onClick={() => step(1)} />
          </div>
          <div className="fe-label" aria-live="polite">
            <div className="fe-notes">
              {items.map((it, i) => it.note && (
                <span key={it.key} className="fe-label-note" aria-hidden={i !== index}>{it.note}</span>
              ))}
            </div>
          </div>
          <p className="fe-help">{help}</p>
        </nav>
        <div className="fe-foot">
          {root && <PlayerTag />}
          <KeyHints hints={[...hints.filter(h => h.k !== '↵'), ...baseHints].sort(hintOrder)} />
        </div>
      </div>
    </div>
  );
}

// Prompts read Quit, Back, Open, then numbered extras, as in the game.
const ORDER = ['Q', 'Esc', '↵', '1', '2', '3'];
const hintOrder = (a: Hint, b: Hint) => ORDER.indexOf(a.k) - ORDER.indexOf(b.k);
