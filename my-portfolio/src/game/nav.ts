import { createContext, useContext } from 'react';

// Screen stack. Every front-end screen is pushed on top of the main menu and popped with Back,
// the same way the game's menus nest.
export type ScreenId =
  | 'main'
  | 'safehouse'
  | 'blacklist'
  | 'rapsheet'
  | 'challenge'
  | 'quickrace'
  | 'mycars'
  | 'online'
  | 'options';

export interface Nav {
  push: (id: ScreenId) => void;
  back: () => void;
  /** Leave the front end and replay the intro, like Quit in the game. */
  quit: () => void;
}

export const NavContext = createContext<Nav | null>(null);

export function useNav() {
  const nav = useContext(NavContext);
  if (!nav) throw new Error('useNav outside NavContext');
  return nav;
}
