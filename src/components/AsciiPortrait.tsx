import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { portrait } from '../data/portrait';

const RAMP = ' .:;+xX$&';
const MAX = RAMP.length - 1;
const COLS = Math.max(...portrait.map((line) => line.length));
const INK = portrait.map((line) =>
  Array.from(line.padEnd(COLS, ' '), (char) => Math.max(0, RAMP.indexOf(char))),
);

// For light glyphs on a dark ground: flip the tones inside the figure and
// leave the empty space that touches the edges empty.
function invert(levels: number[][]) {
  const rows = levels.length;
  const outside = levels.map((row) => row.map(() => false));
  const stack: [number, number][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < COLS; col++) {
      const edge = row === 0 || row === rows - 1 || col === 0 || col === COLS - 1;
      if (edge && levels[row][col] === 0) {
        outside[row][col] = true;
        stack.push([row, col]);
      }
    }
  }

  while (stack.length) {
    const [row, col] = stack.pop()!;
    for (const [r, c] of [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]]) {
      if (r >= 0 && r < rows && c >= 0 && c < COLS && !outside[r][c] && levels[r][c] === 0) {
        outside[r][c] = true;
        stack.push([r, c]);
      }
    }
  }

  return levels.map((row, r) => row.map((level, c) => (outside[r][c] ? 0 : MAX - level)));
}

const GLOW = invert(INK);
const text = (levels: number[][]) => levels.map((row) => row.map((level) => RAMP[level]).join('')).join('\n');

const DEVELOP_MS = 1600;
const LENS_RADIUS = 9;
const LENS_LIFT = 3;

interface Lens {
  col: number;
  row: number;
  strength: number;
  target: number;
}

function compose(grid: number[][], progress: number, thresholds: Float32Array, lens: Lens) {
  let out = '';
  for (let row = 0; row < grid.length; row++) {
    const levels = grid[row];
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
    if (row < grid.length - 1) out += '\n';
  }
  return out;
}

interface AsciiPortraitProps {
  className?: string;
  /** Light glyphs on a dark ground. */
  glow?: boolean;
}

export default function AsciiPortrait({ className = '', glow = false }: AsciiPortraitProps) {
  const grid = glow ? GLOW : INK;
  const [frameText, setFrameText] = useState(() => text(grid));
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLPreElement>(null);
  const frame = useRef<number | null>(null);
  const started = useRef(0);
  const progress = useRef(1);
  const thresholds = useRef(new Float32Array(INK.length * COLS));
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

    setFrameText(compose(grid, progress.current, thresholds.current, l));

    if (progress.current < 1 || l.strength !== l.target) {
      frame.current = requestAnimationFrame(tick);
    }
  }, [grid]);

  const schedule = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      // Dense glyphs settle first, so the face develops like a print.
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < COLS; col++) {
          const density = grid[row][col] / MAX;
          thresholds.current[row * COLS + col] = Math.random() * 0.55 + (1 - density) * 0.27;
        }
      }
      progress.current = 0;
      started.current = performance.now();
      setFrameText(compose(grid, 0, thresholds.current, lens.current));
      schedule();
    }

    setReady(true);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [grid, schedule]);

  const handlePointerMove = (event: PointerEvent<HTMLPreElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    lens.current.col = ((event.clientX - rect.left) / rect.width) * COLS;
    lens.current.row = ((event.clientY - rect.top) / rect.height) * grid.length;
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
      {frameText}
    </pre>
  );
}
