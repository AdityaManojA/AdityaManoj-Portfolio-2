import type { ReactNode } from 'react';
import { asset, useSceneArt } from './assets';
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

/** Ragged ink blot the menus sit on: fixed shapes torn by a turbulence displacement. */
export function InkSplatter({ className = '' }: { className?: string }) {
  return (
    <svg className={`fe-ink ${className}`} viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="fe-ink-tear" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="55" />
        </filter>
      </defs>
      <g filter="url(#fe-ink-tear)" fill="#050505">
        <ellipse cx="560" cy="300" rx="430" ry="120" />
        <ellipse cx="380" cy="250" rx="140" ry="90" />
        <ellipse cx="760" cy="230" rx="220" ry="110" />
        <ellipse cx="930" cy="280" rx="120" ry="130" />
        <circle cx="300" cy="170" r="38" />
        <circle cx="470" cy="150" r="26" />
        <circle cx="640" cy="120" r="18" />
        <circle cx="230" cy="230" r="22" />
        <circle cx="880" cy="130" r="30" />
        <rect x="408" y="70" width="10" height="150" rx="5" />
        <rect x="520" y="95" width="7" height="110" rx="4" />
        <rect x="700" y="60" width="9" height="140" rx="5" />
        <circle cx="160" cy="300" r="14" />
        <circle cx="120" cy="250" r="7" />
        <circle cx="560" cy="60" r="9" />
      </g>
    </svg>
  );
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
