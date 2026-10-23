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

// Blacklist, copied from in-game captures (media-src/game-captures/10.webp and 8.webp).
//
// Rival page: yellow up/down chevrons beside "blacklist N", the rival's name under it, a striped
// value box top-right, the portrait large on the left with a red DEFEATED stamp, a short
// right-aligned quote, a bracketed table with an orange "Target" header and orange values, and the
// action carousel (Race Events, Milestones) with only [Esc] Back.
//
// Bio page ([2]): "Ride:" and "Strength:" with blackletter labels, a bracketed "bio:" block with
// the full write-up, portrait on the right.
//
// Each rival is a project; #1 is the flagship.

const RIVALS = PROJECTS.slice(0, BLACKLIST_SIZE);

interface Action { key: string; label: string; icon: IconName; run: () => void }

const actionsFor = (p: Project): Action[] => {
  const out: Action[] = [];
  if (p.link) out.push({ key: 'race', label: 'Race Events', icon: 'raceevents', run: () => openLink(p.link!) });
  if (p.github) out.push({ key: 'source', label: 'View Source', icon: 'milestones', run: () => openLink(p.github!) });
  return out;
};

const shortName = (title: string) => title.split(/\s+[—-]\s+/)[0];
const subtitle = (title: string) => title.split(/\s+[—-]\s+/)[1] ?? '';
const firstSentence = (text: string) => (text.match(/^.*?[.!?](\s|$)/)?.[0] ?? text).trim();

export default function Blacklist() {
  const nav = useNav();
  const [rival, setRivalState] = useState(() => selection.get('blacklist') ?? 0);
  const [action, setAction] = useState(0);
  const [bio, setBio] = useState(false);
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
  const toggleBio = () => { audio.play(bio ? 'back' : 'accept'); setBio(b => !b); };
  const back = () => {
    audio.play('back');
    if (bio) setBio(false);
    else nav.back();
  };

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
    '2': toggleBio,
  });

  const title = (
    <div className="bl-title">
      <div className="bl-updown">
        <button type="button" className="bl-ud is-up" onClick={() => changeRival(-1)} aria-label="Previous rival" tabIndex={-1} disabled={rival === 0} />
        <button type="button" className="bl-ud is-down" onClick={() => changeRival(1)} aria-label="Next rival" tabIndex={-1} disabled={rival === RIVALS.length - 1} />
      </div>
      <div>
        <ScreenTitle>blacklist {rank}</ScreenTitle>
        <div className="bl-name">
          {shortName(p.title)}
          {bio && subtitle(p.title) && <em>{subtitle(p.title)}</em>}
        </div>
      </div>
    </div>
  );

  if (bio) {
    return (
      <div className="fe-screen bl-screen is-bio">
        <Backdrop dim />
        <header className="bl-head">{title}</header>
        <div className="bl-bio" key={`bio-${p.title}`}>
          <div className="bl-bio-text">
            <div className="bl-fact"><span>Ride:</span>{p.tags.slice(0, 3).join(', ')}</div>
            <div className="bl-fact"><span>Strength:</span>{p.category}, {p.year}</div>
            <section className="bl-bio-block">
              <Corners className="is-white" />
              <h2>bio:</h2>
              <p>{p.description}</p>
            </section>
          </div>
          <figure className="bl-bio-portrait">
            <img src={asset(p.image)} alt={p.title} decoding="async" />
          </figure>
        </div>
        <KeyHints
          className="bl-keys"
          hints={[
            { k: 'Esc', label: 'Back', onClick: back },
            ...(p.link ? [{ k: '↵', label: 'Race Events', onClick: () => { audio.play('accept'); openLink(p.link!); } }] : []),
          ]}
        />
      </div>
    );
  }

  return (
    <div className="fe-screen bl-screen">
      <Backdrop dim />
      <header className="bl-head">
        {title}
        <div className="bl-bounty"><span>Rank:</span> {rank} / {RIVALS.length}</div>
      </header>

      <div className="bl-body" key={p.title}>
        <figure className="bl-portrait">
          <InkSplatter className="bl-portrait-ink" />
          <img src={asset(p.image)} alt={p.title} decoding="async" />
          {p.link && <span className="bl-stamp">Defeated</span>}
        </figure>

        <div className="bl-side">
          <p className="bl-quote">{firstSentence(p.description)}</p>
          <div className="bl-table">
            <Corners className="is-white" />
            <div className="bl-row bl-row-head"><span /><b>Target</b></div>
            <div className="bl-row"><span>Year</span><b>{p.year}</b></div>
            <div className="bl-row"><span>Class</span><b>{p.category}</b></div>
            <div className="bl-row"><span>Build</span><b>{p.tags.slice(0, 3).join(' · ')}</b></div>
          </div>

          <div className="bl-actions">
            <div className="fe-strip">
              <Chevron dir="left" label="Previous action" onClick={() => stepAction(-1)} />
              <span className="fe-dot fe-dot-2" /><span className="fe-dot fe-dot-1" />
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
        </div>
      </div>

      <KeyHints
        className="bl-keys"
        hints={[
          { k: 'Esc', label: 'Back', onClick: back },
          { k: '2', label: 'Bio', onClick: toggleBio },
        ]}
      />
    </div>
  );
}
