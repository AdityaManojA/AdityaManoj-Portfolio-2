import { useEffect, useState } from 'react';
import { audio } from '../audio';
import { asset } from '../assets';
import { GALLERY } from '../content';
import { useKeys } from '../input';
import { useNav } from '../nav';
import { Backdrop, Chevron, Corners, InkSplatter, KeyHints, ScreenTitle } from '../ui';
import { selection } from '../util';

// My Cars. References: the "IS 300 1/32" car-select frame and the M3 GTR garage frame.
//   top-left: maker badge in orange corner brackets, striped "n/N" counter under it, the name in
//   wide caps beside it; top-right: TOP SPEED / ACCELERATION / HANDLING with thin blue bars;
//   bottom: ink splatter carrying [Esc] Back, [↵] Accept, [3] Showcase. The garage scene sits
//   behind, and each "car" is a render from the gallery. Showcase hides the interface.

const initials = (type: string) => type.split(/\s+/).map(w => w[0]).join('').slice(0, 3).toUpperCase();

export default function MyCars() {
  const nav = useNav();
  const [i, setIState] = useState(() => selection.get('mycars') ?? 0);
  const [showcase, setShowcase] = useState(false);
  const car = GALLERY[i];
  const n = GALLERY.length;

  const setI = (v: number) => { selection.set('mycars', v); setIState(v); };
  const step = (dir: number) => { audio.play('move'); setI((i + dir + n) % n); };
  const toggleShowcase = () => { audio.play('accept'); setShowcase(s => !s); };
  const back = () => {
    audio.play('back');
    if (showcase) setShowcase(false);
    else nav.back();
  };

  useEffect(() => {
    new Image().src = asset(GALLERY[(i + 1) % n].image);
  }, [i, n]);

  useKeys({ left: () => step(-1), right: () => step(1), accept: toggleShowcase, '3': toggleShowcase, back });

  return (
    <div className={`fe-screen mc-screen ${showcase ? 'is-showcase' : ''}`} onClick={showcase ? toggleShowcase : undefined}>
      <Backdrop dim />
      <figure className="mc-car" key={car.image}>
        <img src={asset(car.image)} alt={car.title} decoding="async" />
      </figure>

      <div className="mc-ui">
        <header className="mc-head">
          <ScreenTitle className="mc-title">my cars</ScreenTitle>
          <div className="mc-row">
            <Chevron dir="left" onClick={() => step(-1)} />
            <div className="mc-maker">
              <div className="mc-badge"><Corners /><span>{initials(car.type)}</span></div>
              <span className="fe-count">{i + 1}/{n}</span>
            </div>
            <h2 className="mc-name">{car.title}</h2>
            <Chevron dir="right" onClick={() => step(1)} />
          </div>
        </header>

        <div className="mc-bars" aria-hidden="true">
          {['Top Speed', 'Acceleration', 'Handling'].map(label => (
            <div key={label} className="mc-bar"><span>{label}</span><i /></div>
          ))}
        </div>

        <footer className="mc-foot">
          <InkSplatter className="mc-ink" />
          <KeyHints
            hints={[
              { k: 'Esc', label: 'Back', onClick: back },
              { k: '↵', label: 'Accept', onClick: toggleShowcase },
              { k: '3', label: 'Showcase', onClick: toggleShowcase },
            ]}
          />
        </footer>
      </div>
    </div>
  );
}
