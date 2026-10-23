import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom has no media playback, Web Audio or window.open; stub what the app touches.
Object.defineProperty(HTMLMediaElement.prototype, 'play', { configurable: true, value: () => Promise.resolve() });
Object.defineProperty(HTMLMediaElement.prototype, 'pause', { configurable: true, value: () => {} });
window.open = vi.fn() as unknown as typeof window.open;
Element.prototype.scrollIntoView = () => {};

afterEach(() => {
  cleanup();
});
