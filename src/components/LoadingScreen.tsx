'use client';

import { portfolio } from "@/lib/portfolio";

import { useEffect, useState } from 'react';

const WORD = Array.from(portfolio.site.loadingText);
const CHAR_DELAY = 120; // ms per letter
const LOADER_START_DELAY = WORD.length * CHAR_DELAY + 200;
const LOADER_DURATION = 2000;

export function LoadingScreen() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const skipAnimation = () => {
      if (motion.matches) setVisible(false);
    };
    skipAnimation();
    motion.addEventListener('change', skipAnimation);
    return () => motion.removeEventListener('change', skipAnimation);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches || visibleChars >= WORD.length) return;
    const t = setTimeout(() => setVisibleChars(v => v + 1), CHAR_DELAY);
    return () => clearTimeout(t);
  }, [visibleChars, visible]);

  // Line loader — starts after typewriter finishes
  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame: number | undefined;
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;
    const t = setTimeout(() => {
      const start = performance.now();

      const tick = (now: number) => {
        const pct = Math.min(((now - start) / LOADER_DURATION) * 100, 100);
        setProgress(pct);

        if (pct < 100) {
          frame = requestAnimationFrame(tick);
        } else {
          setFading(true);
          fadeTimeout = setTimeout(() => setVisible(false), 500);
        }
      };

      frame = requestAnimationFrame(tick);
    }, LOADER_START_DELAY);

    return () => {
      clearTimeout(t);
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (fadeTimeout !== undefined) clearTimeout(fadeTimeout);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black motion-reduce:hidden"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* ARDY typewriter */}
      <span
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '4rem',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          display: 'inline-flex',
        }}
      >
        {WORD.map((char, i) => (
          <span
            key={i}
            style={{
              color: i >= 5 ? '#00BF63' : '#ffffff',
              opacity: i < visibleChars ? 1 : 0,
              transform: i < visibleChars ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
              display: 'inline-block',
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
}
