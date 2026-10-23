import { useEffect, useRef, useState } from 'react';
import { ART } from '../assets';
import { Loading } from '../dialogs';

// Boot intro. Opens on the game's police-lamp screen with "Click to begin" under the lamps. Chrome,
// Brave and Safari refuse a page's sound until the visitor has clicked or pressed a key, so that
// first press is what lets the intro play from the top with its sound. The video then loops until
// the next key, click or tap, which goes to the main menu (and starts the menu music).
// The video downloads behind the lamps, so it starts the moment the visitor clicks.

type Stage = 'gate' | 'starting' | 'playing';

export default function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const stageRef = useRef<Stage>('gate');
  const [stage, setStageState] = useState<Stage>('gate');

  useEffect(() => {
    const setStage = (s: Stage) => { stageRef.current = s; setStageState(s); };
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const v = videoRef.current;
    if (!v) return;

    const onInput = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.altKey || e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      if (stageRef.current !== 'gate') return finish();
      // Called inside the click or key handler, so the browser allows sound now.
      setStage('starting');
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {
        // A key the browser doesn't count as an interaction (Esc): wait for the next press.
        setStage('gate');
      });
    };
    // Defer by a tick so the key press that reloaded the page can't start the intro instantly.
    const arm = setTimeout(() => {
      window.addEventListener('keydown', onInput);
      window.addEventListener('pointerdown', onInput);
    }, 150);
    return () => {
      clearTimeout(arm);
      window.removeEventListener('keydown', onInput);
      window.removeEventListener('pointerdown', onInput);
    };
  }, [onDone]);

  return (
    <div className="intro" role="presentation">
      <video
        ref={videoRef}
        src={ART.intro}
        playsInline
        loop
        preload="auto"
        onPlaying={() => { if (stageRef.current === 'starting') { stageRef.current = 'playing'; setStageState('playing'); } }}
        onError={() => { if (!done.current) { done.current = true; onDone(); } }}
      />
      {stage !== 'playing' && <Loading prompt={stage === 'gate' ? 'Click to begin' : undefined} />}
      {stage === 'playing' && <span className="intro-skip">press any key to skip</span>}
    </div>
  );
}
