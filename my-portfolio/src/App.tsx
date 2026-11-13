import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import ProjectsView from './site/ProjectsView';
import AboutView from './site/AboutView';
import ContactView from './site/ContactView';

type View = 'projects' | 'about' | 'contact';

// Each view has its own URL. The titles and descriptions match the ones the build writes
// into each page's HTML (PAGES in vite.config.ts).
const VIEWS: { id: View; label: string; path: string; title: string; description: string }[] = [
  {
    id: 'projects',
    label: 'Projects',
    path: '/',
    title: 'Aditya Manoj | Full-Stack Developer and Systems Engineer',
    description:
      'Aditya Manoj is a full-stack developer and systems engineer in Kerala building offline-first web apps, 3D interfaces, and on-device AI agents.',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    title: 'About Aditya Manoj | Full-Stack Developer in Kerala',
    description:
      'Who Aditya Manoj is: a full-stack developer and systems engineer in Kerala, with experience at the Rajiv Gandhi Centre for Biotechnology, Lascade and ICT Academy of Kerala.',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    title: 'Contact Aditya Manoj | Hire a Full-Stack Developer',
    description:
      'Contact Aditya Manoj about a web app, PWA, 3D interface or AI agent project: email aditya.dev.org@gmail.com, phone +91 99475 27296, or GitHub.',
  },
];

function viewFromLocation(): View {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/about' || path === '/contact') return path.slice(1) as View;
  // Links shared before the pages had their own URLs used /#about and /#contact.
  const hash = window.location.hash.slice(1);
  return hash === 'about' || hash === 'contact' ? hash : 'projects';
}

export default function App() {
  const [view, setView] = useState<View>(viewFromLocation);

  useEffect(() => {
    // Pages build from the top, so a reload should start there rather than mid-page.
    window.history.scrollRestoration = 'manual';
    const sync = () => {
      const next = viewFromLocation();
      // Move an old /#about style link onto the real URL.
      if (next !== 'projects' && window.location.hash) window.history.replaceState(null, '', `/${next}`);
      setView(next);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Keep the tab title, description and canonical URL in step with the view on screen.
    const current = VIEWS.find((v) => v.id === view)!;
    document.title = current.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', current.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', window.location.origin + current.path);
  }, [view]);

  const go = useCallback((next: View) => {
    window.history.pushState(null, '', VIEWS.find((v) => v.id === next)!.path);
    setView(next);
  }, []);

  // Nav items are real links (crawlable, open-in-new-tab works); a plain click is handled
  // in place so the page does not reload.
  const follow = (event: MouseEvent, next: View) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    go(next);
  };

  return (
    <>
      <nav className="nav" aria-label="Main">
        <a className="brand" href="/" onClick={(e) => follow(e, 'projects')}>
          AM .Dev
        </a>
        {VIEWS.map((v, i) => (
          <a
            key={v.id}
            href={v.path}
            className={view === v.id ? 'on' : undefined}
            aria-current={view === v.id ? 'page' : undefined}
            onClick={(e) => follow(e, v.id)}
          >
            {v.label} <sup>{i + 1}</sup>
          </a>
        ))}
      </nav>

      {view === 'projects' && <ProjectsView />}
      {view === 'about' && <AboutView onContact={() => go('contact')} />}
      {view === 'contact' && <ContactView />}
    </>
  );
}
