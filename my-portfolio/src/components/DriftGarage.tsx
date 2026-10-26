import { useEffect, useRef, useState } from 'react';
import DriftCar, { type DriftSettings } from './DriftCar';
import { VEHICLES, DEFAULT_VEHICLE, drawPreview, getVehicle } from './vehicles';

// The cursor-chasing vehicle plus its garage: a small launcher in the corner that slides open
// a side panel to pick a vehicle and switch the smoke, skid marks or the whole thing on and off.
// Choices persist per browser. The vehicle only runs on desktop (a mouse or pen, a wide enough
// window, no reduced-motion preference); elsewhere the launcher stays and the panel explains why.
type GarageSettings = DriftSettings & { visible: boolean };
type Availability = 'desktop' | 'mobile' | 'reduced';

const MOBILE_QUERY = '(max-width: 767px), (pointer: coarse)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function readAvailability(): Availability {
  if (window.matchMedia(MOBILE_QUERY).matches) return 'mobile';
  if (window.matchMedia(REDUCED_QUERY).matches) return 'reduced';
  return 'desktop';
}

// v2: earlier visits saved the old defaults (Coupe, smoke on), so a fresh key lets the new ones apply.
const STORAGE_KEY = 'drift-garage-v2';
const DEFAULTS: GarageSettings = { vehicle: DEFAULT_VEHICLE, smoke: false, marks: true, visible: true };

function loadSettings(): GarageSettings {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...DEFAULTS, ...saved, vehicle: getVehicle(saved.vehicle ?? DEFAULT_VEHICLE).id };
  } catch {
    return DEFAULTS;
  }
}

function VehicleCard({ id, name, blurb, selected, onSelect }: { id: string; name: string; blurb: string; selected: boolean; onSelect: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Paint in the live accent, and repaint when the theme toggles.
  useEffect(() => {
    const paint = () => {
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '194, 65, 12';
      if (canvasRef.current) drawPreview(canvasRef.current, getVehicle(id), accent);
    };
    paint();
    const observer = new MutationObserver(paint);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [id]);

  return (
    <button type="button" className={`garage-card${selected ? ' is-selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
      <canvas ref={canvasRef} className="garage-card-preview" aria-hidden="true" />
      <span className="garage-card-name">{name}</span>
      <span className="garage-card-blurb">{blurb}</span>
    </button>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <label className="garage-toggle">
      <span>{label}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="garage-toggle-track" aria-hidden="true" />
    </label>
  );
}

export default function DriftGarage() {
  const [availability, setAvailability] = useState<Availability>(readAvailability);
  const [settings, setSettings] = useState<GarageSettings>(loadSettings);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Follow the window across the desktop/mobile line (resizing, rotating, devtools emulation).
  useEffect(() => {
    const queries = [MOBILE_QUERY, REDUCED_QUERY].map((q) => window.matchMedia(q));
    const onChange = () => setAvailability(readAvailability());
    queries.forEach((q) => q.addEventListener('change', onChange));
    return () => queries.forEach((q) => q.removeEventListener('change', onChange));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage unavailable (private mode): choices just aren't remembered.
    }
  }, [settings]);

  // Escape or a click outside closes the panel; focus moves into it on open and back on close.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('.garage-card.is-selected, .garage-card, .garage-close')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !launcherRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    const launcher = launcherRef.current;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
      launcher?.focus();
    };
  }, [open]);

  const desktop = availability === 'desktop';
  const update = (patch: Partial<GarageSettings>) => setSettings((s) => ({ ...s, ...patch }));

  return (
    <>
      {desktop && settings.visible && <DriftCar vehicle={settings.vehicle} smoke={settings.smoke} marks={settings.marks} />}

      <button
        ref={launcherRef}
        type="button"
        className={`garage-launcher${open ? ' is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="drift-garage-panel"
        title="Garage: change the vehicle"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 16h14l-1.6-5.2A2 2 0 0 0 15.5 9.4h-7a2 2 0 0 0-1.9 1.4L5 16Z" />
          <path d="M4 16h16v2.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1V18h-9v.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V16Z" />
          <circle cx="8" cy="16.6" r="0.6" fill="currentColor" />
          <circle cx="16" cy="16.6" r="0.6" fill="currentColor" />
        </svg>
        <span className="sr-only">Open garage</span>
      </button>

      <div
        ref={panelRef}
        id="drift-garage-panel"
        className={`garage-panel${open ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Garage"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="garage-header">
          <div>
            <p className="garage-eyebrow">Cursor garage</p>
            <h2 className="garage-title">{desktop ? 'Pick your ride' : 'Oops!'}</h2>
          </div>
          <button type="button" className="garage-close" onClick={() => setOpen(false)} aria-label="Close garage">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {desktop ? (
          <>
            <div className="garage-grid">
              {VEHICLES.map((v) => (
                <VehicleCard
                  key={v.id}
                  id={v.id}
                  name={v.name}
                  blurb={v.blurb}
                  selected={settings.vehicle === v.id}
                  onSelect={() => update({ vehicle: v.id, visible: true })}
                />
              ))}
            </div>

            <div className="garage-options">
              <Toggle label="Tyre smoke" checked={settings.smoke} onChange={(smoke) => update({ smoke })} />
              <Toggle label="Skid marks" checked={settings.marks} onChange={(marks) => update({ marks })} />
              <Toggle label="Show vehicle" checked={settings.visible} onChange={(visible) => update({ visible })} />
            </div>

            <p className="garage-hint">Move your mouse and it follows. It drifts through every turn and parks on your cursor.</p>
          </>
        ) : (
          <div className="garage-unavailable">
            <p className="garage-unavailable-text">
              {availability === 'mobile'
                ? 'This is only available on the Desktop View.'
                : 'This is paused because your device is set to reduce motion.'}
            </p>
            <p className="garage-hint">
              {availability === 'mobile'
                ? 'Open the site on a laptop or desktop to drive a car that follows your cursor.'
                : 'Turn off reduced motion in your system settings to drive a car that follows your cursor.'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
