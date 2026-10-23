import { PROJECTS, SKILLS } from './content';

/** Selection each screen remembers between visits, so backing out lands where you left. */
export const selection = new Map<string, number>();

export const TOOL_COUNT = SKILLS.reduce((n, g) => n + g.items.length, 0);

/** The game's Blacklist has 15 rivals. */
export const BLACKLIST_SIZE = Math.min(15, PROJECTS.length);

export const openLink = (url: string) => {
  window.open(url, url.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
};

/** How long the intro's police lamps stay up before the video, even when it is ready sooner. */
export const LOADER_MS = 1500;
