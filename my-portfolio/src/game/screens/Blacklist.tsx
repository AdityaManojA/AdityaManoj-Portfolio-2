import { useEffect, useState } from 'react';
import { audio } from '../audio';
import { asset } from '../assets';
import { PROJECTS } from '../content';
import type { Project } from '../content';
import { Icon } from '../icons';
import type { IconName } from '../icons';
import { useKeys } from '../input';
import { useNav } from '../nav';
import { Backdrop, Chevron, Corners, InkSplatter, KeyHints, ScreenTitle } from '../ui';
import { BLACKLIST_SIZE, openLink, selection } from '../util';

// Blacklist rival sheet. Reference: "blacklist 1 / Razor" and "blacklist 9 / Earl" frames.
//   marker heading "blacklist N" with the rival's name, portrait on the left with a red DEFEATED
//   stamp, a one-line quote, a bracketed stats table with yellow check marks, and an action
//   carousel at the bottom. Each rival is a project; #1 is the flagship.

const RIVALS = PROJECTS.slice(0, BLACKLIST_SIZE);

interface Action { key: string; label: string; icon: IconName; run: () => void }

const actionsFor = (p: Project): Action[] => {
  const out: Action[] = [];
  if (p.link) out.push({ key: 'race', label: 'Race Events', icon: 'raceevents', run: () => openLink(p.link!) });
  if (p.github) out.push({ key: 'source', label: 'View Source', icon: 'source', run: () => openLink(p.github!) });
  return out;
};

const shortName = (title: string) => title.split(/\s+[—-]\s+/)[0];

export default function Blacklist() {
  const nav = useNav();
  const [rival, setRivalState] = useState(() => selection.get('blacklist') ?? 0);
  const [action, setAction] = useState(0);
  const p = RIVALS[rival];
  const rank = rival + 1;
  const actions = actionsFor(p);

  const setRival = (i: number) => {
    selection.set('blacklist', i);
    setRivalState(i);
    setAction(0);
  };
  const changeRival = (dir: number) => {
    const next = rival + dir;
    if (next < 0 || next >= RIVALS.length) return;
    audio.play('tick');
    setRival(next);
  };
  const stepAction = (dir: number) => {
    if (actions.length < 2) return;
    audio.play('move');
    setAction(a => (a + dir + actions.length) % actions.length);
  };
  const accept = () => {
    const a = actions[action];
    if (!a) return;
    audio.play('accept');
    a.run();
  };
  const back = () => { audio.play('back'); nav.back(); };

  // Warm the neighbours' portraits so flicking through rivals never shows an empty frame.
  useEffect(() => {
    [rival - 1, rival + 1].forEach(i => {
      if (RIVALS[i]) new Image().src = asset(RIVALS[i].image);
    });
  }, [rival]);

  useKeys({
    up: () => changeRival(-1),
    down: () => changeRival(1),
    left: () => stepAction(-1),
    right: () => stepAction(1),
    accept,
    back,
  });


  return (
    <div className="fe-screen bl-screen">
      <Backdrop dim />
      <header className="bl-head">
        <div>
          <ScreenTitle>blacklist {rank}</ScreenTitle>
          <div className="bl-name"><Icon name="badge" /> {shortName(p.title)}</div>
        </div>
        <div className="bl-bounty">Rival: <b>{rank} / {RIVALS.length}</b></div>
      </header>

      <div className="bl-body" key={p.title}>
        <figure className="bl-portrait">
          <img src={asset(p.image)} alt={p.title} decoding="async" />
          {p.link && <span className="bl-stamp">Defeated</span>}
        </figure>

        <div className="bl-side">
          <p className="bl-quote">{p.description}</p>
          <div className="bl-table">
            <Corners className="is-white" />
            <div className="bl-row bl-row-head"><span /><span>Record</span></div>
            <div className="bl-row"><Icon name="check" /><span>Year</span><b>{p.year}</b></div>
            <div className="bl-row"><Icon name="check" /><span>Class</span><b>{p.category}</b></div>
            <div className="bl-row"><Icon name="check" /><span>Build</span><b>{p.tags.slice(0, 3).join(' · ')}</b></div>
          </div>
        </div>
      </div>

      <div className="bl-foot">
        <InkSplatter className="bl-ink" />
        <div className="bl-actions">
          <div className="fe-strip">
            <Chevron dir="left" label="Previous action" onClick={() => stepAction(-1)} />
            {actions.map((a, i) => (
              <button
                key={a.key}
                type="button"
                className={`fe-icon ${i === action ? 'is-active' : 'fe-off1'}`}
                onClick={() => (i === action ? accept() : setAction(i))}
                aria-label={a.label}
                tabIndex={-1}
              >
                {i === action && <Corners />}
                <Icon name={a.icon} />
                {i === action && <span className="fe-name">{a.label}</span>}
              </button>
            ))}
            <Chevron dir="right" label="Next action" onClick={() => stepAction(1)} />
          </div>
        </div>
        <KeyHints
          className="bl-keys"
          hints={[
            { k: 'Esc', label: 'Back', onClick: back },
            { k: '↵', label: 'Accept', onClick: accept },
            { k: '↑↓', label: 'Rival', onClick: () => changeRival(rival + 1 < RIVALS.length ? 1 : -rival) },
          ]}
        />
      </div>
    </div>
  );
}
