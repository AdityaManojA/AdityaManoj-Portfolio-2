import { useEffect, useState } from 'react';
import { ART } from './assets';
import { audio } from './audio';
import { Icon } from './icons';
import { modalLock, useKeys } from './input';
import { Corners } from './ui';

// Front-end overlays copied from the running game (captures in media-src/game-captures/):
//   Loading:   three police lamps (blue, grey, red) on a striped band, "LOADING..." under them.
//   Attention: orange-striped header, brown body with the warning triangle, striped footer with
//              buttons; the highlighted button sits in orange corner brackets.

/** The lamps screen. With `prompt`, the label under the lamps asks for a click instead. */
export function Loading({ prompt }: { prompt?: string }) {
  return (
    <div className="fe-loading" role="status" aria-label={prompt ?? 'Loading'}>
      <div className="fe-loading-band">
        <img src={ART.lamps} alt="" draggable={false} />
        <span className={prompt ? 'is-prompt' : undefined}>{prompt ?? 'Loading...'}</span>
      </div>
    </div>
  );
}

interface AttentionProps {
  message: string[];
  onOk: () => void;
  onCancel: () => void;
  okLabel?: string;
  cancelLabel?: string;
}

export function Attention({ message, onOk, onCancel, okLabel = 'OK', cancelLabel = 'Cancel' }: AttentionProps) {
  const [sel, setSel] = useState<0 | 1>(1); // the game highlights the safe option first
  const buttons = [
    { label: okLabel, run: onOk },
    { label: cancelLabel, run: onCancel },
  ];

  useEffect(() => {
    modalLock.acquire();
    return () => modalLock.release();
  }, []);

  const move = (to: 0 | 1) => { if (to !== sel) { audio.play('move'); setSel(to); } };
  useKeys({
    left: () => move(0),
    right: () => move(1),
    accept: () => { audio.play(sel === 0 ? 'accept' : 'back'); buttons[sel].run(); },
    back: () => { audio.play('back'); onCancel(); },
  }, true, true);

  return (
    <div className="fe-modal" role="alertdialog" aria-modal="true" aria-labelledby="fe-attention-title">
      <div className="fe-attention">
        <Corners />
        <header id="fe-attention-title">Attention</header>
        <div className="fe-attention-body">
          <Icon name="warning" />
          <p>{message.map(line => <span key={line}>{line}</span>)}</p>
        </div>
        <footer>
          {buttons.map((b, i) => (
            <button
              key={b.label}
              type="button"
              className={`fe-attention-btn ${i === sel ? 'is-sel' : ''}`}
              onMouseEnter={() => move(i as 0 | 1)}
              onClick={() => { setSel(i as 0 | 1); b.run(); }}
            >
              {i === sel && <Corners />}
              <span>{b.label}</span>
            </button>
          ))}
        </footer>
      </div>
    </div>
  );
}
