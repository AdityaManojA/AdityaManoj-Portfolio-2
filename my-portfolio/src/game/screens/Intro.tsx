import { useEffect, useRef, useState } from 'react';
import { ART } from '../assets';
import { Loading } from '../dialogs';

// Boot intro. Plays the game's opening video full screen with "press any key to skip" in the
// menu marker font; any key, click or tap skips it, exactly like the PC version.
//
// Browsers refuse to autoplay with sound until the visitor has interacted with the site. Rather
// than play the intro silently, it then holds on the loading screen with "press any key to start":
// that press is the interaction, so the intro starts from the top with its sound, and the next
// press skips as usual (and lets the menu music play).

type Stage = 'starting' | 'blocked' | 'started';

export default function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const [stage, setStageState] = useState<Stage>('starting');
  const stageRef = useRef<Stage>('starting');
  // The intro is a large file; until its first frame plays, show the game's own loading screen.
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const setStage = (s: Stage) => { stageRef.current = s; setStageState(s); };
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const start = () => {
      const v = videoRef.current;
      if (!v) return finish();
      v.muted = false;
      v.play().then(
        () => setStage('started'),
        (err: unknown) => {
          // Blocked for want of an interaction: wait for one. Any other failure: go to the menu.
          if (err instanceof DOMException && err.name === 'NotAllowedError') setStage('blocked');
          else finish();
        },
      );
    };
    start();

    const onInput = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.altKey || e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      if (stageRef.current === 'started') return finish();
      if (stageRef.current === 'blocked') {
        // Called inside the key or tap handler, so the browser now allows sound.
        setStage('starting');
        start();
      }
    };
    // Defer by a tick so the key press that reloaded the page can't skip the intro instantly.
    const t = setTimeout(() => {
      window.addEventListener('keydown', onInput);
      window.addEventListener('pointerdown', onInput);
    }, 150);
    return () => {
      clearTimeout(t);
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
        preload="auto"
        onPlaying={() => setPlaying(true)}
        onEnded={() => { if (!done.current) { done.current = true; onDone(); } }}
        onError={() => { if (!done.current) { done.current = true; onDone(); } }}
      />
      {!playing && <Loading />}
      <span className="intro-skip">{stage === 'blocked' ? 'press any key to start' : 'press any key to skip'}</span>
    </div>
  );
}
