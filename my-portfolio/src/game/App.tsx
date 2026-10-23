import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { audio } from './audio';
import { Attention } from './dialogs';
import { NavContext } from './nav';
import type { Nav, ScreenId } from './nav';
import { critical, idle } from './preload';
import Blacklist from './screens/Blacklist';
import ChallengeSeries from './screens/ChallengeSeries';
import Intro from './screens/Intro';
import { MainMenu, Online, Options, QuickRace } from './screens/Menus';
import MyCars from './screens/MyCars';
import RapSheet from './screens/RapSheet';

// Every screen ships in one bundle (about 5 KB more than splitting): opening a screen never waits
// on the network, so the only loader a visitor ever sees is the intro's.

// Top level: intro video, then the front end. The front end is a stack of screens with the main
// menu at the bottom; only the top screen is mounted, so only it listens to the keyboard.

const SCREENS: Record<ScreenId, ComponentType> = {
  main: MainMenu,
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
    critical();
    idle();
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
          <Screen />
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
