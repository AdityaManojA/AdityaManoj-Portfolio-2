import { useEffect, useRef, type ReactNode } from 'react';
import { AGENTS, createSwarm, type Swarm } from './swarm';

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
      <div className="swarm-bar">
        <span className="dots" aria-hidden="true">
          {AGENTS.map(([name, color]) => (
            <span key={name} style={{ background: color }} />
          ))}
        </span>
        <span ref={status} />
        <span className="tr" aria-hidden="true">
          <span ref={progress} />
        </span>
        <button type="button" onClick={() => swarm.current?.replay()}>
          Replay
        </button>
      </div>
    </>
  );
}
