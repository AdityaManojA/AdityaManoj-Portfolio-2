import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { audio } from './audio';
import { ART } from './assets';
import { Attention, Loading } from './dialogs';
import { NavContext } from './nav';
import type { Nav, ScreenId } from './nav';
import Intro from './screens/Intro';
import { MainMenu, Online, Options, QuickRace, SafeHouse } from './screens/Menus';

// The carousel menus ship in the main bundle; the four larger screens load as separate chunks,
// fetched while the intro plays so they are ready before anyone can reach them.
const loaders = {
  blacklist: () => import('./screens/Blacklist'),
  rapsheet: () => import('./screens/RapSheet'),
  challenge: () => import('./screens/ChallengeSeries'),
  mycars: () => import('./screens/MyCars'),
};
const Blacklist = lazy(loaders.blacklist);
const RapSheet = lazy(loaders.rapsheet);
const ChallengeSeries = lazy(loaders.challenge);
const MyCars = lazy(loaders.mycars);

// Top level: intro video, then the front end. The front end is a stack of screens with the main
// menu at the bottom; only the top screen is mounted, so only it listens to the keyboard.

const SCREENS: Record<ScreenId, ComponentType> = {
  main: MainMenu,
  safehouse: SafeHouse,
  blacklist: Blacklist,
  rapsheet: RapSheet,
  challenge: ChallengeSeries,
  quickrace: QuickRace,
  mycars: MyCars,
  online: Online,
  options: Options,
};

export default function App() {
  const [phase, setPhase] = useState<'intro' | 'frontend'>('intro');
  const [stack, setStack] = useState<ScreenId[]>(['main']);
  const [confirmQuit, setConfirmQuit] = useState(false);

  // While the intro plays, fetch what the menu needs first so it appears instantly.
  useEffect(() => {
    audio.preloadSfx();
    Object.values(loaders).forEach(load => { load().catch(() => {}); });
    new Image().src = ART.scene;
    new Image().src = ART.poster;
  }, []);

  const finishIntro = useCallback(() => {
    setPhase('frontend');
    audio.startMusic();
  }, []);

  const nav = useMemo<Nav>(() => ({
    push: id => setStack(s => [...s, id]),
    back: () => setStack(s => (s.length > 1 ? s.slice(0, -1) : s)),
    // Quit asks first, through the game's ATTENTION dialog.
    quit: () => setConfirmQuit(true),
  }), []);

  if (phase === 'intro') return <Intro onDone={finishIntro} />;

  const top = stack[stack.length - 1];
  const Screen = SCREENS[top];
  return (
    <NavContext.Provider value={nav}>
      <main className="frontend">
        <div className="fe-transition" key={`${stack.length}-${top}`}>
          <Suspense fallback={<Loading />}>
            <Screen />
          </Suspense>
        </div>
        {confirmQuit && (
          <Attention
            message={['Are you sure you want to quit?', 'The intro will play again.']}
            onOk={() => {
              setConfirmQuit(false);
              audio.stopMusic();
              setStack(['main']);
              setPhase('intro');
            }}
            onCancel={() => setConfirmQuit(false)}
          />
        )}
      </main>
    </NavContext.Provider>
  );
}
