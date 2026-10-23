import type { ReactNode } from 'react';

// White glyphs in the style of the game's menu icons. Every glyph uses a 64x40 viewBox and draws
// in currentColor, with #111 for cut-outs, so the carousel can tint and scale them freely.

const CAR = (
  <>
    <path d="M6 30 L10 21 Q12 17 17 17 L38 17 Q43 17 47 21 L54 24 Q58 25 58 29 L58 32 L6 32 Z" fill="currentColor" />
    <path d="M19 19 L36 19 Q40 19 43 22 L45 24 L15 24 Z" fill="#111" />
    <circle cx="17" cy="32" r="5" fill="#111" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="47" cy="32" r="5" fill="#111" stroke="currentColor" strokeWidth="2.5" />
  </>
);

const car = (x: number, y: number, s: number, extra?: Record<string, string>) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} {...extra}>{CAR}</g>
);

const FLAG = (
  <>
    <path d="M46 2 L46 22" stroke="currentColor" strokeWidth="2" />
    <path d="M46 3 h14 v10 h-14 z" fill="currentColor" />
    <path d="M46 3 h3.5 v5 h-3.5 z M53 3 h3.5 v5 h-3.5 z M49.5 8 h3.5 v5 h-3.5 z M56.5 8 h3.5 v5 h-3.5 z" fill="#111" />
  </>
);

