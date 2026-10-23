import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { audio } from '../audio';
import { EXPERIENCE, PROFILE, PROJECTS, SERVICES, SKILLS } from '../content';
import { useKeys } from '../input';
import { useNav } from '../nav';
import { Icon } from '../icons';
import { Backdrop } from '../ui';
import { openLink } from '../util';

// Rockport Police Department terminal. Reference: the Rap Sheet walkthrough (docs/REFERENCES.md).
// Flow matches the game: badge boot -> "searching database" -> name list -> RAP SHEET main menu
// (Summary, Vehicle Database, Infractions, Cost to State, Top 5 Pursuits, Rankings) -> sub-pages.
// Green on black, lime header bars, dotted rules, [key] prompts in green boxes, CASE FILE footer.

type View = 'boot' | 'search' | 'list' | 'menu' | 'summary' | 'vehicles' | 'infractions' | 'cost' | 'pursuits' | 'rankings' | 'ranking';

const MENU: { view: View; label: string }[] = [
  { view: 'summary', label: 'Summary' },
  { view: 'vehicles', label: 'Vehicle Database' },
  { view: 'infractions', label: 'Infractions' },
  { view: 'cost', label: 'Cost to State' },
  { view: 'pursuits', label: 'Top 5 Pursuits' },
  { view: 'rankings', label: 'Rankings' },
];

const CASE_FILE = 'MW-2005-MANOJ';
const NAME_UPPER = PROFILE.name.toUpperCase();
const LIST_NAME = PROFILE.name.split(' ').reverse().join(', ').toUpperCase();
const WORK = EXPERIENCE.filter(e => e.type === 'work');
const EDU = EXPERIENCE.filter(e => e.type === 'education');
const TOOLS = SKILLS.reduce((n, g) => n + g.items.length, 0);
const LIVE = PROJECTS.filter(p => p.link && !p.link.includes('github.com')).length;
const TOP5 = PROJECTS.slice(0, 5);

// Short, stable case IDs like the game's "MW-6C4H2Y1W".
const caseId = (s: string) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return 'MW-' + (h >>> 0).toString(36).toUpperCase().padStart(7, '0').slice(0, 8);
};

const listLength = (view: View, rankCat: number) => {
  switch (view) {
    case 'list': return 1;
    case 'menu': return MENU.length;
    case 'vehicles': return EXPERIENCE.length;
    case 'infractions': return SKILLS.length;
    case 'cost': return SERVICES.length;
    case 'pursuits': return TOP5.length;
    case 'rankings': return SKILLS.length;
    case 'ranking': return SKILLS[rankCat].items.length;
    default: return 0;
  }
};

const PARENT: Partial<Record<View, View>> = {
  list: 'boot', menu: 'list', summary: 'menu', vehicles: 'menu', infractions: 'menu', cost: 'menu', pursuits: 'menu', rankings: 'menu', ranking: 'rankings',
};

