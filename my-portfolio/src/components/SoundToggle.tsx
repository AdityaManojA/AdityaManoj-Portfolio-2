import { useSyncExternalStore } from 'react';
import { uiSound } from '../hooks/useUiSounds';

const SoundToggle = () => {
  const on = useSyncExternalStore(uiSound.subscribe, () => uiSound.enabled);

  const toggle = () => {
    uiSound.setEnabled(!on);
    if (!on) uiSound.play('accept'); // confirm sounds are back; switching off stays silent
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="header-icon sound-toggle-btn"
      aria-pressed={on}
      aria-label={on ? 'Mute interface sounds' : 'Unmute interface sounds'}
      title={on ? 'Sound on' : 'Sound off'}
      data-own-sfx
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <path d="m16 9 6 6m0-6-6 6" />
        )}
      </svg>
    </button>
  );
};

export default SoundToggle;
