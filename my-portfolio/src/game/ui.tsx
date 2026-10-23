import type { ReactNode } from 'react';
import { ART, asset, useSceneArt } from './assets';
import { PROFILE } from './content';

// Building blocks shared by every front-end screen.

/**
 * The game scene behind the menus, with the sepia grade and film grain. `dim` darkens it for
 * sub-screens; `blur` softens it further behind the Rap Sheet terminal.
 */
export function Backdrop({ dim = false, blur = false }: { dim?: boolean; blur?: boolean }) {
  const { src, isScene } = useSceneArt();
  return (
    <>
      <div className={`fe-bg ${isScene ? 'is-scene' : 'is-poster'} ${blur ? 'is-blur' : ''}`}>
        <img src={src} alt="" draggable={false} decoding="async" />
      </div>
      <div className={`fe-grade ${dim ? 'is-dim' : ''}`} aria-hidden="true" />
      <div className="fe-grain" aria-hidden="true" />
    </>
  );
}

/** Ragged ink blot the menus sit on. Pre-rendered once (public/nfsmw/ink.webp) from the same torn
    shapes the game uses, so no SVG filter has to run while screens animate. */
export function InkSplatter({ className = '' }: { className?: string }) {
  return <img className={`fe-ink ${className}`} src={ART.ink} alt="" draggable={false} decoding="async" aria-hidden="true" />;
}

/** Orange (or custom) corner brackets, as around the selected carousel icon and info panels. */
export function Corners({ className = '' }: { className?: string }) {
  return (
    <span className={`fe-corners ${className}`} aria-hidden="true">
      <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
    </span>
  );
}

/** Yellow double chevron. */
export function Chevron({ dir, onClick, label }: { dir: 'left' | 'right'; onClick?: () => void; label?: string }) {
  return (
    <button type="button" className={`fe-chevron is-${dir}`} onClick={onClick} aria-label={label ?? (dir === 'left' ? 'Previous' : 'Next')} tabIndex={-1}>
      <i /><i />
    </button>
  );
}

/** Lower-case marker heading, e.g. "main menu", "safe house", "challenge series". */
export function ScreenTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h1 className={`fe-title ${className}`}>{children}</h1>;
}

export interface Hint {
  k: string;
  label: string;
  onClick?: () => void;
}

/** Striped black bar with a key cap, as on the game's button prompts. */
export function KeyHint({ k, label, onClick }: Hint) {
  return (
    <button type="button" className="fe-bar fe-key" onClick={onClick} tabIndex={-1}>
      <kbd>{k}</kbd>
      <span>{label}</span>
    </button>
  );
}

export function KeyHints({ hints, className = '' }: { hints: Hint[]; className?: string }) {
  return (
    <div className={`fe-keys ${className}`}>
      {hints.map(h => <KeyHint key={h.k + h.label} {...h} />)}
    </div>
  );
}

/** Player name tag, bottom-left of the main menu. */
export function PlayerTag() {
  return (
    <div className="fe-bar fe-tag">
      <img src={asset(PROFILE.avatar)} alt="" className="fe-avatar" draggable={false} decoding="async" />
      <span>{PROFILE.name}</span>
    </div>
  );
}

/** Dark info panel with corner brackets, e.g. the Safe House "Career Completion" box. */
export function InfoPanel({ rows, className = '' }: { rows: [string, ReactNode][]; className?: string }) {
  return (
    <div className={`fe-info ${className}`}>
      <Corners className="is-grey" />
      {rows.map(([k, v]) => (
        <div key={k} className="fe-info-row">
          <span>{k}:</span>
          <b>{v}</b>
        </div>
      ))}
    </div>
  );
}
