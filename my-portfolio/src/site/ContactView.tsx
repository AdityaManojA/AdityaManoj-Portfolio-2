import { useState, type CSSProperties } from 'react';

const EMAIL = 'aditya.dev.org@gmail.com';
const PHONE = '+919947527296';
// Label, what is shown, where it goes.
const SOCIAL = [
  ['GitHub', 'github.com/AdityaManojA', 'https://github.com/AdityaManojA'],
  ['Instagram', '@xo.adityaaa.dev', 'https://www.instagram.com/xo.adityaaa.dev/'],
  ['X', '@Adityathedev', 'https://x.com/Adityathedev'],
];

/** Position in the entrance sequence, read by the CSS as --i. */
const order = (i: number) => ({ '--i': i }) as CSSProperties;

function CopyButton({ value }: { value: string }) {
  const [label, setLabel] = useState('Copy');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setLabel('Copied');
      navigator.vibrate?.(8);
    } catch {
      setLabel('Press Ctrl+C');
    }
    window.setTimeout(() => setLabel('Copy'), 1600);
  };

  return (
    <button type="button" onClick={copy}>
      {label}
    </button>
  );
}

export default function ContactView() {
  return (
    <main>
      {/* No swarm here. The headline rises out of a mask line by line, then each row is
          drawn in from the left. --i sets the order. */}
      <section className="sec contact">
        <p className="k mu">Contact</p>
        <h1 className="sf display">
          <span className="ln" style={order(0)}>
            <span>Have a project </span>
          </span>
          <span className="ln" style={order(1)}>
            <span>to build?</span>
          </span>
        </h1>
        <p className="avail">Taking projects from December</p>
        <div className="crows">
          <div className="crow" style={order(0)}>
            <span className="mu">Email</span>
            <a className="sf" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <CopyButton value={EMAIL} />
          </div>
          <div className="crow" style={order(1)}>
            <span className="mu">Phone</span>
            <a className="sf" href={`tel:${PHONE}`}>
              +91 99475 27296
            </a>
            <CopyButton value={PHONE} />
          </div>
          {SOCIAL.map(([label, shown, url], i) => (
            <div className="crow" style={order(i + 2)} key={label}>
              <span className="mu">{label}</span>
              <a className="sf" href={url} target="_blank" rel="noopener noreferrer">
                {shown}
              </a>
              <a className="open" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label}`}>
                Open
              </a>
            </div>
          ))}
        </div>
        <p className="where mu">
          Based in Kerala, India · <a href="/privacy.html">Privacy</a>
        </p>
      </section>
    </main>
  );
}
