import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cycles through words in place. Screen readers get the first word only. */
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotating-word">
      <span className="sr-only">{words[0]}</span>
      <span className="rotating-word-stack" aria-hidden="true">
        {words.map((word, i) => {
          const state = i === index ? 'is-current' : i === (index - 1 + words.length) % words.length ? 'is-leaving' : '';
          return (
            <span key={word} className={`rotating-word-item ${state}`}>
              {word}
            </span>
          );
        })}
      </span>
    </span>
  );
}

interface CountUpProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/** Renders the final value immediately, then counts up from zero the first time it scrolls into view. */
export function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(to * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setValue(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
