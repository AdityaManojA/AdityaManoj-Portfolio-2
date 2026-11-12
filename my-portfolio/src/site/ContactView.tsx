import { useState } from 'react';
import SwarmStage from './SwarmStage';

const EMAIL = 'aditya.dev.org@gmail.com';
const PHONE = '+919947527296';
const GITHUB = 'https://github.com/AdityaManojA';

function CopyButton({ value }: { value: string }) {
  const [label, setLabel] = useState('Copy');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setLabel('Copied');
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
      <SwarmStage>
        <section className="sec">
          <p className="k mu" data-b="type">
            Contact
          </p>
          <h2 className="sf" data-b="type">
            Have a system
            <br />
            to build?
          </h2>
          <div className="crows">
            <div className="crow" data-b="type">
              <span className="mu">Email</span>
              <a className="sf" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <CopyButton value={EMAIL} />
            </div>
            <div className="crow" data-b="type">
              <span className="mu">Phone</span>
              <a className="sf" href={`tel:${PHONE}`}>
                +91 99475 27296
              </a>
              <CopyButton value={PHONE} />
            </div>
            <div className="crow" data-b="type">
              <span className="mu">GitHub</span>
              <a className="sf" href={GITHUB} target="_blank" rel="noopener noreferrer">
                github.com/AdityaManojA
              </a>
              <a className="open" href={GITHUB} target="_blank" rel="noopener noreferrer">
                Open
              </a>
            </div>
          </div>
          <p className="where mu" data-b="fade">
            Based in Bengaluru, India
          </p>
        </section>
      </SwarmStage>
    </main>
  );
}
