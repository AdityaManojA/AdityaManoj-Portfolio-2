import { useCallback, useEffect, useState } from 'react';
import ProjectsView from './site/ProjectsView';
import AboutView from './site/AboutView';
import ContactView from './site/ContactView';

type View = 'projects' | 'about' | 'contact';

const VIEWS: { id: View; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const SITE_TITLE = 'Aditya Manoj | Full-Stack Developer and Systems Engineer';

// The view lives in the URL hash so each page can be linked to and Back works.
function viewFromHash(): View {
  const hash = window.location.hash.slice(1);
  return hash === 'about' || hash === 'contact' ? hash : 'projects';
}

export default function App() {
  const [view, setView] = useState<View>(viewFromHash);

  useEffect(() => {
    // Pages build from the top, so a reload should start there rather than mid-page.
    window.history.scrollRestoration = 'manual';
    const sync = () => setView(viewFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Each view gets its own tab title, for history, bookmarks and screen readers.
    const label = VIEWS.find((v) => v.id === view)?.label;
    document.title = view === 'projects' ? SITE_TITLE : `${label} | Aditya Manoj`;
  }, [view]);

  const go = useCallback((next: View) => {
    const url = next === 'projects' ? window.location.pathname : `#${next}`;
    window.history.pushState(null, '', url);
    setView(next);
  }, []);

  return (
    <>
      <nav className="nav" aria-label="Main">
        <button type="button" className="brand" onClick={() => go('projects')}>
          AM .Dev
        </button>
        {VIEWS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            className={view === v.id ? 'on' : undefined}
            aria-current={view === v.id ? 'page' : undefined}
            onClick={() => go(v.id)}
          >
            {v.label} <sup>{i + 1}</sup>
          </button>
        ))}
      </nav>

      {view === 'projects' && <ProjectsView />}
      {view === 'about' && <AboutView onContact={() => go('contact')} />}
      {view === 'contact' && <ContactView />}
    </>
  );
}
