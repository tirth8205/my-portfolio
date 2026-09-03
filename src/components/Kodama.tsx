import { useEffect, useState, useCallback, useRef } from 'react';

type Mood = 'sleeping' | 'coffee' | 'gym' | 'coding' | 'eating' | 'gaming' | 'music' | 'sleepy' | 'idle';

function getLondonHour(): number {
  return parseInt(
    new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false }),
    10,
  );
}

function getMood(hour: number): Mood {
  if (hour >= 0 && hour < 6) return 'sleeping';
  if (hour === 6) return 'coffee';
  if (hour === 7) return 'gym';
  if (hour === 8) return 'idle';
  if (hour >= 9 && hour < 12) return 'coding';
  if (hour === 12) return 'eating';
  if (hour === 13) return 'coffee';
  if (hour >= 14 && hour < 18) return 'coding';
  if (hour === 18) return 'gym';
  if (hour >= 19 && hour < 21) return 'gaming';
  if (hour === 21) return 'music';
  return 'sleepy';
}

function faceFor(mood: Mood, blink: boolean): string {
  if (mood === 'sleeping') return '(- -)';
  if (mood === 'sleepy') return '(u u)';
  if (blink) return '(- -)';
  if (mood === 'coffee' || mood === 'eating' || mood === 'music') return '(^ ^)';
  return '(. .)';
}

export function getNextMood(mood: Mood): Mood {
  if (mood === 'sleeping') return 'idle';
  if (mood === 'idle') return 'coffee';
  return 'idle';
}

export default function Kodama() {
  const [timeMood, setTimeMood] = useState<Mood>('idle');
  const [override, setOverride] = useState<Mood | null>(null);
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout>>();

  const updateMood = useCallback(() => setTimeMood(getMood(getLondonHour())), []);

  useEffect(() => {
    updateMood();
    const iv = setInterval(updateMood, 60000);
    return () => clearInterval(iv);
  }, [updateMood]);

  useEffect(() => {
    const iv = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const handleClick = () => {
    const current = override ?? timeMood;
    setOverride(getNextMood(current));
    if (revertTimer.current) clearTimeout(revertTimer.current);
    revertTimer.current = setTimeout(() => setOverride(null), 6000);
  };

  const mood = override ?? timeMood;

  return (
    <button
      type="button"
      className="static z-50 shrink-0 appearance-none border-0 bg-transparent p-0 select-none transition-transform duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 md:fixed md:bottom-6 md:right-6"
      style={{ transform: hovered ? 'translateY(-2px)' : 'translateY(0)' }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Rabbit, ${mood}`}
    >
      <span
        className={`bunny-float ${mood} relative block whitespace-pre text-center font-mono text-[13px] font-bold leading-[1.15] transition-colors duration-300 ${
          hovered ? 'text-neutral-800' : 'text-neutral-600'
        }`}
      >
        {mood === 'sleeping' && (
          <>
            <span className="bunny-z-1 absolute -top-3 right-0" aria-hidden="true">z</span>
            <span className="bunny-z-2 absolute -top-3 right-1" aria-hidden="true">z</span>
          </>
        )}
        {mood === 'music' && (
          <span className="bunny-note-1 absolute -top-3 right-0" aria-hidden="true">♪</span>
        )}
        <span className="block">
          <span className="bunny-ears">{'(\\ /)'}</span>
        </span>
        <span className="block">{faceFor(mood, blink)}</span>
      </span>
    </button>
  );
}
