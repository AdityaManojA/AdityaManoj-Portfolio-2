import SwarmStage from './SwarmStage';

const EXPERIENCE = [
  ['Lead systems engineer, GLIA Event OS', 'Rajiv Gandhi Centre for Biotechnology', '2025'],
  ['Product development engineer', 'Lascade', '2025'],
  ['Full-stack development intern', 'ICT Academy of Kerala', '2024'],
  ['AI/ML engineering intern', 'ICT Academy of Kerala', '2024'],
];

// One line from each client, in their words.
const QUOTES = [
  ['Excellent payment portal and shopping pages, and an easy to edit CMS!', 'ThreadPath Collective'],
  ['A great amount of stress reduction for the staff because of the new admin dashboard.', 'The Whisky Business'],
  ['The best landing page to outpace my competitors!', 'Pixel Spaces'],
];

const NUMBERS = [
  ['1.2M+', 'Firestore reads handled by GLIA'],
  ['1M+', 'People using Travel Animator'],
  ['<150 ms', 'On-device OCR in ALFRED'],
  ['60 FPS', 'Canvas rendering at IndZita'],
];

function Skill({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div data-b="type">
      <h4>{title}</h4>
      <p className="sf">
        {lines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function AboutView({ onContact }: { onContact: () => void }) {
  return (
    <main>
      <SwarmStage>
        <section className="sec">
          {/* The spaces before each <br /> keep the words apart for screen readers and crawlers. */}
          <h1 className="sf headline" data-b="type">
            Turning rough ideas into{' '}
            <br />
            fast, stubborn systems{' '}
            <br />
            that hold under load.
          </h1>
          <p className="status mu" data-b="type">
            Currently building ALFRED Mark VIII, from Kerala
          </p>
          <div className="ring">
            <div className="col l">
              <Skill title="Frontend" lines={['React and Next.js', 'Canvas and 3D', 'Progressive web apps']} />
              <Skill title="Backend" lines={['FastAPI and Node.js', 'Firestore, PostgreSQL', 'Offline sync']} />
            </div>
            {/* The portrait is tall; the 1:1 box with top alignment keeps only its upper half. */}
            <img className="portrait" src="/ProjectImages/web/pfp.webp" width="440" height="778" alt="Portrait of Aditya Manoj" data-b="fade" />
            <div className="col">
              <Skill title="AI agents" lines={['Live voice and vision', 'Local models', 'On-device OCR']} />
              <Skill title="Infrastructure" lines={['Linux internals', 'Kubernetes', 'Observability']} />
            </div>
          </div>
          <p className="more mu" data-b="fade">
            Scroll, and the swarm builds the rest
          </p>
        </section>

        <section className="sec">
          <h2 className="k mu" data-b="type">
            Experience
          </h2>
          <div className="rows">
            {EXPERIENCE.map(([role, company, year]) => (
              <div className="row" data-b="type" key={role}>
                <span>{role}</span>
                <span className="sf">{company}</span>
                <span className="mu">{year}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <h2 className="k mu" data-b="type">
            What clients say
          </h2>
          <div className="quotes">
            {QUOTES.map(([text, client]) => (
              <figure data-b="type" key={client}>
                <blockquote className="sf">“{text}”</blockquote>
                <figcaption className="mu">{client}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="sec">
          <h2 className="k mu" data-b="type">
            In numbers
          </h2>
          <div className="nums">
            {NUMBERS.map(([value, label]) => (
              <div data-b="type" key={label}>
                <p className="sf">{value}</p>
                <p className="mu">{label}</p>
              </div>
            ))}
          </div>
          <button type="button" className="cta" data-b="fade" onClick={onContact}>
            Get in touch
          </button>
        </section>
      </SwarmStage>
    </main>
  );
}