export default function RapSheet() {
  const nav = useNav();
  const [view, setView] = useState<View>('boot');
  const [sel, setSel] = useState(0);
  const [rankCat, setRankCat] = useState(0);
  const memory = useRef<Partial<Record<View, number>>>({});
  const listRef = useRef<HTMLDivElement>(null);

  const go = (next: View, at = memory.current[next] ?? 0) => {
    memory.current[view] = sel;
    setView(next);
    setSel(at);
  };

  // Boot sequence: badge, then the database search, then the name list.
  useEffect(() => {
    if (view === 'boot') {
      audio.play('termBoot');
      const t = setTimeout(() => go('search'), 900);
      return () => clearTimeout(t);
    }
    if (view === 'search') {
      audio.play('termSearch');
      const t = setTimeout(() => go('list'), 900);
      return () => clearTimeout(t);
    }
    // go is recreated each render; the timers only care about the view they started in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // Keep the highlighted row on screen in scrolling lists.
  useLayoutEffect(() => {
    listRef.current?.querySelector('.is-sel')?.scrollIntoView({ block: 'nearest' });
  }, [sel, view]);

  const n = listLength(view, rankCat);
  const move = (dir: number) => {
    if (n < 2) return;
    audio.play('termMove');
    setSel(s => Math.max(0, Math.min(n - 1, s + dir)));
  };

  const accept = () => {
    if (view === 'boot' || view === 'search') { audio.play('termSelect'); go('list'); return; }
    if (view === 'list') { audio.play('termSelect'); go('menu'); return; }
    if (view === 'menu') { audio.play('termSelect'); go(MENU[sel].view, 0); return; }
    if (view === 'pursuits') {
      const p = TOP5[sel];
      if (p.link) { audio.play('termSelect'); openLink(p.link); }
      return;
    }
    if (view === 'rankings') { audio.play('termSelect'); setRankCat(sel); go('ranking', 0); }
  };

  const back = () => {
    audio.play('termSelect');
    const parent = PARENT[view];
    if (!parent || parent === 'boot') { nav.back(); return; }
    go(parent);
  };

  useKeys({ up: () => move(-1), down: () => move(1), accept, back });

  const hints: { k: string; label: string; onClick: () => void }[] =
    view === 'boot' || view === 'search'
      ? [{ k: '↵', label: 'Skip', onClick: accept }, { k: 'Esc', label: 'Back', onClick: back }]
      : view === 'list' || view === 'menu' || view === 'pursuits' || view === 'rankings'
        ? [{ k: 'Esc', label: 'Back', onClick: back }, { k: '↵', label: 'Accept', onClick: accept }]
        : [{ k: 'Esc', label: 'Back', onClick: back }];

  // Row helper: tapping a row selects it, tapping the selected row accepts it.
  const row = (i: number, className: string, children: ReactNode) => (
    <div
      key={i}
      className={`${className} ${i === sel ? 'is-sel' : ''}`}
      onClick={() => (i === sel ? accept() : setSel(i))}
    >
      {children}
    </div>
  );

  const body = (() => {
    switch (view) {
      case 'boot':
        return (
          <div className="rs-boot">
            <Icon name="rpdbadge" className="rs-badge" />
            <div className="rs-dept">Rockport Police Department</div>
            <div className="rs-signin">
              <p>Sign in: <b>{PROFILE.name.split(' ').pop()!.toUpperCase()}</b></p>
              <p>Password: <b>XXXXXXX</b></p>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="rs-search">
            <p>Searching database <Spinner /></p>
            <p className="rs-late">Retrieving list <Spinner /></p>
          </div>
        );
      case 'list':
        return (
          <>
            <div className="rs-search"><p>Searching database --/</p><p>Retrieving list --/</p></div>
            <Rule />
            <div className="rs-list" ref={listRef}>
              {row(0, 'rs-item', <>&gt; {LIST_NAME}</>)}
            </div>
          </>
        );
      case 'menu':
        return (
          <>
            <Header title="Rap Sheet" />
            <div className="rs-stats rs-striped">
              <Stat k="Name" v={NAME_UPPER} /><Stat k="Projects" v={PROJECTS.length} />
              <Stat k="Live sites" v={LIVE} /><Stat k="Roles" v={WORK.length} />
              <Stat k="Tools on file" v={TOOLS} /><Stat k="Services" v={SERVICES.length} />
            </div>
            <Rule />
            <div className="rs-sub">Main menu:</div>
            <div className="rs-list" ref={listRef}>
              {MENU.map((m, i) => row(i, 'rs-item rs-bullet', <><i className="rs-box" /> {m.label}</>))}
            </div>
          </>
        );
      case 'summary':
        return (
          <>
            <Header title="Summary" />
            <div className="rs-stats one">
              <Stat k="Name" v={NAME_UPPER} />
              <Stat k="Title" v={PROFILE.title} />
              <Stat k="Projects" v={PROJECTS.length} />
            </div>
            <Rule />
            <div className="rs-warning rs-striped">{PROFILE.summary}</div>
            <Rule />
            <div className="rs-blocks">
              <Block title="Projects" rows={[['Live sites', LIVE], ['Total', PROJECTS.length]]} />
              <Block title="Experience" rows={[['Roles', WORK.length], ['Education', EDU.length]]} />
              <Block title="Arsenal" rows={[['Categories', SKILLS.length], ['Tools', TOOLS]]} />
              <Block title="Services" rows={[['Offered', SERVICES.length], ['Latest role', WORK[0]?.org ?? '-']]} />
            </div>
          </>
        );
      case 'vehicles':
        return (
          <>
            <Header title="Vehicle Database" />
            <div className="rs-stats one">
              <Stat k="Name" v={NAME_UPPER} />
              <Stat k="Preferred vehicle" v={WORK[0]?.role ?? '-'} />
              <Stat k="Recent vehicle" v={WORK[0]?.org ?? '-'} />
            </div>
            <Rule />
            <div className="rs-list rs-scroll" ref={listRef}>
              {EXPERIENCE.map((e, i) => row(i, 'rs-vehicle', (
                <>
                  <div className="rs-vehicle-head"><span>{e.org}</span><em>&lt; {e.type === 'work' ? 'Suspected to drive' : 'Training record'} &gt;</em></div>
                  <div className="rs-vehicle-body">
                    <Stat k="Role" v={e.role} />
                    <Stat k="Period" v={e.period} />
                    <Stat k="Location" v={e.location} />
                    {i === sel && <p className="rs-desc">{e.description}</p>}
                  </div>
                </>
              )))}
            </div>
          </>
        );
      case 'infractions':
        return (
          <>
            <Header title="Infractions" />
            <div className="rs-stats one">
              <Stat k="Name" v={NAME_UPPER} />
              <Stat k="Recorded categories" v={SKILLS.length} />
              <Stat k="Recorded tools" v={TOOLS} />
            </div>
            <Rule />
            <div className="rs-table-head"><span /><span>Tools</span></div>
            <div className="rs-list rs-scroll" ref={listRef}>
              {SKILLS.map((g, i) => row(i, 'rs-trow', <><span>{g.category}</span><b>{g.items.length}</b></>))}
            </div>
          </>
        );
      case 'cost':
        return (
          <>
            <Header title="Cost to State" />
            <div className="rs-stats one"><Stat k="Name" v={NAME_UPPER} /></div>
            <div className="rs-table-head three"><span>Qty</span><span>Category</span></div>
            <div className="rs-list rs-scroll" ref={listRef}>
              {SERVICES.map((s, i) => row(i, 'rs-trow three', (
                <><b>{String(i + 1).padStart(2, '0')}</b><span>{s.title}</span>{i === sel && <p className="rs-desc">{s.description}</p>}</>
              )))}
            </div>
            <Rule />
            <div className="rs-total">Services offered: {SERVICES.length}</div>
          </>
        );
      case 'pursuits':
        return (
          <>
            <Header title="Top 5 Pursuits" right={`Projects: ${PROJECTS.length}`} />
            <div className="rs-list rs-scroll" ref={listRef}>
              {TOP5.map((p, i) => row(i, 'rs-pursuit', (
                <>
                  <span className="rs-num">{i + 1}</span>
                  <div>
                    <Stat k="Car used" v={p.tags.slice(0, 2).join(' / ')} />
                    <Stat k="ID" v={caseId(p.title)} />
                  </div>
                  <div className="rs-right">
                    <Stat k="Target" v={p.title.split(/\s+[—-]\s+/)[0]} />
                    <Stat k="Year" v={p.year} />
                  </div>
                </>
              )))}
            </div>
          </>
        );
      case 'rankings':
        return (
          <>
            <Header title="Rankings" />
            <div className="rs-stats two-col"><Stat k="Name" v={NAME_UPPER} /><span className="rs-lime">Lifetime arsenal</span></div>
            <Rule />
            <div className="rs-sub">Select a category for more detail:</div>
            <div className="rs-list rs-scroll" ref={listRef}>
              {SKILLS.map((g, i) => row(i, 'rs-trow', <><span>&gt; {g.category}</span><b>{g.items.length}</b></>))}
            </div>
          </>
        );
      case 'ranking': {
        const g = SKILLS[rankCat];
        return (
          <>
            <Header title="Rankings" />
            <div className="rs-stats two-col"><span>{g.category}</span><span className="rs-lime">Lifetime arsenal</span></div>
            <Rule />
            <div className="rs-list rs-scroll" ref={listRef}>
              {g.items.map((s, i) => row(i, 'rs-rank', <><i className="rs-arrow">{i === sel ? '›' : ''}</i><b>{i + 1}</b><span className="rs-lime">{s.name}</span><span>{g.category}</span></>))}
            </div>
          </>
        );
      }
    }
  })();

  return (
    <div className="fe-screen rs-screen">
      <Backdrop dim blur />
      <div className={`rs-panel is-${view}`} key={view}>
        <div className="rs-content">{body}</div>
        <Rule />
        <footer className="rs-foot">
          <div className="rs-keys">
            {hints.map(h => (
              <button key={h.k} type="button" className="rs-key" onClick={h.onClick} tabIndex={-1}>
                <kbd>{h.k}</kbd>{h.label}
              </button>
            ))}
          </div>
          {view !== 'boot' && view !== 'search' && view !== 'list' && <span className="rs-case">Case file: {CASE_FILE}</span>}
        </footer>
      </div>
    </div>
  );
}

function Header({ title, right }: { title: string; right?: string }) {
  return <div className="rs-header"><span>{title}</span>{right && <span>{right}</span>}</div>;
}

function Rule() {
  return <div className="rs-rule" aria-hidden="true" />;
}

function Stat({ k, v }: { k: string; v: ReactNode }) {
  return <div className="rs-stat"><span>{k}:</span> <b>{v}</b></div>;
}

function Block({ title, rows }: { title: string; rows: [string, ReactNode][] }) {
  return (
    <div className="rs-block">
      <div className="rs-block-title">{title}</div>
      {rows.map(([k, v]) => <Stat key={k} k={k} v={v} />)}
    </div>
  );
}

function Spinner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % 4), 110);
    return () => clearInterval(t);
  }, []);
  return <span className="rs-spin">--{'-\\|/'[i]}</span>;
}
