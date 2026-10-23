import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Flow tests: drive the real front end by keyboard, the way a visitor does, and check every
// screen opens, navigates and closes as in the game.

// Audio has no meaning in jsdom; a tiny stand-in keeps the Options toggles observable.
vi.mock('../src/game/audio', () => {
  const prefs = { music: true, sfx: true };
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach(fn => fn());
  return {
    audio: {
      play: vi.fn(),
      startMusic: vi.fn(),
      stopMusic: vi.fn(),
      preloadSfx: vi.fn(),
      unlock: vi.fn(),
      get prefs() { return { ...prefs }; },
      setMusic: (on: boolean) => { prefs.music = on; emit(); },
      setSfx: (on: boolean) => { prefs.sfx = on; emit(); },
      subscribe: (fn: () => void) => { listeners.add(fn); return () => listeners.delete(fn); },
    },
  };
});

import App from '../src/game/App';
import { EXPERIENCE, PROJECTS, SKILLS } from '../src/game/content';
import { selection } from '../src/game/util';

const TOOLS = SKILLS.reduce((n, g) => n + g.items.length, 0);

const press = async (key: string, times = 1) => {
  for (let i = 0; i < times; i++) {
    await act(async () => { fireEvent.keyDown(window, { key }); });
  }
};

/** Name shown under the selected carousel icon. */
const selected = () => document.querySelector('.fe-icon.is-active .fe-name')?.textContent;
const title = () => document.querySelector('.fe-title')?.textContent;

async function bootToMainMenu() {
  render(<App />);
  expect(document.querySelector('.intro')).not.toBeNull();
  // The listener arms a moment after mount, so an earlier key can't act instantly.
  await act(async () => { await new Promise(r => setTimeout(r, 200)); });
  await press(' '); // "Click to begin": starts the intro with sound
  await press(' '); // skips it
  await waitFor(() => expect(title()).toBe('main menu'));
}

beforeEach(() => {
  selection.clear();
  vi.mocked(window.open).mockClear();
});

describe('intro', () => {
  const wait = (ms: number) => act(async () => { await new Promise(r => setTimeout(r, ms)); });

  it('opens on the lamps with "Click to begin"; the click plays the looping video with sound', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play');
    render(<App />);
    const video = document.querySelector('video')!;
    expect(video.loop).toBe(true);
    expect(screen.getByText('Click to begin')).toBeTruthy();
    expect(play).not.toHaveBeenCalled(); // nothing plays before the visitor interacts
    await wait(200);
    await act(async () => { fireEvent.pointerDown(window); });
    expect(play).toHaveBeenCalledTimes(1);
    expect(video.muted).toBe(false);
    expect(screen.queryByText('Click to begin')).toBeNull();
    fireEvent.playing(video);
    expect(screen.queryByRole('status')).toBeNull(); // lamps gone once the video is on screen
    expect(screen.getByText('press any key to skip')).toBeTruthy();
    fireEvent.ended(video); // looping: reaching the end never leaves the intro
    expect(document.querySelector('.intro')).not.toBeNull();
    await press('x');
    await waitFor(() => expect(title()).toBe('main menu'));
    play.mockRestore();
  });

  it('stays on "Click to begin" if the browser still refuses sound for that key', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
      .mockRejectedValueOnce(new DOMException('needs a gesture', 'NotAllowedError'));
    render(<App />);
    await wait(200);
    await press('Escape');
    await waitFor(() => expect(screen.getByText('Click to begin')).toBeTruthy());
    expect(document.querySelector('.intro')).not.toBeNull();
    play.mockRestore();
  });
});

describe('main menu', () => {
  it('lists the game entries in order and wraps both ways', async () => {
    await bootToMainMenu();
    expect(selected()).toBe('Career');
    const order = ['Challenge Series', 'Quick Race', 'Online', 'My Cars', 'Options', 'Career'];
    for (const name of order) {
      await press('ArrowRight');
      expect(selected()).toBe(name);
    }
    await press('ArrowLeft');
    expect(selected()).toBe('Options');
  });

  it('shows the player tag with only Quit and Game Stats prompts', async () => {
    await bootToMainMenu();
    expect(screen.getByText('Aditya Manoj')).toBeTruthy();
    const prompts = [...document.querySelectorAll('.fe-key span')].map(s => s.textContent);
    expect(prompts).toEqual(['Quit', 'Game Stats']);
  });

  it('Back does nothing on the root menu', async () => {
    await bootToMainMenu();
    await press('Escape');
    expect(title()).toBe('main menu');
  });
});

