import { useEffect, useRef, useState } from 'react';
import { ART } from '../assets';
import { Loading } from '../dialogs';

// Boot intro. Plays the game's opening video full screen with "press any key to skip" in the
// menu marker font; any key, click or tap skips it, exactly like the PC version.
//
// Browsers may refuse to autoplay with sound, so it first tries with audio and falls back to a
// muted start. The skip key press then doubles as the interaction that lets the menu music play.

export default function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  // The intro is a large file; until its first frame plays, show the game's own loading screen.
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };

    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(finish); // can't play at all: go straight to the menu
      });
    }

    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.altKey || e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      finish();
    };
    // Defer by a tick so the key press that reloaded the page can't skip the intro instantly.
    const t = setTimeout(() => {
      window.addEventListener('keydown', skip);
      window.addEventListener('pointerdown', skip);
    }, 150);
    return () => {
      clearTimeout(t);
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
        preload="auto"
        onPlaying={() => setPlaying(true)}
        onEnded={() => { if (!done.current) { done.current = true; onDone(); } }}
        onError={() => { if (!done.current) { done.current = true; onDone(); } }}
      />
      {!playing && <Loading />}
      <span className="intro-skip">press any key to skip</span>
    </div>
  );
}
