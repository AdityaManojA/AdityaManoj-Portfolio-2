import { useSyncExternalStore } from 'react';
import { audio } from '../audio';
import { asset } from '../assets';
import { LINKS, SERVICES } from '../content';
import type { IconName } from '../icons';
import { useNav } from '../nav';
import { BLACKLIST_SIZE, TOOL_COUNT, openLink } from '../util';
import CarouselMenu from './CarouselMenu';
import type { CarouselItem } from './CarouselMenu';

// The carousel screens and where each entry leads. Icons and order follow the PC version's main
// menu (Career, Challenge Series, Quick Race, Online, My Cars, Options), with About Me (the Rap
// Sheet) beside Projects. Labels say what each entry holds and Projects opens the project list
// directly, so visitors who don't know the game find the work in one step.

export function MainMenu() {
  const nav = useNav();
  const items: CarouselItem[] = [
    { key: 'projects', label: 'Projects', icon: 'career', note: `${BLACKLIST_SIZE} projects with live sites and source code`, onAccept: () => nav.push('blacklist') },
    { key: 'about', label: 'About Me', icon: 'rapsheet', note: 'Profile, experience and skills', onAccept: () => nav.push('rapsheet') },
    { key: 'challenge', label: 'Skills', icon: 'challenge', note: `${TOOL_COUNT} tools and technologies`, onAccept: () => nav.push('challenge') },
    { key: 'quickrace', label: 'Services', icon: 'quickrace', note: `${SERVICES.length} services I offer`, onAccept: () => nav.push('quickrace') },
    { key: 'online', label: 'Contact', icon: 'online', note: 'Email · LinkedIn · GitHub · CV', onAccept: () => nav.push('online') },
    { key: 'mycars', label: 'Gallery', icon: 'addcar', note: 'Renders and visual work', onAccept: () => nav.push('mycars') },
    { key: 'options', label: 'Settings', icon: 'options', note: 'Audio · Controls · Credits', onAccept: () => nav.push('options') },
  ];
  return (
    <CarouselMenu
      id="main"
      title="main menu"
      items={items}
      root
      hints={[{ k: 'Q', label: 'Quit', onClick: nav.quit }]}
      keys={{
        q: nav.quit,
        '1': () => { audio.play('accept'); nav.push('rapsheet'); },
      }}
    />
  );
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
  return <CarouselMenu id="quickrace" title="services" items={items} />;
}

export function Online() {
  const email = LINKS.email.replace(/^mailto:/, '');
  const items: CarouselItem[] = [
    { key: 'email', label: 'Email', icon: 'email', info: [['Address', email]], note: 'Send a challenge', onAccept: () => openLink(LINKS.email) },
    { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin', info: [['Profile', 'linkedin.com/in/aditya-manoj-a']], note: 'Opens in a new tab', onAccept: () => openLink(LINKS.linkedin) },
    { key: 'github', label: 'GitHub', icon: 'github', info: [['Profile', LINKS.github.replace(/^https:\/\//, '')]], note: 'Opens in a new tab', onAccept: () => openLink(LINKS.github) },
    { key: 'cv', label: 'Download CV', icon: 'cv', info: [['File', 'cv.pdf']], note: 'PDF résumé', onAccept: () => openLink(asset(LINKS.cv)) },
  ];
  return <CarouselMenu id="online" title="contact" items={items} />;
}

const subscribe = (fn: () => void) => audio.subscribe(fn);
const getMusic = () => audio.prefs.music;
const getSfx = () => audio.prefs.sfx;

export function Options() {
  const music = useSyncExternalStore(subscribe, getMusic);
  const sfx = useSyncExternalStore(subscribe, getSfx);
  const onOff = (v: boolean) => (v ? 'On' : 'Off');
  const items: CarouselItem[] = [
    { key: 'music', label: 'Music', icon: 'audio', info: [['Menu Theme', onOff(music)]], note: 'Accept to toggle', onAccept: () => audio.setMusic(!music) },
    { key: 'sfx', label: 'Sound FX', icon: 'audio', info: [['UI Sounds', onOff(sfx)]], note: 'Accept to toggle', onAccept: () => audio.setSfx(!sfx) },
    {
      key: 'controls', label: 'Controls', icon: 'gearstick',
      info: [['← →', 'Browse'], ['↑ ↓', 'Lists and rivals'], ['Enter', 'Accept'], ['Esc', 'Back'], ['1 2 3', 'Prompts shown on screen']],
      note: 'Mouse and touch work too', onAccept: () => {},
    },
    {
      key: 'credits', label: 'Credits', icon: 'player',
      info: [['Portfolio', 'Aditya Manoj'], ['Game', 'NFS Most Wanted © 2005 EA'], ['Status', 'Fan build, not affiliated']],
      note: 'Art, intro, music and sounds belong to Electronic Arts', onAccept: () => {},
    },
  ];
  return <CarouselMenu id="options" title="settings" items={items} />;
}