describe('career', () => {
  it('opens the Safe House and backs out to where it was', async () => {
    await bootToMainMenu();
    await press('Enter');
    await waitFor(() => expect(title()).toBe('safe house'));
    expect(selected()).toBe('Blacklist');
    await press('Escape');
    await waitFor(() => expect(title()).toBe('main menu'));
    expect(selected()).toBe('Career');
  });

  it('Blacklist steps through rivals, switches actions and opens the bio', async () => {
    await bootToMainMenu();
    await press('Enter');
    await waitFor(() => expect(title()).toBe('safe house'));
    await press('Enter');
    await waitFor(() => expect(title()).toBe('blacklist 1'));
    expect(document.querySelector('.bl-bounty')?.textContent).toContain(`1 / ${Math.min(15, PROJECTS.length)}`);
    await press('ArrowDown', 2);
    expect(title()).toBe('blacklist 3');
    await press('ArrowUp');
    expect(title()).toBe('blacklist 2');
    await press('ArrowUp', 5); // clamps at #1
    expect(title()).toBe('blacklist 1');

    await press('2');
    expect(screen.getByText('bio:')).toBeTruthy();
    expect(screen.getByText('Ride:')).toBeTruthy();
    await press('Escape');
    expect(document.querySelector('.bl-table')).not.toBeNull();

    await press('Enter'); // Race Events opens the live site
    expect(window.open).toHaveBeenCalledWith(PROJECTS[0].link, '_blank', 'noopener');
  });

  it('Rap Sheet boots, lists the profile and opens every section', async () => {
    await bootToMainMenu();
    await press('1'); // Game Stats
    await waitFor(() => expect(screen.getByText('Rockport Police Department')).toBeTruthy());
    expect(screen.getByText(/Sign in:/)).toBeTruthy();
    await waitFor(() => expect(screen.getByText(/MANOJ, ADITYA/)).toBeTruthy(), { timeout: 5000 });
    await press('Enter');
    expect(document.querySelector('.rs-header')?.textContent).toBe('Rap Sheet');

    const sections = ['Summary', 'Vehicle Database', 'Infractions', 'Cost to State', 'Top 5 Pursuits', 'Rankings'];
    for (const [i, name] of sections.entries()) {
      await press('Enter');
      expect(document.querySelector('.rs-header span')?.textContent).toBe(name);
      if (name === 'Vehicle Database') expect(document.querySelectorAll('.rs-vehicle')).toHaveLength(EXPERIENCE.length);
      if (name === 'Rankings') {
        await press('Enter');
        expect(document.querySelectorAll('.rs-rank')).toHaveLength(SKILLS[0].items.length);
        await press('Escape');
      }
      await press('Escape');
      if (i < sections.length - 1) await press('ArrowDown');
    }
    await press('Escape'); // menu -> list
    await press('Escape'); // list -> leave
    await waitFor(() => expect(title()).toBe('main menu'));
  });
});

describe('other screens', () => {
  it('Challenge Series moves through the event grid', async () => {
    await bootToMainMenu();
    await press('ArrowRight');
    await press('Enter');
    await waitFor(() => expect(title()).toBe('challenge series'));
    const count = () => document.querySelector('.cs-count')?.textContent;
    expect(count()).toBe(`1/${TOOLS}`);
    await press('ArrowRight');
    expect(count()).toBe(`2/${TOOLS}`);
    await press('ArrowDown');
    expect(count()).toBe(`6/${TOOLS}`);
    await press('ArrowLeft', 10); // stops at the first event
    expect(count()).toBe(`1/${TOOLS}`);
  });

  it('My Cars cycles renders and toggles Showcase', async () => {
    await bootToMainMenu();
    await press('ArrowLeft', 2);
    await press('Enter');
    await waitFor(() => expect(title()).toBe('my cars'));
    const count = () => document.querySelector('.mc-maker .fe-count')?.textContent;
    expect(count()).toBe('1/6');
    await press('ArrowLeft');
    expect(count()).toBe('6/6');
    await press('3');
    expect(document.querySelector('.mc-screen')?.classList.contains('is-showcase')).toBe(true);
    await press('Escape'); // leaves Showcase first
    expect(document.querySelector('.mc-screen')?.classList.contains('is-showcase')).toBe(false);
  });

  it('Options toggles music and sound effects', async () => {
    await bootToMainMenu();
    await press('ArrowLeft');
    await press('Enter');
    await waitFor(() => expect(title()).toBe('options'));
    const info = () => document.querySelector('.fe-info')?.textContent;
    expect(info()).toContain('On');
    await press('Enter');
    expect(info()).toContain('Off');
    await press('ArrowRight');
    await press('Enter');
    expect(info()).toContain('Off');
  });

  it('Online opens contact links', async () => {
    await bootToMainMenu();
    await press('ArrowRight', 3);
    await press('Enter');
    await waitFor(() => expect(title()).toBe('online'));
    await press('ArrowRight');
    await press('Enter');
    expect(window.open).toHaveBeenCalledWith(expect.stringContaining('linkedin.com'), '_blank', 'noopener');
  });
});

describe('quit', () => {
  it('asks through the ATTENTION dialog, keeps keys inside it and cancels', async () => {
    await bootToMainMenu();
    await press('q');
    expect(screen.getByText('Attention')).toBeTruthy();
    await press('ArrowRight'); // would move the menu if keys leaked through
    expect(selected()).toBe('Career');
    await press('Escape');
    expect(screen.queryByText('Attention')).toBeNull();
    expect(title()).toBe('main menu');
  });

  it('OK returns to the intro', async () => {
    await bootToMainMenu();
    await press('q');
    await press('ArrowLeft'); // highlight OK
    await press('Enter');
    await waitFor(() => expect(document.querySelector('.intro')).not.toBeNull());
  });
});

describe('input guard', () => {
  it('ignores held-down Enter so it cannot chain through menus', async () => {
    await bootToMainMenu();
    await act(async () => { fireEvent.keyDown(window, { key: 'Enter', repeat: true }); });
    expect(title()).toBe('main menu');
  });
});
