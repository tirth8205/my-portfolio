import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { portrait } from '../data/portrait';

const RAMP = ' .:;+xX$&';
const MAX = RAMP.length - 1;
const COLS = Math.max(...portrait.map((line) => line.length));
const LEVELS = portrait.map((line) =>
  Array.from(line.padEnd(COLS, ' '), (char) => Math.max(0, RAMP.indexOf(char))),
);
const FULL = portrait.map((line) => line.padEnd(COLS, ' ')).join('\n');

const DEVELOP_MS = 1600;
const LENS_RADIUS = 9;
const LENS_LIFT = 3;

interface Lens {
  col: number;
  row: number;
  strength: number;
  target: number;
}

function compose(progress: number, thresholds: Float32Array, lens: Lens) {
  let out = '';
  for (let row = 0; row < LEVELS.length; row++) {
    const levels = LEVELS[row];
    for (let col = 0; col < COLS; col++) {
      let level = levels[col];

      if (progress < 1) {
        const reveal = (progress - thresholds[row * COLS + col]) / 0.18;
        level = reveal <= 0 ? 0 : Math.round(level * Math.min(1, reveal));
      }

      if (lens.strength > 0.01) {
        // Glyphs are roughly twice as tall as they are wide.
        const distance = Math.hypot(col - lens.col, (row - lens.row) * 2);
        if (distance < LENS_RADIUS) {
          level = Math.min(MAX, level + Math.round(LENS_LIFT * lens.strength * (1 - distance / LENS_RADIUS)));
        }
      }

      out += RAMP[level];
    }
    if (row < LEVELS.length - 1) out += '\n';
  }
  return out;
}

interface AsciiPortraitProps {
  className?: string;
}

export default function AsciiPortrait({ className = '' }: AsciiPortraitProps) {
  const [text, setText] = useState(FULL);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLPreElement>(null);
  const frame = useRef<number | null>(null);
  const started = useRef(0);
  const progress = useRef(1);
  const thresholds = useRef(new Float32Array(LEVELS.length * COLS));
  const lens = useRef<Lens>({ col: 0, row: 0, strength: 0, target: 0 });

  const tick = useCallback(() => {
    frame.current = null;
    const now = performance.now();

    if (progress.current < 1) {
      const linear = Math.min(1, (now - started.current) / DEVELOP_MS);
      progress.current = 1 - Math.pow(1 - linear, 3);
    }

    const l = lens.current;
    l.strength += (l.target - l.strength) * 0.18;
    if (Math.abs(l.target - l.strength) < 0.01) l.strength = l.target;

    setText(compose(progress.current, thresholds.current, l));

    if (progress.current < 1 || l.strength !== l.target) {
      frame.current = requestAnimationFrame(tick);
    }
  }, []);

  const schedule = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      // Bright glyphs settle first, so the face develops like a print.
      for (let row = 0; row < LEVELS.length; row++) {
        for (let col = 0; col < COLS; col++) {
          const density = LEVELS[row][col] / MAX;
          thresholds.current[row * COLS + col] = Math.random() * 0.55 + (1 - density) * 0.27;
        }
      }
      progress.current = 0;
      started.current = performance.now();
      setText(compose(0, thresholds.current, lens.current));
      schedule();
    }

    setReady(true);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [schedule]);

  const handlePointerMove = (event: PointerEvent<HTMLPreElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    lens.current.col = ((event.clientX - rect.left) / rect.width) * COLS;
    lens.current.row = ((event.clientY - rect.top) / rect.height) * LEVELS.length;
    lens.current.target = 1;
    schedule();
  };

  const handlePointerLeave = () => {
    lens.current.target = 0;
    schedule();
  };

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      data-ready={ready}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`ascii-portrait w-max select-none whitespace-pre font-mono leading-[1.2] ${className}`}
    >
      {text}
    </pre>
  );
}
