import { useEffect, useRef, useState } from 'react';
import { ART } from '../assets';

// Boot intro. The game's opening video plays as soon as the page opens and loops until the visitor
// presses any key, clicks or taps; that goes to the main menu, exactly like the PC version.
// (The police-lamp Loading screen in dialogs.tsx is kept for later but not shown here for now.)
//
// It always asks for sound. A browser that refuses sound before the visitor has interacted with
// the site (Chrome's autoplay policy, which no page can override) plays it muted instead; any
// press still goes straight to the menu, and the menu music starts on that press.

export default function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(finish); // can't play at all: go straight to the menu
    });

    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.altKey || e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      finish();
    };
    // Defer by a tick so the key press that reloaded the page can't skip the intro instantly.
    const arm = setTimeout(() => {
      window.addEventListener('keydown', skip);
      window.addEventListener('pointerdown', skip);
    }, 150);
    return () => {
      clearTimeout(arm);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
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
        onPlaying={() => setPlaying(true)}
        onError={() => { if (!done.current) { done.current = true; onDone(); } }}
      />
      {playing && <span className="intro-skip">press any key to skip</span>}
    </div>
  );
}
