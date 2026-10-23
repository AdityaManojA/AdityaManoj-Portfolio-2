import { useSyncExternalStore } from 'react';
import { audio } from '../audio';
import { asset } from '../assets';
import { EXPERIENCE, LINKS, SERVICES } from '../content';
import type { IconName } from '../icons';
import { useNav } from '../nav';
import { BLACKLIST_SIZE, TOOL_COUNT, openLink } from '../util';
import CarouselMenu from './CarouselMenu';
import type { CarouselItem } from './CarouselMenu';

// The carousel screens and where each entry leads. Entry names and order follow the PC version:
// Main Menu = Career, Challenge Series, Quick Race, Online, My Cars, Options.

export function MainMenu() {
  const nav = useNav();
  const items: CarouselItem[] = [
    { key: 'career', label: 'Career', icon: 'career', note: 'Safe House · Blacklist · Rap Sheet', onAccept: () => nav.push('safehouse') },
    { key: 'challenge', label: 'Challenge Series', icon: 'challenge', note: `${TOOL_COUNT} events · the skill arsenal`, onAccept: () => nav.push('challenge') },
    { key: 'quickrace', label: 'Quick Race', icon: 'quickrace', note: `${SERVICES.length} race types · services`, onAccept: () => nav.push('quickrace') },
    { key: 'online', label: 'Online', icon: 'online', note: 'Email · LinkedIn · GitHub · CV', onAccept: () => nav.push('online') },
    { key: 'mycars', label: 'My Cars', icon: 'mycars', note: 'Renders and visual work', onAccept: () => nav.push('mycars') },
    { key: 'options', label: 'Options', icon: 'options', note: 'Audio · Controls · Credits', onAccept: () => nav.push('options') },
  ];
  return (
    <CarouselMenu
      id="main"
      title="main menu"
      items={items}
      root
      hints={[
        { k: 'Q', label: 'Quit', onClick: nav.quit },
        { k: '1', label: 'Game Stats', onClick: () => { audio.play('accept'); nav.push('rapsheet'); } },
      ]}
      keys={{
        q: nav.quit,
        '1': () => { audio.play('accept'); nav.push('rapsheet'); },
      }}
    />
  );
}

export function SafeHouse() {
  const nav = useNav();
  const info: [string, string][] = [
    ['Blacklist', `${BLACKLIST_SIZE} rivals`],
    ['Roles', String(EXPERIENCE.length)],
    ['Tools', String(TOOL_COUNT)],
  ];
  const items: CarouselItem[] = [
    { key: 'blacklist', label: 'Blacklist', icon: 'blacklist', info, note: 'Projects, ranked #15 to #1', onAccept: () => nav.push('blacklist') },
    { key: 'rapsheet', label: 'Rap Sheet', icon: 'rapsheet', info, note: 'Profile, experience and records', onAccept: () => nav.push('rapsheet') },
    { key: 'carlot', label: 'Car Lot', icon: 'mycars', info, note: 'My Cars: renders and visual work', onAccept: () => nav.push('mycars') },
  ];
  return <CarouselMenu id="safehouse" title="safe house" items={items} />;
}

// Quick Race lists the game's six race types; each one fronts a service.
const RACE_TYPES: { name: string; icon: IconName }[] = [
  { name: 'Circuit', icon: 'circuit' },
  { name: 'Sprint', icon: 'sprint' },
  { name: 'Lap Knockout', icon: 'knockout' },
  { name: 'Tollbooth', icon: 'tollbooth' },
  { name: 'Speedtrap', icon: 'speedtrap' },
  { name: 'Drag', icon: 'drag' },
];

export function QuickRace() {
  const nav = useNav();
  const items: CarouselItem[] = SERVICES.map((s, i) => {
    const race = RACE_TYPES[i % RACE_TYPES.length];
    return {
      key: s.title,
      label: s.title,
      icon: race.icon,
      info: [['Race Type', race.name], ['Event', `${i + 1} / ${SERVICES.length}`]],
      note: s.description,
      onAccept: () => nav.push('online'),
    };
  });
  return <CarouselMenu id="quickrace" title="quick race" items={items} />;
}

export function Online() {
  const email = LINKS.email.replace(/^mailto:/, '');
  const items: CarouselItem[] = [
    { key: 'email', label: 'Email', icon: 'email', info: [['Address', email]], note: 'Send a challenge', onAccept: () => openLink(LINKS.email) },
    { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin', info: [['Profile', 'linkedin.com/in/aditya-manoj-a']], note: 'Opens in a new tab', onAccept: () => openLink(LINKS.linkedin) },
    { key: 'github', label: 'GitHub', icon: 'github', info: [['Profile', LINKS.github.replace(/^https:\/\//, '')]], note: 'Opens in a new tab', onAccept: () => openLink(LINKS.github) },
    { key: 'cv', label: 'Download CV', icon: 'cv', info: [['File', 'cv.pdf']], note: 'PDF résumé', onAccept: () => openLink(asset(LINKS.cv)) },
  ];
  return <CarouselMenu id="online" title="online" items={items} />;
}

const subscribe = (fn: () => void) => audio.subscribe(fn);
const getMusic = () => audio.prefs.music;
const getSfx = () => audio.prefs.sfx;

export function Options() {
  const music = useSyncExternalStore(subscribe, getMusic);
  const sfx = useSyncExternalStore(subscribe, getSfx);
  const onOff = (v: boolean) => (v ? 'On' : 'Off');
  const items: CarouselItem[] = [
    { key: 'music', label: 'Music', icon: 'music', info: [['Menu Theme', onOff(music)]], note: 'Accept to toggle', onAccept: () => audio.setMusic(!music) },
    { key: 'sfx', label: 'Sound FX', icon: 'sfx', info: [['UI Sounds', onOff(sfx)]], note: 'Accept to toggle', onAccept: () => audio.setSfx(!sfx) },
    {
      key: 'controls', label: 'Controls', icon: 'controls',
      info: [['← →', 'Browse'], ['↑ ↓', 'Lists and rivals'], ['Enter', 'Accept'], ['Esc', 'Back'], ['1 2 3', 'Prompts shown on screen']],
      note: 'Mouse and touch work too', onAccept: () => {},
    },
    {
      key: 'credits', label: 'Credits', icon: 'credits',
      info: [['Portfolio', 'Aditya Manoj'], ['Game', 'NFS Most Wanted © 2005 EA'], ['Status', 'Fan build, not affiliated']],
      note: 'Art, intro, music and sounds belong to Electronic Arts', onAccept: () => {},
    },
  ];
  return <CarouselMenu id="options" title="options" items={items} />;
}