export const ICONS = {
  // main menu
  career: <><path d="M22 13 L24 4 L29 9 L32 2 L35 9 L40 4 L42 13 Z" fill="currentColor" />{car(0, 4, 1)}</>,
  challenge: <>{car(-4, 4, 0.9)}{FLAG}</>,
  quickrace: <>{car(14, -6, 0.7, { opacity: '0.6' })}{car(0, 6, 0.85)}</>,
  online: (
    <>
      <circle cx="32" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="32" cy="20" rx="7" ry="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 20 h32 M19 11 h26 M19 29 h26" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  mycars: <><path d="M4 16 L32 3 L60 16" fill="none" stroke="currentColor" strokeWidth="3" />{car(8, 10, 0.75)}</>,
  options: (
    <>
      <circle cx="32" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="5" />
      <path d="M32 2 v7 M32 31 v7 M14 20 h7 M43 20 h7 M19.5 7.5 l5 5 M39.5 27.5 l5 5 M19.5 32.5 l5 -5 M39.5 12.5 l5 -5" stroke="currentColor" strokeWidth="5" />
    </>
  ),
  // safe house
  blacklist: (
    <>
      <path d="M18 2 h28 v36 h-28 z" fill="currentColor" />
      <text x="32" y="30" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" fill="#111">15</text>
    </>
  ),
  rapsheet: (
    <>
      <path d="M16 2 h26 l8 8 v28 h-34 z" fill="currentColor" />
      <path d="M21 14 h16 M21 20 h22 M21 26 h22 M21 32 h12" stroke="#111" strokeWidth="2.5" />
      <circle cx="50" cy="30" r="8" fill="#111" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 25 l1.6 3.4 3.6 .4 -2.7 2.4 .8 3.6 -3.3 -1.9 -3.3 1.9 .8 -3.6 -2.7 -2.4 3.6 -.4 z" fill="currentColor" />
    </>
  ),
  // race types (Quick Race)
  circuit: <><ellipse cx="32" cy="20" rx="26" ry="14" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M30 2 v10" stroke="currentColor" strokeWidth="3" /></>,
  sprint: <><circle cx="10" cy="30" r="5" fill="currentColor" /><path d="M10 30 Q30 30 32 18 T54 8" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" /><path d="M48 2 L60 8 L48 14 Z" fill="currentColor" /></>,
  knockout: <>{car(-2, 2, 0.8)}<path d="M44 4 L60 20 M60 4 L44 20" stroke="currentColor" strokeWidth="5" /></>,
  drag: (
    <>
      <rect x="24" y="1" width="16" height="38" rx="3" fill="currentColor" />
      <circle cx="32" cy="9" r="4" fill="#111" /><circle cx="32" cy="20" r="4" fill="#111" /><circle cx="32" cy="31" r="4" fill="#111" />
    </>
  ),
  // challenge-series events
  tollbooth: (
    <>
      <path d="M40 4 h14 v32 h-14 z" fill="currentColor" />
      <path d="M43 8 h8 v8 h-8 z" fill="#111" />
      <path d="M8 18 L40 12" stroke="currentColor" strokeWidth="3" strokeDasharray="5 3" />
      {car(-4, 8, 0.75)}
    </>
  ),
  stopwatch: (
    <>
      <circle cx="32" cy="22" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M32 22 L32 12 M32 22 L40 26" stroke="currentColor" strokeWidth="3" />
      <path d="M28 2 h8 v5 h-8 z M44 7 l5 -4 3 4 -5 4 z" fill="currentColor" />
    </>
  ),
  speedtrap: (
    <>
      <path d="M48 2 v36" stroke="currentColor" strokeWidth="3" />
      <path d="M40 4 h16 v10 h-16 z" fill="currentColor" />
      <circle cx="44" cy="9" r="3" fill="#111" />
      {car(-6, 8, 0.75)}
    </>
  ),
  badge: (
    <>
      <path d="M32 2 L52 8 Q52 30 32 38 Q12 30 12 8 Z" fill="currentColor" />
      <path d="M32 11 l2.6 5.4 5.9 .7 -4.4 4 1.2 5.9 -5.3 -3 -5.3 3 1.2 -5.9 -4.4 -4 5.9 -.7 z" fill="#111" />
    </>
  ),
  moneybag: (
    <>
      <path d="M26 4 h12 l-3 7 h-6 z" fill="currentColor" />
      <path d="M29 11 Q12 18 14 30 Q16 38 32 38 Q48 38 50 30 Q52 18 35 11 Z" fill="currentColor" />
      <text x="32" y="33" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="18" fill="#111">$</text>
    </>
  ),
  roadblock: (
    <>
      <path d="M6 14 h52 v12 h-52 z" fill="currentColor" />
      <path d="M12 14 l8 12 M24 14 l8 12 M36 14 l8 12 M48 14 l8 12" stroke="#111" strokeWidth="4" />
      <path d="M10 26 v12 M54 26 v12" stroke="currentColor" strokeWidth="4" />
    </>
  ),
  // blacklist actions
  raceevents: <>{FLAG}<path d="M4 14 h14 M8 22 h16 M4 30 h12" stroke="currentColor" strokeWidth="3" />{car(4, 6, 0.6)}</>,
  source: <><path d="M22 6 L8 20 L22 34 M42 6 L56 20 L42 34" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M36 4 L28 36" stroke="currentColor" strokeWidth="4" /></>,
  // online
  email: <><path d="M8 6 h48 v28 h-48 z" fill="currentColor" /><path d="M8 6 L32 24 L56 6" fill="none" stroke="#111" strokeWidth="3" /></>,
  linkedin: (
    <>
      <rect x="14" y="2" width="36" height="36" rx="5" fill="currentColor" />
      <text x="32" y="31" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="22" fill="#111">in</text>
    </>
  ),
  github: (
    <>
      <circle cx="32" cy="20" r="18" fill="currentColor" />
      <path d="M24 34 v-6 q-6 -1 -6 -9 q0 -4 3 -6 q-1 -4 1 -6 q3 0 6 3 q4 -1 8 0 q3 -3 6 -3 q2 2 1 6 q3 2 3 6 q0 8 -6 9 v6" fill="#111" />
    </>
  ),
  cv: (
    <>
      <path d="M18 2 h20 l8 8 v28 h-28 z" fill="currentColor" />
      <path d="M32 14 v14 M25 22 l7 7 7 -7" fill="none" stroke="#111" strokeWidth="3.5" />
    </>
  ),
  // options
  music: <><path d="M24 30 V6 L48 2 V26" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="19" cy="30" r="6" fill="currentColor" /><circle cx="43" cy="26" r="6" fill="currentColor" /></>,
  sfx: (
    <>
      <path d="M8 14 h10 l12 -10 v32 l-12 -10 h-10 z" fill="currentColor" />
      <path d="M38 12 q6 8 0 16 M44 6 q12 14 0 28" fill="none" stroke="currentColor" strokeWidth="3.5" />
    </>
  ),
  controls: (
    <>
      <rect x="4" y="8" width="56" height="26" rx="4" fill="currentColor" />
      <path d="M10 14 h6 v5 h-6 z M20 14 h6 v5 h-6 z M30 14 h6 v5 h-6 z M40 14 h6 v5 h-6 z M50 14 h4 v5 h-4 z M16 24 h32 v5 h-32 z" fill="#111" />
    </>
  ),
  credits: (
    <>
      <circle cx="32" cy="20" r="17" fill="currentColor" />
      <path d="M32 17 v12" stroke="#111" strokeWidth="5" />
      <circle cx="32" cy="11" r="3" fill="#111" />
    </>
  ),
  // ui
  check: (
    <>
      <circle cx="32" cy="20" r="17" fill="currentColor" />
      <path d="M23 20 l6 6 12 -12" fill="none" stroke="#111" strokeWidth="5" />
    </>
  ),
  lock: (
    <>
      <path d="M22 18 v-6 q0 -9 10 -9 q10 0 10 9 v6" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect x="16" y="18" width="32" height="20" rx="3" fill="currentColor" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}
