import { useEffect, useRef, useState } from 'react';
import { ART } from '../assets';

// Boot intro. The game's opening video plays as soon as the page opens and loops until the visitor
// presses any key, clicks or taps; that goes to the main menu, exactly like the PC version.
// (The police-lamp Loading screen in dialogs.tsx is kept for later but not shown here for now.)
//
// It plays with sound wherever the browser allows. A browser that blocks sound before the first
// interaction still starts the video on time, muted, with "press any key for sound": that first
// press restarts it from the top with sound, so the opening is heard in full, and the next press
// skips as usual.

export default function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [silenced, setSilencedState] = useState(false);
  const silencedRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const v = videoRef.current;
    if (!v) return;
    const setSilenced = (on: boolean) => { silencedRef.current = on; setSilencedState(on); };

    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().then(() => setSilenced(true), finish); // can't play at all: go straight to the menu
    });

    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.altKey || e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      if (silencedRef.current) {
        // Inside a key or tap handler the browser allows sound: play it from the top with audio.
        v.currentTime = 0;
        v.muted = false;
        setSilenced(false);
        return;
      }
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
      {playing && <span className="intro-skip">{silenced ? 'press any key for sound' : 'press any key to skip'}</span>}
    </div>
  );
}
