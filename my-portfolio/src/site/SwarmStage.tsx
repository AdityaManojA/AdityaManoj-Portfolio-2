import { useEffect, useRef, type ReactNode } from 'react';
import { createSwarm, type Swarm } from './swarm';

/** Wraps a page whose sections are built on screen by the cursor swarm. */
export default function SwarmStage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const swarm = useRef<Swarm | null>(null);

  useEffect(() => {
    if (!root.current || !overlay.current || !status.current || !progress.current) return;
    const instance = createSwarm(root.current, {
      overlay: overlay.current,
      status: status.current,
      progress: progress.current,
    });
    swarm.current = instance;
    return () => {
      instance.destroy();
      swarm.current = null;
    };
  }, []);

  return (
    <>
      <div className="stage" ref={root}>
        {children}
      </div>
      <div className="swarm" ref={overlay} aria-hidden="true" />
      {/* While the page builds this is only a thin line along the bottom edge. Replay shows
          once everything is built. The swarm sets data-state on this element. */}
      <div className="swarm-bar" data-state="building">
        <span className="tr" aria-hidden="true">
          <span ref={progress} />
        </span>
        {/* The written status is kept for screen readers. */}
        <span className="sr-only" ref={status} />
        <button type="button" onClick={() => swarm.current?.replay()}>
          Replay
        </button>
      </div>
    </>
  );
}
